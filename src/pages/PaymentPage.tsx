
  import React, { useState } from 'react';
  import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
  import PaymentForm from '@/components/crud/forms/PaymentForm';
  import PaymentTable from '@/components/crud/tables/PaymentTable';
  import { useTranslation  } from 'react-i18next';

  const PaymentPage: React.FC = () => {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

  
    const handleEdit = (id: number) => {
      navigate(`/payments/edit/${id}`);
    };
  
    const handleSuccess = () => {
      setRefreshTrigger(prev => prev + 1);
      navigate('/payments');
    };
  
    // Componente para la vista de edición que usa useParams en lugar de window.location
    const EditView = () => {
      const { id } = useParams();
      return (
        <>
          <div className="mb-4">
            <button
              onClick={() => navigate('/payments')}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('commons.backToList')}
            </button>
          </div>
          {id && <PaymentForm id={id} onSuccess={handleSuccess} />}
        </>
      );
    };
  
    return (
      <div className="container mx-auto">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">{t('models.payment.title')}</h2>
                  <button
                    onClick={() => navigate('/payments/new')}
                    className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium py-2 px-4 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {t('commons.forms.new')} {t('models.payment.title')}
                  </button>
                </div>
                <PaymentTable 
                  key={refreshTrigger} 
                  onEdit={handleEdit} 
                  onDelete={() => setRefreshTrigger(prev => prev + 1)} 
                />
              </>
            } 
          />
          <Route 
            path="/new" 
            element={
              <>
                <div className="mb-4">
                  <button
                    onClick={() => navigate('/payments')}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('commons.backToList')}
                  </button>
                </div>
                <PaymentForm onSuccess={handleSuccess} />
              </>
            } 
          />
          <Route path="/edit/:id" element={<EditView />} />
        </Routes>
      </div>
    );
  };
  
  export default PaymentPage;
  