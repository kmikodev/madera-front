
  import apiClient from './apiClient';

  // Tipos
  export interface Sale {
    id: number;
  reference: string;
  customer: Customer;
  customerId: number;
  date: Date | string;
  deliveryDate: Date | string;
  status: SaleStatus;
  totalAmount: number;
  notes: string;
  fromQuotation: Quotation;
  quotationId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  items: SaleItem[];
  invoices: Invoice[];
  warehouseId: number;
  warehouse: Warehouse;
  salesRepId: number;
  salesRep: Employee;
  deliveryAddress: string;
  shippingMethod: string;
  paymentMethod: PaymentMethod;
  discountPercent: number;
  returnOrders: ReturnOrder[];
  deliveryNote: string;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type SaleInput = Omit<Sale, 'id' | 'createdAt' | 'updatedAt' | 'items' | 'invoices' | 'returnOrders'>;

  // Endpoints
  const API_ENDPOINT = '/sales';

  // Servicio para Sale
  export const SaleService = {
    // Obtener todos los registros
    getAll: async (): Promise<Sale[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Sale> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: SaleInput): Promise<Sale> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<SaleInput>): Promise<Sale> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  