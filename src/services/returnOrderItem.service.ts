
  import apiClient from './apiClient';

  // Tipos
  export interface ReturnOrderItem {
    id: number;
  returnOrderId: number;
  returnOrder: ReturnOrder;
  saleItemId: number;
  saleItem: SaleItem;
  productId: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  total: number;
  reason: string;
  condition: ReturnCondition;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ReturnOrderItemInput = Omit<ReturnOrderItem, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/returnOrderItems';

  // Servicio para ReturnOrderItem
  export const ReturnOrderItemService = {
    // Obtener todos los registros
    getAll: async (): Promise<ReturnOrderItem[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ReturnOrderItem> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ReturnOrderItemInput): Promise<ReturnOrderItem> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ReturnOrderItemInput>): Promise<ReturnOrderItem> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  