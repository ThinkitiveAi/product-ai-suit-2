// Mock authentication service for patient portal
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock validation
    if (
      credentials.email === "patient@healthfirst.com" &&
      credentials.password === "password123"
    ) {
      const mockUser: User = {
        id: "1",
        email: "patient@healthfirst.com",
        name: "John Smith",
        role: "patient",
      };

      const mockToken = "mock-jwt-token-" + Date.now();

      return {
        user: mockUser,
        token: mockToken,
      };
    }

    throw new Error("Invalid credentials");
  }

  async forgotPassword(email: string): Promise<void> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real app, this would send a reset email
    console.log(`Password reset requested for: ${email}`);
  }

  logout(): void {
    // Clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }

  getStoredToken(): string | null {
    return localStorage.getItem("authToken");
  }

  getStoredUser(): User | null {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        return null;
      }
    }
    return null;
  }

  storeAuthData(user: User, token: string): void {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  isTokenValid(token: string): boolean {
    // In a real app, you would validate the JWT token
    // For now, we'll just check if it exists and has the expected format
    return token.startsWith("mock-jwt-token-");
  }
}

export const authService = new AuthService();
