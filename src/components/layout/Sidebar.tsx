import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import {
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
  LanguageIcon,
  UserIcon,
  TableCellsIcon,
  IdentificationIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ClipboardDocumentCheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ReceiptPercentIcon,
  ArchiveBoxIcon,
  KeyIcon,
  LockClosedIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  // Available languages based on i18n files
  const availableLanguages = [
    { code: 'es', name: 'Español' },
    { code: 'pl', name: 'Polski' },
    { code: 'en', name: 'English' },
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Function to change language
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLanguageSelector(false);
    // Save language preference in localStorage
    localStorage.setItem('preferredLanguage', langCode);
  };

  // Function to toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections(prev => 
      prev.includes(title) 
        ? prev.filter(section => section !== title)
        : [...prev, title]
    );
  };

  // Check if a section contains the active path
  const isSectionActive = (items: NavItem[]) => {
    return items.some(item => 
      location.pathname === item.path || 
      (item.path !== '/' && location.pathname.startsWith(item.path))
    );
  };

  // Organized navigation sections
  const navSections: NavSection[] = [
    {
      title: t('sections.dashboard', 'Dashboard'),
      icon: <Squares2X2Icon className="w-6 h-6" />,
      items: [
        { name: t('sections.dashboard', 'Dashboard'), path: '/', icon: <Squares2X2Icon className="w-5 h-5" /> },
      ]
    },
    {
      title: t('sections.users', 'Users & Security'),
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      items: [
        { name: t('models.user.title'), path: '/users', icon: <UserIcon className="w-5 h-5" /> },
        { name: t('models.passwordHistory.title'), path: '/passwordHistorys', icon: <LockClosedIcon className="w-5 h-5" /> },
        { name: t('models.apiKey.title'), path: '/apiKeys', icon: <KeyIcon className="w-5 h-5" /> },
        { name: t('models.role.title'), path: '/roles', icon: <ShieldCheckIcon className="w-5 h-5" /> },
        { name: t('models.permission.title'), path: '/permissions', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
        { name: t('models.auditLog.title'), path: '/auditLogs', icon: <DocumentDuplicateIcon className="w-5 h-5" /> },
      ]
    },
    {
      title: t('sections.contacts', 'Contacts'),
      icon: <UserGroupIcon className="w-6 h-6" />,
      items: [
        { name: t('models.employee.title'), path: '/employees', icon: <IdentificationIcon className="w-5 h-5" /> },
        { name: t('models.supplier.title'), path: '/suppliers', icon: <TruckIcon className="w-5 h-5" /> },
        { name: t('models.supplierAddress.title'), path: '/supplierAddresss', icon: <BuildingStorefrontIcon className="w-5 h-5" /> },
        { name: t('models.supplierContact.title'), path: '/supplierContacts', icon: <UserIcon className="w-5 h-5" /> },
        { name: t('models.customer.title'), path: '/customers', icon: <UserGroupIcon className="w-5 h-5" /> },
        { name: t('models.customerAddress.title'), path: '/customerAddresss', icon: <BuildingStorefrontIcon className="w-5 h-5" /> },
        { name: t('models.customerContact.title'), path: '/customerContacts', icon: <UserIcon className="w-5 h-5" /> },
      ]
    },
    {
      title: t('sections.inventory', 'Inventory'),
      icon: <ArchiveBoxIcon className="w-6 h-6" />,
      items: [
        { name: t('models.warehouse.title'), path: '/warehouses', icon: <BuildingStorefrontIcon className="w-5 h-5" /> },
        { name: t('models.warehouseLocation.title'), path: '/warehouseLocations', icon: <ArchiveBoxIcon className="w-5 h-5" /> },
        { name: t('models.material.title'), path: '/materials', icon: <CubeIcon className="w-5 h-5" /> },
        { name: t('models.materialSupplier.title'), path: '/materialSuppliers', icon: <TruckIcon className="w-5 h-5" /> },
        { name: t('models.materialCategory.title'), path: '/materialCategorys', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
        { name: t('models.materialLocation.title'), path: '/materialLocations', icon: <ArchiveBoxIcon className="w-5 h-5" /> },
      ]
    },
    {
      title: t('sections.products', 'Products'),
      icon: <ShoppingBagIcon className="w-6 h-6" />,
      items: [
        { name: t('models.product.title'), path: '/products', icon: <ShoppingBagIcon className="w-5 h-5" /> },
        { name: t('models.productCategory.title'), path: '/productCategorys', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
        { name: t('models.productImage.title'), path: '/productImages', icon: <DocumentTextIcon className="w-5 h-5" /> },
        { name: t('models.productAttribute.title'), path: '/productAttributes', icon: <ClipboardDocumentCheckIcon className="w-5 h-5" /> },
        { name: t('models.productLocation.title'), path: '/productLocations', icon: <ArchiveBoxIcon className="w-5 h-5" /> },
      ]
    },
    {
      title: t('sections.production', 'Production'),
      icon: <CubeIcon className="w-6 h-6" />,
      items: [
        { name: t('models.production.title'), path: '/productions', icon: <CubeIcon className="w-5 h-5" /> },
        { name: t('models.productionInput.title'), path: '/productionInputs', icon: <CubeIcon className="w-5 h-5" /> },
        { name: t('models.productionOutput.title'), path: '/productionOutputs', icon: <ArchiveBoxIcon className="w-5 h-5" /> },
        { name: t('models.qualityControl.title'), path: '/qualityControls', icon: <ClipboardDocumentCheckIcon className="w-5 h-5" /> },
        { name: t('models.qualityDefect.title'), path: '/qualityDefects', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
      ]
    },
    {
      title: t('sections.sales', 'Sales & Purchases'),
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      items: [
        { name: t('models.purchase.title'), path: '/purchases', icon: <TruckIcon className="w-5 h-5" /> },
        { name: t('models.purchaseItem.title'), path: '/purchaseItems', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
        { name: t('models.sale.title'), path: '/sales', icon: <CurrencyDollarIcon className="w-5 h-5" /> },
        { name: t('models.saleItem.title'), path: '/saleItems', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
        { name: t('models.returnOrder.title'), path: '/returnOrders', icon: <DocumentDuplicateIcon className="w-5 h-5" /> },
        { name: t('models.returnOrderItem.title'), path: '/returnOrderItems', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
        { name: t('models.quotation.title'), path: '/quotations', icon: <DocumentTextIcon className="w-5 h-5" /> },
        { name: t('models.quotationItem.title'), path: '/quotationItems', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
      ]
    },
    {
      title: t('sections.finance', 'Finance'),
      icon: <BanknotesIcon className="w-6 h-6" />,
      items: [
        { name: t('models.invoice.title'), path: '/invoices', icon: <DocumentTextIcon className="w-5 h-5" /> },
        { name: t('models.payment.title'), path: '/payments', icon: <BanknotesIcon className="w-5 h-5" /> },
        { name: t('models.sepaRemittance.title'), path: '/sepaRemittances', icon: <BanknotesIcon className="w-5 h-5" /> },
        { name: t('models.fiscalYear.title'), path: '/fiscalYears', icon: <DocumentTextIcon className="w-5 h-5" /> },
        { name: t('models.accountingAccount.title'), path: '/accountingAccounts', icon: <DocumentTextIcon className="w-5 h-5" /> },
        { name: t('models.accountBudget.title'), path: '/accountBudgets', icon: <ReceiptPercentIcon className="w-5 h-5" /> },
        { name: t('models.accountingEntry.title'), path: '/accountingEntrys', icon: <DocumentDuplicateIcon className="w-5 h-5" /> },
        { name: t('models.accountingEntryLine.title'), path: '/accountingEntryLines', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
      ]
    },
  ];

  // If authentication is still loading or user is not authenticated, don't render the sidebar
  if (loading) {
    return null; // Or return a loading spinner
  }



  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-40 m-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary-600 text-white p-2 rounded-md focus:outline-none"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-secondary-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 overflow-y-auto flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200 dark:border-secondary-700">
          <h1 className="text-xl font-bold text-primary-600 dark:text-white">MADERA ERP</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-secondary-500 hover:text-secondary-700 lg:hidden"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-4 px-2 flex-grow overflow-y-auto">
          <div className="space-y-1">
            {!isAuthenticated ? (<>
              <div  className="mb-2">
              <div className="mt-1 pl-4 space-y-1">
              <Link
                            
                            to={'/'}
                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                              'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                            }`}
                          >
                            <div className={`mr-3 ${
                              'text-primary-600 dark:text-primary-400'
                            }`}>
                             
                            </div>
                            {t('auth.login')}
                          </Link>
              </div>
              </div>

              {/* login aqui*/}
            </>) : navSections.map((section) => {
              const isSectionExpanded = expandedSections.includes(section.title);
              const isActive = isSectionActive(section.items);
              
              return (
                <div key={section.title} className="mb-2">
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md ${
                      isActive || isSectionExpanded
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                        : 'text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`mr-2 ${
                        isActive || isSectionExpanded ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-400 dark:text-secondary-500'
                      }`}>
                        {section.icon}
                      </div>
                      <span>{section.title}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform ${isSectionExpanded ? 'transform rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Section items */}
                  {isSectionExpanded && (
                    <div className="mt-1 pl-4 space-y-1">
                      {section.items.map((item) => {
                        const isItemActive = location.pathname === item.path || 
                                        (item.path !== '/' && location.pathname.startsWith(item.path));
                        
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                              isItemActive
                                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                                : 'text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'
                            }`}
                          >
                            <div className={`mr-3 ${
                              isItemActive ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-400 group-hover:text-secondary-600 dark:text-secondary-500 dark:group-hover:text-secondary-300'
                            }`}>
                              {item.icon}
                            </div>
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
        
        {/* Language selector at the bottom */}
        <div className="mt-auto px-3 pb-4 border-t border-secondary-200 dark:border-secondary-700 pt-3">
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800"
            >
              <div className="flex items-center">
                <LanguageIcon className="w-5 h-5 mr-2 text-secondary-400 dark:text-secondary-500" />
                <span>{t('common.language', 'Language')}</span>
              </div>
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase">
                {i18n.language}
              </span>
            </button>
            
            {showLanguageSelector && (
              <div className="absolute bottom-full left-0 w-full bg-white dark:bg-secondary-800 rounded-md shadow-lg border border-secondary-200 dark:border-secondary-700 mb-1 z-10">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary-100 dark:hover:bg-secondary-700 ${
                      i18n.language === lang.code ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-secondary-600 dark:text-secondary-300'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;