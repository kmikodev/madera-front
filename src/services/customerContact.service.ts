
  import apiClient from './apiClient';

  // Tipos
  export interface CustomerContact {
    id: number;
  customerId: number;
  customer: Customer;
  name: string;
  position: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  department: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type CustomerContactInput = Omit<CustomerContact, 'id'>;

  // Endpoints
  const API_ENDPOINT = '/customerContacts';

  // Servicio para CustomerContact
  export const CustomerContactService = {
    // Obtener todos los registros
    getAll: async (): Promise<CustomerContact[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<CustomerContact> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: CustomerContactInput): Promise<CustomerContact> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<CustomerContactInput>): Promise<CustomerContact> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  