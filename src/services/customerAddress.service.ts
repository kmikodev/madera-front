
  import apiClient from './apiClient';

  // Tipos
  export interface CustomerAddress {
    id: number;
  customerId: number;
  customer: Customer;
  addressType: AddressType;
  street: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
  isDefault: boolean;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type CustomerAddressInput = Omit<CustomerAddress, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/customerAddresss';

  // Servicio para CustomerAddress
  export const CustomerAddressService = {
    // Obtener todos los registros
    getAll: async (): Promise<CustomerAddress[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<CustomerAddress> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: CustomerAddressInput): Promise<CustomerAddress> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<CustomerAddressInput>): Promise<CustomerAddress> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  