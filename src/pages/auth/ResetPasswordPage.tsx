
  import React, { useState, useEffect } from 'react';
  import { Link, useParams, useNavigate } from 'react-router-dom';
  import { AuthService } from '@/services/auth.service';
  
  const ResetPasswordPage: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [validToken, setValidToken] = useState<boolean | null>(null);
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
  
    // Verificar token al cargar
    useEffect(() => {
      if (!token) {
        setValidToken(false);
        setError('Token inválido o faltante');
        return;
      }
  
      // Aquí se podría añadir una verificación del token en el servidor
      // Por ahora, asumiremos que el token es válido si existe
      setValidToken(true);
    }, [token]);
  
    const validateForm = () => {
      setError(null);
      
      if (newPassword.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres');
        return false;
      }
      
      if (newPassword !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return false;
      }
      
      return true;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm() || !token) {
        return;
      }
      
      try {
        setLoading(true);
        const response = await AuthService.resetPassword(token, newPassword);
        setSuccess(response.message || 'Contraseña actualizada correctamente');
        
        // Redirigir a login después de un tiempo
        setTimeout(() => {
          navigate('/login', { state: { message: 'Contraseña actualizada correctamente. Por favor, inicia sesión.' } });
        }, 3000);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Error al restablecer la contraseña';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
  
    // Si el token no es válido, mostrar error
    if (validToken === false) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Enlace inválido
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                El enlace para restablecer la contraseña es inválido o ha expirado.
              </p>
            </div>
            <div className="text-center">
              <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Solicitar un nuevo enlace
              </Link>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Restablecer contraseña
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Introduce tu nueva contraseña.
            </p>
          </div>
  
          {/* Mostrar mensajes de error o éxito */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
  
          {success && (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded relative">
              {success}
            </div>
          )}
  
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nueva contraseña
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-secondary-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-secondary-800 focus:z-10 sm:text-sm"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-secondary-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-secondary-800 focus:z-10 sm:text-sm"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                disabled={loading || !!success}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-secondary-900"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Restablecer contraseña'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ResetPasswordPage;
  