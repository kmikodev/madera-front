
  import React, { useState } from 'react';
  import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
  import QuotationForm from '@/components/crud/forms/QuotationForm';
  import QuotationTable from '@/components/crud/tables/QuotationTable';
  import { useTranslation  } from 'react-i18next';

  const QuotationPage: React.FC = () => {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

  
    const handleEdit = (id: number) => {
      navigate(`/quotations/edit/${id}`);
    };
  
    const handleSuccess = () => {
      setRefreshTrigger(prev => prev + 1);
      navigate('/quotations');
    };
  
    // Componente para la vista de edición que usa useParams en lugar de window.location
    const EditView = () => {
      const { id } = useParams();
      return (
        <>
          <div className="mb-4">
            <button
              onClick={() => navigate('/quotations')}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('commons.backToList')}
            </button>
          </div>
          {id && <QuotationForm id={id} onSuccess={handleSuccess} />}
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
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">{t('models.quotation.title')}</h2>
                  <button
                    onClick={() => navigate('/quotations/new')}
                    className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium py-2 px-4 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {t('commons.forms.new')} {t('models.quotation.title')}
                  </button>
                </div>
                <QuotationTable 
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
                    onClick={() => navigate('/quotations')}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('commons.backToList')}
                  </button>
                </div>
                <QuotationForm onSuccess={handleSuccess} />
              </>
            } 
          />
          <Route path="/edit/:id" element={<EditView />} />
        </Routes>
      </div>
    );
  };
  
  export default QuotationPage;
  