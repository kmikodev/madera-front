
  import apiClient from './apiClient';

  // Tipos
  export interface QualityControl {
    id: number;
  productionId: number;
  production: Production;
  inspectionDate: Date | string;
  inspectorId: number;
  inspector: Employee;
  passedInspection: boolean;
  notes: string;
  defects: QualityDefect[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type QualityControlInput = Omit<QualityControl, 'id' | 'defects'>;

  // Endpoints
  const API_ENDPOINT = '/qualityControls';

  // Servicio para QualityControl
  export const QualityControlService = {
    // Obtener todos los registros
    getAll: async (): Promise<QualityControl[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<QualityControl> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: QualityControlInput): Promise<QualityControl> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<QualityControlInput>): Promise<QualityControl> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  