import React, { useState, useEffect } from 'react';
  import { Payment, PaymentInput, PaymentService } from '@/services/payment.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface PaymentFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const PaymentForm: React.FC<PaymentFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      reference: '',
    invoiceId: null,
    amount: 0,
    date: '',
    paymentMethod: '',
    notes: '',
    sepaRemittanceId: null,
    accountingEntryId: null,
    recordedById: null,
    bankReference: ''
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
      const data = await PaymentService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.reference = data.reference;
      // Para relación invoice
          if (data.invoiceId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.invoiceId = data.invoiceId;
          } else if (data.invoice) {
            // Si el API devuelve el objeto completo
            formattedData.invoiceId = data.invoice.id || data.invoice;
          }
      formattedData.amount = data.amount;
      if (data.date && (data.date instanceof Date || typeof data.date === 'string')) {
            formattedData.date = new Date(data.date).toISOString().substring(0, 10);
          } else {
            formattedData.date = data.date;
          }
      // Para enum paymentMethod
          formattedData.paymentMethod = data.paymentMethod;
      formattedData.notes = data.notes;
      // Para relación sepaRemittance
          if (data.sepaRemittanceId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.sepaRemittanceId = data.sepaRemittanceId;
          } else if (data.sepaRemittance) {
            // Si el API devuelve el objeto completo
            formattedData.sepaRemittanceId = data.sepaRemittance.id || data.sepaRemittance;
          }
      // Para relación accountingEntry
          if (data.accountingEntryId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.accountingEntryId = data.accountingEntryId;
          } else if (data.accountingEntry) {
            // Si el API devuelve el objeto completo
            formattedData.accountingEntryId = data.accountingEntry.id || data.accountingEntry;
          }
      // Para relación recordedBy
          if (data.recordedById !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.recordedById = data.recordedById;
          } else if (data.recordedBy) {
            // Si el API devuelve el objeto completo
            formattedData.recordedById = data.recordedBy.id || data.recordedBy;
          }
      formattedData.bankReference = data.bankReference;
      
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
    if (!formData.invoiceId) errors.invoiceId = 'El campo invoice es requerido';
    if (!formData.amount) errors.amount = 'El campo amount es requerido';
    if (!formData.date) errors.date = 'El campo date es requerido';
    if (!formData.paymentMethod) errors.paymentMethod = 'El campo paymentMethod es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.reference = formData.reference;
    if (formData.invoiceId) {
        dataToSubmit.invoiceId = formData.invoiceId;
      }
    dataToSubmit.amount = formData.amount;
    dataToSubmit.date = formData.date;
    dataToSubmit.paymentMethod = formData.paymentMethod;
    dataToSubmit.notes = formData.notes;
    if (formData.sepaRemittanceId) {
        dataToSubmit.sepaRemittanceId = formData.sepaRemittanceId;
      }
    if (formData.accountingEntryId) {
        dataToSubmit.accountingEntryId = formData.accountingEntryId;
      }
    if (formData.recordedById) {
        dataToSubmit.recordedById = formData.recordedById;
      }
    dataToSubmit.bankReference = formData.bankReference;
      
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
          await PaymentService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await PaymentService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            reference: '',
        invoiceId: null,
        amount: 0,
        date: '',
        paymentMethod: '',
        notes: '',
        sepaRemittanceId: null,
        accountingEntryId: null,
        recordedById: null,
        bankReference: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.payment.title')}
          
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
  label={t('models.payment.fields.reference')}

  value={formData.reference || ''}
  onChange={handleChange}
  required
  error={fieldErrors.reference}
/>
      {/* Campo: invoice */}
          <div>
    <label htmlFor="invoiceId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.payment.fields.invoice')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="invoiceId"
      name="invoiceId"
      value={formData.invoiceId}
      onChange={(value) => handleSelectChange('invoiceId', parseInt(value))}
      url="/invoices"
      labelKey="id"
      valueKey="id"
      required
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
      {/* Campo: amount */}
          <GenericInput
  type="number"
  id="amount"
  name="amount"
  label={t('models.payment.fields.amount')}

  value={formData.amount?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.amount}
