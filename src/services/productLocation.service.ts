
  import apiClient from './apiClient';

  // Tipos
  export interface ProductLocation {
    id: number;
  productId: number;
  product: Product;
  locationId: number;
  location: WarehouseLocation;
  quantity: number;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ProductLocationInput = Omit<ProductLocation, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/productLocations';

  // Servicio para ProductLocation
  export const ProductLocationService = {
    // Obtener todos los registros
    getAll: async (): Promise<ProductLocation[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ProductLocation> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ProductLocationInput): Promise<ProductLocation> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ProductLocationInput>): Promise<ProductLocation> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  