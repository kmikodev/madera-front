
  import React, { useState } from 'react';
  import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
  import FiscalYearForm from '@/components/crud/forms/FiscalYearForm';
  import FiscalYearTable from '@/components/crud/tables/FiscalYearTable';
  import { useTranslation  } from 'react-i18next';

  const FiscalYearPage: React.FC = () => {
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

  
    const handleEdit = (id: number) => {
      navigate(`/fiscalYears/edit/${id}`);
    };
  
    const handleSuccess = () => {
      setRefreshTrigger(prev => prev + 1);
      navigate('/fiscalYears');
    };
  
    // Componente para la vista de edición que usa useParams en lugar de window.location
    const EditView = () => {
      const { id } = useParams();
      return (
        <>
          <div className="mb-4">
            <button
              onClick={() => navigate('/fiscalYears')}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('commons.backToList')}
            </button>
          </div>
          {id && <FiscalYearForm id={id} onSuccess={handleSuccess} />}
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
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">{t('models.fiscalYear.title')}</h2>
                  <button
                    onClick={() => navigate('/fiscalYears/new')}
                    className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium py-2 px-4 rounded transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {t('commons.forms.new')} {t('models.fiscalYear.title')}
                  </button>
                </div>
                <FiscalYearTable 
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
                    onClick={() => navigate('/fiscalYears')}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t('commons.backToList')}
                  </button>
                </div>
                <FiscalYearForm onSuccess={handleSuccess} />
              </>
            } 
          />
          <Route path="/edit/:id" element={<EditView />} />
        </Routes>
      </div>
    );
  };
  
  export default FiscalYearPage;
  