import React, { useState, useEffect } from 'react';
  import { ApiKey, ApiKeyInput, ApiKeyService } from '@/services/apiKey.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface ApiKeyFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      userId: null,
    keyValue: '',
    name: '',
    expiresAt: '',
    lastUsed: ''
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
      const data = await ApiKeyService.getById(id!);
      
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
      formattedData.keyValue = data.keyValue;
      formattedData.name = data.name;
      if (data.expiresAt && (data.expiresAt instanceof Date || typeof data.expiresAt === 'string')) {
            formattedData.expiresAt = new Date(data.expiresAt).toISOString().substring(0, 10);
          } else {
            formattedData.expiresAt = data.expiresAt;
          }
      if (data.lastUsed && (data.lastUsed instanceof Date || typeof data.lastUsed === 'string')) {
            formattedData.lastUsed = new Date(data.lastUsed).toISOString().substring(0, 10);
          } else {
            formattedData.lastUsed = data.lastUsed;
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
    if (!formData.keyValue) errors.keyValue = 'El campo keyValue es requerido';
    if (!formData.name) errors.name = 'El campo name es requerido';
  
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
    dataToSubmit.keyValue = formData.keyValue;
    dataToSubmit.name = formData.name;
    dataToSubmit.expiresAt = formData.expiresAt;
    dataToSubmit.lastUsed = formData.lastUsed;
      
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
          await ApiKeyService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await ApiKeyService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            userId: null,
        keyValue: '',
        name: '',
        expiresAt: '',
        lastUsed: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.apiKey.title')}
          
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
      {t('models.apiKey.fields.user')}    
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
      {/* Campo: keyValue */}
          <GenericInput
  type="text"
  id="keyValue"
  name="keyValue"
  label={t('models.apiKey.fields.keyValue')}

  value={formData.keyValue || ''}
  onChange={handleChange}
  required
  error={fieldErrors.keyValue}
/>
      {/* Campo: name */}
          <GenericInput
  type="text"
  id="name"
  name="name"
  label={t('models.apiKey.fields.name')}

  value={formData.name || ''}
  onChange={handleChange}
  required
  error={fieldErrors.name}
/>
      {/* Campo: expiresAt */}
          <GenericInput
  type="datetime-local"
  id="expiresAt"
  name="expiresAt"
  label={t('models.apiKey.fields.expiresAt')}

  value={formData.expiresAt ? new Date(formData.expiresAt).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.expiresAt}
/>
      {/* Campo: lastUsed */}
          <GenericInput
  type="datetime-local"
  id="lastUsed"
  name="lastUsed"
  label={t('models.apiKey.fields.lastUsed')}

  value={formData.lastUsed ? new Date(formData.lastUsed).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.lastUsed}
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
  
  export default ApiKeyForm;