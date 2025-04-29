
  import apiClient from './apiClient';

  // Tipos
  export interface AccountingEntry {
    id: number;
  reference: string;
  date: Date | string;
  description: string;
  isAdjustment: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  lines: AccountingEntryLine[];
  invoice: Invoice;
  invoiceId: number;
  payment: Payment;
  paymentId: number;
  fiscalYearId: number;
  fiscalYear: FiscalYear;
  creatorId: number;
  creator: Employee;
  entryType: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type AccountingEntryInput = Omit<AccountingEntry, 'id' | 'createdAt' | 'updatedAt' | 'lines'>;

  // Endpoints
  const API_ENDPOINT = '/accountingEntrys';

  // Servicio para AccountingEntry
  export const AccountingEntryService = {
    // Obtener todos los registros
    getAll: async (): Promise<AccountingEntry[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<AccountingEntry> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: AccountingEntryInput): Promise<AccountingEntry> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<AccountingEntryInput>): Promise<AccountingEntry> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  