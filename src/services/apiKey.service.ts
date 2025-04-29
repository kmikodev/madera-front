
  import apiClient from './apiClient';

  // Tipos
  export interface ApiKey {
    id: number;
  userId: number;
  user: User;
  keyValue: string;
  name: string;
  expiresAt: Date | string;
  lastUsed: Date | string;
  createdAt: Date | string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ApiKeyInput = Omit<ApiKey, 'id' | 'createdAt'>;

  // Endpoints
  const API_ENDPOINT = '/apiKeys';

  // Servicio para ApiKey
  export const ApiKeyService = {
    // Obtener todos los registros
    getAll: async (): Promise<ApiKey[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ApiKey> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ApiKeyInput): Promise<ApiKey> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ApiKeyInput>): Promise<ApiKey> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  