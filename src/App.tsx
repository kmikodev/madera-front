// App.tsx
  import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
  import ProtectedRoute from '@/components/auth/ProtectedRoute';
  import LoginPage from '@/pages/auth/LoginPage';
  import RegisterPage from '@/pages/auth/RegisterPage';
  import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
  import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

  import './i18n';
  
  // Import components and layout
  import AppLayout from '@/components/layout/AppLayout';
  import { useTranslation  } from "react-i18next";
  
  // Import pages
  import UserPage from '@/pages/UserPage';
import PasswordHistoryPage from '@/pages/PasswordHistoryPage';
import ApiKeyPage from '@/pages/ApiKeyPage';
import RolePage from '@/pages/RolePage';
import PermissionPage from '@/pages/PermissionPage';
import EmployeePage from '@/pages/EmployeePage';
import SupplierPage from '@/pages/SupplierPage';
import SupplierAddressPage from '@/pages/SupplierAddressPage';
import SupplierContactPage from '@/pages/SupplierContactPage';
import CustomerPage from '@/pages/CustomerPage';
import CustomerAddressPage from '@/pages/CustomerAddressPage';
import CustomerContactPage from '@/pages/CustomerContactPage';
import WarehousePage from '@/pages/WarehousePage';
import WarehouseLocationPage from '@/pages/WarehouseLocationPage';
import MaterialPage from '@/pages/MaterialPage';
import MaterialSupplierPage from '@/pages/MaterialSupplierPage';
import MaterialCategoryPage from '@/pages/MaterialCategoryPage';
import MaterialLocationPage from '@/pages/MaterialLocationPage';
import ProductPage from '@/pages/ProductPage';
import ProductCategoryPage from '@/pages/ProductCategoryPage';
import ProductImagePage from '@/pages/ProductImagePage';
import ProductAttributePage from '@/pages/ProductAttributePage';
import ProductLocationPage from '@/pages/ProductLocationPage';
import ProductionPage from '@/pages/ProductionPage';
import ProductionInputPage from '@/pages/ProductionInputPage';
import ProductionOutputPage from '@/pages/ProductionOutputPage';
import QualityControlPage from '@/pages/QualityControlPage';
import QualityDefectPage from '@/pages/QualityDefectPage';
import PurchasePage from '@/pages/PurchasePage';
import PurchaseItemPage from '@/pages/PurchaseItemPage';
import SalePage from '@/pages/SalePage';
import SaleItemPage from '@/pages/SaleItemPage';
import ReturnOrderPage from '@/pages/ReturnOrderPage';
import ReturnOrderItemPage from '@/pages/ReturnOrderItemPage';
import QuotationPage from '@/pages/QuotationPage';
import QuotationItemPage from '@/pages/QuotationItemPage';
import InvoicePage from '@/pages/InvoicePage';
import PaymentPage from '@/pages/PaymentPage';
import SepaRemittancePage from '@/pages/SepaRemittancePage';
import FiscalYearPage from '@/pages/FiscalYearPage';
import AccountingAccountPage from '@/pages/AccountingAccountPage';
import AccountBudgetPage from '@/pages/AccountBudgetPage';
import AccountingEntryPage from '@/pages/AccountingEntryPage';
import AccountingEntryLinePage from '@/pages/AccountingEntryLinePage';
import AuditLogPage from '@/pages/AuditLogPage';
import DashboardPage from './pages/DashboardPage';
  
  // Home component
  const Home: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
      <div className="bg-white dark:bg-secondary-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-secondary-900 dark:text-white">Bienvenido a la aplicación CRUD</h2>
          <p className="mt-1 max-w-2xl text-sm text-secondary-500 dark:text-secondary-300">
            Selecciona una entidad del menú lateral para comenzar.
          </p>
        </div>
        <div className="border-t border-secondary-200 dark:border-secondary-700">
          <dl>
            <div className="bg-secondary-50 dark:bg-secondary-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-secondary-500 dark:text-secondary-300">Entidades disponibles</dt>
              <dd className="mt-1 text-sm text-secondary-900 dark:text-secondary-100 sm:mt-0 sm:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: t('models.user.title'), path: '/users' },
                  { name: t('models.passwordHistory.title'), path: '/passwordHistorys' },
                  { name: t('models.apiKey.title'), path: '/apiKeys' },
                  { name: t('models.role.title'), path: '/roles' },
                  { name: t('models.permission.title'), path: '/permissions' },
                  { name: t('models.employee.title'), path: '/employees' },
                  { name: t('models.supplier.title'), path: '/suppliers' },
                  { name: t('models.supplierAddress.title'), path: '/supplierAddresss' },
                  { name: t('models.supplierContact.title'), path: '/supplierContacts' },
                  { name: t('models.customer.title'), path: '/customers' },
                  { name: t('models.customerAddress.title'), path: '/customerAddresss' },
                  { name: t('models.customerContact.title'), path: '/customerContacts' },
                  { name: t('models.warehouse.title'), path: '/warehouses' },
                  { name: t('models.warehouseLocation.title'), path: '/warehouseLocations' },
                  { name: t('models.material.title'), path: '/materials' },
                  { name: t('models.materialSupplier.title'), path: '/materialSuppliers' },
                  { name: t('models.materialCategory.title'), path: '/materialCategorys' },
                  { name: t('models.materialLocation.title'), path: '/materialLocations' },
                  { name: t('models.product.title'), path: '/products' },
                  { name: t('models.productCategory.title'), path: '/productCategorys' },
                  { name: t('models.productImage.title'), path: '/productImages' },
                  { name: t('models.productAttribute.title'), path: '/productAttributes' },
                  { name: t('models.productLocation.title'), path: '/productLocations' },
                  { name: t('models.production.title'), path: '/productions' },
                  { name: t('models.productionInput.title'), path: '/productionInputs' },
                  { name: t('models.productionOutput.title'), path: '/productionOutputs' },
                  { name: t('models.qualityControl.title'), path: '/qualityControls' },
                  { name: t('models.qualityDefect.title'), path: '/qualityDefects' },
                  { name: t('models.purchase.title'), path: '/purchases' },
                  { name: t('models.purchaseItem.title'), path: '/purchaseItems' },
                  { name: t('models.sale.title'), path: '/sales' },
                  { name: t('models.saleItem.title'), path: '/saleItems' },
                  { name: t('models.returnOrder.title'), path: '/returnOrders' },
                  { name: t('models.returnOrderItem.title'), path: '/returnOrderItems' },
                  { name: t('models.quotation.title'), path: '/quotations' },
                  { name: t('models.quotationItem.title'), path: '/quotationItems' },
                  { name: t('models.invoice.title'), path: '/invoices' },
                  { name: t('models.payment.title'), path: '/payments' },
                  { name: t('models.sepaRemittance.title'), path: '/sepaRemittances' },
                  { name: t('models.fiscalYear.title'), path: '/fiscalYears' },
                  { name: t('models.accountingAccount.title'), path: '/accountingAccounts' },
                  { name: t('models.accountBudget.title'), path: '/accountBudgets' },
                  { name: t('models.accountingEntry.title'), path: '/accountingEntrys' },
                  { name: t('models.accountingEntryLine.title'), path: '/accountingEntryLines' },
                  { name: t('models.auditLog.title'), path: '/auditLogs' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center p-3 rounded-md bg-white dark:bg-secondary-700 shadow-sm hover:shadow-md transition-shadow">
                      <a href={item.path} className="w-full text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
                        {item.name}
                      </a>
                    </div>
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  };
  
  const App: React.FC = () => {
    return (
      <Router>
      <AuthProvider>
        <AppLayout>
          <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users/*" element={<UserPage />} />
          <Route path="/passwordHistorys/*" element={<PasswordHistoryPage />} />
          <Route path="/apiKeys/*" element={<ApiKeyPage />} />
          <Route path="/roles/*" element={<RolePage />} />
          <Route path="/permissions/*" element={<PermissionPage />} />
          <Route path="/employees/*" element={<EmployeePage />} />
          <Route path="/suppliers/*" element={<SupplierPage />} />
          <Route path="/supplierAddresss/*" element={<SupplierAddressPage />} />
          <Route path="/supplierContacts/*" element={<SupplierContactPage />} />
          <Route path="/customers/*" element={<CustomerPage />} />
          <Route path="/customerAddresss/*" element={<CustomerAddressPage />} />
          <Route path="/customerContacts/*" element={<CustomerContactPage />} />
          <Route path="/warehouses/*" element={<WarehousePage />} />
          <Route path="/warehouseLocations/*" element={<WarehouseLocationPage />} />
          <Route path="/materials/*" element={<MaterialPage />} />
          <Route path="/materialSuppliers/*" element={<MaterialSupplierPage />} />
          <Route path="/materialCategorys/*" element={<MaterialCategoryPage />} />
          <Route path="/materialLocations/*" element={<MaterialLocationPage />} />
          <Route path="/products/*" element={<ProductPage />} />
          <Route path="/productCategorys/*" element={<ProductCategoryPage />} />
          <Route path="/productImages/*" element={<ProductImagePage />} />
          <Route path="/productAttributes/*" element={<ProductAttributePage />} />
          <Route path="/productLocations/*" element={<ProductLocationPage />} />
          <Route path="/productions/*" element={<ProductionPage />} />
          <Route path="/productionInputs/*" element={<ProductionInputPage />} />
          <Route path="/productionOutputs/*" element={<ProductionOutputPage />} />
          <Route path="/qualityControls/*" element={<QualityControlPage />} />
          <Route path="/qualityDefects/*" element={<QualityDefectPage />} />
          <Route path="/purchases/*" element={<PurchasePage />} />
          <Route path="/purchaseItems/*" element={<PurchaseItemPage />} />
          <Route path="/sales/*" element={<SalePage />} />
          <Route path="/saleItems/*" element={<SaleItemPage />} />
          <Route path="/returnOrders/*" element={<ReturnOrderPage />} />
          <Route path="/returnOrderItems/*" element={<ReturnOrderItemPage />} />
          <Route path="/quotations/*" element={<QuotationPage />} />
          <Route path="/quotationItems/*" element={<QuotationItemPage />} />
          <Route path="/invoices/*" element={<InvoicePage />} />
          <Route path="/payments/*" element={<PaymentPage />} />
          <Route path="/sepaRemittances/*" element={<SepaRemittancePage />} />
          <Route path="/fiscalYears/*" element={<FiscalYearPage />} />
          <Route path="/accountingAccounts/*" element={<AccountingAccountPage />} />
          <Route path="/accountBudgets/*" element={<AccountBudgetPage />} />
          <Route path="/accountingEntrys/*" element={<AccountingEntryPage />} />
          <Route path="/accountingEntryLines/*" element={<AccountingEntryLinePage />} />
          <Route path="/auditLogs/*" element={<AuditLogPage />} />
          </Route>
        </Routes>
        </AppLayout>
            </AuthProvider>
      </Router>
    );
  };
  
  export default App;