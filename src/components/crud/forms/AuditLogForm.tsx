import React, { useState, useEffect } from 'react';
  import { AuditLog, AuditLogInput, AuditLogService } from '@/services/auditLog.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface AuditLogFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const AuditLogForm: React.FC<AuditLogFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      userId: null,
    action: '',
    entityType: '',
    entityId: '',
    oldValue: {},
    newValue: {},
    ipAddress: '',
    userAgent: '',
    timestamp: ''
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
      const data = await AuditLogService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación user
          if (data.userId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.userId = data.userId;
          } else if (data.user) {
            // Si el API devuelve el objeto completo
            formattedData.userId = data.user.id || data.user;
          }
      formattedData.action = data.action;
      formattedData.entityType = data.entityType;
      formattedData.entityId = data.entityId;
      formattedData.oldValue = data.oldValue;
      formattedData.newValue = data.newValue;
      formattedData.ipAddress = data.ipAddress;
      formattedData.userAgent = data.userAgent;
      if (data.timestamp && (data.timestamp instanceof Date || typeof data.timestamp === 'string')) {
            formattedData.timestamp = new Date(data.timestamp).toISOString().substring(0, 10);
          } else {
            formattedData.timestamp = data.timestamp;
          }
      
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
      if (!formData.userId) errors.userId = 'El campo user es requerido';
    if (!formData.action) errors.action = 'El campo action es requerido';
    if (!formData.entityType) errors.entityType = 'El campo entityType es requerido';
    if (!formData.entityId) errors.entityId = 'El campo entityId es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.userId) {
        dataToSubmit.userId = formData.userId;
      }
    dataToSubmit.action = formData.action;
    dataToSubmit.entityType = formData.entityType;
    dataToSubmit.entityId = formData.entityId;
    dataToSubmit.oldValue = formData.oldValue;
    dataToSubmit.newValue = formData.newValue;
    dataToSubmit.ipAddress = formData.ipAddress;
    dataToSubmit.userAgent = formData.userAgent;
    dataToSubmit.timestamp = formData.timestamp;
      
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
          await AuditLogService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await AuditLogService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            userId: null,
        action: '',
        entityType: '',
        entityId: '',
        oldValue: {},
        newValue: {},
        ipAddress: '',
        userAgent: '',
        timestamp: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.auditLog.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: user */}
          <div>
    <label htmlFor="userId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.auditLog.fields.user')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="userId"
      name="userId"
      value={formData.userId}
      onChange={(value) => handleSelectChange('userId', parseInt(value))}
      url="/users"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.userId}
    />
    {fieldErrors.userId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.userId}
      </div>
    )}
  </div>
      {/* Campo: action */}
          <GenericInput
  type="text"
  id="action"
  name="action"
  label={t('models.auditLog.fields.action')}

  value={formData.action || ''}
  onChange={handleChange}
  required
  error={fieldErrors.action}
/>
      {/* Campo: entityType */}
          <div>
  <label htmlFor="entityType" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {t('models.auditLog.fields.entityType')}
 <span className="text-red-500 ml-1">*</span>
  </label>
  <GenericSelect
    id="entityType"
    name="entityType"
    
    value={formData.entityType || ''}
    onChange={(value) => handleSelectChange('entityType', value)}
    required
    searchable
    
    error={fieldErrors.entityType}
  />
  {fieldErrors.entityType && (
    <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
      {fieldErrors.entityType}
    </div>
  )}
</div>
      {/* Campo: entityId */}
          <GenericInput
  type="text"
  id="entityId"
  name="entityId"
  label={t('models.auditLog.fields.entityId')}

  value={formData.entityId || ''}
  onChange={handleChange}
  required
  error={fieldErrors.entityId}
/>
      {/* Campo: oldValue */}
          <GenericInput
  type="text"
  id="oldValue"
  name="oldValue"
  label={t('models.auditLog.fields.oldValue')}

  value={formData.oldValue || ''}
  onChange={handleChange}
  
  error={fieldErrors.oldValue}
/>
      {/* Campo: newValue */}
          <GenericInput
  type="text"
  id="newValue"
  name="newValue"
  label={t('models.auditLog.fields.newValue')}

  value={formData.newValue || ''}
  onChange={handleChange}
  
  error={fieldErrors.newValue}
/>
      {/* Campo: ipAddress */}
          <GenericInput
  type="text"
  id="ipAddress"
  name="ipAddress"
  label={t('models.auditLog.fields.ipAddress')}

  value={formData.ipAddress || ''}
  onChange={handleChange}
  
  error={fieldErrors.ipAddress}
/>
      {/* Campo: userAgent */}
          <GenericInput
  type="text"
  id="userAgent"
  name="userAgent"
  label={t('models.auditLog.fields.userAgent')}

  value={formData.userAgent || ''}
  onChange={handleChange}
  
  error={fieldErrors.userAgent}
/>
      {/* Campo: timestamp */}
          <GenericInput
  type="datetime-local"
  id="timestamp"
  name="timestamp"
  label={t('models.auditLog.fields.timestamp')}

  value={formData.timestamp ? new Date(formData.timestamp).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.timestamp}
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
  
  export default AuditLogForm;