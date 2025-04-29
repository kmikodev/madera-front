
  import apiClient from './apiClient';
  import { jwtDecode } from 'jwt-decode';
  
  // Tipos para autenticación
  export interface AuthUser {
    id: string | number;
    email: string;
    [key: string]: any;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    email: string;
    password: string;
    confirmPassword?: string;
    [key: string]: any;
  }
  
  export interface AuthResponse {
    token: string;
    user: AuthUser;
  }
  
  // Servicio de autenticación
  export const AuthService = {
    // Iniciar sesión
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    },
  
    // Registrar nuevo usuario
    register: async (data: RegisterData): Promise<AuthResponse> => {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    },
  
    // Obtener usuario actual
    getCurrentUser: async (): Promise<AuthUser> => {
      const response = await apiClient.get('/auth/me');
      return response.data;
    },
  
    // Verificar cuenta por token
    verifyAccount: async (token: string): Promise<{ message: string }> => {
      const response = await apiClient.get(`/auth/verify/${token}`);
      return response.data;
    },
  
    // Solicitar recuperación de contraseña
    requestPasswordReset: async (email: string): Promise<{ message: string }> => {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.data;
    },
  
    // Restablecer contraseña
    resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
      const response = await apiClient.post(`/auth/reset-password/${token}`, { newPassword });
      return response.data;
    },
  
    // Cambiar contraseña (usuario autenticado)
    changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
      const response = await apiClient.post('/auth/change-password', { currentPassword, newPassword });
      return response.data;
    },
  
    // Cerrar sesión (solo en el cliente)
    logout: (): void => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  
    // Verificar si hay un token almacenado y es válido
    isAuthenticated: (): boolean => {
      const token = localStorage.getItem('token');
      if (!token) return false;
  
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        // Verificar si el token no ha expirado
        return decoded.exp > currentTime;
      } catch {
        return false;
      }
    },
  
    // Guardar token y datos de usuario en localStorage
    saveTokenAndUser: (token: string, user: AuthUser): void => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
  
    // Obtener token
    getToken: (): string | null => {
      return localStorage.getItem('token');
    },
  
    // Obtener usuario del almacenamiento local
    getStoredUser: (): AuthUser | null => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
  };
  
  // Configurar interceptor para agregar el token a las solicitudes
  apiClient.interceptors.request.use(
    (config) => {
      const token = AuthService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Interceptor para manejar errores de autenticación (401)
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Si la respuesta es 401 (No autorizado), cerrar sesión
        AuthService.logout();
        // Redirigir a login si no estamos ya en la página de login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
  