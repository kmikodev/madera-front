import React, { useState, useEffect } from 'react';
  import { User, UserInput, UserService } from '@/services/user.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface UserFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const UserForm: React.FC<UserFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      email: '',
    password: '',
    firstName: '',
    lastName: '',
    active: false,
    roleId: null,
    employeeId: null,
    lastLogin: '',
    failedAttempts: 0,
    lockedUntil: '',
    passwordResetToken: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
    // Cargar datos si estamos en modo edición
    useEffect(() => {
      if (id) {
        loadData();
      }
    }, [id]);
  
    // Cargar datos del servidor
   const loadData = async () => {
    try {
      setLoading(true);
      const data = await UserService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.email = data.email;
      formattedData.password = data.password;
      formattedData.firstName = data.firstName;
      formattedData.lastName = data.lastName;
      formattedData.active = data.active;
      // Para relación role
          if (data.roleId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.roleId = data.roleId;
          } else if (data.role) {
            // Si el API devuelve el objeto completo
            formattedData.roleId = data.role.id || data.role;
          }
      // Para relación employee
          if (data.employeeId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.employeeId = data.employeeId;
          } else if (data.employee) {
            // Si el API devuelve el objeto completo
            formattedData.employeeId = data.employee.id || data.employee;
          }
      if (data.lastLogin && (data.lastLogin instanceof Date || typeof data.lastLogin === 'string')) {
            formattedData.lastLogin = new Date(data.lastLogin).toISOString().substring(0, 10);
          } else {
            formattedData.lastLogin = data.lastLogin;
          }
      formattedData.failedAttempts = data.failedAttempts;
      if (data.lockedUntil && (data.lockedUntil instanceof Date || typeof data.lockedUntil === 'string')) {
            formattedData.lockedUntil = new Date(data.lockedUntil).toISOString().substring(0, 10);
          } else {
            formattedData.lockedUntil = data.lockedUntil;
          }
      formattedData.passwordResetToken = data.passwordResetToken;
      
      console.log("Datos formateados para el formulario:", formattedData);
      setFormData(formattedData);
      setError(null);
      setFieldErrors({});
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar los datos';
      setError(errorMessage);
      console.error(err);
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  
    // Manejar cambios en selectores
    const handleSelectChange = (name: string, selectedValue: any) => {
      setFormData(prev => ({
        ...prev,
        [name]: selectedValue
      }));
  
      // Limpiar error del campo si existe
      if (fieldErrors[name]) {
        setFieldErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  
    // Manejar cambios en inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target as HTMLInputElement;
      
      // Conversión de tipos según el campo
      let convertedValue: any = value;
      
      if (type === 'number') {
        convertedValue = value === '' ? '' : Number(value);
      } else if (type === 'checkbox') {
        convertedValue = (e.target as HTMLInputElement).checked;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: convertedValue
      }));
  
      // Limpiar error del campo si existe
      if (fieldErrors[name]) {
        setFieldErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    };
  
    
  
    // Validar formulario antes de enviar
    const validateForm = (): boolean => {
      const errors: Record<string, string> = {};
  
      // Validar campos requeridos
      if (!formData.email) errors.email = 'El campo email es requerido';
    if (!formData.password) errors.password = 'El campo password es requerido';
    if (!formData.firstName) errors.firstName = 'El campo firstName es requerido';
    if (!formData.lastName) errors.lastName = 'El campo lastName es requerido';
    if (!formData.roleId) errors.roleId = 'El campo role es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.email = formData.email;
    dataToSubmit.password = formData.password;
    dataToSubmit.firstName = formData.firstName;
    dataToSubmit.lastName = formData.lastName;
    dataToSubmit.active = formData.active;
    if (formData.roleId) {
        dataToSubmit.roleId = formData.roleId;
      }
    if (formData.employeeId) {
        dataToSubmit.employeeId = formData.employeeId;
      }
    dataToSubmit.lastLogin = formData.lastLogin;
    dataToSubmit.failedAttempts = formData.failedAttempts;
    dataToSubmit.lockedUntil = formData.lockedUntil;
    dataToSubmit.passwordResetToken = formData.passwordResetToken;
      
      return dataToSubmit;
    };
  
    // Enviar formulario
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validar formulario
      if (!validateForm()) {
        setError('Por favor, corrige los errores del formulario');
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        // Preparar datos para envío
        const dataToSubmit = prepareDataForSubmission();
        
        if (id) {
          // Actualizar registro existente
          await UserService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await UserService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            email: '',
        password: '',
        firstName: '',
        lastName: '',
        active: false,
        roleId: null,
        employeeId: null,
        lastLogin: '',
        failedAttempts: 0,
        lockedUntil: '',
        passwordResetToken: ''
          });
          setFieldErrors({});
        }
        
        // Ejecutar callback de éxito si existe
        if (onSuccess) {
          onSuccess();
        }
      } catch (err: any) {
        // Tratar de extraer mensaje de error del servidor si existe
        const errorMessage = err.response?.data?.message || 'Error al guardar los datos';
        setError(errorMessage);
        console.error(err);
        
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };
  
    // Mostrar spinner durante la carga inicial en modo edición
    if (loading && id) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 dark:border-primary-400"></div>
        </div>
      );
    }
  
    return (
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-secondary-900 dark:text-white">
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.user.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: email */}
          <GenericInput
  type="email"
  id="email"
  name="email"
  label={t('models.user.fields.email')}

  value={formData.email || ''}
  onChange={handleChange}
  required
  error={fieldErrors.email}
