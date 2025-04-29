import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface GenericInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  label?: string;
  error?: string;
  helpText?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

/**
 * Componente de entrada de texto genérico con TypeScript y Tailwind CSS
 */
const GenericInput = forwardRef<HTMLInputElement, GenericInputProps>(({
  id = '',
  name = '',
  type = 'text',
  value = '',
  onChange,
  onBlur,
  onFocus,
  required = false,
  placeholder = '',
  label = '',
  error = '',
  disabled = false,
  readOnly = false,
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  helpText = '',
  prefix = null,
  suffix = null,
  ...inputProps
}, ref) => {

  // Combinamos todas las clases base con las personalizadas
  const baseInputClasses = "mt-1 block w-full rounded-md border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-600 dark:placeholder-secondary-400";
  const errorInputClasses = "border-red-300 dark:border-red-700 text-red-900 dark:text-red-300 placeholder-red-400 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-600 dark:focus:border-red-600";
  const disabledInputClasses = "opacity-60 bg-secondary-100 dark:bg-secondary-900 cursor-not-allowed";
  
  const finalInputClasses = `
    ${baseInputClasses}
    ${error ? errorInputClasses : ''}
    ${disabled ? disabledInputClasses : ''}
    ${prefix ? 'pl-10' : ''}
    ${suffix ? 'pr-10' : ''}
    ${inputClassName}
  `;

  // Clases para el contenedor de label y descripción
  const baseLabelClasses = "block text-sm font-medium text-secondary-700 dark:text-secondary-300";
  const finalLabelClasses = `${baseLabelClasses} ${labelClassName}`;

  // Clases para los mensajes de error
  const baseErrorClasses = "mt-1 text-sm text-red-600 dark:text-red-400 flex items-center";
  const finalErrorClasses = `${baseErrorClasses} ${errorClassName}`;

  // Clases para el texto de ayuda
  const baseHelpTextClasses = "mt-1 text-sm text-secondary-500 dark:text-secondary-400";

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={id} className={finalLabelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input con posibles prefijos/sufijos */}
      <div className="relative">
        {/* Prefijo (icono o texto antes del input) */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {prefix}
          </div>
        )}
        
        {/* Input real */}
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={finalInputClasses}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          {...inputProps}
        />
        
        {/* Sufijo (icono o texto después del input) */}
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {suffix}
          </div>
        )}
        
        {/* Icono de error */}
        {error && !suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <div className={finalErrorClasses}>
          <ExclamationCircleIcon className="h-4 w-4 mr-1 inline" />
          {error}
        </div>
      )}
      
      {/* Texto de ayuda */}
      {helpText && !error && (
        <p className={baseHelpTextClasses}>{helpText}</p>
      )}
    </div>
  );
});

GenericInput.displayName = 'GenericInput';

export default GenericInput;