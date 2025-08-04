import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../types/Auth';

// API_BASE_URL is not currently used in this service

class AuthService {
  private token: string | null = localStorage.getItem('token');
  private user: LoginResponse['user'] | null = JSON.parse(localStorage.getItem('user') || 'null');

  constructor() {
    // Set up axios interceptor to include token in requests
    axios.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Set up axios interceptor to handle token expiration
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // For demo purposes, we'll simulate a login API call
      // In a real application, this would be an actual API endpoint
      const response = await this.simulateLogin(credentials);
      
      this.token = response.token;
      this.user = response.user;
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  private async simulateLogin(credentials: LoginRequest): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials - in a real app, this would be validated against a backend
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      return {
        token: 'demo-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: credentials.email,
          name: 'Admin User',
          role: 'admin'
        }
      };
    } else if (credentials.email === 'user@example.com' && credentials.password === 'password') {
      return {
        token: 'demo-jwt-token-' + Date.now(),
        user: {
          id: '2',
          email: credentials.email,
          name: 'Regular User',
          role: 'user'
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): LoginResponse['user'] | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export default new AuthService(); 