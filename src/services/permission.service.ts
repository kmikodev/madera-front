
  import apiClient from './apiClient';

  // Tipos
  export interface Permission {
    id: number;
  name: string;
  description: string;
  roles: Role[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type PermissionInput = Omit<Permission, 'id' | 'roles'>;

  // Endpoints
  const API_ENDPOINT = '/permissions';

  // Servicio para Permission
  export const PermissionService = {
    // Obtener todos los registros
    getAll: async (): Promise<Permission[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Permission> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: PermissionInput): Promise<Permission> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<PermissionInput>): Promise<Permission> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  