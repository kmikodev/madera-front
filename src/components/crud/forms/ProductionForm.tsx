import React, { useState, useEffect } from 'react';
  import { Production, ProductionInput, ProductionService } from '@/services/production.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface ProductionFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const ProductionForm: React.FC<ProductionFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      reference: '',
    startDate: '',
    endDate: '',
    status: '',
    notes: '',
    warehouseId: null,
    responsibleId: null,
    laborCost: 0,
    overheadCost: 0,
    batchNumber: ''
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
      const data = await ProductionService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.reference = data.reference;
      if (data.startDate && (data.startDate instanceof Date || typeof data.startDate === 'string')) {
            formattedData.startDate = new Date(data.startDate).toISOString().substring(0, 10);
          } else {
            formattedData.startDate = data.startDate;
          }
      if (data.endDate && (data.endDate instanceof Date || typeof data.endDate === 'string')) {
            formattedData.endDate = new Date(data.endDate).toISOString().substring(0, 10);
          } else {
            formattedData.endDate = data.endDate;
          }
      // Para enum status
          formattedData.status = data.status;
      formattedData.notes = data.notes;
      // Para relación warehouse
          if (data.warehouseId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.warehouseId = data.warehouseId;
          } else if (data.warehouse) {
            // Si el API devuelve el objeto completo
            formattedData.warehouseId = data.warehouse.id || data.warehouse;
          }
      // Para relación responsible
          if (data.responsibleId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.responsibleId = data.responsibleId;
          } else if (data.responsible) {
            // Si el API devuelve el objeto completo
            formattedData.responsibleId = data.responsible.id || data.responsible;
          }
      formattedData.laborCost = data.laborCost;
      formattedData.overheadCost = data.overheadCost;
      formattedData.batchNumber = data.batchNumber;
      
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
    if (!formData.startDate) errors.startDate = 'El campo startDate es requerido';
    if (!formData.status) errors.status = 'El campo status es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.reference = formData.reference;
    dataToSubmit.startDate = formData.startDate;
    dataToSubmit.endDate = formData.endDate;
    dataToSubmit.status = formData.status;
    dataToSubmit.notes = formData.notes;
    if (formData.warehouseId) {
        dataToSubmit.warehouseId = formData.warehouseId;
      }
    if (formData.responsibleId) {
        dataToSubmit.responsibleId = formData.responsibleId;
      }
    dataToSubmit.laborCost = formData.laborCost;
    dataToSubmit.overheadCost = formData.overheadCost;
    dataToSubmit.batchNumber = formData.batchNumber;
      
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
          await ProductionService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await ProductionService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            reference: '',
        startDate: '',
        endDate: '',
        status: '',
        notes: '',
        warehouseId: null,
        responsibleId: null,
        laborCost: 0,
        overheadCost: 0,
        batchNumber: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.production.title')}
          
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
  label={t('models.production.fields.reference')}

  value={formData.reference || ''}
  onChange={handleChange}
  required
  error={fieldErrors.reference}
/>
      {/* Campo: startDate */}
          <GenericInput
  type="datetime-local"
  id="startDate"
  name="startDate"
  label={t('models.production.fields.startDate')}

  value={formData.startDate ? new Date(formData.startDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  required
  error={fieldErrors.startDate}
/>
      {/* Campo: endDate */}
          <GenericInput
  type="datetime-local"
  id="endDate"
  name="endDate"
  label={t('models.production.fields.endDate')}

  value={formData.endDate ? new Date(formData.endDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.endDate}
/>
      {/* Campo: status */}
          <div>
    <label htmlFor="status" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.production.fields.status')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="status"
      name="status"
      options={[
        { id: 'PLANNED         // Planificada', name: 'PLANNED         // Planificada' },
        { id: 'IN_PROGRESS     // En progreso', name: 'IN_PROGRESS     // En progreso' },
        { id: 'COMPLETED       // Completada', name: 'COMPLETED       // Completada' },
        { id: 'CANCELLED       // Cancelada', name: 'CANCELLED       // Cancelada' },
        { id: 'ON_HOLD         // En pausa', name: 'ON_HOLD         // En pausa' }
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
      {/* Campo: notes */}
          <GenericInput
  type="text"
  id="notes"
  name="notes"
  label={t('models.production.fields.notes')}

  value={formData.notes || ''}
  onChange={handleChange}
  
  error={fieldErrors.notes}
/>
      {/* Campo: warehouse */}
          <div>
    <label htmlFor="warehouseId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.production.fields.warehouse')}    
    
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
      {/* Campo: responsible */}
          <div>
    <label htmlFor="responsibleId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.production.fields.responsible')}    
    
    </label>
    <GenericSelect
      id="responsibleId"
      name="responsibleId"
      value={formData.responsibleId}
      onChange={(value) => handleSelectChange('responsibleId', parseInt(value))}
      url="/employees"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.responsibleId}
    />
    {fieldErrors.responsibleId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.responsibleId}
      </div>
    )}
  </div>
      {/* Campo: laborCost */}
          <GenericInput
  type="number"
  id="laborCost"
  name="laborCost"
  label={t('models.production.fields.laborCost')}

  value={formData.laborCost?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.laborCost}
/>
      {/* Campo: overheadCost */}
          <GenericInput
  type="number"
  id="overheadCost"
  name="overheadCost"
  label={t('models.production.fields.overheadCost')}

  value={formData.overheadCost?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.overheadCost}
/>
      {/* Campo: batchNumber */}
          <GenericInput
  type="text"
  id="batchNumber"
  name="batchNumber"
  label={t('models.production.fields.batchNumber')}

  value={formData.batchNumber || ''}
  onChange={handleChange}
  
  error={fieldErrors.batchNumber}
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
  
  export default ProductionForm;