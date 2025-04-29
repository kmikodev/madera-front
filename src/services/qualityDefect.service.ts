
  import apiClient from './apiClient';

  // Tipos
  export interface QualityDefect {
    id: number;
  qualityControlId: number;
  qualityControl: QualityControl;
  defectType: string;
  description: string;
  severity: DefectSeverity;
  quantity: number;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type QualityDefectInput = Omit<QualityDefect, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/qualityDefects';

  // Servicio para QualityDefect
  export const QualityDefectService = {
    // Obtener todos los registros
    getAll: async (): Promise<QualityDefect[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<QualityDefect> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: QualityDefectInput): Promise<QualityDefect> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<QualityDefectInput>): Promise<QualityDefect> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  