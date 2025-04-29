
  import apiClient from './apiClient';

  // Tipos
  export interface ProductCategory {
    id: number;
  name: string;
  description: string;
  parentId: number;
  parent: ProductCategory;
  children: ProductCategory[];
  products: Product[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ProductCategoryInput = Omit<ProductCategory, 'id' | 'children' | 'products'>;

  // Endpoints
  const API_ENDPOINT = '/productCategorys';

  // Servicio para ProductCategory
  export const ProductCategoryService = {
    // Obtener todos los registros
    getAll: async (): Promise<ProductCategory[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ProductCategory> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ProductCategoryInput): Promise<ProductCategory> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ProductCategoryInput>): Promise<ProductCategory> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  