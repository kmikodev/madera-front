
  import apiClient from './apiClient';

  // Tipos
  export interface FiscalYear {
    id: number;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  isClosed: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  accountingEntries: AccountingEntry[];
  budgets: AccountBudget[];
  invoices: Invoice[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type FiscalYearInput = Omit<FiscalYear, 'id' | 'createdAt' | 'updatedAt' | 'accountingEntries' | 'budgets' | 'invoices'>;

  // Endpoints
  const API_ENDPOINT = '/fiscalYears';

  // Servicio para FiscalYear
  export const FiscalYearService = {
    // Obtener todos los registros
    getAll: async (): Promise<FiscalYear[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<FiscalYear> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: FiscalYearInput): Promise<FiscalYear> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<FiscalYearInput>): Promise<FiscalYear> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  