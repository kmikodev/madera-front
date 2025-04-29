import React, { useState, useEffect } from 'react';
  import { AccountBudget, AccountBudgetInput, AccountBudgetService } from '@/services/accountBudget.service';
  import GenericSelect from '@/components/form/GenericSelect';
  
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface AccountBudgetFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const AccountBudgetForm: React.FC<AccountBudgetFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      fiscalYearId: null,
    accountId: null,
    budgetAmount: 0,
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0
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
      const data = await AccountBudgetService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      // Para relación fiscalYear
          if (data.fiscalYearId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.fiscalYearId = data.fiscalYearId;
          } else if (data.fiscalYear) {
            // Si el API devuelve el objeto completo
            formattedData.fiscalYearId = data.fiscalYear.id || data.fiscalYear;
          }
      // Para relación account
          if (data.accountId !== undefined) {
            // Si el API ya devuelve el ID directamente
            formattedData.accountId = data.accountId;
          } else if (data.account) {
            // Si el API devuelve el objeto completo
            formattedData.accountId = data.account.id || data.account;
          }
      formattedData.budgetAmount = data.budgetAmount;
      formattedData.jan = data.jan;
      formattedData.feb = data.feb;
      formattedData.mar = data.mar;
      formattedData.apr = data.apr;
      formattedData.may = data.may;
      formattedData.jun = data.jun;
      formattedData.jul = data.jul;
      formattedData.aug = data.aug;
      formattedData.sep = data.sep;
      formattedData.oct = data.oct;
      formattedData.nov = data.nov;
      formattedData.dec = data.dec;
      
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
      if (!formData.fiscalYearId) errors.fiscalYearId = 'El campo fiscalYear es requerido';
    if (!formData.accountId) errors.accountId = 'El campo account es requerido';
    if (!formData.budgetAmount) errors.budgetAmount = 'El campo budgetAmount es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      if (formData.fiscalYearId) {
        dataToSubmit.fiscalYearId = formData.fiscalYearId;
      }
    if (formData.accountId) {
        dataToSubmit.accountId = formData.accountId;
      }
    dataToSubmit.budgetAmount = formData.budgetAmount;
    dataToSubmit.jan = formData.jan;
    dataToSubmit.feb = formData.feb;
    dataToSubmit.mar = formData.mar;
    dataToSubmit.apr = formData.apr;
    dataToSubmit.may = formData.may;
    dataToSubmit.jun = formData.jun;
    dataToSubmit.jul = formData.jul;
    dataToSubmit.aug = formData.aug;
    dataToSubmit.sep = formData.sep;
    dataToSubmit.oct = formData.oct;
    dataToSubmit.nov = formData.nov;
    dataToSubmit.dec = formData.dec;
      
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
          await AccountBudgetService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await AccountBudgetService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            fiscalYearId: null,
        accountId: null,
        budgetAmount: 0,
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.accountBudget.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: fiscalYear */}
          <div>
    <label htmlFor="fiscalYearId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountBudget.fields.fiscalYear')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="fiscalYearId"
      name="fiscalYearId"
      value={formData.fiscalYearId}
      onChange={(value) => handleSelectChange('fiscalYearId', parseInt(value))}
      url="/fiscalYears"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.fiscalYearId}
    />
    {fieldErrors.fiscalYearId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.fiscalYearId}
      </div>
    )}
  </div>
      {/* Campo: account */}
          <div>
    <label htmlFor="accountId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.accountBudget.fields.account')}    
    <span className="text-red-500 ml-1">*</span>
    </label>
    <GenericSelect
      id="accountId"
      name="accountId"
      value={formData.accountId}
      onChange={(value) => handleSelectChange('accountId', parseInt(value))}
      url="/accountingAccounts"
      labelKey="id"
      valueKey="id"
      required
      searchable
      error={fieldErrors.accountId}
    />
    {fieldErrors.accountId && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.accountId}
      </div>
    )}
  </div>
      {/* Campo: budgetAmount */}
          <GenericInput
  type="number"
  id="budgetAmount"
  name="budgetAmount"
  label={t('models.accountBudget.fields.budgetAmount')}

  value={formData.budgetAmount?.toString() ?? ''}
  onChange={handleChange}
  required
  error={fieldErrors.budgetAmount}
/>
      {/* Campo: jan */}
          <GenericInput
  type="number"
  id="jan"
  name="jan"
  label={t('models.accountBudget.fields.jan')}

  value={formData.jan?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.jan}
/>
      {/* Campo: feb */}
          <GenericInput
  type="number"
  id="feb"
  name="feb"
  label={t('models.accountBudget.fields.feb')}

  value={formData.feb?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.feb}
/>
      {/* Campo: mar */}
          <GenericInput
  type="number"
  id="mar"
  name="mar"
  label={t('models.accountBudget.fields.mar')}

  value={formData.mar?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.mar}
/>
      {/* Campo: apr */}
          <GenericInput
  type="number"
  id="apr"
  name="apr"
  label={t('models.accountBudget.fields.apr')}

  value={formData.apr?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.apr}
/>
      {/* Campo: may */}
          <GenericInput
  type="number"
  id="may"
  name="may"
  label={t('models.accountBudget.fields.may')}

  value={formData.may?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.may}
/>
      {/* Campo: jun */}
          <GenericInput
  type="number"
  id="jun"
  name="jun"
  label={t('models.accountBudget.fields.jun')}

  value={formData.jun?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.jun}
/>
      {/* Campo: jul */}
          <GenericInput
  type="number"
  id="jul"
  name="jul"
  label={t('models.accountBudget.fields.jul')}

  value={formData.jul?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.jul}
/>
      {/* Campo: aug */}
          <GenericInput
  type="number"
  id="aug"
  name="aug"
  label={t('models.accountBudget.fields.aug')}

  value={formData.aug?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.aug}
/>
      {/* Campo: sep */}
          <GenericInput
  type="number"
  id="sep"
  name="sep"
  label={t('models.accountBudget.fields.sep')}

  value={formData.sep?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.sep}
/>
      {/* Campo: oct */}
          <GenericInput
  type="number"
  id="oct"
  name="oct"
  label={t('models.accountBudget.fields.oct')}

  value={formData.oct?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.oct}
/>
      {/* Campo: nov */}
          <GenericInput
  type="number"
  id="nov"
  name="nov"
  label={t('models.accountBudget.fields.nov')}

  value={formData.nov?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.nov}
/>
      {/* Campo: dec */}
          <GenericInput
  type="number"
  id="dec"
  name="dec"
  label={t('models.accountBudget.fields.dec')}

  value={formData.dec?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.dec}
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
  
  export default AccountBudgetForm;