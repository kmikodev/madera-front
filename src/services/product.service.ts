
  import apiClient from './apiClient';

  // Tipos
  export interface Product {
    id: number;
  code: string;
  name: string;
  description: string;
  unitOfMeasure: string;
  stockQuantity: number;
  minStockLevel: number;
  retailPrice: number;
  wholesalePrice: number;
  costPrice: number;
  taxRate: number;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  productionOutputs: ProductionOutput[];
  saleItems: SaleItem[];
  quotationItems: QuotationItem[];
  categoryId: number;
  category: ProductCategory;
  images: ProductImage[];
  attributes: ProductAttribute[];
  locations: ProductLocation[];
  barcode: string;
  weight: number;
  dimensions: string;
  returnOrderItems: ReturnOrderItem[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'productionOutputs' | 'saleItems' | 'quotationItems' | 'images' | 'attributes' | 'locations' | 'returnOrderItems'>;

  // Endpoints
  const API_ENDPOINT = '/products';

  // Servicio para Product
  export const ProductService = {
    // Obtener todos los registros
    getAll: async (): Promise<Product[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Product> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: ProductInput): Promise<Product> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<ProductInput>): Promise<Product> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  