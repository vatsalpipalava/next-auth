# Next-Auth with Email Verification and ShadCN UI

This project is a full-featured authentication system built using Next.js, NextAuth.js, MongoDB, and ShadCN UI. It includes an email verification step during registration, allowing users to verify their accounts via a code sent to their email. Once verified, users can log in and access a secure dashboard.

## Features

- **User Registration**: Users register with an email address, and a verification code is sent to their email.
- **Email Verification**: Users must verify their account by entering the code they received.
- **User Login**: After successful verification, users can log in to access the dashboard.
- **Nodemailer Integration**: Handles email sending for verification codes.
- **NextAuth.js Integration**: Secure authentication and session management.
- **MongoDB Database**: User data, including email and verification status, is stored in MongoDB.
- **ShadCN UI**: Modern and elegant UI for a seamless user experience.

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and routing.
- [NextAuth.js](https://next-auth.js.org/) - Authentication library for handling sign-in and session management.
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing user data.
- [Nodemailer](https://nodemailer.com/about/) - Sending emails with verification codes.
- [ShadCN UI](https://shadcn.dev/) - UI library for building sleek, responsive components.

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vatsalpipalava/next-auth.git

   cd next-auth
   ```
   
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a .env file based on the .env.example template and configure**
4. **Run the development server:**
   ```bash
   npm run dev
   ```
Open http://localhost:3000 in your browser to see the application.

