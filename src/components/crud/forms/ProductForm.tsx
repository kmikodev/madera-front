import React, { useState, useEffect } from 'react';
  import { Product, ProductInput, ProductService } from '@/services/product.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface ProductFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const ProductForm: React.FC<ProductFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      code: '',
    name: '',
    description: '',
    unitOfMeasure: '',
    stockQuantity: 0,
    minStockLevel: 0,
    retailPrice: 0,
    wholesalePrice: 0,
    costPrice: 0,
    taxRate: 0,
    active: false,
    deletedAt: '',
    categoryId: null,
    barcode: '',
    weight: 0,
    dimensions: ''
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
      const data = await ProductService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.code = data.code;
      formattedData.name = data.name;
      formattedData.description = data.description;
      formattedData.unitOfMeasure = data.unitOfMeasure;
      formattedData.stockQuantity = data.stockQuantity;
      formattedData.minStockLevel = data.minStockLevel;
      formattedData.retailPrice = data.retailPrice;
      formattedData.wholesalePrice = data.wholesalePrice;
      formattedData.costPrice = data.costPrice;
      formattedData.taxRate = data.taxRate;
      formattedData.active = data.active;
      if (data.deletedAt && (data.deletedAt instanceof Date || typeof data.deletedAt === 'string')) {
            formattedData.deletedAt = new Date(data.deletedAt).toISOString().substring(0, 10);
          } else {
            formattedData.deletedAt = data.deletedAt;
          }
      // Para relación category
          if (data.categoryId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.categoryId = data.categoryId;
          } else if (data.category) {
            // Si el API devuelve el objeto completo
            formattedData.categoryId = data.category.id || data.category;
          }
      formattedData.barcode = data.barcode;
      formattedData.weight = data.weight;
      formattedData.dimensions = data.dimensions;
      
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
      if (!formData.code) errors.code = 'El campo code es requerido';
    if (!formData.name) errors.name = 'El campo name es requerido';
    if (!formData.stockQuantity) errors.stockQuantity = 'El campo stockQuantity es requerido';
    if (!formData.minStockLevel) errors.minStockLevel = 'El campo minStockLevel es requerido';
    if (!formData.retailPrice) errors.retailPrice = 'El campo retailPrice es requerido';
    if (!formData.wholesalePrice) errors.wholesalePrice = 'El campo wholesalePrice es requerido';
    if (!formData.costPrice) errors.costPrice = 'El campo costPrice es requerido';
    if (!formData.taxRate) errors.taxRate = 'El campo taxRate es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.code = formData.code;
    dataToSubmit.name = formData.name;
    dataToSubmit.description = formData.description;
    dataToSubmit.unitOfMeasure = formData.unitOfMeasure;
    dataToSubmit.stockQuantity = formData.stockQuantity;
    dataToSubmit.minStockLevel = formData.minStockLevel;
    dataToSubmit.retailPrice = formData.retailPrice;
    dataToSubmit.wholesalePrice = formData.wholesalePrice;
    dataToSubmit.costPrice = formData.costPrice;
    dataToSubmit.taxRate = formData.taxRate;
    dataToSubmit.active = formData.active;
    dataToSubmit.deletedAt = formData.deletedAt;
    if (formData.categoryId) {
        dataToSubmit.categoryId = formData.categoryId;
      }
    dataToSubmit.barcode = formData.barcode;
    dataToSubmit.weight = formData.weight;
    dataToSubmit.dimensions = formData.dimensions;
      
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
          await ProductService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await ProductService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            code: '',
        name: '',
        description: '',
        unitOfMeasure: '',
        stockQuantity: 0,
        minStockLevel: 0,
        retailPrice: 0,
        wholesalePrice: 0,
        costPrice: 0,
        taxRate: 0,
        active: false,
        deletedAt: '',
        categoryId: null,
        barcode: '',
        weight: 0,
        dimensions: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.product.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: code */}
          <GenericInput
  type="text"
  id="code"
  name="code"
  label={t('models.product.fields.code')}

  value={formData.code || ''}
  onChange={handleChange}
  required
  error={fieldErrors.code}
