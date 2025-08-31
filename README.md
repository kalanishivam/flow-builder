# Flow Manager Assignment

This project is a Flow Management application built with **TypeScript** and **Next.js**.

## Features

- Flow creation
- Save flows
- View saved flows
- Send mail via flows
- User session and authentication
- Responsive design

## Demo
Watch a quick demo of the application here:

https://www.loom.com/share/6b3ee2e30a60412a822831b8c87ccd9b?sid=8607c10c-c4eb-4e3e-a3b7-d7ff589af982

## Setup (Local Development)

1. Clone the repository:

2. Create a .env file with the following secrets:
   DATABASE_URL="your-database-url"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
   CLERK_WEBHOOK_SECRET="your-clerk-webhook-secret"
   RESEND_API_KEY="your-resend-api-key"
    
3. Install the dependencies: npm install
4. Run the development server: npm run dev or Run in production: npm run start
5. Open http://localhost:3000 in your browser. 





