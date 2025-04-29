import React, { useState, useEffect, useRef } from 'react';
import { CheckIcon, ChevronDownIcon, ExclamationCircleIcon, MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

/**
 * Componente Base Select personalizado con Tailwind CSS que soporta selección simple o múltiple
 * @param {Array} options - Array de opciones para mostrar
 * @param {string} valueKey - Nombre de la propiedad que se usará como valor
 * @param {string|function} labelKey - Nombre de la propiedad o función para mostrar como etiqueta
 * @param {boolean} multiple - Indica si el select permite selección múltiple
 * @param {function} onChange - Función que se ejecuta al cambiar la selección
 * @param {any|any[]} value - Valor seleccionado actualmente (string/number para simple, array para múltiple)
 * @param {string} placeholder - Texto a mostrar cuando no hay selección
 * @param {boolean} searchable - Indica si se muestra un campo de búsqueda
 * @returns {JSX.Element}
 */
const BaseSelect = ({
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
  isLoading = false,
  error = null,
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : '');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Inicializar los valores seleccionados
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
  }, [value]);

  // Filtrar opciones basadas en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOptions(options);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = options.filter(option => {
        const label = getLabel(option).toString().toLowerCase();
        return label.includes(lowerSearchTerm);
      });
      setFilteredOptions(filtered);
    }
  }, [options, searchTerm]);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Enfocar en el input de búsqueda cuando se abre el dropdown
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Obtener la etiqueta basada en labelKey (puede ser una propiedad o una función)
  const getLabel = (item) => {
    if (typeof labelKey === 'function') {
      return labelKey(item);
    }
    if (typeof labelKey === 'string') {
      return item[labelKey];
    }
    return item[valueKey];
  };

  // Manejar cambios en la selección
  const handleChange = (option) => {
    if (multiple) {
      const isSelected = selectedValues.includes(String(option[valueKey]));
      let newSelectedValues;
      
      if (isSelected) {
        newSelectedValues = selectedValues.filter(val => val !== String(option[valueKey]));
      } else {
        newSelectedValues = [...selectedValues, String(option[valueKey])];
      }
      
      setSelectedValues(newSelectedValues);
      
      if (onChange) {
        const selectedObjects = options.filter(opt => 
          newSelectedValues.includes(String(opt[valueKey]))
        );
        onChange(newSelectedValues, selectedObjects);
      }
    } else {
      const newValue = String(option[valueKey]);
      setSelectedValues(newValue);
      setIsOpen(false);
      setSearchTerm('');
      
      if (onChange) {
        onChange(newValue, option);
      }
    }
  };

  // Manejar la búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Limpiar la selección
  const clearSelection = (e) => {
    e.stopPropagation();
    if (multiple) {
      setSelectedValues([]);
      onChange([], []);
    } else {
      setSelectedValues('');
      onChange('', null);
    }
  };

  // Verificar si un valor está seleccionado (para selección múltiple)
  const isSelected = (optionValue) => {
    if (multiple) {
      return selectedValues.includes(String(optionValue));
    }
    return String(selectedValues) === String(optionValue);
  };

  // Obtener texto a mostrar para la selección actual
  const getDisplayText = () => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        const selected = options.find(option => String(option[valueKey]) === selectedValues[0]);
        return selected ? getLabel(selected) : placeholder;
      }
      return `${selectedValues.length} opciones seleccionadas`;
    } else {
      if (!selectedValues) return placeholder;
      const selected = options.find(option => String(option[valueKey]) === String(selectedValues));
      return selected ? getLabel(selected) : placeholder;
    }
  };

  // Determinar número de columnas para el grid basado en la prop o por defecto
  const gridTemplateColumns = `repeat(${gridColumns}, minmax(0, 1fr))`;

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-secondary-700 dark:text-secondary-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          id={id}
          name={name}
          disabled={disabled || isLoading}
          onClick={() => setIsOpen(!isOpen)}
          autoFocus={autoFocus}
          className={`relative w-full bg-white dark:bg-secondary-800 border rounded-lg py-2.5 pl-4 pr-10 text-left shadow-sm cursor-default focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
            disabled ? 'bg-secondary-100 text-secondary-500 cursor-not-allowed dark:bg-secondary-900 dark:text-secondary-500' : 
            'hover:border-primary-300 dark:hover:border-primary-700'
          } ${
            error ? 'border-red-300 dark:border-red-700' : 'border-secondary-300 dark:border-secondary-600'
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={id}
        >
          <span className={`block truncate ${!selectedValues || (multiple && selectedValues.length === 0) ? 'text-secondary-500 dark:text-secondary-400' : 'text-secondary-900 dark:text-white'}`}>
            {getDisplayText()}
          </span>
          
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon className={`h-5 w-5 text-secondary-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </span>
          
          {(selectedValues && selectedValues.length > 0) && (
            <button
              type="button"
              className="absolute inset-y-0 right-8 flex items-center text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
              onClick={clearSelection}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </button>

        {isLoading && (
          <div className="absolute inset-y-0 right-10 flex items-center pr-2">
            <svg className="animate-spin h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        {error && (
          <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
            <ExclamationCircleIcon className="h-4 w-4 mr-1 inline" />
            {error}
          </div>
        )}

        {isOpen && !isLoading && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-secondary-800 shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-secondary-200 dark:border-secondary-700">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-4 w-4 text-secondary-400" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-700 text-sm placeholder-secondary-500 dark:placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:text-white"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchTerm && (
                    <button 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchTerm('');
                      }}
                    >
                      <XCircleIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
            
            <div className="overflow-auto max-h-60">
              {filteredOptions.length === 0 ? (
                <div className="text-secondary-500 py-2 px-3 dark:text-secondary-400 text-center">
                  {searchTerm ? 'No se encontraron resultados' : 'No hay opciones disponibles'}
                </div>
              ) : multiple ? (
                <div 
                  className="p-2 grid gap-2" 
                  style={{ gridTemplateColumns }}
                >
                  {filteredOptions.map((option) => (
                    <div
                      key={option[valueKey]}
                      className={`flex items-center p-2 rounded cursor-pointer ${
                        isSelected(option[valueKey])
                          ? 'bg-primary-50 dark:bg-primary-900 dark:bg-opacity-30'
                          : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'
                      }`}
                      onClick={() => handleChange(option)}
                    >
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={isSelected(option[valueKey])}
                          onChange={() => {}}
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-secondary-300 rounded dark:bg-secondary-700 dark:border-secondary-600"
                        />
                      </div>
                      <div className="ml-2 text-sm">
                        <label className={`font-medium ${isSelected(option[valueKey]) ? 'text-primary-700 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-300'}`}>
                          {getLabel(option)}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul
                  tabIndex="-1"
                  role="listbox"
                >
                  {filteredOptions.map((option) => (
                    <li
                      key={option[valueKey]}
                      className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                        isSelected(option[valueKey])
                          ? 'bg-primary-100 text-primary-900 dark:bg-primary-800 dark:text-primary-100'
                          : 'text-secondary-900 hover:bg-secondary-100 dark:text-white dark:hover:bg-secondary-700'
                      }`}
                      onClick={() => handleChange(option)}
                      role="option"
                      aria-selected={isSelected(option[valueKey])}
                    >
                      <span className={`block truncate ${isSelected(option[valueKey]) ? 'font-medium' : 'font-normal'}`}>
                        {getLabel(option)}
                      </span>
                      {isSelected(option[valueKey]) && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600 dark:text-primary-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseSelect;