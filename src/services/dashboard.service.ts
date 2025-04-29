// src/services/dashboard.service.ts
import apiClient from './apiClient';

export const dashboardService = {
    getFinancialSummary: async (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        
        const response = await apiClient.get(`/dashboard/financial?${params.toString()}`);
        return response.data;
      },
      
      getSalesTrends: async (startDate?: string, endDate?: string, periodType: 'month' | 'week' | 'day' = 'month') => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        params.append('periodType', periodType);
        
        const response = await apiClient.get(`/dashboard/sales-trends?${params.toString()}`);
        return response.data;
      },
      
      getTopSellingProducts: async (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        
        const response = await apiClient.get(`/dashboard/top-products?${params.toString()}`);
        return response.data;
      },
      
      getTopCustomers: async (startDate?: string, endDate?: string) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        
        const response = await apiClient.get(`/dashboard/top-customers?${params.toString()}`);
        return response.data;
      },
  
  getDashboardSummary: async () => {
    const response = await apiClient.get('/dashboard/summary');
    return response.data;
  },
  
  getLowStockItems: async () => {
    const response = await apiClient.get('/dashboard/lowstock');
    return response.data;
  },
};