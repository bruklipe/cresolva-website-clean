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
  const { name, email, subject, message } = data;
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'All fields are required' })
    };
  }

  try {
    // Gmail SMTP configuration from environment variables
    const GMAIL_USER = process.env.GMAIL_USER || 'cresolvami@gmail.com';
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
    
    if (!GMAIL_APP_PASSWORD) {
      console.error('No Gmail app password provided in environment');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email server configuration error' })
      };
    }
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: GMAIL_USER,
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

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Email sent successfully',
        messageId: info.messageId
      })
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send email', 
        details: error.message 
      })
    };
  }
}; 