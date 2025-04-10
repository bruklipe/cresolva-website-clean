import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// For static export compatibility
export const dynamic = 'force-static';

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

// Email and phone configuration from environment variables
const GMAIL_USER = process.env.GMAIL_USER || 'cresolvami@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_PASSWORD;
const PHONE_NUMBER = process.env.PHONE_NUMBER || '3136861358';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, message } = data;
    
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }
    
    console.log('Forwarding chat message to SMS:', { name, message });
    
    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD || 'zhbffdxyeprxpggw' // Fallback for development
      }
    });
    
    // The phone number without formatting (just digits)
    const phoneDigits = PHONE_NUMBER;
    
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
      priority: 'high' as const
    };
    
    // Try sending to SMS gateways for different carriers to increase chance of delivery
    // Create array of recipients for popular SMS gateways
    const smsRecipients = [
      `${phoneDigits}@${SMS_GATEWAYS.att}`,
      `${phoneDigits}@${SMS_GATEWAYS.tmobile}`,
      `${phoneDigits}@${SMS_GATEWAYS.verizon}`
    ];
    
    // SMS options (simplified version)
    const mailOptionsSMS = {
      from: GMAIL_USER,
      to: smsRecipients.join(', '), // Send to multiple SMS gateways
      subject: 'Website Chat',
      text: `From ${name}: ${message}`,
      priority: 'high' as const
    };
    
    // Send both emails
    const [emailInfo, smsInfo] = await Promise.all([
      transporter.sendMail(mailOptionsEmail),
      transporter.sendMail(mailOptionsSMS)
    ]);
    
    console.log('Email notification sent:', emailInfo.messageId);
    console.log('SMS notification attempted:', smsInfo.messageId);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message forwarded successfully'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error forwarding chat message:', error);
    return NextResponse.json(
      { 
        error: 'Failed to forward message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 