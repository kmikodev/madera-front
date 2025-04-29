
  import apiClient from './apiClient';

  // Tipos
  export interface QuotationItem {
    id: number;
  quotation: Quotation;
  quotationId: number;
  product: Product;
  productId: number;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  discountPercent: number;
  notes: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type QuotationItemInput = Omit<QuotationItem, 'id' | 'createdAt' | 'updatedAt'>;

  // Endpoints
  const API_ENDPOINT = '/quotationItems';

  // Servicio para QuotationItem
  export const QuotationItemService = {
    // Obtener todos los registros
    getAll: async (): Promise<QuotationItem[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<QuotationItem> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: QuotationItemInput): Promise<QuotationItem> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<QuotationItemInput>): Promise<QuotationItem> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  