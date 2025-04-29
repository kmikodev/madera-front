import React, { useState, useEffect } from 'react';
  import { Invoice, InvoiceInput, InvoiceService } from '@/services/invoice.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface InvoiceFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const InvoiceForm: React.FC<InvoiceFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      invoiceNumber: '',
    invoiceType: '',
    date: '',
    dueDate: '',
    status: '',
    totalBase: 0,
    totalTax: 0,
    totalAmount: 0,
    notes: '',
    accountingEntryId: null,
    aeatSubmitted: false,
    aeatSubmissionDate: '',
    aeatSubmissionId: '',
    fiscalYearId: null,
    creatorId: null,
    creditNote: false,
    originalInvoiceId: null
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
      const data = await InvoiceService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.invoiceNumber = data.invoiceNumber;
      // Para enum invoiceType
          formattedData.invoiceType = data.invoiceType;
      if (data.date && (data.date instanceof Date || typeof data.date === 'string')) {
            formattedData.date = new Date(data.date).toISOString().substring(0, 10);
          } else {
            formattedData.date = data.date;
          }
      if (data.dueDate && (data.dueDate instanceof Date || typeof data.dueDate === 'string')) {
            formattedData.dueDate = new Date(data.dueDate).toISOString().substring(0, 10);
          } else {
            formattedData.dueDate = data.dueDate;
          }
      // Para enum status
          formattedData.status = data.status;
      formattedData.totalBase = data.totalBase;
      formattedData.totalTax = data.totalTax;
      formattedData.totalAmount = data.totalAmount;
      formattedData.notes = data.notes;
      // Para relación accountingEntry
          if (data.accountingEntryId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.accountingEntryId = data.accountingEntryId;
          } else if (data.accountingEntry) {
            // Si el API devuelve el objeto completo
            formattedData.accountingEntryId = data.accountingEntry.id || data.accountingEntry;
          }
      formattedData.aeatSubmitted = data.aeatSubmitted;
      if (data.aeatSubmissionDate && (data.aeatSubmissionDate instanceof Date || typeof data.aeatSubmissionDate === 'string')) {
            formattedData.aeatSubmissionDate = new Date(data.aeatSubmissionDate).toISOString().substring(0, 10);
          } else {
            formattedData.aeatSubmissionDate = data.aeatSubmissionDate;
          }
      formattedData.aeatSubmissionId = data.aeatSubmissionId;
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
      formattedData.creditNote = data.creditNote;
      // Para relación originalInvoice
          if (data.originalInvoiceId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.originalInvoiceId = data.originalInvoiceId;
          } else if (data.originalInvoice) {
            // Si el API devuelve el objeto completo
            formattedData.originalInvoiceId = data.originalInvoice.id || data.originalInvoice;
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
      if (!formData.invoiceNumber) errors.invoiceNumber = 'El campo invoiceNumber es requerido';
    if (!formData.invoiceType) errors.invoiceType = 'El campo invoiceType es requerido';
    if (!formData.date) errors.date = 'El campo date es requerido';
    if (!formData.dueDate) errors.dueDate = 'El campo dueDate es requerido';
    if (!formData.status) errors.status = 'El campo status es requerido';
    if (!formData.totalBase) errors.totalBase = 'El campo totalBase es requerido';
    if (!formData.totalTax) errors.totalTax = 'El campo totalTax es requerido';
    if (!formData.totalAmount) errors.totalAmount = 'El campo totalAmount es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.invoiceNumber = formData.invoiceNumber;
    dataToSubmit.invoiceType = formData.invoiceType;
    dataToSubmit.date = formData.date;
    dataToSubmit.dueDate = formData.dueDate;
    dataToSubmit.status = formData.status;
    dataToSubmit.totalBase = formData.totalBase;
    dataToSubmit.totalTax = formData.totalTax;
    dataToSubmit.totalAmount = formData.totalAmount;
    dataToSubmit.notes = formData.notes;
    if (formData.accountingEntryId) {
        dataToSubmit.accountingEntryId = formData.accountingEntryId;
      }
    dataToSubmit.aeatSubmitted = formData.aeatSubmitted;
    dataToSubmit.aeatSubmissionDate = formData.aeatSubmissionDate;
    dataToSubmit.aeatSubmissionId = formData.aeatSubmissionId;
    if (formData.fiscalYearId) {
        dataToSubmit.fiscalYearId = formData.fiscalYearId;
      }
    if (formData.creatorId) {
        dataToSubmit.creatorId = formData.creatorId;
      }
    dataToSubmit.creditNote = formData.creditNote;
    if (formData.originalInvoiceId) {
        dataToSubmit.originalInvoiceId = formData.originalInvoiceId;
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
          await InvoiceService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await InvoiceService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            invoiceNumber: '',
        invoiceType: '',
        date: '',
        dueDate: '',
        status: '',
        totalBase: 0,
        totalTax: 0,
        totalAmount: 0,
        notes: '',
        accountingEntryId: null,
        aeatSubmitted: false,
        aeatSubmissionDate: '',
        aeatSubmissionId: '',
        fiscalYearId: null,
        creatorId: null,
        creditNote: false,
        originalInvoiceId: null
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.invoice.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: invoiceNumber */}
          <GenericInput
  type="text"
  id="invoiceNumber"
  name="invoiceNumber"
  label={t('models.invoice.fields.invoiceNumber')}

  value={formData.invoiceNumber || ''}
  onChange={handleChange}
  required
  error={fieldErrors.invoiceNumber}
/>
      {/* Campo: invoiceType */}
          <div>
    <label htmlFor="invoiceType" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.invoice.fields.invoiceType')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="invoiceType"
      name="invoiceType"
      options={[
        { id: 'PURCHASE        // Factura de compra', name: 'PURCHASE        // Factura de compra' },
        { id: 'SALE            // Factura de venta', name: 'SALE            // Factura de venta' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.invoiceType || ''}
      onChange={(value) => handleSelectChange('invoiceType', value)}
      required
      searchable
      error={fieldErrors.invoiceType}
    />
    {fieldErrors.invoiceType && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.invoiceType}
      </div>
    )}
  </div>
      {/* Campo: date */}
          <GenericInput
  type="datetime-local"
  id="date"
  name="date"
  label={t('models.invoice.fields.date')}

  value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.date}
