import React, { useState, useEffect } from 'react';
  import { MaterialLocation, MaterialLocationInput, MaterialLocationService } from '@/services/materialLocation.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface MaterialLocationFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const MaterialLocationForm: React.FC<MaterialLocationFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      materialId: null,
    locationId: null,
    quantity: 0
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
      const data = await MaterialLocationService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación material
          if (data.materialId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.materialId = data.materialId;
          } else if (data.material) {
            // Si el API devuelve el objeto completo
            formattedData.materialId = data.material.id || data.material;
          }
      // Para relación location
          if (data.locationId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.locationId = data.locationId;
          } else if (data.location) {
            // Si el API devuelve el objeto completo
            formattedData.locationId = data.location.id || data.location;
          }
      formattedData.quantity = data.quantity;
      
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
      if (!formData.materialId) errors.materialId = 'El campo material es requerido';
    if (!formData.locationId) errors.locationId = 'El campo location es requerido';
    if (!formData.quantity) errors.quantity = 'El campo quantity es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.materialId) {
        dataToSubmit.materialId = formData.materialId;
      }
    if (formData.locationId) {
        dataToSubmit.locationId = formData.locationId;
      }
    dataToSubmit.quantity = formData.quantity;
      
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
          await MaterialLocationService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await MaterialLocationService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            materialId: null,
        locationId: null,
        quantity: 0
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.materialLocation.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: material */}
          <div>
    <label htmlFor="materialId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.materialLocation.fields.material')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="materialId"
      name="materialId"
      value={formData.materialId}
      onChange={(value) => handleSelectChange('materialId', parseInt(value))}
      url="/materials"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.materialId}
    />
    {fieldErrors.materialId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.materialId}
      </div>
    )}
  </div>
      {/* Campo: location */}
          <div>
    <label htmlFor="locationId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.materialLocation.fields.location')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="locationId"
      name="locationId"
      value={formData.locationId}
      onChange={(value) => handleSelectChange('locationId', parseInt(value))}
      url="/warehouseLocations"
      labelKey="id"
      valueKey="id"
      required
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
      {/* Campo: quantity */}
          <GenericInput
  type="number"
  id="quantity"
  name="quantity"
  label={t('models.materialLocation.fields.quantity')}

  value={formData.quantity?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.quantity}
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
  
  export default MaterialLocationForm;