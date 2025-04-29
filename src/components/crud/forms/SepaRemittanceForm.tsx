import React, { useState, useEffect } from 'react';
  import { SepaRemittance, SepaRemittanceInput, SepaRemittanceService } from '@/services/sepaRemittance.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface SepaRemittanceFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const SepaRemittanceForm: React.FC<SepaRemittanceFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      reference: '',
    generationDate: '',
    submissionDate: '',
    status: '',
    totalAmount: 0,
    messageId: '',
    notes: '',
    creatorId: null
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
      const data = await SepaRemittanceService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.reference = data.reference;
      if (data.generationDate && (data.generationDate instanceof Date || typeof data.generationDate === 'string')) {
            formattedData.generationDate = new Date(data.generationDate).toISOString().substring(0, 10);
          } else {
            formattedData.generationDate = data.generationDate;
          }
      if (data.submissionDate && (data.submissionDate instanceof Date || typeof data.submissionDate === 'string')) {
            formattedData.submissionDate = new Date(data.submissionDate).toISOString().substring(0, 10);
          } else {
            formattedData.submissionDate = data.submissionDate;
          }
      // Para enum status
          formattedData.status = data.status;
      formattedData.totalAmount = data.totalAmount;
      formattedData.messageId = data.messageId;
      formattedData.notes = data.notes;
      // Para relación creator
          if (data.creatorId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.creatorId = data.creatorId;
          } else if (data.creator) {
            // Si el API devuelve el objeto completo
            formattedData.creatorId = data.creator.id || data.creator;
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
      if (!formData.reference) errors.reference = 'El campo reference es requerido';
    if (!formData.generationDate) errors.generationDate = 'El campo generationDate es requerido';
    if (!formData.status) errors.status = 'El campo status es requerido';
    if (!formData.totalAmount) errors.totalAmount = 'El campo totalAmount es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.reference = formData.reference;
    dataToSubmit.generationDate = formData.generationDate;
    dataToSubmit.submissionDate = formData.submissionDate;
    dataToSubmit.status = formData.status;
    dataToSubmit.totalAmount = formData.totalAmount;
    dataToSubmit.messageId = formData.messageId;
    dataToSubmit.notes = formData.notes;
    if (formData.creatorId) {
        dataToSubmit.creatorId = formData.creatorId;
      }
      
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
          await SepaRemittanceService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await SepaRemittanceService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            reference: '',
        generationDate: '',
        submissionDate: '',
        status: '',
        totalAmount: 0,
        messageId: '',
        notes: '',
        creatorId: null
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.sepaRemittance.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: reference */}
          <GenericInput
  type="text"
  id="reference"
  name="reference"
  label={t('models.sepaRemittance.fields.reference')}

  value={formData.reference || ''}
  onChange={handleChange}
  required
  error={fieldErrors.reference}
/>
      {/* Campo: generationDate */}
          <GenericInput
  type="datetime-local"
  id="generationDate"
  name="generationDate"
  label={t('models.sepaRemittance.fields.generationDate')}

  value={formData.generationDate ? new Date(formData.generationDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.generationDate}
/>
      {/* Campo: submissionDate */}
          <GenericInput
  type="datetime-local"
  id="submissionDate"
  name="submissionDate"
  label={t('models.sepaRemittance.fields.submissionDate')}

  value={formData.submissionDate ? new Date(formData.submissionDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.submissionDate}
/>
      {/* Campo: status */}
          <div>
    <label htmlFor="status" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.sepaRemittance.fields.status')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="status"
      name="status"
      options={[
        { id: 'DRAFT           // Borrador', name: 'DRAFT           // Borrador' },
        { id: 'GENERATED       // Generada', name: 'GENERATED       // Generada' },
        { id: 'SUBMITTED       // Enviada', name: 'SUBMITTED       // Enviada' },
        { id: 'REJECTED        // Rechazada', name: 'REJECTED        // Rechazada' },
        { id: 'PROCESSED       // Procesada', name: 'PROCESSED       // Procesada' },
        { id: 'PARTIALLY_PROCESSED // Procesada parcialmente', name: 'PARTIALLY_PROCESSED // Procesada parcialmente' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.status || ''}
      onChange={(value) => handleSelectChange('status', value)}
      required
      searchable
      error={fieldErrors.status}
    />
    {fieldErrors.status && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.status}
      </div>
    )}
  </div>
      {/* Campo: totalAmount */}
          <GenericInput
  type="number"
  id="totalAmount"
  name="totalAmount"
  label={t('models.sepaRemittance.fields.totalAmount')}

  value={formData.totalAmount?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.totalAmount}
/>
      {/* Campo: messageId */}
          <GenericInput
  type="text"
  id="messageId"
  name="messageId"
  label={t('models.sepaRemittance.fields.messageId')}

  value={formData.messageId || ''}
  onChange={handleChange}
  
  error={fieldErrors.messageId}
/>
      {/* Campo: notes */}
          <GenericInput
  type="text"
  id="notes"
  name="notes"
  label={t('models.sepaRemittance.fields.notes')}

  value={formData.notes || ''}
  onChange={handleChange}
  
  error={fieldErrors.notes}
/>
      {/* Campo: creator */}
          <div>
    <label htmlFor="creatorId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.sepaRemittance.fields.creator')}    
    
    </label>
    <GenericSelect
      id="creatorId"
      name="creatorId"
      value={formData.creatorId}
      onChange={(value) => handleSelectChange('creatorId', parseInt(value))}
      url="/employees"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.creatorId}
    />
    {fieldErrors.creatorId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.creatorId}
      </div>
    )}
  </div>
          
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
  
  export default SepaRemittanceForm;