import type { User } from '../features/auth/types';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  verificationId?: string;
}

class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  // Helper to get stored token
  getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Helper to get stored user
  getStoredUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Store authentication data
  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
  }

  async login(email: string, password: string, rememberMe = false): Promise<AuthResponse> {
    try {
      // TODO: In production, replace with:
      // const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid credentials');
      }

      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email,
          firstName: 'Test',
          lastName: 'User',
          phoneNumber: '',
          addresses: [],
          wishlist: [],
          orders: []
        },
        token: 'mock-jwt-token'
      };

      if (rememberMe) {
        this.storeAuthData(mockResponse);
      }

      return mockResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    verificationCode?: string;
  }): Promise<AuthResponse> {
    try {
      // TODO: In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!userData.email.includes('@')) {
        throw new Error('Invalid email address');
      }
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const mockResponse: AuthResponse = {
        user: {
          id: Math.random().toString(36).substr(2, 9),
          ...userData,
          addresses: [],
          wishlist: [],
          orders: []
        },
        token: 'mock-jwt-token'
      };

      this.storeAuthData(mockResponse);
      return mockResponse;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async sendVerificationCode(target: string, method: 'email' | 'phone'): Promise<VerificationResponse> {
    try {
      // TODO: In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Log the verification attempt
      console.log(`Mock: Sending verification to ${target} via ${method}`);

      return {
        success: true,
        message: `Verification code sent to your ${method}`,
        verificationId: Math.random().toString(36).substr(2, 9)
      };
    } catch (error) {
      console.error('Verification error:', error);
      throw error;
    }
  }

  async verifyCode(verificationId: string, code: string): Promise<VerificationResponse> {
    try {
      // TODO: In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Log verification attempt
      console.log(`Mock: Verifying code for ID: ${verificationId}`);

      if (!/^\d{6}$/.test(code)) {
        throw new Error('Invalid verification code');
      }

      return {
        success: true,
        message: 'Verification successful'
      };
    } catch (error) {
      console.error('Code verification error:', error);
      throw error;
    }
  }

  async resetPassword(targetEmail: string): Promise<VerificationResponse> {
    try {
      // TODO: In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Log reset attempt
      console.log(`Mock: Sending reset instructions to ${targetEmail}`);

      return {
        success: true,
        message: 'Password reset instructions sent to your email'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}

export const authService = new AuthService();
