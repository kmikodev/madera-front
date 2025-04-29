
  import apiClient from './apiClient';

  // Tipos
  export interface AccountingEntryLine {
    id: number;
  entry: AccountingEntry;
  entryId: number;
  description: string;
  debitAccount: AccountingAccount;
  debitAccountId: number;
  creditAccount: AccountingAccount;
  creditAccountId: number;
  amount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type AccountingEntryLineInput = Omit<AccountingEntryLine, 'id' | 'createdAt' | 'updatedAt'>;

  // Endpoints
  const API_ENDPOINT = '/accountingEntryLines';

  // Servicio para AccountingEntryLine
  export const AccountingEntryLineService = {
    // Obtener todos los registros
    getAll: async (): Promise<AccountingEntryLine[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<AccountingEntryLine> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: AccountingEntryLineInput): Promise<AccountingEntryLine> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<AccountingEntryLineInput>): Promise<AccountingEntryLine> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  