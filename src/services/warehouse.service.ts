
  import apiClient from './apiClient';

  // Tipos
  export interface Warehouse {
    id: number;
  code: string;
  name: string;
  address: string;
  active: boolean;
  isDefault: boolean;
  locations: WarehouseLocation[];
  employees: Employee[];
  createdAt: Date | string;
  updatedAt: Date | string;
  productions: Production[];
  purchases: Purchase[];
  sales: Sale[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type WarehouseInput = Omit<Warehouse, 'id' | 'createdAt' | 'updatedAt' | 'locations' | 'employees' | 'productions' | 'purchases' | 'sales'>;

  // Endpoints
  const API_ENDPOINT = '/warehouses';

  // Servicio para Warehouse
  export const WarehouseService = {
    // Obtener todos los registros
    getAll: async (): Promise<Warehouse[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Warehouse> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: WarehouseInput): Promise<Warehouse> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<WarehouseInput>): Promise<Warehouse> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  