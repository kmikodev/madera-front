
  import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
  import { AuthService, AuthUser } from '@/services/auth.service';
  import { useNavigate } from 'react-router-dom';
  
  // Definición del contexto de autenticación
  interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    clearError: () => void;
  }
  
  // Valor por defecto del contexto
  const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    clearError: () => {},
  });
  
  // Hook personalizado para usar el contexto de autenticación
  export const useAuth = () => useContext(AuthContext);
  
  // Proveedor del contexto de autenticación
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    // Verificar si hay un usuario autenticado al cargar
    useEffect(() => {
      const checkAuth = async () => {
        try {
          if (AuthService.isAuthenticated()) {
            // Obtener usuario guardado en localStorage
            const storedUser = AuthService.getStoredUser();
            
            if (storedUser) {
              setUser(storedUser);
            } else {
              // Si no hay usuario en localStorage pero sí hay token, obtener datos del usuario
              const currentUser = await AuthService.getCurrentUser();
              setUser(currentUser);
            }
          }
        } catch (err) {
          console.error('Error verificando autenticación:', err);
          AuthService.logout();
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
    }, []);
  
    // Función para iniciar sesión
    const login = async (email: string, password: string) => {
      setError(null);
      setLoading(true);
      try {
        const response = await AuthService.login({ email, password });
        
        // Guardar token y usuario
        AuthService.saveTokenAndUser(response.token, response.user);
        setUser(response.user);
        
        // Redirigir a la página principal
        navigate('/');
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
        setError(errorMessage);
        console.error('Error de login:', err);
      } finally {
        setLoading(false);
      }
    };
  
    // Función para registrar usuario
    const register = async (userData: any) => {
      setError(null);
      setLoading(true);
      try {
        const response = await AuthService.register(userData);
        
        // Algunos sistemas autentican inmediatamente después del registro
        // y otros requieren verificación de correo primero
        if (response.token) {
          // Si devuelve token, guardar y autenticar
          AuthService.saveTokenAndUser(response.token, response.user);
          setUser(response.user);
          navigate('/');
        } else {
          // Si no devuelve token, mostrar mensaje de verificación y redirigir a login
          navigate('/login', { state: { message: 'Registro exitoso. Por favor verifica tu correo electrónico.' } });
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Error al registrar usuario';
        setError(errorMessage);
        console.error('Error de registro:', err);
      } finally {
        setLoading(false);
      }
    };
  
    // Función para cerrar sesión
    const logout = () => {
      AuthService.logout();
      setUser(null);
      navigate('/login');
    };
  
    // Limpiar mensaje de error
    const clearError = () => {
      setError(null);
    };
  
    // Valor del contexto
    const value: AuthContextType = {
      user,
      isAuthenticated: !!user,
      loading,
      error,
      login,
      register,
      logout,
      clearError
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  