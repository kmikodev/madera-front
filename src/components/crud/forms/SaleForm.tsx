import React, { useState, useEffect } from 'react';
  import { Sale, SaleInput, SaleService } from '@/services/sale.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface SaleFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const SaleForm: React.FC<SaleFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      reference: '',
    customerId: null,
    date: '',
    deliveryDate: '',
    status: '',
    totalAmount: 0,
    notes: '',
    fromQuotationId: null,
    quotationId: 0,
    warehouseId: null,
    salesRepId: null,
    deliveryAddress: '',
    shippingMethod: '',
    paymentMethod: '',
    discountPercent: 0,
    deliveryNote: ''
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
      const data = await SaleService.getById(id!);
      
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
      if (data.deliveryDate && (data.deliveryDate instanceof Date || typeof data.deliveryDate === 'string')) {
            formattedData.deliveryDate = new Date(data.deliveryDate).toISOString().substring(0, 10);
          } else {
            formattedData.deliveryDate = data.deliveryDate;
          }
      // Para enum status
          formattedData.status = data.status;
      formattedData.totalAmount = data.totalAmount;
      formattedData.notes = data.notes;
      // Para relación fromQuotation
          if (data.fromQuotationId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.fromQuotationId = data.fromQuotationId;
          } else if (data.fromQuotation) {
            // Si el API devuelve el objeto completo
            formattedData.fromQuotationId = data.fromQuotation.id || data.fromQuotation;
          }
      formattedData.quotationId = data.quotationId;
      // Para relación warehouse
          if (data.warehouseId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.warehouseId = data.warehouseId;
          } else if (data.warehouse) {
            // Si el API devuelve el objeto completo
            formattedData.warehouseId = data.warehouse.id || data.warehouse;
          }
      // Para relación salesRep
          if (data.salesRepId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.salesRepId = data.salesRepId;
          } else if (data.salesRep) {
            // Si el API devuelve el objeto completo
            formattedData.salesRepId = data.salesRep.id || data.salesRep;
          }
      formattedData.deliveryAddress = data.deliveryAddress;
      formattedData.shippingMethod = data.shippingMethod;
      // Para enum paymentMethod
          formattedData.paymentMethod = data.paymentMethod;
      formattedData.discountPercent = data.discountPercent;
      formattedData.deliveryNote = data.deliveryNote;
      
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
    dataToSubmit.deliveryDate = formData.deliveryDate;
    dataToSubmit.status = formData.status;
    dataToSubmit.totalAmount = formData.totalAmount;
    dataToSubmit.notes = formData.notes;
    if (formData.fromQuotationId) {
        dataToSubmit.fromQuotationId = formData.fromQuotationId;
      }
    dataToSubmit.quotationId = formData.quotationId;
    if (formData.warehouseId) {
        dataToSubmit.warehouseId = formData.warehouseId;
      }
    if (formData.salesRepId) {
        dataToSubmit.salesRepId = formData.salesRepId;
      }
    dataToSubmit.deliveryAddress = formData.deliveryAddress;
    dataToSubmit.shippingMethod = formData.shippingMethod;
    dataToSubmit.paymentMethod = formData.paymentMethod;
    dataToSubmit.discountPercent = formData.discountPercent;
    dataToSubmit.deliveryNote = formData.deliveryNote;
      
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
          await SaleService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await SaleService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            reference: '',
        customerId: null,
        date: '',
        deliveryDate: '',
        status: '',
        totalAmount: 0,
        notes: '',
        fromQuotationId: null,
        quotationId: 0,
        warehouseId: null,
        salesRepId: null,
        deliveryAddress: '',
        shippingMethod: '',
        paymentMethod: '',
        discountPercent: 0,
        deliveryNote: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.sale.title')}
          
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
  label={t('models.sale.fields.reference')}

  value={formData.reference || ''}
  onChange={handleChange}
  required
  error={fieldErrors.reference}
/>
      {/* Campo: customer */}
          <div>
    <label htmlFor="customerId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.sale.fields.customer')}    
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
  label={t('models.sale.fields.date')}

  value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.date}
