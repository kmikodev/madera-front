import React, { useState, useEffect } from 'react';
  import { AccountingAccount, AccountingAccountInput, AccountingAccountService } from '@/services/accountingAccount.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface AccountingAccountFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const AccountingAccountForm: React.FC<AccountingAccountFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      code: '',
    name: '',
    accountType: '',
    isActive: false,
    parentId: null
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
      const data = await AccountingAccountService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.code = data.code;
      formattedData.name = data.name;
      // Para enum accountType
          formattedData.accountType = data.accountType;
      formattedData.isActive = data.isActive;
      // Para relación parent
          if (data.parentId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.parentId = data.parentId;
          } else if (data.parent) {
            // Si el API devuelve el objeto completo
            formattedData.parentId = data.parent.id || data.parent;
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
      if (!formData.code) errors.code = 'El campo code es requerido';
    if (!formData.name) errors.name = 'El campo name es requerido';
    if (!formData.accountType) errors.accountType = 'El campo accountType es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.code = formData.code;
    dataToSubmit.name = formData.name;
    dataToSubmit.accountType = formData.accountType;
    dataToSubmit.isActive = formData.isActive;
    if (formData.parentId) {
        dataToSubmit.parentId = formData.parentId;
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
          await AccountingAccountService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await AccountingAccountService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            code: '',
        name: '',
        accountType: '',
        isActive: false,
        parentId: null
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.accountingAccount.title')}
          
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
  label={t('models.accountingAccount.fields.code')}

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
  label={t('models.accountingAccount.fields.name')}

  value={formData.name || ''}
  onChange={handleChange}
  required
  error={fieldErrors.name}
/>
      {/* Campo: accountType */}
          <div>
    <label htmlFor="accountType" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingAccount.fields.accountType')}
      <span className="text-red-500 ml-1">*</span>
    </label>
    <BaseSelect
      id="accountType"
      name="accountType"
      options={[
        { id: 'ASSET           // Activo', name: 'ASSET           // Activo' },
        { id: 'LIABILITY       // Pasivo', name: 'LIABILITY       // Pasivo' },
        { id: 'EQUITY          // Patrimonio neto', name: 'EQUITY          // Patrimonio neto' },
        { id: 'INCOME          // Ingresos', name: 'INCOME          // Ingresos' },
        { id: 'EXPENSE         // Gastos', name: 'EXPENSE         // Gastos' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.accountType || ''}
      onChange={(value) => handleSelectChange('accountType', value)}
      required
      searchable
      error={fieldErrors.accountType}
    />
    {fieldErrors.accountType && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.accountType}
      </div>
    )}
  </div>
      {/* Campo: isActive */}
          <GenericCheckbox
  id="isActive"
  name="isActive"
  label="Is Active"
  checked={!!formData.isActive}
  onChange={handleChange}
  
  error={fieldErrors.isActive}
/>
      {/* Campo: parent */}
          <div>
    <label htmlFor="parentId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingAccount.fields.parent')}    
    
    </label>
    <GenericSelect
      id="parentId"
      name="parentId"
      value={formData.parentId}
      onChange={(value) => handleSelectChange('parentId', parseInt(value))}
      url="/accountingAccounts"
      labelKey="id"
      valueKey="id"
      
      searchable
      error={fieldErrors.parentId}
    />
    {fieldErrors.parentId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.parentId}
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
  
  export default AccountingAccountForm;