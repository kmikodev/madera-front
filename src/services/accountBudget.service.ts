
  import apiClient from './apiClient';

  // Tipos
  export interface AccountBudget {
    id: number;
  fiscalYearId: number;
  fiscalYear: FiscalYear;
  accountId: number;
  account: AccountingAccount;
  budgetAmount: number;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type AccountBudgetInput = Omit<AccountBudget, 'id' | 'createdAt' | 'updatedAt'>;

  // Endpoints
  const API_ENDPOINT = '/accountBudgets';

  // Servicio para AccountBudget
  export const AccountBudgetService = {
    // Obtener todos los registros
    getAll: async (): Promise<AccountBudget[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<AccountBudget> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: AccountBudgetInput): Promise<AccountBudget> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<AccountBudgetInput>): Promise<AccountBudget> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  