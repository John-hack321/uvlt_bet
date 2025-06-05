import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with hardcoded values for testing
const supabaseUrl = 'https://aqcnsjggkpfwczbbfuzl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY25zamdna3Bmd2N6YmJmdXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NDY4MDMsImV4cCI6MjA2NDUyMjgwM30.0zeitgvuut0P6vLPIsCxof3SwmCjFgqZbGe7rbFWr2E';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API base URL - using the Railway backend URL
const API_URL = 'https://uvltback-production.up.railway.app';

// Authentication API service
export const AuthService = {
  // Register a new user
  async register(email: string, password: string, fullName: string) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login user
  async login(email: string, password: string) {
    try {
      console.log('Attempting login with:', { email, API_URL });
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        // Removed credentials: 'include' as we're using JWT in Authorization header
        body: formData,
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Login error response:', errorData);
        throw new Error(errorData.detail || 'Login failed');
      }
      
      const data = await response.json();
      console.log('Login successful, token received');
      
      // Store the access token in localStorage
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        console.log('Access token stored in localStorage');
      }
      
      return { data, status: response.status };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get user profile
  async getProfile() {
    console.log('Fetching user profile...');
    const token = localStorage.getItem('access_token');
    console.log('Current token:', token ? 'exists' : 'missing');
    
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      
      console.log('Profile response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Profile fetch failed:', errorData);
        throw new Error(errorData.detail || 'Failed to fetch profile');
      }
      
      const data = await response.json();
      console.log('Profile data:', data);
      return data;
    } catch (error) {
      console.error('Error in getProfile:', error);
      // Clear invalid token on error
      localStorage.removeItem('access_token');
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('access_token');
  },

  // Check if user is logged in
  isLoggedIn() {
    const token = localStorage.getItem('access_token');
    console.log('Checking if user is logged in, token exists:', !!token);
    return !!token;
  },
  
  // Get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }
};
