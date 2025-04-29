
  import apiClient from './apiClient';

  // Tipos
  export interface ProductImage {
    id: number;
  productId: number;
  product: Product;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ProductImageInput = Omit<ProductImage, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/productImages';

  // Servicio para ProductImage
  export const ProductImageService = {
    // Obtener todos los registros
    getAll: async (): Promise<ProductImage[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<ProductImage> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ProductImageInput): Promise<ProductImage> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ProductImageInput>): Promise<ProductImage> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  