import React, { useState, useEffect } from 'react';
  import { Quotation, QuotationInput, QuotationService } from '@/services/quotation.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface QuotationFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const QuotationForm: React.FC<QuotationFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      reference: '',
    customerId: null,
    date: '',
    validUntil: '',
    status: '',
    totalAmount: 0,
    notes: '',
    creatorId: null,
    discountPercent: 0
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
      const data = await QuotationService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.reference = data.reference;
      // Para relación customer
          if (data.customerId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.customerId = data.customerId;
          } else if (data.customer) {
            // Si el API devuelve el objeto completo
            formattedData.customerId = data.customer.id || data.customer;
          }
      if (data.date && (data.date instanceof Date || typeof data.date === 'string')) {
            formattedData.date = new Date(data.date).toISOString().substring(0, 10);
          } else {
            formattedData.date = data.date;
          }
      if (data.validUntil && (data.validUntil instanceof Date || typeof data.validUntil === 'string')) {
            formattedData.validUntil = new Date(data.validUntil).toISOString().substring(0, 10);
          } else {
            formattedData.validUntil = data.validUntil;
          }
      // Para enum status
          formattedData.status = data.status;
      formattedData.totalAmount = data.totalAmount;
      formattedData.notes = data.notes;
      // Para relación creator
          if (data.creatorId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.creatorId = data.creatorId;
          } else if (data.creator) {
            // Si el API devuelve el objeto completo
            formattedData.creatorId = data.creator.id || data.creator;
          }
      formattedData.discountPercent = data.discountPercent;
      
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
    if (!formData.customerId) errors.customerId = 'El campo customer es requerido';
    if (!formData.date) errors.date = 'El campo date es requerido';
    if (!formData.validUntil) errors.validUntil = 'El campo validUntil es requerido';
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
    if (formData.customerId) {
        dataToSubmit.customerId = formData.customerId;
      }
    dataToSubmit.date = formData.date;
    dataToSubmit.validUntil = formData.validUntil;
    dataToSubmit.status = formData.status;
    dataToSubmit.totalAmount = formData.totalAmount;
    dataToSubmit.notes = formData.notes;
    if (formData.creatorId) {
        dataToSubmit.creatorId = formData.creatorId;
      }
    dataToSubmit.discountPercent = formData.discountPercent;
      
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
          await QuotationService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await QuotationService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            reference: '',
        customerId: null,
        date: '',
        validUntil: '',
        status: '',
        totalAmount: 0,
        notes: '',
        creatorId: null,
        discountPercent: 0
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.quotation.title')}
          
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
  label={t('models.quotation.fields.reference')}

  value={formData.reference || ''}
  onChange={handleChange}
  required
  error={fieldErrors.reference}
/>
      {/* Campo: customer */}
          <div>
    <label htmlFor="customerId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.quotation.fields.customer')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="customerId"
      name="customerId"
      value={formData.customerId}
      onChange={(value) => handleSelectChange('customerId', parseInt(value))}
      url="/customers"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.customerId}
    />
    {fieldErrors.customerId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.customerId}
      </div>
    )}
  </div>
      {/* Campo: date */}
          <GenericInput
  type="datetime-local"
  id="date"
  name="date"
  label={t('models.quotation.fields.date')}

  value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.date}
/>
      {/* Campo: validUntil */}
          <GenericInput
  type="datetime-local"
  id="validUntil"
  name="validUntil"
  label={t('models.quotation.fields.validUntil')}

  value={formData.validUntil ? new Date(formData.validUntil).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.validUntil}
/>
      {/* Campo: status */}
          <div>
    <label htmlFor="status" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.quotation.fields.status')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="status"
      name="status"
      options={[
        { id: 'DRAFT           // Borrador', name: 'DRAFT           // Borrador' },
        { id: 'SENT            // Enviado', name: 'SENT            // Enviado' },
        { id: 'ACCEPTED        // Aceptado', name: 'ACCEPTED        // Aceptado' },
        { id: 'REJECTED        // Rechazado', name: 'REJECTED        // Rechazado' },
        { id: 'EXPIRED         // Expirado', name: 'EXPIRED         // Expirado' },
        { id: 'CONVERTED       // Convertido a venta', name: 'CONVERTED       // Convertido a venta' }
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
  label={t('models.quotation.fields.totalAmount')}

  value={formData.totalAmount?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.totalAmount}
/>
      {/* Campo: notes */}
          <GenericInput
  type="text"
  id="notes"
  name="notes"
  label={t('models.quotation.fields.notes')}

  value={formData.notes || ''}
  onChange={handleChange}
  
  error={fieldErrors.notes}
/>
      {/* Campo: creator */}
          <div>
    <label htmlFor="creatorId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.quotation.fields.creator')}    
    
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
      {/* Campo: discountPercent */}
          <GenericInput
  type="number"
  id="discountPercent"
  name="discountPercent"
  label={t('models.quotation.fields.discountPercent')}

  value={formData.discountPercent?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.discountPercent}
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
  
  export default QuotationForm;