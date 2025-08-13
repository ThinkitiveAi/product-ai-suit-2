# HealthFirst Provider Portal

A modern, beautiful provider login portal built with React, TypeScript, Mantine UI, and React Router DOM.

## Features

### 🎨 **Modern UI/UX**

- Beautiful gradient backgrounds with glassmorphism effects
- Responsive design (mobile-first approach)
- Smooth animations and transitions
- Professional healthcare color scheme
- Tabler icons integration

### 🔐 **Authentication System**

- JWT token-based authentication
- Protected routes with authentication guards
- Remember me functionality
- Password reset flow
- Social login options (Google, Microsoft)

### 📱 **Responsive Design**

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Accessible design with ARIA labels

### 🛡️ **Security Features**

- Form validation with real-time feedback
- Secure password input with show/hide toggle
- Protected route components
- Token-based session management

## Tech Stack

- **React 19** with TypeScript
- **Mantine UI** (latest version) for components and theming
- **React Router DOM** for routing
- **Tabler Icons** for beautiful icons
- **Vite** for fast development and building

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd provider-portal
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Login Credentials

For testing purposes, use these credentials:

- **Email**: `provider@healthfirst.com`
- **Password**: `password123`

### Available Routes

- `/login` - Main login page
- `/dashboard` - Protected dashboard (requires authentication)
- `/forgot-password` - Password reset page
- `/` - Redirects to login page

### Features Overview

#### Login Page

- Clean, professional design with gradient background
- Centered login form with glassmorphism effect
- Email and password validation
- "Remember me" checkbox
- "Forgot password?" link
- Social login options
- Loading states and error handling

#### Dashboard

- Welcome message with user information
- Statistics cards with beautiful gradients
- Recent activity feed
- Logout functionality
- Responsive layout

#### Forgot Password

- Email validation
- Success/error notifications
- Back to login navigation

## Project Structure

```
src/
├── components/
│   ├── LoginForm.tsx          # Main login form component
│   └── ProtectedRoute.tsx     # Route protection component
├── pages/
│   ├── LoginPage.tsx          # Login page with background
│   ├── Dashboard.tsx          # Protected dashboard
│   └── ForgotPassword.tsx     # Password reset page
├── context/
│   └── AuthContext.tsx        # Authentication state management
├── services/
│   └── authService.ts         # Authentication API service
├── App.tsx                    # Main app with routing
└── main.tsx                   # Application entry point
```

## Customization

### Theme Configuration

The application uses a custom Mantine theme with:

- Primary color: Blue shade
- Custom button styles
- Rounded corners for cards and inputs
- Professional healthcare color palette

### Styling

All styling is done using Mantine components and theme configuration. No custom CSS is used, ensuring consistency and maintainability.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Pages**: Add routes in `App.tsx` and create components in `pages/`
2. **New Components**: Create reusable components in `components/`
3. **API Integration**: Extend `authService.ts` for new API calls
4. **State Management**: Use the existing `AuthContext` or create new contexts

## Authentication Flow

1. User enters credentials on login page
2. Form validation triggers real-time feedback
3. Loading state shows on submit button
4. Mock API call simulates authentication
5. Success: Redirect to dashboard with stored token
6. Error: Show error notification with details

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

---

**Note**: This is a demo application with mock authentication. In a production environment, you would need to:

- Implement real API endpoints
- Add proper JWT token validation
- Implement proper security measures
- Add error boundaries and loading states
- Add comprehensive testing
