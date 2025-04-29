
  import apiClient from './apiClient';

  // Tipos
  export interface Role {
    id: number;
  name: string;
  description: string;
  permissions: Permission[];
  users: User[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type RoleInput = Omit<Role, 'id' | 'permissions' | 'users'>;

  // Endpoints
  const API_ENDPOINT = '/roles';

  // Servicio para Role
  export const RoleService = {
    // Obtener todos los registros
    getAll: async (): Promise<Role[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Role> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: RoleInput): Promise<Role> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<RoleInput>): Promise<Role> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  