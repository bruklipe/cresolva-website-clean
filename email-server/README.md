# CreSolva Email Server

This is a simple Express.js server that handles email sending for the CreSolva website. It provides two main endpoints:

1. `/send-email` - For the contact form submissions
2. `/forward-chat` - For the live chat feature that forwards messages to email and SMS

## Features

- Contact form submission handling
- Live chat message forwarding to email
- SMS notifications via email-to-SMS gateways
- Supports both development (Ethereal) and production (Gmail) environments
- CORS configuration for multiple origins

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server in development mode:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3001
NODE_ENV=development
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
PHONE_NUMBER=1234567890
```

For production, you'll need to set these environment variables on your hosting platform.

## Gmail App Password

To use Gmail for sending emails, you need to:

1. Enable 2-Step Verification on your Google account
2. Generate an App Password specifically for this application
3. Set it as the `GMAIL_APP_PASSWORD` environment variable

## Deployment

### Render.com (Free tier)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add the environment variables
6. Deploy

### Railway.app (Free tier with limits)

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add the environment variables
4. Deploy

### AWS Elastic Beanstalk

1. Install the EB CLI: `pip install awsebcli`
2. Initialize EB: `eb init`
3. Create an environment: `eb create`
4. Set environment variables: `eb setenv GMAIL_APP_PASSWORD=your-password`
5. Deploy: `eb deploy`

## API Usage

### Contact Form Endpoint

```bash
curl -X POST http://localhost:3001/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "This is a test message"
  }'
```

### Live Chat Endpoint

```bash
curl -X POST http://localhost:3001/forward-chat \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "message": "I need help with something"
  }'
```

## Frontend Integration

Update your frontend code to point to the deployed server URL:

```javascript
// In your contact form component
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-deployed-server.com';

async function sendEmail(formData) {
  const response = await fetch(`${API_URL}/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  return response.json();
}
``` 