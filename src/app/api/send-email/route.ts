import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// For static export compatibility
export const dynamic = 'force-static';

// Gmail SMTP configuration
// Use environment variables for security
const GMAIL_USER = process.env.GMAIL_USER || 'cresolvami@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_PASSWORD; // Get from environment variables

// Add a test endpoint to verify functionality
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Email API is running',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Processing email request:', data);
    
    // Validate data
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD || 'zhbffdxyeprxpggw' // Fallback for local development
      }
    });
    
    // Email content
    const mailOptions = {
      from: `"CreSolva Contact" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: data.email,
      subject: `Website Contact: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">New Contact Message</h2>
          <div style="padding: 20px; background-color: #f7fafc; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 16px;"><strong>From:</strong> ${data.name}</p>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Subject:</strong> ${data.subject}</p>
            <p style="margin-top: 15px; font-size: 16px;"><strong>Message:</strong></p>
            <p style="font-size: 16px;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #4a5568; font-size: 14px;">This message was sent from the contact form on your website.</p>
        </div>
      `
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    console.log('Message ID:', info.messageId);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully', 
        messageId: info.messageId
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 