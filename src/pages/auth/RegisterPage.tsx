
  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { useAuth } from '@/context/AuthContext';
  import { useTranslation  } from 'react-i18next';


  const RegisterPage: React.FC = () => {
      const { t, i18n } = useTranslation();

    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const { register, error, isAuthenticated, loading, clearError } = useAuth();
    const navigate = useNavigate();
  
    // Redirigir si ya está autenticado
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);
  
    // Limpiar mensajes cuando cambian los inputs
    useEffect(() => {
      clearError();
    }, [formData, clearError]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
  
      // Limpiar errores al editar
      if (formErrors[name]) {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };
  
    const validateForm = () => {
      const errors: Record<string, string> = {};
  
      // Validar nombre (opcional)
      if (formData.name === '') {
        errors.name = t('auth.errors.enterYourName');
      }
  
      // Validar email
      if (formData.email === '') {
        errors.email = t("auth.errors.emailIsRequired");
      } else if (
        formData.email.includes('@') && 
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(formData.email)
      ) {
        errors.email = t('auth.errors.invalidEmail');
      }
  
      // Validar contraseña
      if (formData.password === '') {
        errors.password = t('auth.errors.passwordIsRequired');
      } else if (formData.password.length < 8) {
        errors.password =  t('auth.errors.passwordTooShort');
      }
  
      // Validar confirmación de contraseña
      if (formData.confirmPassword === '') {
        errors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = t('auth.errors.passwordsDoNotMatch');
      }
  
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      // Eliminar confirmPassword antes de enviar
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-secondary-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              {t('auth.register.title')}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
             {t('auth.register.description')}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                {t('auth.login')}
              </Link>
            </p>
          </div>
  
          {/* Mostrar mensajes de error */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
  
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {
                    t('auth.register.fields.name')
                  }
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-secondary-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-secondary-800 focus:z-10 sm:text-sm"
                  placeholder={t('auth.register.fields.namePlaceholder')}
                  required
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("auth.register.fields.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-secondary-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-secondary-800 focus:z-10 sm:text-sm"
                  placeholder={t("auth.register.fields.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('auth.register.fields.password')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-secondary-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-secondary-800 focus:z-10 sm:text-sm"
                  placeholder={t('auth.register.fields.passwordPlaceholder')}
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('auth.register.fields.confirmPassword')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-secondary-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-secondary-800 focus:z-10 sm:text-sm"
                  placeholder={t('auth.register.fields.confirmPasswordPlaceholder')}
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.confirmPassword}</p>
                )}
              </div>
            </div>
  
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Al registrarte, aceptas nuestros <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">Términos de servicio</a> y <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">Política de privacidad</a>.
            </div>
  
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-secondary-900"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Registrarse'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default RegisterPage;
  