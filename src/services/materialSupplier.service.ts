
  import apiClient from './apiClient';

  // Tipos
  export interface MaterialSupplier {
    material: Material;
  materialId: number;
  supplier: Supplier;
  supplierId: number;
  supplierCode: string;
  price: number;
  leadTimeDays: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  isPreferred: boolean;
  minOrderQuantity: number;
  lastPurchaseDate: Date | string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type MaterialSupplierInput = Omit<MaterialSupplier, 'createdAt' | 'updatedAt'>;

  // Endpoints
  const API_ENDPOINT = '/materialSuppliers';

  // Servicio para MaterialSupplier
  export const MaterialSupplierService = {
    // Obtener todos los registros
    getAll: async (): Promise<MaterialSupplier[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: string): Promise<MaterialSupplier> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: MaterialSupplierInput): Promise<MaterialSupplier> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: string, data: Partial<MaterialSupplierInput>): Promise<MaterialSupplier> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  