/>
      {/* Campo: deliveryDate */}
          <GenericInput
  type="datetime-local"
  id="deliveryDate"
  name="deliveryDate"
  label={t('models.sale.fields.deliveryDate')}

  value={formData.deliveryDate ? new Date(formData.deliveryDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.deliveryDate}
/>
      {/* Campo: status */}
          <div>
    <label htmlFor="status" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.sale.fields.status')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="status"
      name="status"
      options={[
        { id: 'DRAFT           // Borrador', name: 'DRAFT           // Borrador' },
        { id: 'CONFIRMED       // Confirmada', name: 'CONFIRMED       // Confirmada' },
        { id: 'DELIVERED       // Entregada', name: 'DELIVERED       // Entregada' },
        { id: 'CANCELLED       // Cancelada', name: 'CANCELLED       // Cancelada' },
        { id: 'PARTIALLY_DELIVERED // Entregada parcialmente', name: 'PARTIALLY_DELIVERED // Entregada parcialmente' },
        { id: 'INVOICED        // Facturada', name: 'INVOICED        // Facturada' },
        { id: 'RETURNED        // Devuelta', name: 'RETURNED        // Devuelta' }
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
  label={t('models.sale.fields.totalAmount')}

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
  label={t('models.sale.fields.notes')}

  value={formData.notes || ''}
  onChange={handleChange}
  
  error={fieldErrors.notes}
/>
      {/* Campo: fromQuotation */}
          <div>
    <label htmlFor="fromQuotationId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.sale.fields.fromQuotation')}    
    
    </label>
    <GenericSelect
      id="fromQuotationId"
      name="fromQuotationId"
      value={formData.fromQuotation?.id}
      onChange={(value) => handleSelectChange('fromQuotationId', parseInt(value))}
      url="/quotations"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.fromQuotationId}
    />
    {fieldErrors.fromQuotationId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.fromQuotationId}
      </div>
    )}
  </div>
      {/* Campo: quotationId */}
          <GenericInput
  type="number"
  id="quotationId"
  name="quotationId"
  label={t('models.sale.fields.quotationId')}

  value={formData.quotationId?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.quotationId}
/>
      {/* Campo: warehouse */}
          <div>
    <label htmlFor="warehouseId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.sale.fields.warehouse')}    
    
    </label>
    <GenericSelect
      id="warehouseId"
      name="warehouseId"
      value={formData.warehouseId}
      onChange={(value) => handleSelectChange('warehouseId', parseInt(value))}
      url="/warehouses"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.warehouseId}
    />
    {fieldErrors.warehouseId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.warehouseId}
      </div>
    )}
  </div>
      {/* Campo: salesRep */}
          <div>
    <label htmlFor="salesRepId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.sale.fields.salesRep')}    
    
    </label>
    <GenericSelect
      id="salesRepId"
      name="salesRepId"
      value={formData.salesRepId}
      onChange={(value) => handleSelectChange('salesRepId', parseInt(value))}
      url="/employees"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.salesRepId}
    />
    {fieldErrors.salesRepId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.salesRepId}
      </div>
    )}
  </div>
      {/* Campo: deliveryAddress */}
          <GenericInput
  type="text"
  id="deliveryAddress"
  name="deliveryAddress"
  label={t('models.sale.fields.deliveryAddress')}

  value={formData.deliveryAddress || ''}
  onChange={handleChange}
  
  error={fieldErrors.deliveryAddress}
/>
      {/* Campo: shippingMethod */}
          <GenericInput
  type="text"
  id="shippingMethod"
  name="shippingMethod"
  label={t('models.sale.fields.shippingMethod')}

  value={formData.shippingMethod || ''}
  onChange={handleChange}
  
  error={fieldErrors.shippingMethod}
/>
      {/* Campo: paymentMethod */}
          <div>
    <label htmlFor="paymentMethod" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.sale.fields.paymentMethod')}
      
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
      {/* Campo: discountPercent */}
          <GenericInput
  type="number"
  id="discountPercent"
  name="discountPercent"
  label={t('models.sale.fields.discountPercent')}

  value={formData.discountPercent?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.discountPercent}
/>
      {/* Campo: deliveryNote */}
          <GenericInput
  type="text"
  id="deliveryNote"
  name="deliveryNote"
  label={t('models.sale.fields.deliveryNote')}

  value={formData.deliveryNote || ''}
  onChange={handleChange}
  
  error={fieldErrors.deliveryNote}
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
  
  export default SaleForm;