/>
      {/* Campo: date */}
          <GenericInput
  type="datetime-local"
  id="date"
  name="date"
  label={t('models.payment.fields.date')}

  value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.date}
/>
      {/* Campo: paymentMethod */}
          <div>
    <label htmlFor="paymentMethod" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.payment.fields.paymentMethod')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="paymentMethod"
      name="paymentMethod"
      options={[
        { id: 'CASH            // Efectivo', name: 'CASH            // Efectivo' },
        { id: 'BANK_TRANSFER   // Transferencia bancaria', name: 'BANK_TRANSFER   // Transferencia bancaria' },
        { id: 'CREDIT_CARD     // Tarjeta de crédito', name: 'CREDIT_CARD     // Tarjeta de crédito' },
        { id: 'SEPA_DIRECT_DEBIT // Domiciliación bancaria SEPA', name: 'SEPA_DIRECT_DEBIT // Domiciliación bancaria SEPA' },
        { id: 'CHECK           // Cheque', name: 'CHECK           // Cheque' },
        { id: 'OTHER           // Otro', name: 'OTHER           // Otro' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.paymentMethod || ''}
      onChange={(value) => handleSelectChange('paymentMethod', value)}
      required
      searchable
      error={fieldErrors.paymentMethod}
    />
    {fieldErrors.paymentMethod && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.paymentMethod}
      </div>
    )}
  </div>
      {/* Campo: notes */}
          <GenericInput
  type="text"
  id="notes"
  name="notes"
  label={t('models.payment.fields.notes')}

  value={formData.notes || ''}
  onChange={handleChange}
  
  error={fieldErrors.notes}
/>
      {/* Campo: sepaRemittance */}
          <div>
    <label htmlFor="sepaRemittanceId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.payment.fields.sepaRemittance')}    
    
    </label>
    <GenericSelect
      id="sepaRemittanceId"
      name="sepaRemittanceId"
      value={formData.sepaRemittanceId}
      onChange={(value) => handleSelectChange('sepaRemittanceId', parseInt(value))}
      url="/sepaRemittances"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.sepaRemittanceId}
    />
    {fieldErrors.sepaRemittanceId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.sepaRemittanceId}
      </div>
    )}
  </div>
      {/* Campo: accountingEntry */}
          <div>
    <label htmlFor="accountingEntryId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.payment.fields.accountingEntry')}    
    
    </label>
    <GenericSelect
      id="accountingEntryId"
      name="accountingEntryId"
      value={formData.accountingEntry?.id}
      onChange={(value) => handleSelectChange('accountingEntryId', parseInt(value))}
      url="/accountingEntrys"
      labelKey="nombre"
      valueKey="nombre"
      
      searchable
      error={fieldErrors.accountingEntryId}
    />
    {fieldErrors.accountingEntryId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.accountingEntryId}
      </div>
    )}
  </div>
      {/* Campo: recordedBy */}
          <div>
    <label htmlFor="recordedById" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.payment.fields.recordedBy')}    
    
    </label>
    <GenericSelect
      id="recordedById"
      name="recordedById"
      value={formData.recordedById}
      onChange={(value) => handleSelectChange('recordedById', parseInt(value))}
      url="/employees"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.recordedById}
    />
    {fieldErrors.recordedById && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.recordedById}
      </div>
    )}
  </div>
      {/* Campo: bankReference */}
          <GenericInput
  type="text"
  id="bankReference"
  name="bankReference"
  label={t('models.payment.fields.bankReference')}

  value={formData.bankReference || ''}
  onChange={handleChange}
  
  error={fieldErrors.bankReference}
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
  
  export default PaymentForm;