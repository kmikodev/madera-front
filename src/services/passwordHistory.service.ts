
  import apiClient from './apiClient';

  // Tipos
  export interface PasswordHistory {
    id: number;
  userId: number;
  user: User;
  password: string;
  createdAt: Date | string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type PasswordHistoryInput = Omit<PasswordHistory, 'id' | 'createdAt'>;

  // Endpoints
  const API_ENDPOINT = '/passwordHistorys';

  // Servicio para PasswordHistory
  export const PasswordHistoryService = {
    // Obtener todos los registros
    getAll: async (): Promise<PasswordHistory[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<PasswordHistory> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: PasswordHistoryInput): Promise<PasswordHistory> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<PasswordHistoryInput>): Promise<PasswordHistory> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  