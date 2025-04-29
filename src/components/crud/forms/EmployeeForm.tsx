import React, { useState, useEffect } from 'react';
  import { Employee, EmployeeInput, EmployeeService } from '@/services/employee.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface EmployeeFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const EmployeeForm: React.FC<EmployeeFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      nif: '',
    address: '',
    phone: '',
    position: '',
    salary: 0,
    hireDate: '',
    userId: null,
    warehouseId: null,
    department: '',
    emergencyContact: ''
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
      const data = await EmployeeService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.nif = data.nif;
      formattedData.address = data.address;
      formattedData.phone = data.phone;
      formattedData.position = data.position;
      formattedData.salary = data.salary;
      if (data.hireDate && (data.hireDate instanceof Date || typeof data.hireDate === 'string')) {
            formattedData.hireDate = new Date(data.hireDate).toISOString().substring(0, 10);
          } else {
            formattedData.hireDate = data.hireDate;
          }
      // Para relación user
          if (data.userId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.userId = data.userId;
          } else if (data.user) {
            // Si el API devuelve el objeto completo
            formattedData.userId = data.user.id || data.user;
          }
      // Para relación warehouse
          if (data.warehouseId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.warehouseId = data.warehouseId;
          } else if (data.warehouse) {
            // Si el API devuelve el objeto completo
            formattedData.warehouseId = data.warehouse.id || data.warehouse;
          }
      formattedData.department = data.department;
      formattedData.emergencyContact = data.emergencyContact;
      
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
      if (!formData.nif) errors.nif = 'El campo nif es requerido';
    if (!formData.userId) errors.userId = 'El campo user es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.nif = formData.nif;
    dataToSubmit.address = formData.address;
    dataToSubmit.phone = formData.phone;
    dataToSubmit.position = formData.position;
    dataToSubmit.salary = formData.salary;
    dataToSubmit.hireDate = formData.hireDate;
    if (formData.userId) {
        dataToSubmit.userId = formData.userId;
      }
    if (formData.warehouseId) {
        dataToSubmit.warehouseId = formData.warehouseId;
      }
    dataToSubmit.department = formData.department;
    dataToSubmit.emergencyContact = formData.emergencyContact;
      
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
          await EmployeeService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await EmployeeService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            nif: '',
        address: '',
        phone: '',
        position: '',
        salary: 0,
        hireDate: '',
        userId: null,
        warehouseId: null,
        department: '',
        emergencyContact: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.employee.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: nif */}
          <GenericInput
  type="text"
  id="nif"
  name="nif"
  label={t('models.employee.fields.nif')}

  value={formData.nif || ''}
  onChange={handleChange}
  required
  error={fieldErrors.nif}
/>
      {/* Campo: address */}
          <GenericInput
  type="text"
  id="address"
  name="address"
  label={t('models.employee.fields.address')}

  value={formData.address || ''}
  onChange={handleChange}
  
  error={fieldErrors.address}
/>
      {/* Campo: phone */}
          <GenericInput
  type="tel"
  id="phone"
  name="phone"
  label={t('models.employee.fields.phone')}

  value={formData.phone || ''}
  onChange={handleChange}
  
  error={fieldErrors.phone}
/>
      {/* Campo: position */}
          <GenericInput
  type="text"
  id="position"
  name="position"
  label={t('models.employee.fields.position')}

  value={formData.position || ''}
  onChange={handleChange}
  
  error={fieldErrors.position}
/>
      {/* Campo: salary */}
          <GenericInput
  type="number"
  id="salary"
  name="salary"
  label={t('models.employee.fields.salary')}

  value={formData.salary?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.salary}
/>
      {/* Campo: hireDate */}
          <GenericInput
  type="datetime-local"
  id="hireDate"
  name="hireDate"
  label={t('models.employee.fields.hireDate')}

  value={formData.hireDate ? new Date(formData.hireDate).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.hireDate}
/>
      {/* Campo: user */}
          <div>
    <label htmlFor="userId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.employee.fields.user')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="userId"
      name="userId"
      value={formData.userId}
      onChange={(value) => handleSelectChange('userId', parseInt(value))}
      url="/users"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.userId}
    />
    {fieldErrors.userId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.userId}
      </div>
    )}
  </div>
      {/* Campo: warehouse */}
          <div>
    <label htmlFor="warehouseId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.employee.fields.warehouse')}    
    
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
      {/* Campo: department */}
          <GenericInput
  type="text"
  id="department"
  name="department"
  label={t('models.employee.fields.department')}

  value={formData.department || ''}
  onChange={handleChange}
  
  error={fieldErrors.department}
/>
      {/* Campo: emergencyContact */}
          <GenericInput
  type="text"
  id="emergencyContact"
  name="emergencyContact"
  label={t('models.employee.fields.emergencyContact')}

  value={formData.emergencyContact || ''}
  onChange={handleChange}
  
  error={fieldErrors.emergencyContact}
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
  
  export default EmployeeForm;