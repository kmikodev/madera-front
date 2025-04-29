
  import apiClient from './apiClient';

  // Tipos
  export interface ProductionInput {
    id: number;
  production: Production;
  productionId: number;
  material: Material;
  materialId: number;
  quantity: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  unitCost: number;
  locationId: number;
  location: WarehouseLocation;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ProductionInputInput = Omit<ProductionInput, 'id' | 'createdAt' | 'updatedAt'>;

  // Endpoints
  const API_ENDPOINT = '/productionInputs';

  // Servicio para ProductionInput
  export const ProductionInputService = {
    // Obtener todos los registros
    getAll: async (): Promise<ProductionInput[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ProductionInput> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ProductionInputInput): Promise<ProductionInput> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ProductionInputInput>): Promise<ProductionInput> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  