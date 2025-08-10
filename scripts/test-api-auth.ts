import fetch from 'node-fetch';

async function testApiAuth() {
  try {
    console.log('🔍 Testing API authentication...\n');

    // Test the roles endpoint without authentication
    console.log('📡 Testing /api/auth/roles without auth...');
    try {
      const res = await fetch('http://localhost:3000/api/auth/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Response status:', res.status);
      console.log('Response text:', await res.text());
    } catch (error) {
      console.log('❌ Error calling API:', error);
    }

    // Test with a mock token
    console.log('\n📡 Testing /api/auth/roles with mock token...');
    try {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjZjMDAxNC1hMWItNGZmNi05NDQyLTgyZmYxNTZkYTJmNiIsImVtYWlsIjoiaml0aW5Ac21hcnRzbGF0ZS5pbyIsInJvbGUiOiJvd25lciIsImlhdCI6MTczMzc5NzIwMCwiZXhwIjoxNzMzODAzODAwfQ.mock';
      
      const res = await fetch('http://localhost:3000/api/auth/roles', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`
        }
      });
      console.log('Response status:', res.status);
      console.log('Response text:', await res.text());
    } catch (error) {
      console.log('❌ Error calling API with mock token:', error);
    }

  } catch (error) {
    console.error('❌ Error testing API auth:', error);
  }
}

testApiAuth();
