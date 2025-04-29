import React, { useState, useEffect } from 'react';
  import { SaleItem, SaleItemInput, SaleItemService } from '@/services/saleItem.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface SaleItemFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const SaleItemForm: React.FC<SaleItemFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      saleId: null,
    productId: null,
    quantity: 0,
    unitPrice: 0,
    taxRate: 0,
    total: 0,
    deliveredQuantity: 0,
    locationId: null,
    discountPercent: 0,
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
      const data = await SaleItemService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación sale
          if (data.saleId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.saleId = data.saleId;
          } else if (data.sale) {
            // Si el API devuelve el objeto completo
            formattedData.saleId = data.sale.id || data.sale;
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
      formattedData.taxRate = data.taxRate;
      formattedData.total = data.total;
      formattedData.deliveredQuantity = data.deliveredQuantity;
      // Para relación location
          if (data.locationId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.locationId = data.locationId;
          } else if (data.location) {
            // Si el API devuelve el objeto completo
            formattedData.locationId = data.location.id || data.location;
          }
      formattedData.discountPercent = data.discountPercent;
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
      if (!formData.saleId) errors.saleId = 'El campo sale es requerido';
    if (!formData.productId) errors.productId = 'El campo product es requerido';
    if (!formData.quantity) errors.quantity = 'El campo quantity es requerido';
    if (!formData.unitPrice) errors.unitPrice = 'El campo unitPrice es requerido';
    if (!formData.taxRate) errors.taxRate = 'El campo taxRate es requerido';
    if (!formData.total) errors.total = 'El campo total es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.saleId) {
        dataToSubmit.saleId = formData.saleId;
      }
    if (formData.productId) {
        dataToSubmit.productId = formData.productId;
      }
    dataToSubmit.quantity = formData.quantity;
    dataToSubmit.unitPrice = formData.unitPrice;
    dataToSubmit.taxRate = formData.taxRate;
    dataToSubmit.total = formData.total;
    dataToSubmit.deliveredQuantity = formData.deliveredQuantity;
    if (formData.locationId) {
        dataToSubmit.locationId = formData.locationId;
      }
    dataToSubmit.discountPercent = formData.discountPercent;
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
          await SaleItemService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await SaleItemService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            saleId: null,
        productId: null,
        quantity: 0,
        unitPrice: 0,
        taxRate: 0,
        total: 0,
        deliveredQuantity: 0,
        locationId: null,
        discountPercent: 0,
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.saleItem.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: sale */}
          <div>
    <label htmlFor="saleId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.saleItem.fields.sale')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="saleId"
      name="saleId"
      value={formData.saleId}
      onChange={(value) => handleSelectChange('saleId', parseInt(value))}
      url="/sales"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.saleId}
    />
    {fieldErrors.saleId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.saleId}
      </div>
    )}
  </div>
      {/* Campo: product */}
          <div>
    <label htmlFor="productId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.saleItem.fields.product')}    
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
  label={t('models.saleItem.fields.quantity')}

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
  label={t('models.saleItem.fields.unitPrice')}

  value={formData.unitPrice?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.unitPrice}
/>
      {/* Campo: taxRate */}
          <GenericInput
  type="number"
  id="taxRate"
  name="taxRate"
  label={t('models.saleItem.fields.taxRate')}

  value={formData.taxRate?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.taxRate}
/>
      {/* Campo: total */}
          <GenericInput
  type="number"
  id="total"
  name="total"
  label={t('models.saleItem.fields.total')}

  value={formData.total?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.total}
/>
      {/* Campo: deliveredQuantity */}
          <GenericInput
  type="number"
  id="deliveredQuantity"
  name="deliveredQuantity"
  label={t('models.saleItem.fields.deliveredQuantity')}

  value={formData.deliveredQuantity?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.deliveredQuantity}
/>
      {/* Campo: location */}
          <div>
    <label htmlFor="locationId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.saleItem.fields.location')}    
    
    </label>
    <GenericSelect
      id="locationId"
      name="locationId"
      value={formData.locationId}
      onChange={(value) => handleSelectChange('locationId', parseInt(value))}
      url="/warehouseLocations"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.locationId}
    />
    {fieldErrors.locationId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.locationId}
      </div>
    )}
  </div>
      {/* Campo: discountPercent */}
          <GenericInput
  type="number"
  id="discountPercent"
  name="discountPercent"
  label={t('models.saleItem.fields.discountPercent')}

  value={formData.discountPercent?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.discountPercent}
/>
      {/* Campo: notes */}
          <GenericInput
  type="text"
  id="notes"
  name="notes"
  label={t('models.saleItem.fields.notes')}

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
  
  export default SaleItemForm;