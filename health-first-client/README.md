# HealthFirst Client Portals

This repository contains two modern, beautiful healthcare portals built with React, TypeScript, and Mantine UI:

- **Provider Portal** - For healthcare providers and medical staff
- **Patient Portal** - For patients to access their health information

## 🚀 Features

### Provider Portal

- **Modern Login Interface** - Beautiful glassmorphism design with gradient background
- **Authentication System** - JWT-based authentication with protected routes
- **Dashboard** - Comprehensive provider dashboard with patient management
- **Form Validation** - Real-time validation using Mantine forms
- **Social Login** - Google and Microsoft authentication options
- **Responsive Design** - Mobile-first approach with beautiful UI

### Patient Portal

- **Patient-Focused Design** - Tailored interface for patient needs
- **Health Dashboard** - View appointments, medications, and test results
- **Secure Authentication** - Same robust authentication as provider portal
- **Modern UI/UX** - Consistent design language with provider portal
- **Quick Actions** - Easy access to common patient tasks

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **UI Library**: Mantine v7 (latest)
- **Routing**: React Router DOM v6
- **Icons**: Tabler Icons
- **Build Tool**: Vite
- **Styling**: Mantine theme system with custom CSS

## 📁 Project Structure

```
health-first-client/
├── provider-portal/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── services/
│   │   │   └── authService.ts
│   │   └── App.tsx
│   └── package.json
└── patient-portal/
    ├── src/
    │   ├── components/
    │   │   ├── LoginForm.tsx
    │   │   └── ProtectedRoute.tsx
    │   ├── pages/
    │   │   ├── LoginPage.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── RegisterPage.tsx
    │   │   └── ForgotPassword.tsx
    │   ├── context/
    │   │   └── AuthContext.tsx
    │   ├── services/
    │   │   └── authService.ts
    │   └── App.tsx
    └── package.json
```

## 🎨 Design Features

### Visual Design

- **Gradient Backgrounds** - Beautiful purple-blue gradients
- **Glassmorphism Effects** - Frosted glass appearance for forms
- **Professional Color Scheme** - Healthcare-appropriate blues and whites
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Works perfectly on all devices

### UI Components

- **Custom Mantine Theme** - Consistent styling across both portals
- **Form Components** - TextInput, PasswordInput with validation
- **Button States** - Loading states and hover effects
- **Notifications** - Toast notifications for user feedback
- **Icons** - Tabler icons for consistent iconography

## 🔐 Authentication

### Mock Credentials

**Provider Portal:**

- Email: `provider@healthfirst.com`
- Password: `password123`

**Patient Portal:**

- Email: `patient@healthfirst.com`
- Password: `password123`

### Features

- JWT token storage in localStorage
- Protected routes with authentication guards
- Automatic token validation
- Logout functionality
- Remember me functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd health-first-client
   ```

2. **Install Provider Portal Dependencies**

   ```bash
   cd provider-portal
   npm install
   ```

3. **Install Patient Portal Dependencies**
   ```bash
   cd ../patient-portal
   npm install
   ```

### Running the Applications

#### Provider Portal

```bash
cd provider-portal
npm run dev
```

Access at: http://localhost:5173

#### Patient Portal

```bash
cd patient-portal
npm run dev
```

Access at: http://localhost:5174

## 📱 Usage

### Provider Portal

1. Navigate to http://localhost:5173
2. Login with provider credentials
3. Access the comprehensive provider dashboard
4. Manage patients, appointments, and medical records

### Patient Portal

1. Navigate to http://localhost:5174
2. Login with patient credentials
3. View health information and appointments
4. Access quick actions for common tasks

## 🎯 Key Features Implemented

### ✅ Login System

- Beautiful gradient background
- Glassmorphism form design
- Real-time form validation
- Loading states and error handling
- Social login options (Google, Microsoft)
- Remember me functionality
- Forgot password flow

### ✅ Authentication

- JWT token management
- Protected routes
- Automatic token validation
- Secure logout
- Context-based state management

### ✅ Dashboard

- **Provider Dashboard**: Patient management, appointments, medical records
- **Patient Dashboard**: Health overview, medications, test results
- Responsive grid layouts
- Quick action buttons
- Status badges and notifications

### ✅ UI/UX

- Mobile-first responsive design
- Accessibility compliant
- Smooth animations and transitions
- Professional healthcare color scheme
- Consistent design language

## 🔧 Customization

### Theme Configuration

Both portals use the same Mantine theme configuration:

```typescript
const theme = createTheme({
  primaryColor: "blue",
  colors: {
    blue: [
      "#f0f9ff",
      "#e0f2fe",
      "#bae6fd",
      "#7dd3fc",
      "#38bdf8",
      "#0ea5e9",
      "#0284c7",
      "#0369a1",
      "#075985",
      "#0c4a6e",
    ],
  },
  components: {
    Button: { defaultProps: { radius: "md" } },
    Paper: { defaultProps: { radius: "lg", shadow: "md" } },
    TextInput: { defaultProps: { radius: "md" } },
    PasswordInput: { defaultProps: { radius: "md" } },
  },
});
```

### Styling

- Custom CSS for gradient backgrounds
- Glassmorphism effects with backdrop-filter
- Responsive breakpoints
- Consistent spacing and typography

## 🧪 Testing

### Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error handling)
- [ ] Protected route access
- [ ] Logout functionality
- [ ] Form validation
- [ ] Responsive design on different screen sizes
- [ ] Social login buttons (mock functionality)
- [ ] Forgot password flow
- [ ] Remember me functionality

## 🚀 Deployment

### Build for Production

```bash
# Provider Portal
cd provider-portal
npm run build

# Patient Portal
cd patient-portal
npm run build
```

### Environment Variables

Create `.env` files in each portal directory for production configuration.

## 📝 Development Notes

### Mock Authentication

Both portals use mock authentication services for demonstration:

- Simulated API delays (1.5s for login, 2s for password reset)
- Local storage for token persistence
- Mock user data and validation

### Future Enhancements

- Real API integration
- Advanced form validation
- Real-time notifications
- File upload functionality
- Advanced dashboard features
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Mantine UI**
