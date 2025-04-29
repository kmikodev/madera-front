
  import apiClient from './apiClient';

  // Tipos
  export interface AccountingAccount {
    id: number;
  code: string;
  name: string;
  accountType: AccountType;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  debitEntries: AccountingEntryLine[];
  creditEntries: AccountingEntryLine[];
  budgets: AccountBudget[];
  parentId: number;
  parent: AccountingAccount;
  children: AccountingAccount[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type AccountingAccountInput = Omit<AccountingAccount, 'id' | 'createdAt' | 'updatedAt' | 'debitEntries' | 'creditEntries' | 'budgets' | 'children'>;

  // Endpoints
  const API_ENDPOINT = '/accountingAccounts';

  // Servicio para AccountingAccount
  export const AccountingAccountService = {
    // Obtener todos los registros
    getAll: async (): Promise<AccountingAccount[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<AccountingAccount> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: AccountingAccountInput): Promise<AccountingAccount> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<AccountingAccountInput>): Promise<AccountingAccount> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  