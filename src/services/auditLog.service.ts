
  import apiClient from './apiClient';

  // Tipos
  export interface AuditLog {
    id: number;
  user: User;
  userId: number;
  action: string;
  entityType: string;
  entityId: string;
  oldValue: Record<string, any>;
  newValue: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date | string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type AuditLogInput = Omit<AuditLog, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/auditLogs';

  // Servicio para AuditLog
  export const AuditLogService = {
    // Obtener todos los registros
    getAll: async (): Promise<AuditLog[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<AuditLog> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: AuditLogInput): Promise<AuditLog> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<AuditLogInput>): Promise<AuditLog> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  