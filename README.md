# Patient Management Frontend

A modern React TypeScript application for managing patient records with authentication and a beautiful user interface.

## 🚀 Features

- **🔐 Authentication System** - Secure login with JWT tokens
- **👥 User Management** - Admin and regular user roles
- **📋 Patient CRUD Operations** - Create, Read, Update, Delete patients
- **🎨 Modern UI/UX** - Beautiful, responsive design with animations
- **📱 Mobile Responsive** - Works perfectly on all devices
- **🌙 Dark Mode Support** - Automatic theme detection
- **⚡ Real-time Updates** - Instant feedback and loading states
- **🔍 Form Validation** - Comprehensive input validation
- **🛡️ Error Handling** - User-friendly error messages

## 🛠️ Tech Stack

- **React 19** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with animations
- **React Router DOM** - Client-side routing

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd pattient-management-frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🔐 Authentication

### Demo Accounts
For testing purposes, the following demo accounts are available:

- **Admin User**
  - Email: `admin@example.com`
  - Password: `password`
  - Role: Full access to all features

- **Regular User**
  - Email: `user@example.com`
  - Password: `password`
  - Role: Basic patient management

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Authentication component
│   ├── Login.css       # Login styles
│   ├── PatientForm.tsx # Patient form component
│   ├── PatientForm.css # Patient form styles
│   ├── PatientList.tsx # Patient list component
│   └── PatientList.css # Patient list styles
├── services/           # API services
│   ├── authService.ts  # Authentication service
│   └── patientService.ts # Patient API service
├── types/              # TypeScript type definitions
│   ├── Auth.ts         # Authentication types
│   └── Patient.ts      # Patient data types
├── App.tsx             # Main application component
├── App.css             # Main application styles
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌐 API Integration

The frontend connects to a Spring Boot backend API running on `http://localhost:4000`.

### API Endpoints
- `GET /patients` - Get all patients
- `POST /patients` - Create new patient
- `PUT /patients/{id}` - Update patient
- `DELETE /patients/{id}` - Delete patient

## 🎨 UI Components

### Login Page
- Beautiful gradient background
- Glassmorphism card design
- Form validation with real-time feedback
- Password visibility toggle
- Demo account quick login buttons
- Loading states and error handling

### Patient Management
- Responsive patient list with search
- Add/Edit patient forms
- Delete confirmation dialogs
- Real-time form validation
- Loading spinners and success messages

## 🔒 Security Features

- **JWT Token Authentication** - Secure token-based auth
- **Automatic Token Refresh** - Handles token expiration
- **Protected Routes** - Redirects unauthenticated users
- **Secure Logout** - Clears all session data
- **Input Sanitization** - Prevents XSS attacks

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🌙 Dark Mode

The application automatically detects and adapts to:
- System dark mode preference
- Manual theme selection (if implemented)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify the backend API is running on port 4000
3. Ensure all dependencies are installed
4. Check the network tab for API call failures

## 🔄 Backend Integration

This frontend is designed to work with the Spring Boot backend. Make sure the backend is running before using the frontend features.

For backend setup, see the [backend repository](link-to-backend-repo).
