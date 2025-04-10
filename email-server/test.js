// Import node-fetch with ESM compatible syntax
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

console.log('Testing email server connection...');

// Sample test data
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Email',
  message: 'This is a test message from the test script.'
};

// Test the server
async function testServer() {
  try {
    console.log('Connecting to email server at http://localhost:3001/send-email');
    console.log('With test data:', testData);
    
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Raw response:', responseText);
    
    try {
      const data = JSON.parse(responseText);
      console.log('Parsed response:', data);
      
      if (data.previewUrl) {
        console.log('Email preview URL:', data.previewUrl);
        console.log('You can open this URL in your browser to view the test email.');
      }
    } catch (e) {
      console.log('Response is not valid JSON');
    }
    
    if (response.ok) {
      console.log('Test successful! Email server is working correctly.');
    } else {
      console.error('Test failed! Server returned an error.');
    }
  } catch (error) {
    console.error('Failed to connect to email server:', error.message);
    console.error('Make sure the email server is running on port 3001');
  }
}

testServer(); 