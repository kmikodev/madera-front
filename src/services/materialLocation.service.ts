
  import apiClient from './apiClient';

  // Tipos
  export interface MaterialLocation {
    id: number;
  materialId: number;
  material: Material;
  locationId: number;
  location: WarehouseLocation;
  quantity: number;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type MaterialLocationInput = Omit<MaterialLocation, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/materialLocations';

  // Servicio para MaterialLocation
  export const MaterialLocationService = {
    // Obtener todos los registros
    getAll: async (): Promise<MaterialLocation[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<MaterialLocation> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: MaterialLocationInput): Promise<MaterialLocation> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<MaterialLocationInput>): Promise<MaterialLocation> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  