const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Parse the JSON body
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }

  // Check for required fields
  const { name, message } = data;
  if (!name || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name and message are required' })
    };
  }

  try {
    // Gmail SMTP configuration from environment variables
    const GMAIL_USER = process.env.GMAIL_USER || 'cresolvami@gmail.com';
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
    const PHONE_NUMBER = process.env.PHONE_NUMBER || '3136861358';
    
    if (!GMAIL_APP_PASSWORD) {
      console.error('No Gmail app password provided in environment');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email server configuration error' })
      };
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
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message forwarded successfully' 
      })
    };
  } catch (error) {
    console.error('Error forwarding chat message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to forward chat message', 
        details: error.message 
      })
    };
  }
}; 