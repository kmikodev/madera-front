import React, { useState, useEffect } from 'react';
  import { Customer, CustomerInput, CustomerService } from '@/services/customer.service';
  import GenericSelect from '@/components/form/GenericSelect';
  import BaseSelect from '@/components/form/BaseSelect';
  import GenericInput from '@/components/form/GenericInput';
  import GenericCheckbox from '@/components/form/GenericCheckbox';
  import GenericFileUpload from '@/components/form/GenericFileUpload';
  import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
  import { useTranslation  } from 'react-i18next';
  
    
  interface CustomerFormProps {
    id?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  const CustomerForm: React.FC<CustomerFormProps> = ({ id, onSuccess, onError }) => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<any>({
      name: '',
    nif: '',
    address: '',
    phone: '',
    email: '',
    contactPerson: '',
    customerType: '',
    paymentTerms: '',
    sepaEnabled: false,
    sepaMandateId: '',
    sepaIban: '',
    active: false,
    deletedAt: '',
    creditLimit: 0,
    discountRate: 0,
    customerSince: '',
    segment: ''
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
      const data = await CustomerService.getById(id!);
      
      // Extraer solo los campos editables para el formulario
      const formattedData: any = {};
      
      formattedData.name = data.name;
      formattedData.nif = data.nif;
      formattedData.address = data.address;
      formattedData.phone = data.phone;
      formattedData.email = data.email;
      formattedData.contactPerson = data.contactPerson;
      // Para enum customerType
          formattedData.customerType = data.customerType;
      // Para enum paymentTerms
          formattedData.paymentTerms = data.paymentTerms;
      formattedData.sepaEnabled = data.sepaEnabled;
      formattedData.sepaMandateId = data.sepaMandateId;
      formattedData.sepaIban = data.sepaIban;
      formattedData.active = data.active;
      if (data.deletedAt && (data.deletedAt instanceof Date || typeof data.deletedAt === 'string')) {
            formattedData.deletedAt = new Date(data.deletedAt).toISOString().substring(0, 10);
          } else {
            formattedData.deletedAt = data.deletedAt;
          }
      formattedData.creditLimit = data.creditLimit;
      formattedData.discountRate = data.discountRate;
      if (data.customerSince && (data.customerSince instanceof Date || typeof data.customerSince === 'string')) {
            formattedData.customerSince = new Date(data.customerSince).toISOString().substring(0, 10);
          } else {
            formattedData.customerSince = data.customerSince;
          }
      // Para enum segment
          formattedData.segment = data.segment;
      
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
      if (!formData.name) errors.name = 'El campo name es requerido';
    if (!formData.nif) errors.nif = 'El campo nif es requerido';
  
      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    // Preparar datos para envío
    const prepareDataForSubmission = (): any => {
      const dataToSubmit: any = {};
      
      // Procesar cada campo según su tipo
      dataToSubmit.name = formData.name;
    dataToSubmit.nif = formData.nif;
    dataToSubmit.address = formData.address;
    dataToSubmit.phone = formData.phone;
    dataToSubmit.email = formData.email;
    dataToSubmit.contactPerson = formData.contactPerson;
    dataToSubmit.customerType = formData.customerType;
    dataToSubmit.paymentTerms = formData.paymentTerms;
    dataToSubmit.sepaEnabled = formData.sepaEnabled;
    dataToSubmit.sepaMandateId = formData.sepaMandateId;
    dataToSubmit.sepaIban = formData.sepaIban;
    dataToSubmit.active = formData.active;
    dataToSubmit.deletedAt = formData.deletedAt;
    dataToSubmit.creditLimit = formData.creditLimit;
    dataToSubmit.discountRate = formData.discountRate;
    dataToSubmit.customerSince = formData.customerSince;
    dataToSubmit.segment = formData.segment;
      
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
          await CustomerService.update(id, dataToSubmit);
        } else {
          // Crear nuevo registro
          await CustomerService.create(dataToSubmit);
        }
        
        // Limpiar formulario si es nuevo registro
        if (!id) {
          setFormData({
            name: '',
        nif: '',
        address: '',
        phone: '',
        email: '',
        contactPerson: '',
        customerType: '',
        paymentTerms: '',
        sepaEnabled: false,
        sepaMandateId: '',
        sepaIban: '',
        active: false,
        deletedAt: '',
        creditLimit: 0,
        discountRate: 0,
        customerSince: '',
        segment: ''
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
          {id ? t('commons.forms.edit') : t('commons.forms.create')} {t('models.customer.title')}
          
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: name */}
          <GenericInput
  type="text"
  id="name"
  name="name"
  label={t('models.customer.fields.name')}

  value={formData.name || ''}
  onChange={handleChange}
  required
  error={fieldErrors.name}
/>
      {/* Campo: nif */}
          <GenericInput
  type="text"
  id="nif"
  name="nif"
  label={t('models.customer.fields.nif')}

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
  label={t('models.customer.fields.address')}

  value={formData.address || ''}
  onChange={handleChange}
  
  error={fieldErrors.address}
/>
      {/* Campo: phone */}
          <GenericInput
  type="tel"
  id="phone"
  name="phone"
  label={t('models.customer.fields.phone')}

  value={formData.phone || ''}
  onChange={handleChange}
  
  error={fieldErrors.phone}
/>
      {/* Campo: email */}
          <GenericInput
  type="email"
  id="email"
  name="email"
  label={t('models.customer.fields.email')}

  value={formData.email || ''}
  onChange={handleChange}
  
  error={fieldErrors.email}
/>
      {/* Campo: contactPerson */}
          <GenericInput
  type="text"
  id="contactPerson"
  name="contactPerson"
  label={t('models.customer.fields.contactPerson')}

  value={formData.contactPerson || ''}
  onChange={handleChange}
  
  error={fieldErrors.contactPerson}
/>
      {/* Campo: customerType */}
          <div>
    <label htmlFor="customerType" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.customer.fields.customerType')}
      
    </label>
    <BaseSelect
      id="customerType"
      name="customerType"
      options={[
        { id: 'RETAIL          // Minorista', name: 'RETAIL          // Minorista' },
        { id: 'WHOLESALE       // Mayorista', name: 'WHOLESALE       // Mayorista' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.customerType || ''}
      onChange={(value) => handleSelectChange('customerType', value)}
      
      searchable
      error={fieldErrors.customerType}
    />
    {fieldErrors.customerType && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.customerType}
      </div>
    )}
  </div>
      {/* Campo: paymentTerms */}
          <div>
    <label htmlFor="paymentTerms" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.customer.fields.paymentTerms')}
      
    </label>
    <BaseSelect
      id="paymentTerms"
      name="paymentTerms"
      options={[
        { id: 'IMMEDIATE       // Pago inmediato', name: 'IMMEDIATE       // Pago inmediato' },
        { id: 'END_OF_MONTH    // Fin de mes', name: 'END_OF_MONTH    // Fin de mes' },
        { id: 'FIFTEEN_DAYS    // 15 días', name: 'FIFTEEN_DAYS    // 15 días' },
        { id: 'THIRTY_DAYS     // 30 días', name: 'THIRTY_DAYS     // 30 días' },
        { id: 'SIXTY_DAYS      // 60 días', name: 'SIXTY_DAYS      // 60 días' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.paymentTerms || ''}
      onChange={(value) => handleSelectChange('paymentTerms', value)}
      
      searchable
      error={fieldErrors.paymentTerms}
    />
    {fieldErrors.paymentTerms && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.paymentTerms}
      </div>
    )}
  </div>
      {/* Campo: sepaEnabled */}
          <GenericCheckbox
  id="sepaEnabled"
  name="sepaEnabled"
  label="Sepa Enabled"
  checked={!!formData.sepaEnabled}
  onChange={handleChange}
  
  error={fieldErrors.sepaEnabled}
/>
      {/* Campo: sepaMandateId */}
          <GenericInput
  type="text"
  id="sepaMandateId"
  name="sepaMandateId"
  label={t('models.customer.fields.sepaMandateId')}

  value={formData.sepaMandateId || ''}
  onChange={handleChange}
  
  error={fieldErrors.sepaMandateId}
/>
      {/* Campo: sepaIban */}
          <GenericInput
  type="text"
  id="sepaIban"
  name="sepaIban"
  label={t('models.customer.fields.sepaIban')}

  value={formData.sepaIban || ''}
  onChange={handleChange}
  
  error={fieldErrors.sepaIban}
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
  label={t('models.customer.fields.deletedAt')}

  value={formData.deletedAt ? new Date(formData.deletedAt).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.deletedAt}
/>
      {/* Campo: creditLimit */}
          <GenericInput
  type="number"
  id="creditLimit"
  name="creditLimit"
  label={t('models.customer.fields.creditLimit')}

  value={formData.creditLimit?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.creditLimit}
/>
      {/* Campo: discountRate */}
          <GenericInput
  type="number"
  id="discountRate"
  name="discountRate"
  label={t('models.customer.fields.discountRate')}

  value={formData.discountRate?.toString() ?? ''}
  onChange={handleChange}
  
  error={fieldErrors.discountRate}
/>
      {/* Campo: customerSince */}
          <GenericInput
  type="datetime-local"
  id="customerSince"
  name="customerSince"
  label={t('models.customer.fields.customerSince')}

  value={formData.customerSince ? new Date(formData.customerSince).toISOString().slice(0, 16) : ''}
  onChange={handleChange}
  
  error={fieldErrors.customerSince}
/>
      {/* Campo: segment */}
          <div>
    <label htmlFor="segment" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
      {t('models.customer.fields.segment')}
      
    </label>
    <BaseSelect
      id="segment"
      name="segment"
      options={[
        { id: 'GENERAL         // General', name: 'GENERAL         // General' },
        { id: 'VIP             // Cliente VIP', name: 'VIP             // Cliente VIP' },
        { id: 'STRATEGIC       // Cliente estratégico', name: 'STRATEGIC       // Cliente estratégico' },
        { id: 'OCCASIONAL      // Cliente ocasional', name: 'OCCASIONAL      // Cliente ocasional' }
      ]}
      valueKey="id"
      labelKey="name"
      value={formData.segment || ''}
      onChange={(value) => handleSelectChange('segment', value)}
      
      searchable
      error={fieldErrors.segment}
    />
    {fieldErrors.segment && (
      <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
        {fieldErrors.segment}
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
  
  export default CustomerForm;