# CreSolva Website

This is the official website for CreSolva, a custom software solutions company.

## Getting Started

1. Clone this repository
   ```bash
   git clone https://github.com/bruklipe/cresolva-website.git
   cd cresolva-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Add media files
   The media files are not included in this repository to keep it lightweight. You need to add your media files to the `/public/assets/` directory.
   
   Required media files:
   - `/public/assets/coding-bg-compressed.mp4` - Background video for home page
   - `/public/assets/12920674-hd-compressed.mp4` - Background video for contact page
   - `/public/assets/logo.png` - Company logo
   - Various images for the website

4. Setup environment variables
   Create a `.env` file with the following variables:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   PHONE_NUMBER=your-phone-number
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. For production deployment
   ```bash
   npm run build
   ```

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS
- Nodemailer for email functionality

## Email Server

For the email functionality to work, you need to set up the email server:

1. Navigate to the email-server directory
   ```bash
   cd email-server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with your credentials
   ```
   PORT=3001
   NODE_ENV=development
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   PHONE_NUMBER=your-phone-number
   ```

4. Start the email server
   ```bash
   node server.js
   ```

## Deployment

The site is deployed to Netlify at: https://cresolvami.netlify.app

To deploy updates:
```bash
npm run build
netlify deploy --prod --dir=out
```

## Features

- Modern, responsive design with dark theme
- Interactive contact form with email delivery
- Live chat functionality with direct SMS notifications
- About page showcasing services and expertise
- Clean, professional UI with smooth animations

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Email**: Nodemailer with Gmail SMTP
- **Icons**: SVG and Heroicons

## Development

1. Clone the repository
```bash
git clone https://github.com/bruklipe/cresolva-website.git
cd cresolva-website
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on `.env.example`
```bash
cp .env.example .env
```

4. Add your credentials to the `.env` file:
```
GMAIL_USER=youremail@gmail.com
GMAIL_PASSWORD=your-app-password
PHONE_NUMBER=1234567890
```

5. Run the development server
```bash
npm run dev
```

## Email Functionality

The contact form in the website allows users to send emails directly from the Contact page.

### Implementation

- The form is implemented in `/src/app/contact/page.tsx`
- Email sending is handled by a Next.js API route at `/src/app/api/send-email/route.ts`
- Uses Gmail SMTP for sending real emails

### Setting Up Gmail App Password

To use Gmail SMTP for sending emails, you need to set up an App Password:

1. Go to your Google Account at https://myaccount.google.com/
2. Go to "Security" and ensure 2-Step Verification is enabled
3. Go to "App passwords" (under "Signing in to Google")
4. Create a new app password, select "Mail" and "Other (Custom name)"
5. Name it "CreSolva Website" and click "Generate"
6. Copy the generated password and use it in your .env file

## Live Chat Functionality

The live chat feature on the contact page allows visitors to directly message you.

### Implementation

- Messages are sent via email to your Gmail account
- SMS notifications are sent to your phone number using email-to-SMS gateways
- Real-time response capability

## License

All rights reserved © CreSolva 2024
