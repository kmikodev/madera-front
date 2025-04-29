
  import apiClient from './apiClient';

  // Tipos
  export interface SepaRemittance {
    id: number;
  reference: string;
  generationDate: Date | string;
  submissionDate: Date | string;
  status: SepaStatus;
  totalAmount: number;
  messageId: string;
  notes: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  payments: Payment[];
  creatorId: number;
  creator: Employee;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type SepaRemittanceInput = Omit<SepaRemittance, 'id' | 'createdAt' | 'updatedAt' | 'payments'>;

  // Endpoints
  const API_ENDPOINT = '/sepaRemittances';

  // Servicio para SepaRemittance
  export const SepaRemittanceService = {
    // Obtener todos los registros
    getAll: async (): Promise<SepaRemittance[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<SepaRemittance> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: SepaRemittanceInput): Promise<SepaRemittance> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<SepaRemittanceInput>): Promise<SepaRemittance> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  