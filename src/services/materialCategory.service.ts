
  import apiClient from './apiClient';

  // Tipos
  export interface MaterialCategory {
    id: number;
  name: string;
  description: string;
  parentId: number;
  parent: MaterialCategory;
  children: MaterialCategory[];
  materials: Material[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type MaterialCategoryInput = Omit<MaterialCategory, 'id' | 'children' | 'materials'>;

  // Endpoints
  const API_ENDPOINT = '/materialCategorys';

  // Servicio para MaterialCategory
  export const MaterialCategoryService = {
    // Obtener todos los registros
    getAll: async (): Promise<MaterialCategory[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<MaterialCategory> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: MaterialCategoryInput): Promise<MaterialCategory> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<MaterialCategoryInput>): Promise<MaterialCategory> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  