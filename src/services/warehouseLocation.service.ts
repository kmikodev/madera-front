
  import apiClient from './apiClient';

  // Tipos
  export interface WarehouseLocation {
    id: number;
  warehouseId: number;
  warehouse: Warehouse;
  code: string;
  description: string;
  productLocations: ProductLocation[];
  materialLocations: MaterialLocation[];
  productionInputs: ProductionInput[];
  productionOutputs: ProductionOutput[];
  purchaseItems: PurchaseItem[];
  saleItems: SaleItem[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type WarehouseLocationInput = Omit<WarehouseLocation, 'id' | 'productLocations' | 'materialLocations' | 'productionInputs' | 'productionOutputs' | 'purchaseItems' | 'saleItems'>;

  // Endpoints
  const API_ENDPOINT = '/warehouseLocations';

  // Servicio para WarehouseLocation
  export const WarehouseLocationService = {
    // Obtener todos los registros
    getAll: async (): Promise<WarehouseLocation[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<WarehouseLocation> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: WarehouseLocationInput): Promise<WarehouseLocation> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<WarehouseLocationInput>): Promise<WarehouseLocation> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  