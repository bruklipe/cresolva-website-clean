const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Set the port - use environment variable for cloud deployment
const PORT = process.env.PORT || 3001;

// Enhanced CORS setup to allow requests from multiple origins
app.use(cors({
  origin: [
    'http://localhost:3000',           // Local development
    'http://localhost:3002',           // Local development alternate port
    'https://cresolvami.netlify.app',  // Netlify production site
    'https://www.cresolva.com',        // Future custom domain
    'https://cresolva.com'             // Future custom domain (no www)
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({ 
    message: 'Email server is running on port ' + PORT,
    timestamp: new Date().toISOString()
  });
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  console.log('Email endpoint accessed at', new Date().toISOString());
  console.log('Received request to /send-email');
  console.log('Request body:', req.body);
  
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    console.log('Processing form submission:', { name, email, subject });

    // Determine if we're in development or production
    const isProduction = process.env.NODE_ENV === 'production';
    let transporter;
    
    if (!isProduction) {
      // Development: Use Ethereal (fake SMTP service)
      console.log('Creating test account for development');
      const testAccount = await nodemailer.createTestAccount();
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      
      console.log('Created test account:', testAccount.user);
    } else {
      // Production: Use Gmail
      console.log('Using Gmail SMTP for production');
      
      // Gmail SMTP configuration from environment variables
      const GMAIL_USER = process.env.GMAIL_USER || 'cresolvami@gmail.com';
      const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
      
      if (!GMAIL_APP_PASSWORD) {
        console.error('No Gmail app password provided in environment');
        return res.status(500).json({ error: 'Email server configuration error' });
      }
      
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD
        }
      });
    }
    
    console.log('Created transporter');

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'cresolvami@gmail.com',
      subject: `New message from ${name}: ${subject}`,
      text: `Message from: ${name} (${email})\n\n${message}`,
      html: `
        <h3>New message from your website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    console.log('Sending mail with options:', mailOptions);

    // Test the connection
    try {
      const connectionVerified = await transporter.verify();
      console.log('Connection verified:', connectionVerified);
    } catch (connError) {
      console.error('Connection verification failed:', connError);
      return res.status(500).json({ error: 'Failed to connect to email server' });
    }

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      
      // For development, provide the Ethereal preview URL
      if (!isProduction) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return res.status(200).json({ 
          message: 'Email sent successfully',
          previewUrl: nodemailer.getTestMessageUrl(info)
        });
      } else {
        return res.status(200).json({ 
          message: 'Email sent successfully',
          messageId: info.messageId
        });
      }
    } catch (mailError) {
      console.error('Failed to send email:', mailError);
      return res.status(500).json({ error: 'Failed to send email', details: mailError.message });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// SMS/forwarding endpoint for the chat feature
app.post('/forward-chat', async (req, res) => {
  console.log('Chat forwarding endpoint accessed at', new Date().toISOString());
  console.log('Request body:', req.body);
  
  try {
    const { name, message } = req.body;
    
    if (!name || !message) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Name and message are required' });
    }
    
    // Gmail SMTP configuration from environment variables
    const GMAIL_USER = process.env.GMAIL_USER || 'cresolvami@gmail.com';
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
    const PHONE_NUMBER = process.env.PHONE_NUMBER || '3136861358';
    
    if (!GMAIL_APP_PASSWORD) {
      console.error('No Gmail app password provided in environment');
      return res.status(500).json({ error: 'Email server configuration error' });
    }
    
    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD
      }
    });
    
    // Adding SMS via email gateway support
    // Format: phone-number@carrier-gateway
    const SMS_GATEWAYS = {
      att: 'txt.att.net',
      tmobile: 'tmomail.net',
      verizon: 'vtext.com',
      sprint: 'messaging.sprintpcs.com',
      boost: 'sms.myboostmobile.com',
      cricket: 'sms.cricketwireless.net',
      metro: 'mymetropcs.com'
    };
    
    // Send to email (regular notification)
    const mailOptionsEmail = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `🔴 URGENT: Chat Message from ${name}`,
      text: `${message}\n\nReply to this email to respond to the chat.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #ff0000; padding: 15px; border-radius: 8px;">
          <h2 style="color: #ff0000; text-align: center;">⚠️ URGENT: New Chat Message</h2>
          <div style="padding: 15px; background-color: #f8f8f8; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 18px;"><strong>From:</strong> ${name}</p>
            <p style="margin-top: 10px; font-size: 18px; color: #333;">${message}</p>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">Received: ${new Date().toLocaleString()}</p>
          </div>
          <p style="color: #333; font-size: 16px; font-weight: bold;">Reply to this email to respond to the customer in the chat.</p>
          <p style="color: #666; font-size: 14px;">This message was sent from the live chat on your website.</p>
        </div>
      `,
      priority: 'high'
    };
    
    // Try sending to SMS gateways for different carriers to increase chance of delivery
    // Create array of recipients for popular SMS gateways
    const smsRecipients = [
      `${PHONE_NUMBER}@${SMS_GATEWAYS.att}`,
      `${PHONE_NUMBER}@${SMS_GATEWAYS.tmobile}`,
      `${PHONE_NUMBER}@${SMS_GATEWAYS.verizon}`
    ];
    
    // SMS options (simplified version)
    const mailOptionsSMS = {
      from: GMAIL_USER,
      to: smsRecipients.join(', '), // Send to multiple SMS gateways
      subject: 'Website Chat',
      text: `From ${name}: ${message}`,
      priority: 'high'
    };
    
    // Send both emails
    const [emailInfo, smsInfo] = await Promise.all([
      transporter.sendMail(mailOptionsEmail),
      transporter.sendMail(mailOptionsSMS)
    ]);
    
    console.log('Email notification sent:', emailInfo.messageId);
    console.log('SMS notification attempted:', smsInfo.messageId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message forwarded successfully'
    });
    
  } catch (error) {
    console.error('Error forwarding chat message:', error);
    return res.status(500).json({ 
      error: 'Failed to forward message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`============================================`);
  console.log(`Email server is running on port ${PORT}`);
  console.log(`Test the root endpoint: curl http://localhost:${PORT}`);
  console.log(`Test sending email: curl -X POST http://localhost:${PORT}/send-email -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","subject":"Test Email","message":"This is a test message"}'`);
  console.log(`============================================`);
}); 