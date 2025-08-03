# Blank Survey Waitlist

A beautiful, modern waitlist application for Blank Survey with automated thank you emails. Built with Next.js, Convex, and Resend.

## Features

- ✨ Modern, responsive waitlist form
- 📧 Automated thank you emails with waitlist position
- 📊 Real-time waitlist statistics
- 🎨 Beautiful UI with dark/light mode support
- 🔐 Secure backend with Convex
- 📱 Mobile-friendly design

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Convex
```bash
npx convex dev
```
This will create your Convex deployment and generate the `.env.local` file.

### 3. Set Up Email (Optional)
To enable automated thank you emails:

1. Create a [Resend](https://resend.com) account
2. Get your API key from the dashboard
3. Set the environment variable:
```bash
npx convex env set RESEND_API_KEY your_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Email Configuration

The application sends automated thank you emails when users join the waitlist. To set this up:

1. **Create Resend Account**: Go to [resend.com](https://resend.com) and sign up
2. **Get API Key**: Navigate to API Keys and create a new key
3. **Set Environment Variable**: 
   ```bash
   npx convex env set RESEND_API_KEY re_your_api_key_here
   ```
4. **Update Email Domain** (for production): Edit `convex/emails.ts` and update the `from` field with your verified domain

## Development

- **Frontend**: Next.js with TypeScript, Tailwind CSS, and Framer Motion
- **Backend**: Convex for real-time database and functions
- **Email**: Resend with React Email templates
- **UI Components**: Custom components with Radix UI primitives

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   └── lib/                # Utilities
├── convex/
│   ├── emails.ts           # Email sending functions
│   ├── waitlist.ts         # Waitlist management
│   ├── schema.ts           # Database schema
│   └── emails/             # Email templates
└── public/                 # Static assets
```

## Deployment

1. **Deploy to Vercel**: Connect your GitHub repository to Vercel
2. **Deploy Convex**: Run `npx convex deploy --prod`
3. **Set Production Environment Variables**: Set `RESEND_API_KEY` in your production Convex deployment

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Resend Documentation](https://resend.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
