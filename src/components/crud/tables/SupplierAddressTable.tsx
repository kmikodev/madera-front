
  import React, { useState, useEffect } from 'react';
  import { SupplierAddress, SupplierAddressService } from '@/services/supplierAddress.service';
  import { ApiError } from '@/services/apiClient';
  
  interface SupplierAddressTableProps {
    onEdit?: (id: number) => void;
    onDelete?: () => void;
  }
  
  const SupplierAddressTable: React.FC<SupplierAddressTableProps> = ({ onEdit, onDelete }) => {
    const [data, setData] = useState<SupplierAddress[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      loadData();
    }, []);
  
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await SupplierAddressService.getAll();
        setData(result || []);
        setError(null);
      } catch (err: any) {
        console.error('Error cargando datos:', err);
        // Usar el mensaje de error de API si está disponible
        setError(err.isApiError 
          ? `Error: ${err.message}` 
          : 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id: number) => {
      if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
        try {
          await SupplierAddressService.delete(id);
          
          // Recargar datos después de eliminar
          loadData();
          
          // Ejecutar callback si existe
          if (onDelete) {
            onDelete();
          }
        } catch (err: any) {
          console.error('Error eliminando elemento:', err);
          // Usar el mensaje de error de API si está disponible
          setError(err.isApiError 
            ? `Error: ${err.message}` 
            : 'Error al eliminar el elemento');
        }
      }
    };
  
    if (loading && data.length === 0) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 dark:border-primary-400"></div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      );
    }
  
    if (data.length === 0) {
      return (
        <div className="text-center p-8 bg-gray-50 dark:bg-secondary-800 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles</p>
          <button 
            onClick={() => loadData()}
            className="mt-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
          >
            Recargar datos
          </button>
        </div>
      );
    }
  
    // Formatear fecha para mostrar en la tabla
    const formatDate = (dateString: string | Date | undefined) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };
  
    // Formatear valor para mostrar en la tabla según su tipo
    const formatValue = (value: any, type: string, fieldName: string) => {
      if (value === null || value === undefined) return '';
      
      if (type === 'Boolean') {
        return value ? 'Sí' : 'No';
      } else if (type === 'DateTime') {
        return formatDate(value);
      } else if (type.includes('[]')) {
        return `[${value.length} elementos]`;
      } else if (typeof value === 'object' && value !== null) {
        // Si es un objeto de relación, intentar mostrar un campo representativo
        return value.nombre || value.name || value.titulo || value.title || 
               value.descripcion || value.description || value.id || 'Objeto';
      }
      
      return String(value);
    };
  
    return (
      <div className="overflow-x-auto bg-white dark:bg-secondary-800 rounded-lg shadow">
        <div className="flex justify-between p-2 border-b border-gray-200 dark:border-secondary-700">
          <h3 className="font-semibold text-lg text-secondary-900 dark:text-white">SupplierAddresss</h3>
          <button 
            onClick={() => loadData()}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Recargar
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-secondary-700">
          <thead className="bg-gray-50 dark:bg-secondary-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  id
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  supplierId
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  supplier
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  addressType
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  street
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  city
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  postalCode
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  region
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  country
                </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  isDefault
                </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-secondary-800 divide-y divide-gray-200 dark:divide-secondary-700">
            {data.map((item) => (
              <tr key={item?.id} className="hover:bg-gray-50 dark:hover:bg-secondary-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.id, 'Int', 'id')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.supplierId, 'Int', 'supplierId')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.supplier, 'Supplier', 'supplier')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.addressType, 'AddressType', 'addressType')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.street, 'String', 'street')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.city, 'String', 'city')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.postalCode, 'String', 'postalCode')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.region, 'String', 'region')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.country, 'String', 'country')}
                  </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatValue(item.isDefault, 'Boolean', 'isDefault')}
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit && onEdit(item.id)}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SupplierAddressTable;
  