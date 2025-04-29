import React, { useState, useEffect } from 'react';
import BaseSelect from './BaseSelect';
import apiClient from '@/services/apiClient';

/**
 * Componente Select que obtiene datos de una API y usa BaseSelect para renderizar
 * @param {string} url - URL de la API para obtener los datos
 * @param {string} valueKey - Nombre de la propiedad que se usará como valor
 * @param {string|function} labelKey - Nombre de la propiedad o función para mostrar como etiqueta
 * @param {boolean} multiple - Indica si el select permite selección múltiple
 * @param {function} onChange - Función que se ejecuta al cambiar la selección
 * @param {any|any[]} value - Valor seleccionado actualmente (string/number para simple, array para múltiple)
 * @param {string} placeholder - Texto a mostrar cuando no hay selección
 * @param {boolean} searchable - Indica si se muestra un campo de búsqueda
 * @returns {JSX.Element}
 */
const GenericSelect = ({
  url = "/api",
  id = '',
  name = '',
  required = false,
  disabled = false,
  autoFocus = false,
  className = '',
  valueKey = 'id',
  labelKey = 'name',
  multiple = false,
  onChange = (value, selectedOptions) => {},
  value = multiple ? [] : '',
  placeholder = 'Seleccione una opción',
  label = '',
  searchable = true,
  gridColumns = 2,
}) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener los datos de la API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await apiClient.get(url);
        const data = response.data;
        setOptions(data);
      } catch (err) {
        setError(`Error al cargar los datos: ${err.message}`);
        console.error('Error al cargar datos del select:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  return (
    <BaseSelect
      options={options}
      id={id}
      name={name}
      required={required}
      disabled={disabled}
      autoFocus={autoFocus}
      className={className}
      valueKey={valueKey}
      labelKey={labelKey}
      multiple={multiple}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      label={label}
      searchable={searchable}
      gridColumns={gridColumns}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default GenericSelect;