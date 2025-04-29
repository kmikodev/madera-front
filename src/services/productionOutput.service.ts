
  import apiClient from './apiClient';

  // Tipos
  export interface ProductionOutput {
    id: number;
  production: Production;
  productionId: number;
  product: Product;
  productId: number;
  quantity: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  finalCost: number;
  locationId: number;
  location: WarehouseLocation;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ProductionOutputInput = Omit<ProductionOutput, 'id' | 'createdAt' | 'updatedAt'>;

  // Endpoints
  const API_ENDPOINT = '/productionOutputs';

  // Servicio para ProductionOutput
  export const ProductionOutputService = {
    // Obtener todos los registros
    getAll: async (): Promise<ProductionOutput[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ProductionOutput> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ProductionOutputInput): Promise<ProductionOutput> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ProductionOutputInput>): Promise<ProductionOutput> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  