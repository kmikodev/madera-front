import React, { useState, useEffect } from 'react';
  import { AccountingEntry, AccountingEntryInput, AccountingEntryService } from '@/services/accountingEntry.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface AccountingEntryFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const AccountingEntryForm: React.FC<AccountingEntryFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      reference: '',
    date: '',
    description: '',
    isAdjustment: false,
    invoiceId: null,
    paymentId: null,
    fiscalYearId: null,
    creatorId: null,
    entryType: ''
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
      const data = await AccountingEntryService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.reference = data.reference;
      if (data.date && (data.date instanceof Date || typeof data.date === 'string')) {
            formattedData.date = new Date(data.date).toISOString().substring(0, 10);
          } else {
            formattedData.date = data.date;
          }
      formattedData.description = data.description;
      formattedData.isAdjustment = data.isAdjustment;
      // Para relación invoice
          if (data.invoiceId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.invoiceId = data.invoiceId;
          } else if (data.invoice) {
            // Si el API devuelve el objeto completo
            formattedData.invoiceId = data.invoice.id || data.invoice;
          }
      // Para relación payment
          if (data.paymentId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.paymentId = data.paymentId;
          } else if (data.payment) {
            // Si el API devuelve el objeto completo
            formattedData.paymentId = data.payment.id || data.payment;
          }
      // Para relación fiscalYear
          if (data.fiscalYearId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.fiscalYearId = data.fiscalYearId;
          } else if (data.fiscalYear) {
            // Si el API devuelve el objeto completo
            formattedData.fiscalYearId = data.fiscalYear.id || data.fiscalYear;
          }
      // Para relación creator
          if (data.creatorId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.creatorId = data.creatorId;
          } else if (data.creator) {
            // Si el API devuelve el objeto completo
            formattedData.creatorId = data.creator.id || data.creator;
          }
      formattedData.entryType = data.entryType;
      
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
    if (!formData.date) errors.date = 'El campo date es requerido';
    if (!formData.description) errors.description = 'El campo description es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.reference = formData.reference;
    dataToSubmit.date = formData.date;
    dataToSubmit.description = formData.description;
    dataToSubmit.isAdjustment = formData.isAdjustment;
    if (formData.invoiceId) {
        dataToSubmit.invoiceId = formData.invoiceId;
      }
    if (formData.paymentId) {
        dataToSubmit.paymentId = formData.paymentId;
      }
    if (formData.fiscalYearId) {
        dataToSubmit.fiscalYearId = formData.fiscalYearId;
      }
    if (formData.creatorId) {
        dataToSubmit.creatorId = formData.creatorId;
      }
    dataToSubmit.entryType = formData.entryType;
      
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
          await AccountingEntryService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await AccountingEntryService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            reference: '',
        date: '',
        description: '',
        isAdjustment: false,
        invoiceId: null,
        paymentId: null,
        fiscalYearId: null,
        creatorId: null,
        entryType: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.accountingEntry.title')}
          
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
  label={t('models.accountingEntry.fields.reference')}

  value={formData.reference || ''}
  onChange={handleChange}
  required
  error={fieldErrors.reference}
/>
      {/* Campo: date */}
          <GenericInput
  type="datetime-local"
  id="date"
  name="date"
  label={t('models.accountingEntry.fields.date')}

  value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.date}
/>
      {/* Campo: description */}
          <GenericInput
  type="text"
  id="description"
  name="description"
  label={t('models.accountingEntry.fields.description')}

  value={formData.description || ''}
  onChange={handleChange}
  required
  error={fieldErrors.description}
/>
      {/* Campo: isAdjustment */}
          <GenericCheckbox
  id="isAdjustment"
  name="isAdjustment"
  label="Is Adjustment"
  checked={!!formData.isAdjustment}
  onChange={handleChange}
  
  error={fieldErrors.isAdjustment}
/>
      {/* Campo: invoice */}
          <div>
    <label htmlFor="invoiceId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingEntry.fields.invoice')}    
    
    </label>
    <GenericSelect
      id="invoiceId"
      name="invoiceId"
      value={formData.invoiceId}
      onChange={(value) => handleSelectChange('invoiceId', parseInt(value))}
      url="/invoices"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.invoiceId}
    />
    {fieldErrors.invoiceId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.invoiceId}
      </div>
    )}
  </div>
      {/* Campo: payment */}
          <div>
    <label htmlFor="paymentId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingEntry.fields.payment')}    
    
    </label>
    <GenericSelect
      id="paymentId"
      name="paymentId"
      value={formData.paymentId}
      onChange={(value) => handleSelectChange('paymentId', parseInt(value))}
      url="/payments"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.paymentId}
    />
    {fieldErrors.paymentId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.paymentId}
      </div>
    )}
  </div>
      {/* Campo: fiscalYear */}
          <div>
    <label htmlFor="fiscalYearId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingEntry.fields.fiscalYear')}    
    
    </label>
    <GenericSelect
      id="fiscalYearId"
      name="fiscalYearId"
      value={formData.fiscalYearId}
      onChange={(value) => handleSelectChange('fiscalYearId', parseInt(value))}
      url="/fiscalYears"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.fiscalYearId}
    />
    {fieldErrors.fiscalYearId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.fiscalYearId}
      </div>
    )}
  </div>
      {/* Campo: creator */}
          <div>
    <label htmlFor="creatorId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingEntry.fields.creator')}    
    
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
      {/* Campo: entryType */}
          <div>
  <label htmlFor="entryType" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
          {t('models.accountingEntry.fields.entryType')}
 
  </label>
  <GenericSelect
    id="entryType"
    name="entryType"
    
    value={formData.entryType || ''}
    onChange={(value) => handleSelectChange('entryType', value)}
    
    searchable
    
    error={fieldErrors.entryType}
  />
  {fieldErrors.entryType && (
    <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
      <ExclamationCircleIcon className="h-4 w-4 mr-1" />
      {fieldErrors.entryType}
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
  
  export default AccountingEntryForm;