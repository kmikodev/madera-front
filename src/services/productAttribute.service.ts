
  import apiClient from './apiClient';

  // Tipos
  export interface ProductAttribute {
    id: number;
  productId: number;
  product: Product;
  name: string;
  value: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ProductAttributeInput = Omit<ProductAttribute, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/productAttributes';

  // Servicio para ProductAttribute
  export const ProductAttributeService = {
    // Obtener todos los registros
    getAll: async (): Promise<ProductAttribute[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ProductAttribute> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ProductAttributeInput): Promise<ProductAttribute> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ProductAttributeInput>): Promise<ProductAttribute> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  