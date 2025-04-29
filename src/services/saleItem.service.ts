
  import apiClient from './apiClient';

  // Tipos
  export interface SaleItem {
    id: number;
  sale: Sale;
  saleId: number;
  product: Product;
  productId: number;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deliveredQuantity: number;
  locationId: number;
  location: WarehouseLocation;
  discountPercent: number;
  notes: string;
  returnItems: ReturnOrderItem[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type SaleItemInput = Omit<SaleItem, 'id' | 'createdAt' | 'updatedAt' | 'returnItems'>;

  // Endpoints
  const API_ENDPOINT = '/saleItems';

  // Servicio para SaleItem
  export const SaleItemService = {
    // Obtener todos los registros
    getAll: async (): Promise<SaleItem[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<SaleItem> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: SaleItemInput): Promise<SaleItem> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<SaleItemInput>): Promise<SaleItem> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  