/>
      {/* Campo: dueDate */}
          <GenericInput
  type="datetime-local"
  id="dueDate"
  name="dueDate"
  label={t('models.invoice.fields.dueDate')}

  value={formData.dueDate ? new Date(formData.dueDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.dueDate}
/>
      {/* Campo: status */}
          <div>
    <label htmlFor="status" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.invoice.fields.status')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="status"
      name="status"
      options={[
        { id: 'DRAFT           // Borrador', name: 'DRAFT           // Borrador' },
        { id: 'CONFIRMED       // Confirmada', name: 'CONFIRMED       // Confirmada' },
        { id: 'PAID            // Pagada', name: 'PAID            // Pagada' },
        { id: 'PARTIALLY_PAID  // Parcialmente pagada', name: 'PARTIALLY_PAID  // Parcialmente pagada' },
        { id: 'CANCELLED       // Cancelada', name: 'CANCELLED       // Cancelada' },
        { id: 'OVERDUE         // Vencida', name: 'OVERDUE         // Vencida' }
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
      {/* Campo: totalBase */}
          <GenericInput
  type="number"
  id="totalBase"
  name="totalBase"
  label={t('models.invoice.fields.totalBase')}

  value={formData.totalBase?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.totalBase}
/>
      {/* Campo: totalTax */}
          <GenericInput
  type="number"
  id="totalTax"
  name="totalTax"
  label={t('models.invoice.fields.totalTax')}

  value={formData.totalTax?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.totalTax}
/>
      {/* Campo: totalAmount */}
          <GenericInput
  type="number"
  id="totalAmount"
  name="totalAmount"
  label={t('models.invoice.fields.totalAmount')}

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
  label={t('models.invoice.fields.notes')}

  value={formData.notes || ''}
  onChange={handleChange}
  
  error={fieldErrors.notes}
/>
      {/* Campo: accountingEntry */}
          <div>
    <label htmlFor="accountingEntryId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.invoice.fields.accountingEntry')}    
    
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
      {/* Campo: aeatSubmitted */}
          <GenericCheckbox
  id="aeatSubmitted"
  name="aeatSubmitted"
  label="Aeat Submitted"
  checked={!!formData.aeatSubmitted}
  onChange={handleChange}
  
  error={fieldErrors.aeatSubmitted}
/>
      {/* Campo: aeatSubmissionDate */}
          <GenericInput
  type="datetime-local"
  id="aeatSubmissionDate"
  name="aeatSubmissionDate"
  label={t('models.invoice.fields.aeatSubmissionDate')}

  value={formData.aeatSubmissionDate ? new Date(formData.aeatSubmissionDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.aeatSubmissionDate}
/>
      {/* Campo: aeatSubmissionId */}
          <GenericInput
  type="text"
  id="aeatSubmissionId"
  name="aeatSubmissionId"
  label={t('models.invoice.fields.aeatSubmissionId')}

  value={formData.aeatSubmissionId || ''}
  onChange={handleChange}
  
  error={fieldErrors.aeatSubmissionId}
/>
      {/* Campo: fiscalYear */}
          <div>
    <label htmlFor="fiscalYearId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.invoice.fields.fiscalYear')}    
    
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
      {t('models.invoice.fields.creator')}    
    
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
      {/* Campo: creditNote */}
          <GenericCheckbox
  id="creditNote"
  name="creditNote"
  label="Credit Note"
  checked={!!formData.creditNote}
  onChange={handleChange}
  
  error={fieldErrors.creditNote}
/>
      {/* Campo: originalInvoice */}
          <div>
    <label htmlFor="originalInvoiceId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.invoice.fields.originalInvoice')}    
    
    </label>
    <GenericSelect
      id="originalInvoiceId"
      name="originalInvoiceId"
      value={formData.originalInvoiceId}
      onChange={(value) => handleSelectChange('originalInvoiceId', parseInt(value))}
      url="/invoices"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.originalInvoiceId}
    />
    {fieldErrors.originalInvoiceId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.originalInvoiceId}
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
  
  export default InvoiceForm;