/>
      {/* Campo: name */}
          <GenericInput
  type="text"
  id="name"
  name="name"
  label={t('models.product.fields.name')}

  value={formData.name || ''}
  onChange={handleChange}
  required
  error={fieldErrors.name}
/>
      {/* Campo: description */}
          <GenericInput
  type="text"
  id="description"
  name="description"
  label={t('models.product.fields.description')}

  value={formData.description || ''}
  onChange={handleChange}
  
  error={fieldErrors.description}
/>
      {/* Campo: unitOfMeasure */}
          <GenericInput
  type="text"
  id="unitOfMeasure"
  name="unitOfMeasure"
  label={t('models.product.fields.unitOfMeasure')}

  value={formData.unitOfMeasure || ''}
  onChange={handleChange}
  
  error={fieldErrors.unitOfMeasure}
/>
      {/* Campo: stockQuantity */}
          <GenericInput
  type="number"
  id="stockQuantity"
  name="stockQuantity"
  label={t('models.product.fields.stockQuantity')}

  value={formData.stockQuantity?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.stockQuantity}
/>
      {/* Campo: minStockLevel */}
          <GenericInput
  type="number"
  id="minStockLevel"
  name="minStockLevel"
  label={t('models.product.fields.minStockLevel')}

  value={formData.minStockLevel?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.minStockLevel}
/>
      {/* Campo: retailPrice */}
          <GenericInput
  type="number"
  id="retailPrice"
  name="retailPrice"
  label={t('models.product.fields.retailPrice')}

  value={formData.retailPrice?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.retailPrice}
/>
      {/* Campo: wholesalePrice */}
          <GenericInput
  type="number"
  id="wholesalePrice"
  name="wholesalePrice"
  label={t('models.product.fields.wholesalePrice')}

  value={formData.wholesalePrice?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.wholesalePrice}
/>
      {/* Campo: costPrice */}
          <GenericInput
  type="number"
  id="costPrice"
  name="costPrice"
  label={t('models.product.fields.costPrice')}

  value={formData.costPrice?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.costPrice}
/>
      {/* Campo: taxRate */}
          <GenericInput
  type="number"
  id="taxRate"
  name="taxRate"
  label={t('models.product.fields.taxRate')}

  value={formData.taxRate?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.taxRate}
/>
      {/* Campo: active */}
          <GenericCheckbox
  id="active"
  name="active"
  label="Active"
  checked={!!formData.active}
  onChange={handleChange}
  
  error={fieldErrors.active}
/>
      {/* Campo: deletedAt */}
          <GenericInput
  type="datetime-local"
  id="deletedAt"
  name="deletedAt"
  label={t('models.product.fields.deletedAt')}

  value={formData.deletedAt ? new Date(formData.deletedAt).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.deletedAt}
/>
      {/* Campo: category */}
          <div>
    <label htmlFor="categoryId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.product.fields.category')}    
    
    </label>
    <GenericSelect
      id="categoryId"
      name="categoryId"
      value={formData.categoryId}
      onChange={(value) => handleSelectChange('categoryId', parseInt(value))}
      url="/productCategorys"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.categoryId}
    />
    {fieldErrors.categoryId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.categoryId}
      </div>
    )}
  </div>
      {/* Campo: barcode */}
          <GenericInput
  type="text"
  id="barcode"
  name="barcode"
  label={t('models.product.fields.barcode')}

  value={formData.barcode || ''}
  onChange={handleChange}
  
  error={fieldErrors.barcode}
/>
      {/* Campo: weight */}
          <GenericInput
  type="number"
  id="weight"
  name="weight"
  label={t('models.product.fields.weight')}

  value={formData.weight?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.weight}
/>
      {/* Campo: dimensions */}
          <GenericInput
  type="text"
  id="dimensions"
  name="dimensions"
  label={t('models.product.fields.dimensions')}

  value={formData.dimensions || ''}
  onChange={handleChange}
  
  error={fieldErrors.dimensions}
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
  
  export default ProductForm;