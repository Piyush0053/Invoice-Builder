# Invoice Builder

A modern, responsive invoice builder application that helps you create, manage, and send professional invoices with ease. Built with React, TypeScript, and Tailwind CSS for a clean, modern UI.

## Features

- 🎨 Create beautiful, professional invoices with customizable templates
- ✨ Interactive form with real-time preview and PDF generation
- 📤 Send invoices directly via email with PDF attachments
- 🔐 Google Authentication for secure user sign-up and login
- 💾 Local storage for saving invoice data
- 📊 Track invoice status (draft, sent, paid, overdue)
- 📱 Fully responsive design for desktop and mobile
- 🖨️ Print-friendly invoice format
- 💳 Support for multiple currencies and payment methods
- 🌐 Company and client management

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/invoice-builder.git
   cd invoice-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Tech Stack

- ⚛️ React 18
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🔥 Firebase Authentication for Google login
- 📝 HTML2Canvas for PDF generation
- 📄 jsPDF for PDF creation and manipulation
- 🔄 React Router DOM for navigation
- 📧 Email service for sending invoices
- 🖼️ React Icons for UI elements
- 🚀 Vite for fast development and building

## Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components (Login)
│   ├── invoice/         # Invoice related components (Form, Templates)
│   ├── layout/          # Layout components (Header, Footer)
│   └── ui/              # UI components (Button, Input, etc.)
├── context/             # React context providers
│   ├── AuthContext.tsx  # Authentication context
│   └── InvoiceContext.tsx # Invoice data and operations
├── data/                # Static data and sample content
├── pages/               # Page components (Preview)
├── services/            # API and service integrations (email service)
├── types/               # TypeScript type definitions
└── utils/               # Utility functions (PDF generation, calculations)
```

## Key Features Implementation

### PDF Generation

The application uses html2canvas and jsPDF to generate PDF invoices from HTML elements. The process involves:

1. Capturing the invoice HTML as a canvas
2. Converting the canvas to a PDF document
3. Generating a Blob for download or email attachment

### Email Functionality

The application allows users to send invoices directly via email with PDF attachments. The implementation includes:

1. A modal dialog for entering recipient email, subject, and message
2. PDF generation and attachment handling
3. Email sending simulation (in a production environment, this would connect to a real email service API)
4. Status tracking of sent invoices

### Google Authentication

User authentication is implemented using Firebase Authentication with Google Sign-In:

1. Simple one-click sign-in with Google accounts
2. Secure user authentication and session management
3. User profile information retrieval
4. Session persistence using local storage

### Type Safety

The application is built with TypeScript and implements several type safety features:

1. Comprehensive type definitions for all data structures (Invoice, Client, Company, etc.)
2. Type guards to ensure safe handling of potentially undefined properties
3. Proper null and undefined checks throughout the codebase
4. TypeScript interfaces for all component props
5. Custom type declarations for third-party libraries

## Best Practices

- **Component Structure**: Follows a modular, component-based architecture
- **Context API**: Uses React Context for global state management
- **Responsive Design**: Implements mobile-first responsive design principles
- **Error Handling**: Comprehensive error handling for all operations
- **Form Validation**: Client-side validation for all input fields
- **Accessibility**: Follows accessibility best practices for form elements and interactive components

The email service allows users to:

1. Send invoices directly to clients with a PDF attachment
2. Use customizable email templates with HTML and plain text versions
3. Include invoice details and payment information in the email body

### Google Authentication

The application provides secure login via Google Authentication:

1. Users can sign in with their Google accounts
2. User data is securely stored and associated with their invoices
3. Protected routes ensure only authenticated users can access certain features

### Invoice Preview

The preview feature allows users to:

1. See a real-time preview of their invoice as they create it
2. Generate a PDF preview before sending
3. Print the invoice directly from the preview screen

## Usage

### Creating an Invoice

1. Log in with your Google account
2. Navigate to the invoice creation page
3. Fill in the form with your company and client details
4. Add invoice items with descriptions, quantities, and prices
5. Set tax rates and any applicable discounts
6. Preview the invoice to check for accuracy
7. Send the invoice via email or save it for later

### Managing Invoices

- All invoices are saved to your account
- Track invoice status (draft, sent, paid, overdue)
- Filter and search through your invoice history
- Edit existing invoices or use them as templates

## Future Enhancements

- Multiple invoice templates and themes
- Recurring invoices for regular clients
- Invoice analytics and reporting
- Integration with payment gateways
- Multi-language support
- Team collaboration features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
