
  import apiClient from './apiClient';

  // Tipos
  export interface Customer {
    id: number;
  name: string;
  nif: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  customerType: CustomerType;
  paymentTerms: PaymentTerms;
  sepaEnabled: boolean;
  sepaMandateId: string;
  sepaIban: string;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string;
  sales: Sale[];
  quotations: Quotation[];
  addresses: CustomerAddress[];
  contacts: CustomerContact[];
  creditLimit: number;
  discountRate: number;
  customerSince: Date | string;
  segment: CustomerSegment;
  returnOrders: ReturnOrder[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type CustomerInput = Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'sales' | 'quotations' | 'addresses' | 'contacts' | 'returnOrders'>;

  // Endpoints
  const API_ENDPOINT = '/customers';

  // Servicio para Customer
  export const CustomerService = {
    // Obtener todos los registros
    getAll: async (): Promise<Customer[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Customer> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: CustomerInput): Promise<Customer> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<CustomerInput>): Promise<Customer> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  