import React, { useState, useEffect } from 'react';
  import { FiscalYear, FiscalYearInput, FiscalYearService } from '@/services/fiscalYear.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface FiscalYearFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const FiscalYearForm: React.FC<FiscalYearFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      name: '',
    startDate: '',
    endDate: '',
    isClosed: false
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
      const data = await FiscalYearService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.name = data.name;
      if (data.startDate && (data.startDate instanceof Date || typeof data.startDate === 'string')) {
            formattedData.startDate = new Date(data.startDate).toISOString().substring(0, 10);
          } else {
            formattedData.startDate = data.startDate;
          }
      if (data.endDate && (data.endDate instanceof Date || typeof data.endDate === 'string')) {
            formattedData.endDate = new Date(data.endDate).toISOString().substring(0, 10);
          } else {
            formattedData.endDate = data.endDate;
          }
      formattedData.isClosed = data.isClosed;
      
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
      if (!formData.name) errors.name = 'El campo name es requerido';
    if (!formData.startDate) errors.startDate = 'El campo startDate es requerido';
    if (!formData.endDate) errors.endDate = 'El campo endDate es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.name = formData.name;
    dataToSubmit.startDate = formData.startDate;
    dataToSubmit.endDate = formData.endDate;
    dataToSubmit.isClosed = formData.isClosed;
      
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
          await FiscalYearService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await FiscalYearService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            name: '',
        startDate: '',
        endDate: '',
        isClosed: false
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.fiscalYear.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: name */}
          <GenericInput
  type="text"
  id="name"
  name="name"
  label={t('models.fiscalYear.fields.name')}

  value={formData.name || ''}
  onChange={handleChange}
  required
  error={fieldErrors.name}
/>
      {/* Campo: startDate */}
          <GenericInput
  type="datetime-local"
  id="startDate"
  name="startDate"
  label={t('models.fiscalYear.fields.startDate')}

  value={formData.startDate ? new Date(formData.startDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.startDate}
/>
      {/* Campo: endDate */}
          <GenericInput
  type="datetime-local"
  id="endDate"
  name="endDate"
  label={t('models.fiscalYear.fields.endDate')}

  value={formData.endDate ? new Date(formData.endDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.endDate}
/>
      {/* Campo: isClosed */}
          <GenericCheckbox
  id="isClosed"
  name="isClosed"
  label="Is Closed"
  checked={!!formData.isClosed}
  onChange={handleChange}
  
  error={fieldErrors.isClosed}
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
  
  export default FiscalYearForm;