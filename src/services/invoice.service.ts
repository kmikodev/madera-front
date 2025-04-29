
  import apiClient from './apiClient';

  // Tipos
  export interface Invoice {
    id: number;
  invoiceNumber: string;
  invoiceType: InvoiceType;
  date: Date | string;
  dueDate: Date | string;
  status: InvoiceStatus;
  totalBase: number;
  totalTax: number;
  totalAmount: number;
  notes: string;
  purchases: Purchase[];
  sales: Sale[];
  createdAt: Date | string;
  updatedAt: Date | string;
  accountingEntry: AccountingEntry;
  aeatSubmitted: boolean;
  aeatSubmissionDate: Date | string;
  aeatSubmissionId: string;
  payments: Payment[];
  fiscalYearId: number;
  fiscalYear: FiscalYear;
  creatorId: number;
  creator: Employee;
  creditNote: boolean;
  originalInvoiceId: number;
  originalInvoice: Invoice;
  correctionInvoices: Invoice[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type InvoiceInput = Omit<Invoice, 'id' | 'createdAt' | 'updatedAt' | 'purchases' | 'sales' | 'payments' | 'correctionInvoices'>;

  // Endpoints
  const API_ENDPOINT = '/invoices';

  // Servicio para Invoice
  export const InvoiceService = {
    // Obtener todos los registros
    getAll: async (): Promise<Invoice[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Invoice> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: InvoiceInput): Promise<Invoice> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<InvoiceInput>): Promise<Invoice> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  