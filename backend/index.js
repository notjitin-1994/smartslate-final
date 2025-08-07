require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL database:', err);
  });

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE google_id = $1',
      [profile.id]
    );

    if (existingUser.rows.length > 0) {
      return done(null, existingUser.rows[0]);
    }

    const newUser = await pool.query(
      'INSERT INTO users (google_id, full_name, email) VALUES ($1, $2, $3) RETURNING *',
      [profile.id, profile.displayName, profile.emails[0].value]
    );

    return done(null, newUser.rows[0]);
  } catch (error) {
    return done(error, null);
  }
}));

const generateJWT = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      google_id: user.google_id 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      const token = generateJWT(req.user);
      res.json({
        success: true,
        message: 'Google authentication successful',
        token: token,
        user: {
          id: req.user.id,
          full_name: req.user.full_name,
          email: req.user.email
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error generating token',
        error: error.message
      });
    }
  }
);

app.post('/auth/register', async (req, res) => {
  try {
    const { full_name, email, phone_number, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and password are required'
      });
    }

    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone_number = $2',
      [email, phone_number]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or phone number already exists'
      });
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      'INSERT INTO users (full_name, email, phone_number, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, full_name, email, phone_number, created_at',
      [full_name, email, phone_number, password_hash]
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, phone_number, password } = req.body;

    if ((!email && !phone_number) || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone number and password are required'
      });
    }

    let user;
    if (email) {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      user = result.rows[0];
    } else if (phone_number) {
      const result = await pool.query('SELECT * FROM users WHERE phone_number = $1', [phone_number]);
      user = result.rows[0];
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateJWT(user);

    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
