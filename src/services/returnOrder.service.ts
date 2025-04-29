
  import apiClient from './apiClient';

  // Tipos
  export interface ReturnOrder {
    id: number;
  reference: string;
  saleId: number;
  sale: Sale;
  customerId: number;
  customer: Customer;
  date: Date | string;
  reason: string;
  status: ReturnStatus;
  totalAmount: number;
  notes: string;
  items: ReturnOrderItem[];
  createdAt: Date | string;
  updatedAt: Date | string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ReturnOrderInput = Omit<ReturnOrder, 'id' | 'createdAt' | 'updatedAt' | 'items'>;

  // Endpoints
  const API_ENDPOINT = '/returnOrders';

  // Servicio para ReturnOrder
  export const ReturnOrderService = {
    // Obtener todos los registros
    getAll: async (): Promise<ReturnOrder[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ReturnOrder> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ReturnOrderInput): Promise<ReturnOrder> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ReturnOrderInput>): Promise<ReturnOrder> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  