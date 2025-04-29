
  import apiClient from './apiClient';

  // Tipos
  export interface PurchaseItem {
    id: number;
  purchase: Purchase;
  purchaseId: number;
  material: Material;
  materialId: number;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  receivedQuantity: number;
  locationId: number;
  location: WarehouseLocation;
  discountPercent: number;
  notes: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type PurchaseItemInput = Omit<PurchaseItem, 'id' | 'createdAt' | 'updatedAt'>;

  // Endpoints
  const API_ENDPOINT = '/purchaseItems';

  // Servicio para PurchaseItem
  export const PurchaseItemService = {
    // Obtener todos los registros
    getAll: async (): Promise<PurchaseItem[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<PurchaseItem> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: PurchaseItemInput): Promise<PurchaseItem> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<PurchaseItemInput>): Promise<PurchaseItem> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  