
  import apiClient from './apiClient';

  // Tipos
  export interface Employee {
    id: number;
  nif: string;
  address: string;
  phone: string;
  position: string;
  salary: number;
  hireDate: Date | string;
  userId: number;
  user: User;
  createdAt: Date | string;
  updatedAt: Date | string;
  warehouseId: number;
  warehouse: Warehouse;
  department: string;
  emergencyContact: string;
  productionsAsResponsible: Production[];
  qualityControlsAsInspector: QualityControl[];
  purchasesAsRequester: Purchase[];
  purchasesAsApprover: Purchase[];
  salesAsSalesRep: Sale[];
  quotationsAsCreator: Quotation[];
  invoicesAsCreator: Invoice[];
  paymentsAsRecorder: Payment[];
  sepaRemittancesAsCreator: SepaRemittance[];
  accountingEntriesAsCreator: AccountingEntry[];
  }

  // Tipo de entrada que excluye campos automáticos, ID y relaciones de colección
  export type EmployeeInput = Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'productionsAsResponsible' | 'qualityControlsAsInspector' | 'purchasesAsRequester' | 'purchasesAsApprover' | 'salesAsSalesRep' | 'quotationsAsCreator' | 'invoicesAsCreator' | 'paymentsAsRecorder' | 'sepaRemittancesAsCreator' | 'accountingEntriesAsCreator'>;

  // Endpoints
  const API_ENDPOINT = '/employees';

  // Servicio para Employee
  export const EmployeeService = {
    // Obtener todos los registros
    getAll: async (): Promise<Employee[]> => {
      const response = await apiClient.get(API_ENDPOINT);
      return response.data;
    },

    // Obtener un registro por ID
    getById: async (id: number): Promise<Employee> => {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`);
      return response.data;
    },

    // Crear un nuevo registro
    create: async (data: EmployeeInput): Promise<Employee> => {
      const response = await apiClient.post(API_ENDPOINT, data);
      return response.data;
    },

    // Actualizar un registro
    update: async (id: number, data: Partial<EmployeeInput>): Promise<Employee> => {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, data);
      return response.data;
    },

    // Eliminar un registro
    delete: async (id: number): Promise<void> => {
      await apiClient.delete(`${API_ENDPOINT}/${id}`);
    },
  };
  