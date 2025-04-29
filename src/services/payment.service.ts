
  import apiClient from './apiClient';

  // Tipos
  export interface Payment {
    id: number;
  reference: string;
  invoice: Invoice;
  invoiceId: number;
  amount: number;
  date: Date | string;
  paymentMethod: PaymentMethod;
  notes: string;
  sepaRemittance: SepaRemittance;
  sepaRemittanceId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  accountingEntry: AccountingEntry;
  recordedById: number;
  recordedBy: Employee;
  bankReference: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type PaymentInput = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

  // Endpoints
  const API_ENDPOINT = '/payments';

  // Servicio para Payment
  export const PaymentService = {
    // Obtener todos los registros
    getAll: async (): Promise<Payment[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Payment> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: PaymentInput): Promise<Payment> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<PaymentInput>): Promise<Payment> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  