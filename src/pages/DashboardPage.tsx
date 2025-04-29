import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dashboardService } from '../services/dashboard.service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import DateRangeFilter from '@/components/dashboard/DateRangeFilter';

// Componentes para el dashboard

// Tarjeta de resumen con contador y título
const SummaryCard = ({ title, count, icon, color }: { title: string, count: number, icon: string, color: string }) => (
    <div className={`bg-white dark:bg-secondary-800 rounded-lg shadow p-4 flex items-center border-l-4 ${color}`}>
        <div className="mr-4 text-2xl">
            <i className={icon}></i>
        </div>
        <div>
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white">{title}</h3>
            <p className="text-2xl font-bold dark:text-white">{count}</p>
        </div>
    </div>
);

// Tarjeta para mostrar KPIs financieros
const FinancialCard = ({ title, value, change, isPositive, period }: { title: string, value: number, change?: number, isPositive?: boolean, period?: any }) => (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">{title}</h3>
        <p className="text-2xl font-bold dark:text-white">{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value)}</p>
        {change !== undefined && (
            <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '↑' : '↓'} {change}%
            </p>
        )}
        {period && (
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                Período: {new Date(period.start).toLocaleDateString()} - {new Date(period.end).toLocaleDateString()}
            </p>
        )}
    </div>
);
// Componente para la tabla de elementos con poco stock
const LowStockTable = ({ items, type }: { items: any[], type: 'products' | 'materials' }) => {
    const { t } = useTranslation();
    const isProduct = type === 'products';

    return (
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-700">
                <h3 className="text-lg font-medium text-secondary-900 dark:text-white">
                    {isProduct ? t('dashboard.lowStockProducts') : t('dashboard.lowStockMaterials')}
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
                    <thead className="bg-secondary-50 dark:bg-secondary-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                                {t('commons.code')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                                {t('commons.name')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                                {t('commons.stock')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                                {t('commons.minLevel')}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
                                {isProduct ? t('commons.price') : t('commons.cost')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900 dark:text-white">
                                    {item.code}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                                    {Number(item.stockQuantity).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                                    {Number(item.minStockLevel).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                                    {isProduct
                                        ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(item.retailPrice))
                                        : new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(item.costPrice))
                                    }
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-center text-secondary-500 dark:text-secondary-400">
                                    {t('commons.noData')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Gráfico de tendencia de ventas
const SalesTrendChart = ({ data }: { data: { labels: string[], data: number[], period?: any } }) => {
    const { t } = useTranslation();
    const chartData = data.labels.map((month, index) => ({
        month,
        sales: data.data[index]
    }));

    return (
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">{t('dashboard.salesTrend')}</h3>
            {data.period && (
                <div className="text-xs text-secondary-500 dark:text-secondary-400 mb-4">
                    <span className="font-medium">Período:</span> {new Date(data.period.start).toLocaleDateString()} - {new Date(data.period.end).toLocaleDateString()}
                </div>
            )}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(value))} />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#2563eb" activeDot={{ r: 8 }} name="Ventas" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// Gráfico de productos más vendidos
const TopProductsChart = ({ products, period }: { products: any[], period?: any }) => {
    const { t } = useTranslation();
    const chartData = products.map(product => ({
        name: product.name,
        quantity: Number(product.quantity)
    }));

    // Colores para las barras
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">{t('dashboard.topProducts')}</h3>
            {period && (
                <div className="text-xs text-secondary-500 dark:text-secondary-400 mb-4">
                    <span className="font-medium">{t('dateFilter.customRange')}:</span> {new Date(period.start).toLocaleDateString()} - {new Date(period.end).toLocaleDateString()}
                </div>
            )}
            {chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-secondary-500 dark:text-secondary-400">
                    {t('commons.noData')}
                </div>
            ) : (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="quantity" name="Cantidad">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

// Gráfico de clientes principales
const TopCustomersChart = ({ customers, period }: { customers: any[], period?: any }) => {
    const { t } = useTranslation();
    const chartData = customers.map(customer => ({
        name: customer.name,
        value: Number(customer.totalAmount)
    }));

    // Colores para el gráfico de torta
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    return (
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-4">
                {t('dashboard.topCustomers')}
            </h3>
            {period && (
                <div className="text-xs text-secondary-500 dark:text-secondary-400 mb-4">
                    <span className="font-medium">{t('dateFilter.customRange')}:</span> {new Date(period.start).toLocaleDateString()} - {new Date(period.end).toLocaleDateString()}
                </div>
            )}
            {chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-secondary-500 dark:text-secondary-400">
                    {t('commons.noData')}
                </div>
            ) : (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(value))} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

// Página principal del dashboard
const DashboardPage: React.FC = () => {
    const { t } = useTranslation();

    // Estados para almacenar datos del dashboard
    const [summary, setSummary] = useState<any>({ entities: {} });
    const [financialData, setFinancialData] = useState<any>({ sales: 0, purchases: 0, grossProfit: 0 });
    const [lowStockItems, setLowStockItems] = useState<any>({ products: [], materials: [] });
    const [salesTrends, setSalesTrends] = useState<any>({ labels: [], data: [] });
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [topCustomers, setTopCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
// Estados para el filtro de fechas
const [startDate, setStartDate] = useState<string>('');
const [endDate, setEndDate] = useState<string>('');
const [dataRefreshTrigger, setDataRefreshTrigger] = useState<number>(0);

// Manejador para el cambio de rango de fechas
const handleDateRangeChange = (start: string, end: string) => {
  setStartDate(start);
  setEndDate(end);
  // Incrementar el trigger para forzar la recarga de datos
  setDataRefreshTrigger(prev => prev + 1);
};
useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Cargar todos los datos en paralelo usando las fechas seleccionadas
        const [
          summaryData,
          financialSummary,
          lowStock,
          salesTrendsData,
          topProductsData,
          customersData
        ] = await Promise.all([
          dashboardService.getDashboardSummary(),
          dashboardService.getFinancialSummary(startDate, endDate),
          dashboardService.getLowStockItems(),
          dashboardService.getSalesTrends(startDate, endDate),
          dashboardService.getTopSellingProducts(startDate, endDate),
          dashboardService.getTopCustomers(startDate, endDate)
        ]);
        
        // Actualizar estados con los datos obtenidos
        setSummary(summaryData);
        setFinancialData(financialSummary);
        setLowStockItems(lowStock);
        setSalesTrends(salesTrendsData);
        setTopProducts(topProductsData?.products || []);
        setTopCustomers(customersData?.customers || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [startDate, endDate, dataRefreshTrigger]);
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">{t('dashboard.title')}</h1>
  {/* Filtro de fechas */}
  <div className="w-full sm:w-auto">
    <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
  </div>
     
{/* Período seleccionado */}
{(startDate && endDate) && (
  <div className="bg-secondary-50 dark:bg-secondary-800 p-3 rounded-md border border-secondary-200 dark:border-secondary-700">
    <p className="text-sm text-secondary-600 dark:text-secondary-300">
      <i className="fas fa-info-circle mr-2"></i>
      Mostrando datos del período: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
    </p>
  </div>
)}
            {/* Tarjetas de resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryCard
                    title={t('models.customer.title')}
                    count={summary.entities.customers || 0}
                    icon="fas fa-users"
                    color="border-blue-500"
                />
                <SummaryCard
                    title={t('models.product.title')}
                    count={summary.entities.products || 0}
                    icon="fas fa-box"
                    color="border-green-500"
                />
                <SummaryCard
                    title={t('models.sale.title')}
                    count={summary.entities.sales || 0}
                    icon="fas fa-shopping-cart"
                    color="border-yellow-500"
                />
                <SummaryCard
                    title={t('models.purchase.title')}
                    count={summary.entities.purchases || 0}
                    icon="fas fa-truck"
                    color="border-purple-500"
                />
            </div>

            {/* KPIs financieros */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FinancialCard
                    title={t('dashboard.monthlySales')}
                    value={financialData.sales}
                    period={financialData.period}
                />
                <FinancialCard
                    title={t('dashboard.monthlyPurchases')}
                    value={financialData.purchases}
                    period={financialData.period}
                />
                <FinancialCard
                    title={t('dashboard.grossProfit')}
                    value={financialData.grossProfit}
                    period={financialData.period}
                />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesTrendChart data={salesTrends} />
                <TopProductsChart products={topProducts} period={salesTrends.period} />
            </div>

            {/* Top clientes y Productos con poco stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopCustomersChart customers={topCustomers} period={salesTrends.period} />
                <LowStockTable items={lowStockItems.products} type="products" />
            </div>

            {/* Materiales con poco stock */}
            <div>
                <LowStockTable items={lowStockItems.materials} type="materials" />
            </div>
        </div>
    );
};

export default DashboardPage;