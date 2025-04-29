import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface GenericCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  reversed?: boolean; // Si es true, el checkbox aparece a la derecha del texto
  indeterminate?: boolean; // Estado indeterminado para selección parcial
}

/**
 * Componente de Checkbox genérico con TypeScript y Tailwind CSS
 */
const GenericCheckbox = forwardRef<HTMLInputElement, GenericCheckboxProps>(({
  id = '',
  name = '',
  checked,
  onChange,
  onBlur,
  label = '',
  description = '',
  error = '',
  disabled = false,
  className = '',
  labelClassName = '',
  checkboxClassName = '',
  errorClassName = '',
  containerClassName = '',
  reversed = false,
  indeterminate = false,
  required = false,
  ...inputProps
}, ref) => {
  // Referencias para manejar el estado indeterminado
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  
  // Efecto para manejar el estado indeterminado
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Combinamos la referencia pasada y la interna
  const setRefs = (element: HTMLInputElement) => {
    checkboxRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  // Clases para los diferentes elementos
  const baseCheckboxClasses = "h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:checked:bg-primary-600 dark:focus:ring-primary-600 dark:focus:ring-offset-secondary-800";
  const disabledCheckboxClasses = "opacity-60 cursor-not-allowed";
  const errorCheckboxClasses = "border-red-300 dark:border-red-700 focus:ring-red-500 dark:focus:ring-red-600";
  
  const finalCheckboxClasses = `
    ${baseCheckboxClasses}
    ${disabled ? disabledCheckboxClasses : ''}
    ${error ? errorCheckboxClasses : ''}
    ${checkboxClassName}
  `;

  const baseLabelClasses = "text-sm font-medium text-secondary-700 dark:text-secondary-300";
  const disabledLabelClasses = "opacity-60 cursor-not-allowed";
  const finalLabelClasses = `${baseLabelClasses} ${disabled ? disabledLabelClasses : ''} ${labelClassName}`;

  const baseDescriptionClasses = "text-sm text-secondary-500 dark:text-secondary-400";
  const finalDescriptionClasses = `${baseDescriptionClasses}`;

  const baseErrorClasses = "mt-1 text-sm text-red-600 dark:text-red-400 flex items-center";
  const finalErrorClasses = `${baseErrorClasses} ${errorClassName}`;

  return (
    <div className={`relative ${containerClassName}`}>
      <div className={`flex items-start ${reversed ? 'flex-row-reverse justify-end' : ''}`}>
        <div className={`flex h-5 items-center ${reversed ? 'ml-3' : 'mr-3'}`}>
          <input
            ref={setRefs}
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            className={`${finalCheckboxClasses} ${className}`}
            {...inputProps}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={id} className={finalLabelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <span className={finalDescriptionClasses}>
              {description}
            </span>
          )}
        </div>
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <div className={finalErrorClasses}>
          <ExclamationCircleIcon className="h-4 w-4 mr-1 inline" />
          {error}
        </div>
      )}
    </div>
  );
});

GenericCheckbox.displayName = 'GenericCheckbox';

export default GenericCheckbox;