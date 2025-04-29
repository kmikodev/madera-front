
  import apiClient from './apiClient';

  // Tipos
  export interface Production {
    id: number;
  reference: string;
  startDate: Date | string;
  endDate: Date | string;
  status: ProductionStatus;
  notes: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  inputs: ProductionInput[];
  outputs: ProductionOutput[];
  warehouseId: number;
  warehouse: Warehouse;
  responsibleId: number;
  responsible: Employee;
  qualityControls: QualityControl[];
  laborCost: number;
  overheadCost: number;
  batchNumber: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ProductionInput = Omit<Production, 'id' | 'createdAt' | 'updatedAt' | 'inputs' | 'outputs' | 'qualityControls'>;

  // Endpoints
  const API_ENDPOINT = '/productions';

  // Servicio para Production
  export const ProductionService = {
    // Obtener todos los registros
    getAll: async (): Promise<Production[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Production> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ProductionInput): Promise<Production> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ProductionInput>): Promise<Production> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  