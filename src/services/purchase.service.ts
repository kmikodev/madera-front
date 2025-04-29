
  import apiClient from './apiClient';

  // Tipos
  export interface Purchase {
    id: number;
  reference: string;
  supplier: Supplier;
  supplierId: number;
  date: Date | string;
  expectedDelivery: Date | string;
  status: PurchaseStatus;
  totalAmount: number;
  notes: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  items: PurchaseItem[];
  invoices: Invoice[];
  warehouseId: number;
  warehouse: Warehouse;
  requesterId: number;
  requester: Employee;
  approverId: number;
  approver: Employee;
  receivedDate: Date | string;
  deliveryNote: string;
  discountPercent: number;
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type PurchaseInput = Omit<Purchase, 'id' | 'createdAt' | 'updatedAt' | 'items' | 'invoices'>;

  // Endpoints
  const API_ENDPOINT = '/purchases';

  // Servicio para Purchase
  export const PurchaseService = {
    // Obtener todos los registros
    getAll: async (): Promise<Purchase[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Purchase> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: PurchaseInput): Promise<Purchase> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<PurchaseInput>): Promise<Purchase> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  