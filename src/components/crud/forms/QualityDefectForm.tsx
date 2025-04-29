import React, { useState, useEffect } from 'react';
  import { QualityDefect, QualityDefectInput, QualityDefectService } from '@/services/qualityDefect.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface QualityDefectFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const QualityDefectForm: React.FC<QualityDefectFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      qualityControlId: null,
    defectType: '',
    description: '',
    severity: '',
    quantity: 0
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
      const data = await QualityDefectService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación qualityControl
          if (data.qualityControlId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.qualityControlId = data.qualityControlId;
          } else if (data.qualityControl) {
            // Si el API devuelve el objeto completo
            formattedData.qualityControlId = data.qualityControl.id || data.qualityControl;
          }
      formattedData.defectType = data.defectType;
      formattedData.description = data.description;
      // Para enum severity
          formattedData.severity = data.severity;
      formattedData.quantity = data.quantity;
      
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
      if (!formData.qualityControlId) errors.qualityControlId = 'El campo qualityControl es requerido';
    if (!formData.defectType) errors.defectType = 'El campo defectType es requerido';
    if (!formData.description) errors.description = 'El campo description es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.qualityControlId) {
        dataToSubmit.qualityControlId = formData.qualityControlId;
      }
    dataToSubmit.defectType = formData.defectType;
    dataToSubmit.description = formData.description;
    dataToSubmit.severity = formData.severity;
    dataToSubmit.quantity = formData.quantity;
      
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
          await QualityDefectService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await QualityDefectService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            qualityControlId: null,
        defectType: '',
        description: '',
        severity: '',
        quantity: 0
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.qualityDefect.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: qualityControl */}
          <div>
    <label htmlFor="qualityControlId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.qualityDefect.fields.qualityControl')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="qualityControlId"
      name="qualityControlId"
      value={formData.qualityControlId}
      onChange={(value) => handleSelectChange('qualityControlId', parseInt(value))}
      url="/qualityControls"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.qualityControlId}
    />
    {fieldErrors.qualityControlId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.qualityControlId}
      </div>
    )}
  </div>
      {/* Campo: defectType */}
          <div>
  <label htmlFor="defectType" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {t('models.qualityDefect.fields.defectType')}
 <span className="text-red-500 ml-1">*</span>
  </label>
  <GenericSelect
    id="defectType"
    name="defectType"
    
    value={formData.defectType || ''}
    onChange={(value) => handleSelectChange('defectType', value)}
    required
    searchable
    
    error={fieldErrors.defectType}
  />
  {fieldErrors.defectType && (
    <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
      {fieldErrors.defectType}
    </div>
  )}
</div>
      {/* Campo: description */}
          <GenericInput
  type="text"
  id="description"
  name="description"
  label={t('models.qualityDefect.fields.description')}

  value={formData.description || ''}
  onChange={handleChange}
  required
  error={fieldErrors.description}
/>
      {/* Campo: severity */}
          <div>
    <label htmlFor="severity" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.qualityDefect.fields.severity')}
      
    </label>
    <BaseSelect
      id="severity"
      name="severity"
      options={[
        { id: 'MINOR           // Menor (no afecta funcionalidad)', name: 'MINOR           // Menor (no afecta funcionalidad)' },
        { id: 'MAJOR           // Mayor (afecta funcionalidad pero usable)', name: 'MAJOR           // Mayor (afecta funcionalidad pero usable)' },
        { id: 'CRITICAL        // Crítico (producto no utilizable)', name: 'CRITICAL        // Crítico (producto no utilizable)' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.severity || ''}
      onChange={(value) => handleSelectChange('severity', value)}
      
      searchable
      error={fieldErrors.severity}
    />
    {fieldErrors.severity && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.severity}
      </div>
    )}
  </div>
      {/* Campo: quantity */}
          <GenericInput
  type="number"
  id="quantity"
  name="quantity"
  label={t('models.qualityDefect.fields.quantity')}

  value={formData.quantity?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.quantity}
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
  
  export default QualityDefectForm;