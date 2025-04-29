import React from 'react';
import BaseSelect from './BaseSelect';

/**
 * Componente Select para enumeraciones que utiliza BaseSelect
 * @param {Array} options - Array de opciones en formato {[valueKey]: valor, [labelKey]: etiqueta}
 * @param {string} valueKey - Nombre de la propiedad que se usará como valor
 * @param {string|function} labelKey - Nombre de la propiedad o función para mostrar como etiqueta
 * @param {boolean} multiple - Indica si el select permite selección múltiple
 * @param {function} onChange - Función que se ejecuta al cambiar la selección
 * @param {any|any[]} value - Valor seleccionado actualmente (string/number para simple, array para múltiple)
 * @param {string} placeholder - Texto a mostrar cuando no hay selección
 * @param {boolean} searchable - Indica si se muestra un campo de búsqueda
 * @returns {JSX.Element}
 */
const GenericEnum = ({
  options = [],
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
      isLoading={false}
      error={null}
    />
  );
};

export default GenericEnum;