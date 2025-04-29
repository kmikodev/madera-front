import React, { useState, useEffect } from 'react';
  import { SupplierAddress, SupplierAddressInput, SupplierAddressService } from '@/services/supplierAddress.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface SupplierAddressFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const SupplierAddressForm: React.FC<SupplierAddressFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      supplierId: null,
    addressType: '',
    street: '',
    city: '',
    postalCode: '',
    region: '',
    country: '',
    isDefault: false
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
      const data = await SupplierAddressService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación supplier
          if (data.supplierId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.supplierId = data.supplierId;
          } else if (data.supplier) {
            // Si el API devuelve el objeto completo
            formattedData.supplierId = data.supplier.id || data.supplier;
          }
      // Para enum addressType
          formattedData.addressType = data.addressType;
      formattedData.street = data.street;
      formattedData.city = data.city;
      formattedData.postalCode = data.postalCode;
      formattedData.region = data.region;
      formattedData.country = data.country;
      formattedData.isDefault = data.isDefault;
      
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
      if (!formData.supplierId) errors.supplierId = 'El campo supplier es requerido';
    if (!formData.street) errors.street = 'El campo street es requerido';
    if (!formData.city) errors.city = 'El campo city es requerido';
    if (!formData.postalCode) errors.postalCode = 'El campo postalCode es requerido';
    if (!formData.country) errors.country = 'El campo country es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.supplierId) {
        dataToSubmit.supplierId = formData.supplierId;
      }
    dataToSubmit.addressType = formData.addressType;
    dataToSubmit.street = formData.street;
    dataToSubmit.city = formData.city;
    dataToSubmit.postalCode = formData.postalCode;
    dataToSubmit.region = formData.region;
    dataToSubmit.country = formData.country;
    dataToSubmit.isDefault = formData.isDefault;
      
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
          await SupplierAddressService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await SupplierAddressService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            supplierId: null,
        addressType: '',
        street: '',
        city: '',
        postalCode: '',
        region: '',
        country: '',
        isDefault: false
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.supplierAddress.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: supplier */}
          <div>
    <label htmlFor="supplierId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.supplierAddress.fields.supplier')}    
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
      {/* Campo: addressType */}
          <div>
    <label htmlFor="addressType" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.supplierAddress.fields.addressType')}
      
    </label>
    <BaseSelect
      id="addressType"
      name="addressType"
      options={[
        { id: 'BILLING         // Facturación', name: 'BILLING         // Facturación' },
        { id: 'SHIPPING        // Envío', name: 'SHIPPING        // Envío' },
        { id: 'BOTH            // Ambos propósitos', name: 'BOTH            // Ambos propósitos' },
        { id: 'MAIN            // Principal (genérico)', name: 'MAIN            // Principal (genérico)' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.addressType || ''}
      onChange={(value) => handleSelectChange('addressType', value)}
      
      searchable
      error={fieldErrors.addressType}
    />
    {fieldErrors.addressType && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.addressType}
      </div>
    )}
  </div>
      {/* Campo: street */}
          <GenericInput
  type="text"
  id="street"
  name="street"
  label={t('models.supplierAddress.fields.street')}

  value={formData.street || ''}
  onChange={handleChange}
  required
  error={fieldErrors.street}
/>
      {/* Campo: city */}
          <GenericInput
  type="text"
  id="city"
  name="city"
  label={t('models.supplierAddress.fields.city')}

  value={formData.city || ''}
  onChange={handleChange}
  required
  error={fieldErrors.city}
/>
      {/* Campo: postalCode */}
          <GenericInput
  type="text"
  id="postalCode"
  name="postalCode"
  label={t('models.supplierAddress.fields.postalCode')}

  value={formData.postalCode || ''}
  onChange={handleChange}
  required
  error={fieldErrors.postalCode}
/>
      {/* Campo: region */}
          <GenericInput
  type="text"
  id="region"
  name="region"
  label={t('models.supplierAddress.fields.region')}

  value={formData.region || ''}
  onChange={handleChange}
  
  error={fieldErrors.region}
/>
      {/* Campo: country */}
          <GenericInput
  type="text"
  id="country"
  name="country"
  label={t('models.supplierAddress.fields.country')}

  value={formData.country || ''}
  onChange={handleChange}
  required
  error={fieldErrors.country}
/>
      {/* Campo: isDefault */}
          <GenericCheckbox
  id="isDefault"
  name="isDefault"
  label="Is Default"
  checked={!!formData.isDefault}
  onChange={handleChange}
  
  error={fieldErrors.isDefault}
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
  
  export default SupplierAddressForm;