
  import React from 'react';
  import { Navigate, Outlet, useLocation } from 'react-router-dom';
  import { useAuth } from '@/context/AuthContext';
  
  const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
  
    // Mostrar loading si aún se está verificando la autenticación
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      );
    }
  
    // Redirigir a login si no está autenticado
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    // Renderizar las rutas protegidas
    return <Outlet />;
  };
  
  export default ProtectedRoute;
  