
  import apiClient from './apiClient';

  // Tipos
  export interface Material {
    id: number;
  code: string;
  name: string;
  description: string;
  unitOfMeasure: string;
  stockQuantity: number;
  minStockLevel: number;
  costPrice: number;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  suppliers: MaterialSupplier[];
  purchaseItems: PurchaseItem[];
  productionInputs: ProductionInput[];
  categoryId: number;
  category: MaterialCategory;
  locations: MaterialLocation[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type MaterialInput = Omit<Material, 'id' | 'createdAt' | 'updatedAt' | 'suppliers' | 'purchaseItems' | 'productionInputs' | 'locations'>;

  // Endpoints
  const API_ENDPOINT = '/materials';

  // Servicio para Material
  export const MaterialService = {
    // Obtener todos los registros
    getAll: async (): Promise<Material[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Material> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: MaterialInput): Promise<Material> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<MaterialInput>): Promise<Material> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  