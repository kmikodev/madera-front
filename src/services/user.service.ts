
  import apiClient from './apiClient';

  // Tipos
  export interface User {
    id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  role: Role;
  roleId: number;
  employee: Employee;
  auditLogs: AuditLog[];
  apiKeys: ApiKey[];
  lastLogin: Date | string;
  failedAttempts: number;
  lockedUntil: Date | string;
  passwordResetToken: string;
  passwordHistory: PasswordHistory[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type UserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'auditLogs' | 'apiKeys' | 'passwordHistory'>;

  // Endpoints
  const API_ENDPOINT = '/users';

  // Servicio para User
  export const UserService = {
    // Obtener todos los registros
    getAll: async (): Promise<User[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<User> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: UserInput): Promise<User> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<UserInput>): Promise<User> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  