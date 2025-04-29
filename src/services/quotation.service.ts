
  import apiClient from './apiClient';

  // Tipos
  export interface Quotation {
    id: number;
  reference: string;
  customer: Customer;
  customerId: number;
  date: Date | string;
  validUntil: Date | string;
  status: QuotationStatus;
  totalAmount: number;
  notes: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  items: QuotationItem[];
  sales: Sale[];
  creatorId: number;
  creator: Employee;
  discountPercent: number;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type QuotationInput = Omit<Quotation, 'id' | 'createdAt' | 'updatedAt' | 'items' | 'sales'>;

  // Endpoints
  const API_ENDPOINT = '/quotations';

  // Servicio para Quotation
  export const QuotationService = {
    // Obtener todos los registros
    getAll: async (): Promise<Quotation[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Quotation> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: QuotationInput): Promise<Quotation> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<QuotationInput>): Promise<Quotation> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  