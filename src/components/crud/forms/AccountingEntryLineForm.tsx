import React, { useState, useEffect } from 'react';
  import { AccountingEntryLine, AccountingEntryLineInput, AccountingEntryLineService } from '@/services/accountingEntryLine.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface AccountingEntryLineFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const AccountingEntryLineForm: React.FC<AccountingEntryLineFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      entryId: null,
    description: '',
    debitAccountId: null,
    creditAccountId: null,
    amount: 0
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
      const data = await AccountingEntryLineService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación entry
          if (data.entryId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.entryId = data.entryId;
          } else if (data.entry) {
            // Si el API devuelve el objeto completo
            formattedData.entryId = data.entry.id || data.entry;
          }
      formattedData.description = data.description;
      // Para relación debitAccount
          if (data.debitAccountId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.debitAccountId = data.debitAccountId;
          } else if (data.debitAccount) {
            // Si el API devuelve el objeto completo
            formattedData.debitAccountId = data.debitAccount.id || data.debitAccount;
          }
      // Para relación creditAccount
          if (data.creditAccountId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.creditAccountId = data.creditAccountId;
          } else if (data.creditAccount) {
            // Si el API devuelve el objeto completo
            formattedData.creditAccountId = data.creditAccount.id || data.creditAccount;
          }
      formattedData.amount = data.amount;
      
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
      if (!formData.entryId) errors.entryId = 'El campo entry es requerido';
    if (!formData.debitAccountId) errors.debitAccountId = 'El campo debitAccount es requerido';
    if (!formData.creditAccountId) errors.creditAccountId = 'El campo creditAccount es requerido';
    if (!formData.amount) errors.amount = 'El campo amount es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.entryId) {
        dataToSubmit.entryId = formData.entryId;
      }
    dataToSubmit.description = formData.description;
    if (formData.debitAccountId) {
        dataToSubmit.debitAccountId = formData.debitAccountId;
      }
    if (formData.creditAccountId) {
        dataToSubmit.creditAccountId = formData.creditAccountId;
      }
    dataToSubmit.amount = formData.amount;
      
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
          await AccountingEntryLineService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await AccountingEntryLineService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            entryId: null,
        description: '',
        debitAccountId: null,
        creditAccountId: null,
        amount: 0
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.accountingEntryLine.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: entry */}
          <div>
    <label htmlFor="entryId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingEntryLine.fields.entry')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="entryId"
      name="entryId"
      value={formData.entryId}
      onChange={(value) => handleSelectChange('entryId', parseInt(value))}
      url="/accountingEntrys"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.entryId}
    />
    {fieldErrors.entryId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.entryId}
      </div>
    )}
  </div>
      {/* Campo: description */}
          <GenericInput
  type="text"
  id="description"
  name="description"
  label={t('models.accountingEntryLine.fields.description')}

  value={formData.description || ''}
  onChange={handleChange}
  
  error={fieldErrors.description}
/>
      {/* Campo: debitAccount */}
          <div>
    <label htmlFor="debitAccountId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingEntryLine.fields.debitAccount')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="debitAccountId"
      name="debitAccountId"
      value={formData.debitAccountId}
      onChange={(value) => handleSelectChange('debitAccountId', parseInt(value))}
      url="/accountingAccounts"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.debitAccountId}
    />
    {fieldErrors.debitAccountId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.debitAccountId}
      </div>
    )}
  </div>
      {/* Campo: creditAccount */}
          <div>
    <label htmlFor="creditAccountId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountingEntryLine.fields.creditAccount')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="creditAccountId"
      name="creditAccountId"
      value={formData.creditAccountId}
      onChange={(value) => handleSelectChange('creditAccountId', parseInt(value))}
      url="/accountingAccounts"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.creditAccountId}
    />
    {fieldErrors.creditAccountId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.creditAccountId}
      </div>
    )}
  </div>
      {/* Campo: amount */}
          <GenericInput
  type="number"
  id="amount"
  name="amount"
  label={t('models.accountingEntryLine.fields.amount')}

  value={formData.amount?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.amount}
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
  
  export default AccountingEntryLineForm;