/>
      {/* Campo: password */}
          <GenericInput
  type="password"
  id="password"
  name="password"
  label={t('models.user.fields.password')}

  value={formData.password || ''}
  onChange={handleChange}
  required
  error={fieldErrors.password}
/>
      {/* Campo: firstName */}
          <GenericInput
  type="text"
  id="firstName"
  name="firstName"
  label={t('models.user.fields.firstName')}

  value={formData.firstName || ''}
  onChange={handleChange}
  required
  error={fieldErrors.firstName}
/>
      {/* Campo: lastName */}
          <GenericInput
  type="text"
  id="lastName"
  name="lastName"
  label={t('models.user.fields.lastName')}

  value={formData.lastName || ''}
  onChange={handleChange}
  required
  error={fieldErrors.lastName}
/>
      {/* Campo: active */}
          <GenericCheckbox
  id="active"
  name="active"
  label="Active"
  checked={!!formData.active}
  onChange={handleChange}
  
  error={fieldErrors.active}
/>
      {/* Campo: role */}
          <div>
    <label htmlFor="roleId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.user.fields.role')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="roleId"
      name="roleId"
      value={formData.roleId}
      onChange={(value) => handleSelectChange('roleId', parseInt(value))}
      url="/roles"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.roleId}
    />
    {fieldErrors.roleId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.roleId}
      </div>
    )}
  </div>
      {/* Campo: employee */}
          <div>
    <label htmlFor="employeeId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.user.fields.employee')}    
    
    </label>
    <GenericSelect
      id="employeeId"
      name="employeeId"
      value={formData.employee?.id}
      onChange={(value) => handleSelectChange('employeeId', parseInt(value))}
      url="/employees"
      labelKey="nombre"
      valueKey="nombre"
      
      searchable
      error={fieldErrors.employeeId}
    />
    {fieldErrors.employeeId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.employeeId}
      </div>
    )}
  </div>
      {/* Campo: lastLogin */}
          <GenericInput
  type="datetime-local"
  id="lastLogin"
  name="lastLogin"
  label={t('models.user.fields.lastLogin')}

  value={formData.lastLogin ? new Date(formData.lastLogin).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.lastLogin}
/>
      {/* Campo: failedAttempts */}
          <GenericInput
  type="number"
  id="failedAttempts"
  name="failedAttempts"
  label={t('models.user.fields.failedAttempts')}

  value={formData.failedAttempts?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.failedAttempts}
/>
      {/* Campo: lockedUntil */}
          <GenericInput
  type="datetime-local"
  id="lockedUntil"
  name="lockedUntil"
  label={t('models.user.fields.lockedUntil')}

  value={formData.lockedUntil ? new Date(formData.lockedUntil).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.lockedUntil}
/>
      {/* Campo: passwordResetToken */}
          <GenericInput
  type="password"
  id="passwordResetToken"
  name="passwordResetToken"
  label={t('models.user.fields.passwordResetToken')}

  value={formData.passwordResetToken || ''}
  onChange={handleChange}
  
  error={fieldErrors.passwordResetToken}
/>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-secondary-800"
            >
              {loading ? 'Guardando...' : id ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default UserForm;