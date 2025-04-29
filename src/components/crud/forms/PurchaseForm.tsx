import React, { useState, useEffect } from 'react';
  import { Purchase, PurchaseInput, PurchaseService } from '@/services/purchase.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface PurchaseFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const PurchaseForm: React.FC<PurchaseFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      reference: '',
    supplierId: null,
    date: '',
    expectedDelivery: '',
    status: '',
    totalAmount: 0,
    notes: '',
    warehouseId: null,
    requesterId: null,
    approverId: null,
    receivedDate: '',
    deliveryNote: '',
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
      const data = await PurchaseService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.reference = data.reference;
      // Para relación supplier
          if (data.supplierId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.supplierId = data.supplierId;
          } else if (data.supplier) {
            // Si el API devuelve el objeto completo
            formattedData.supplierId = data.supplier.id || data.supplier;
          }
      if (data.date && (data.date instanceof Date || typeof data.date === 'string')) {
            formattedData.date = new Date(data.date).toISOString().substring(0, 10);
          } else {
            formattedData.date = data.date;
          }
      if (data.expectedDelivery && (data.expectedDelivery instanceof Date || typeof data.expectedDelivery === 'string')) {
            formattedData.expectedDelivery = new Date(data.expectedDelivery).toISOString().substring(0, 10);
          } else {
            formattedData.expectedDelivery = data.expectedDelivery;
          }
      // Para enum status
          formattedData.status = data.status;
      formattedData.totalAmount = data.totalAmount;
      formattedData.notes = data.notes;
      // Para relación warehouse
          if (data.warehouseId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.warehouseId = data.warehouseId;
          } else if (data.warehouse) {
            // Si el API devuelve el objeto completo
            formattedData.warehouseId = data.warehouse.id || data.warehouse;
          }
      // Para relación requester
          if (data.requesterId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.requesterId = data.requesterId;
          } else if (data.requester) {
            // Si el API devuelve el objeto completo
            formattedData.requesterId = data.requester.id || data.requester;
          }
      // Para relación approver
          if (data.approverId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.approverId = data.approverId;
          } else if (data.approver) {
            // Si el API devuelve el objeto completo
            formattedData.approverId = data.approver.id || data.approver;
          }
      if (data.receivedDate && (data.receivedDate instanceof Date || typeof data.receivedDate === 'string')) {
            formattedData.receivedDate = new Date(data.receivedDate).toISOString().substring(0, 10);
          } else {
            formattedData.receivedDate = data.receivedDate;
          }
      formattedData.deliveryNote = data.deliveryNote;
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
    if (!formData.supplierId) errors.supplierId = 'El campo supplier es requerido';
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
    if (formData.supplierId) {
        dataToSubmit.supplierId = formData.supplierId;
      }
    dataToSubmit.date = formData.date;
    dataToSubmit.expectedDelivery = formData.expectedDelivery;
    dataToSubmit.status = formData.status;
    dataToSubmit.totalAmount = formData.totalAmount;
    dataToSubmit.notes = formData.notes;
    if (formData.warehouseId) {
        dataToSubmit.warehouseId = formData.warehouseId;
      }
    if (formData.requesterId) {
        dataToSubmit.requesterId = formData.requesterId;
      }
    if (formData.approverId) {
        dataToSubmit.approverId = formData.approverId;
      }
    dataToSubmit.receivedDate = formData.receivedDate;
    dataToSubmit.deliveryNote = formData.deliveryNote;
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
          await PurchaseService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await PurchaseService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            reference: '',
        supplierId: null,
        date: '',
        expectedDelivery: '',
        status: '',
        totalAmount: 0,
        notes: '',
        warehouseId: null,
        requesterId: null,
        approverId: null,
        receivedDate: '',
        deliveryNote: '',
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.purchase.title')}
          
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
  label={t('models.purchase.fields.reference')}

  value={formData.reference || ''}
  onChange={handleChange}
  required
  error={fieldErrors.reference}
/>
      {/* Campo: supplier */}
          <div>
    <label htmlFor="supplierId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.purchase.fields.supplier')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="supplierId"
      name="supplierId"
      value={formData.supplierId}
      onChange={(value) => handleSelectChange('supplierId', parseInt(value))}
      url="/suppliers"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.supplierId}
    />
    {fieldErrors.supplierId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.supplierId}
      </div>
    )}
  </div>
      {/* Campo: date */}
          <GenericInput
  type="datetime-local"
  id="date"
  name="date"
  label={t('models.purchase.fields.date')}

  value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.date}
/>
      {/* Campo: expectedDelivery */}
          <GenericInput
  type="datetime-local"
  id="expectedDelivery"
  name="expectedDelivery"
  label={t('models.purchase.fields.expectedDelivery')}

  value={formData.expectedDelivery ? new Date(formData.expectedDelivery).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.expectedDelivery}
/>
      {/* Campo: status */}
          <div>
    <label htmlFor="status" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.purchase.fields.status')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="status"
      name="status"
      options={[
        { id: 'DRAFT           // Borrador', name: 'DRAFT           // Borrador' },
        { id: 'CONFIRMED       // Confirmada', name: 'CONFIRMED       // Confirmada' },
        { id: 'RECEIVED        // Recibida', name: 'RECEIVED        // Recibida' },
        { id: 'CANCELLED       // Cancelada', name: 'CANCELLED       // Cancelada' },
        { id: 'PARTIALLY_RECEIVED // Recibida parcialmente', name: 'PARTIALLY_RECEIVED // Recibida parcialmente' }
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
  label={t('models.purchase.fields.totalAmount')}

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
  label={t('models.purchase.fields.notes')}

  value={formData.notes || ''}
  onChange={handleChange}
  
  error={fieldErrors.notes}
/>
      {/* Campo: warehouse */}
          <div>
    <label htmlFor="warehouseId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.purchase.fields.warehouse')}    
    
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
      {/* Campo: requester */}
          <div>
    <label htmlFor="requesterId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.purchase.fields.requester')}    
    
    </label>
    <GenericSelect
      id="requesterId"
      name="requesterId"
      value={formData.requesterId}
      onChange={(value) => handleSelectChange('requesterId', parseInt(value))}
      url="/employees"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.requesterId}
    />
    {fieldErrors.requesterId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.requesterId}
      </div>
    )}
  </div>
      {/* Campo: approver */}
          <div>
    <label htmlFor="approverId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.purchase.fields.approver')}    
    
    </label>
    <GenericSelect
      id="approverId"
      name="approverId"
      value={formData.approverId}
      onChange={(value) => handleSelectChange('approverId', parseInt(value))}
      url="/employees"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.approverId}
    />
    {fieldErrors.approverId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.approverId}
      </div>
    )}
  </div>
      {/* Campo: receivedDate */}
          <GenericInput
  type="datetime-local"
  id="receivedDate"
  name="receivedDate"
  label={t('models.purchase.fields.receivedDate')}

  value={formData.receivedDate ? new Date(formData.receivedDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.receivedDate}
/>
      {/* Campo: deliveryNote */}
          <GenericInput
  type="text"
  id="deliveryNote"
  name="deliveryNote"
  label={t('models.purchase.fields.deliveryNote')}

  value={formData.deliveryNote || ''}
  onChange={handleChange}
  
  error={fieldErrors.deliveryNote}
/>
      {/* Campo: discountPercent */}
          <GenericInput
  type="number"
  id="discountPercent"
  name="discountPercent"
  label={t('models.purchase.fields.discountPercent')}

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
  
  export default PurchaseForm;