import React, { useState, useEffect } from 'react';
  import { QualityControl, QualityControlInput, QualityControlService } from '@/services/qualityControl.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface QualityControlFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const QualityControlForm: React.FC<QualityControlFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      productionId: null,
    inspectionDate: '',
    inspectorId: null,
    passedInspection: false,
    notes: ''
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
      const data = await QualityControlService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación production
          if (data.productionId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.productionId = data.productionId;
          } else if (data.production) {
            // Si el API devuelve el objeto completo
            formattedData.productionId = data.production.id || data.production;
          }
      if (data.inspectionDate && (data.inspectionDate instanceof Date || typeof data.inspectionDate === 'string')) {
            formattedData.inspectionDate = new Date(data.inspectionDate).toISOString().substring(0, 10);
          } else {
            formattedData.inspectionDate = data.inspectionDate;
          }
      // Para relación inspector
          if (data.inspectorId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.inspectorId = data.inspectorId;
          } else if (data.inspector) {
            // Si el API devuelve el objeto completo
            formattedData.inspectorId = data.inspector.id || data.inspector;
          }
      formattedData.passedInspection = data.passedInspection;
      formattedData.notes = data.notes;
      
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
      if (!formData.productionId) errors.productionId = 'El campo production es requerido';
    if (!formData.inspectionDate) errors.inspectionDate = 'El campo inspectionDate es requerido';
    if (!formData.passedInspection) errors.passedInspection = 'El campo passedInspection es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.productionId) {
        dataToSubmit.productionId = formData.productionId;
      }
    dataToSubmit.inspectionDate = formData.inspectionDate;
    if (formData.inspectorId) {
        dataToSubmit.inspectorId = formData.inspectorId;
      }
    dataToSubmit.passedInspection = formData.passedInspection;
    dataToSubmit.notes = formData.notes;
      
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
          await QualityControlService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await QualityControlService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            productionId: null,
        inspectionDate: '',
        inspectorId: null,
        passedInspection: false,
        notes: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.qualityControl.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: production */}
          <div>
    <label htmlFor="productionId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.qualityControl.fields.production')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="productionId"
      name="productionId"
      value={formData.productionId}
      onChange={(value) => handleSelectChange('productionId', parseInt(value))}
      url="/productions"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.productionId}
    />
    {fieldErrors.productionId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.productionId}
      </div>
    )}
  </div>
      {/* Campo: inspectionDate */}
          <GenericInput
  type="datetime-local"
  id="inspectionDate"
  name="inspectionDate"
  label={t('models.qualityControl.fields.inspectionDate')}

  value={formData.inspectionDate ? new Date(formData.inspectionDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.inspectionDate}
/>
      {/* Campo: inspector */}
          <div>
    <label htmlFor="inspectorId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.qualityControl.fields.inspector')}    
    
    </label>
    <GenericSelect
      id="inspectorId"
      name="inspectorId"
      value={formData.inspectorId}
      onChange={(value) => handleSelectChange('inspectorId', parseInt(value))}
      url="/employees"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.inspectorId}
    />
    {fieldErrors.inspectorId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.inspectorId}
      </div>
    )}
  </div>
      {/* Campo: passedInspection */}
          <GenericCheckbox
  id="passedInspection"
  name="passedInspection"
  label="Passed Inspection"
  checked={!!formData.passedInspection}
  onChange={handleChange}
  required
  error={fieldErrors.passedInspection}
/>
      {/* Campo: notes */}
          <GenericInput
  type="text"
  id="notes"
  name="notes"
  label={t('models.qualityControl.fields.notes')}

  value={formData.notes || ''}
  onChange={handleChange}
  
  error={fieldErrors.notes}
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
  
  export default QualityControlForm;