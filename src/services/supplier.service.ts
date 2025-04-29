
  import apiClient from './apiClient';

  // Tipos
  export interface Supplier {
    id: number;
  name: string;
  nif: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  purchases: Purchase[];
  materials: MaterialSupplier[];
  addresses: SupplierAddress[];
  contacts: SupplierContact[];
  paymentTerms: PaymentTerms;
  notes: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type SupplierInput = Omit<Supplier, 'id' | 'createdAt' | 'updatedAt' | 'purchases' | 'materials' | 'addresses' | 'contacts'>;

  // Endpoints
  const API_ENDPOINT = '/suppliers';

  // Servicio para Supplier
  export const SupplierService = {
    // Obtener todos los registros
    getAll: async (): Promise<Supplier[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Supplier> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: SupplierInput): Promise<Supplier> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<SupplierInput>): Promise<Supplier> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  