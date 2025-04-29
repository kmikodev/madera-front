
  import apiClient from './apiClient';

  // Tipos
  export interface SupplierAddress {
    id: number;
  supplierId: number;
  supplier: Supplier;
  addressType: AddressType;
  street: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
  isDefault: boolean;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type SupplierAddressInput = Omit<SupplierAddress, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/supplierAddresss';

  // Servicio para SupplierAddress
  export const SupplierAddressService = {
    // Obtener todos los registros
    getAll: async (): Promise<SupplierAddress[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<SupplierAddress> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: SupplierAddressInput): Promise<SupplierAddress> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<SupplierAddressInput>): Promise<SupplierAddress> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  