
  import apiClient from './apiClient';

  // Tipos
  export interface SupplierContact {
    id: number;
  supplierId: number;
  supplier: Supplier;
  name: string;
  position: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type SupplierContactInput = Omit<SupplierContact, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/supplierContacts';

  // Servicio para SupplierContact
  export const SupplierContactService = {
    // Obtener todos los registros
    getAll: async (): Promise<SupplierContact[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<SupplierContact> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: SupplierContactInput): Promise<SupplierContact> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<SupplierContactInput>): Promise<SupplierContact> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  