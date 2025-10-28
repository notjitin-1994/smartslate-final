#!/bin/bash

# Test script for contact form API
# Usage: bash test-contact-api.sh

echo "🧪 Testing Contact Form API..."
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Error: Dev server is not running"
    echo "Please run: npm run dev"
    exit 1
fi

echo "✅ Server is running"
echo ""

# Test 1: Valid submission
echo "📤 Test 1: Sending valid contact form submission..."
response=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "company": "Test Company",
    "subject": "Test Inquiry from API",
    "message": "This is a test message to verify the contact form API is working correctly. If you receive this email, the integration is successful!",
    "inquiryType": "general"
  }')

echo "Response: $response"
echo ""

if echo "$response" | grep -q '"success":true'; then
    echo "✅ Test 1 PASSED: Valid submission accepted"
else
    echo "❌ Test 1 FAILED: Valid submission rejected"
fi
echo ""

# Test 2: Missing required fields
echo "📤 Test 2: Testing validation (missing email)..."
response=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "subject": "Test",
    "message": "Test message"
  }')

echo "Response: $response"
echo ""

if echo "$response" | grep -q '"success":false'; then
    echo "✅ Test 2 PASSED: Missing field validation works"
else
    echo "❌ Test 2 FAILED: Missing field validation failed"
fi
echo ""

# Test 3: Invalid email format
echo "📤 Test 3: Testing email validation..."
response=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "subject": "Test",
    "message": "Test message"
  }')

echo "Response: $response"
echo ""

if echo "$response" | grep -q '"success":false'; then
    echo "✅ Test 3 PASSED: Email validation works"
else
    echo "❌ Test 3 FAILED: Email validation failed"
fi
echo ""

# Test 4: Message too short
echo "📤 Test 4: Testing message length validation..."
response=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Short"
  }')

echo "Response: $response"
echo ""

if echo "$response" | grep -q '"success":false'; then
    echo "✅ Test 4 PASSED: Message length validation works"
else
    echo "❌ Test 4 FAILED: Message length validation failed"
fi
echo ""

echo "================================================"
echo "📊 Test Summary"
echo "================================================"
echo ""
echo "Check your email at jitin@smartslate.io for the test submission."
echo ""
echo "If RESEND_API_KEY is not set in .env.local, check server logs"
echo "for the email content that would have been sent."
echo ""
echo "Next steps:"
echo "1. Check .env.local has RESEND_API_KEY set"
echo "2. Get API key from: https://resend.com/api-keys"
echo "3. Add: RESEND_API_KEY=re_your_key_here"
echo "4. Restart dev server: npm run dev"
echo "5. Run this test again"
echo ""
