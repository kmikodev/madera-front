import React, { useState, useEffect } from 'react';
  import { ReturnOrderItem, ReturnOrderItemInput, ReturnOrderItemService } from '@/services/returnOrderItem.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface ReturnOrderItemFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const ReturnOrderItemForm: React.FC<ReturnOrderItemFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      returnOrderId: null,
    saleItemId: null,
    productId: null,
    quantity: 0,
    unitPrice: 0,
    total: 0,
    reason: '',
    condition: ''
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
      const data = await ReturnOrderItemService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación returnOrder
          if (data.returnOrderId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.returnOrderId = data.returnOrderId;
          } else if (data.returnOrder) {
            // Si el API devuelve el objeto completo
            formattedData.returnOrderId = data.returnOrder.id || data.returnOrder;
          }
      // Para relación saleItem
          if (data.saleItemId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.saleItemId = data.saleItemId;
          } else if (data.saleItem) {
            // Si el API devuelve el objeto completo
            formattedData.saleItemId = data.saleItem.id || data.saleItem;
          }
      // Para relación product
          if (data.productId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.productId = data.productId;
          } else if (data.product) {
            // Si el API devuelve el objeto completo
            formattedData.productId = data.product.id || data.product;
          }
      formattedData.quantity = data.quantity;
      formattedData.unitPrice = data.unitPrice;
      formattedData.total = data.total;
      formattedData.reason = data.reason;
      // Para enum condition
          formattedData.condition = data.condition;
      
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
      if (!formData.returnOrderId) errors.returnOrderId = 'El campo returnOrder es requerido';
    if (!formData.productId) errors.productId = 'El campo product es requerido';
    if (!formData.quantity) errors.quantity = 'El campo quantity es requerido';
    if (!formData.unitPrice) errors.unitPrice = 'El campo unitPrice es requerido';
    if (!formData.total) errors.total = 'El campo total es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.returnOrderId) {
        dataToSubmit.returnOrderId = formData.returnOrderId;
      }
    if (formData.saleItemId) {
        dataToSubmit.saleItemId = formData.saleItemId;
      }
    if (formData.productId) {
        dataToSubmit.productId = formData.productId;
      }
    dataToSubmit.quantity = formData.quantity;
    dataToSubmit.unitPrice = formData.unitPrice;
    dataToSubmit.total = formData.total;
    dataToSubmit.reason = formData.reason;
    dataToSubmit.condition = formData.condition;
      
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
          await ReturnOrderItemService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await ReturnOrderItemService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            returnOrderId: null,
        saleItemId: null,
        productId: null,
        quantity: 0,
        unitPrice: 0,
        total: 0,
        reason: '',
        condition: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.returnOrderItem.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: returnOrder */}
          <div>
    <label htmlFor="returnOrderId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.returnOrderItem.fields.returnOrder')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="returnOrderId"
      name="returnOrderId"
      value={formData.returnOrderId}
      onChange={(value) => handleSelectChange('returnOrderId', parseInt(value))}
      url="/returnOrders"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.returnOrderId}
    />
    {fieldErrors.returnOrderId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.returnOrderId}
      </div>
    )}
  </div>
      {/* Campo: saleItem */}
          <div>
    <label htmlFor="saleItemId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.returnOrderItem.fields.saleItem')}    
    
    </label>
    <GenericSelect
      id="saleItemId"
      name="saleItemId"
      value={formData.saleItemId}
      onChange={(value) => handleSelectChange('saleItemId', parseInt(value))}
      url="/saleItems"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.saleItemId}
    />
    {fieldErrors.saleItemId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.saleItemId}
      </div>
    )}
  </div>
      {/* Campo: product */}
          <div>
    <label htmlFor="productId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.returnOrderItem.fields.product')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="productId"
      name="productId"
      value={formData.productId}
      onChange={(value) => handleSelectChange('productId', parseInt(value))}
      url="/products"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.productId}
    />
    {fieldErrors.productId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.productId}
      </div>
    )}
  </div>
      {/* Campo: quantity */}
          <GenericInput
  type="number"
  id="quantity"
  name="quantity"
  label={t('models.returnOrderItem.fields.quantity')}

  value={formData.quantity?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.quantity}
/>
      {/* Campo: unitPrice */}
          <GenericInput
  type="number"
  id="unitPrice"
  name="unitPrice"
  label={t('models.returnOrderItem.fields.unitPrice')}

  value={formData.unitPrice?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.unitPrice}
/>
      {/* Campo: total */}
          <GenericInput
  type="number"
  id="total"
  name="total"
  label={t('models.returnOrderItem.fields.total')}

  value={formData.total?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.total}
/>
      {/* Campo: reason */}
          <GenericInput
  type="text"
  id="reason"
  name="reason"
  label={t('models.returnOrderItem.fields.reason')}

  value={formData.reason || ''}
  onChange={handleChange}
  
  error={fieldErrors.reason}
/>
      {/* Campo: condition */}
          <div>
    <label htmlFor="condition" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.returnOrderItem.fields.condition')}
      
    </label>
    <BaseSelect
      id="condition"
      name="condition"
      options={[
        { id: 'GOOD            // Buen estado', name: 'GOOD            // Buen estado' },
        { id: 'DAMAGED         // Dañado', name: 'DAMAGED         // Dañado' },
        { id: 'DEFECTIVE       // Defectuoso', name: 'DEFECTIVE       // Defectuoso' },
        { id: 'OPENED          // Abierto/usado', name: 'OPENED          // Abierto/usado' },
        { id: 'UNOPENED        // Sin abrir', name: 'UNOPENED        // Sin abrir' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.condition || ''}
      onChange={(value) => handleSelectChange('condition', value)}
      
      searchable
      error={fieldErrors.condition}
    />
    {fieldErrors.condition && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.condition}
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
  
  export default ReturnOrderItemForm;