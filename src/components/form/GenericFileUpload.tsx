import React, { forwardRef, useState, useRef, useEffect } from 'react';
import {
  ExclamationCircleIcon,
  DocumentIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  CheckIcon,
  DocumentTextIcon,
  DocumentPlusIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';

// Interfaz para mantener una referencia al archivo original y sus metadatos
interface FileWithMetadata {
  file: File;           // El archivo original
  preview?: string;     // URL para previsualización
  uploaded: boolean;    // Si está subido
  confirmed: boolean;   // Si está confirmado
  id: string;           // ID único
}

interface UploadedFile {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  uploaded: boolean;
  confirmed: boolean;
}

interface GenericFileUploadProps {
  id?: string;
  name?: string;
  label?: string;
  uploadEndpoint: string;  // URL del endpoint para subir archivos
  multiple?: boolean;      // Permite múltiples archivos
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string | string[]; // Puede ser URL única o array de URLs
  onChange?: (value: string | string[]) => void; // Ahora devuelve URLs en lugar de objetos
  onBlur?: () => void;
  accept?: string;          // Tipos de archivos aceptados, ej: "image/*,.pdf"
  maxSize?: number;         // Tamaño máximo en bytes
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  headers?: Record<string, string>; // Headers adicionales para la petición
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';


/**
 * Componente genérico para subir archivos con previsualización y confirmación
 */
const GenericFileUpload = forwardRef<HTMLInputElement, GenericFileUploadProps>(({
  id = '',
  name = '',
  label = 'Subir archivo',
  uploadEndpoint,
  multiple = false,
  required = false,
  disabled = false,
  error = '',
  value,
  onChange,
  onBlur,
  accept = '*/*',
  maxSize = 5 * 1024 * 1024, // 5MB por defecto
  className = '',
  labelClassName = '',
  errorClassName = '',
  helpText = '',
  headers = {},
}, ref) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [internalError, setInternalError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Inicializar con valor existente
  useEffect(() => {
    if (value) {
      const initialFiles: UploadedFile[] = Array.isArray(value) 
        ? value.map((url, index) => ({
          id: `existing-${index}`,
          url,
          name: getFileNameFromUrl(url),
          type: getFileTypeFromUrl(url),
          size: 0,
          uploaded: true,
          confirmed: true
        }))
        : [{
          id: 'existing-0',
          url: value,
          name: getFileNameFromUrl(value),
          type: getFileTypeFromUrl(value),
          size: 0,
          uploaded: true,
          confirmed: true
        }];
      
      setFiles(initialFiles);
    }
  }, [value]);

  // Extraer nombre de archivo de URL
  const getFileNameFromUrl = (url: string): string => {
    try {
      const pathname = new URL(url).pathname;
      return pathname.substring(pathname.lastIndexOf('/') + 1);
    } catch (e) {
      return url.substring(url.lastIndexOf('/') + 1);
    }
  };

  // Obtener tipo de archivo de la URL
  const getFileTypeFromUrl = (url: string): string => {
    const extension = url.split('.').pop()?.toLowerCase();
    
    if (!extension) return '';

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
    
    if (imageExtensions.includes(extension)) {
      return `image/${extension === 'jpg' ? 'jpeg' : extension}`;
    } else if (documentExtensions.includes(extension)) {
      return 'application/document';
    }
    
    return '';
  };

  // Generar un ID único para el archivo
  const generateUniqueId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Notificar cambio de valor (URLs)
  const notifyChange = (updatedFiles: UploadedFile[]) => {
    if (onChange) {
      // Filtrar archivos confirmados y obtener solo las URLs
      const confirmedFiles = updatedFiles.filter(file => file.confirmed);
      
      if (confirmedFiles.length === 0) {
        // Si no hay archivos confirmados, enviar null o "" según preferencia
        onChange(multiple ? [] : "");
      } else {
        const urls = confirmedFiles.map(file => file.url);
        // Devolver array o string única según la prop multiple
        onChange(multiple ? urls : urls[0]);
      }
    }
  };

  // Manejar archivos seleccionados
  const handleFiles = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    // Convertir FileList a array
    const fileArray = Array.from(selectedFiles);
    
    // Validar tamaño
    const oversizedFiles = fileArray.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setInternalError(`Algunos archivos exceden el tamaño máximo (${formatFileSize(maxSize)})`);
      return;
    }
    
    // Si no es múltiple, eliminar archivos anteriores
    if (!multiple) {
      setFiles([]);
    }
    
    // Preparar archivos para subir - Mantenemos el objeto File original
    const newFiles: FileWithMetadata[] = fileArray.map(file => ({
      file: file,             // Guardamos el archivo original
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      uploaded: false,
      confirmed: false,
      id: generateUniqueId()
    }));
    
    // Iniciar subida de archivos
    await uploadFiles(newFiles);
  };

  // Subir archivos al servidor
  const uploadFiles = async (newFiles: FileWithMetadata[]) => {
    setUploading(true);
    setInternalError('');
    
    const uploadPromises = newFiles.map(async (fileData) => {
      const formData = new FormData();
      // Usamos el archivo original
      formData.append('file', fileData.file);
      
      try {
        const xhr = new XMLHttpRequest();
        
        // Configurar seguimiento de progreso
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(prev => ({
              ...prev,
              [fileData.id]: percent
            }));
          }
        });
        
        // Configurar promesa para la subida
        const uploadPromise = new Promise<UploadedFile>((resolve, reject) => {
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              let response;
              try {
                response = JSON.parse(xhr.responseText);
              } catch (e) {
                // Si la respuesta no es JSON válido
                response = xhr.responseText;
              }
              
              // Extraer la URL del archivo subido de la respuesta
              let uploadedUrl = '';
              if (typeof response === 'string') {
                uploadedUrl = response;
              } else if (response && typeof response === 'object') {
                // Si la respuesta es un objeto, intentamos extraer la URL
                // Primero verificamos si hay un campo data que contenga la URL
                if (response.data && typeof response.data === 'string') {
                  uploadedUrl = response.data;
                } else if (Array.isArray(response)) {
                  uploadedUrl = response[0];
                } else if (response.url) {
                  uploadedUrl = response.url;
                } else if (response.data && response.data.url) {
                  uploadedUrl = response.data.url;
                } else if (response.data) {
                  uploadedUrl = response.data;
                }
              }
              
              resolve({
                id: fileData.id,
                url: uploadedUrl,
                name: fileData.file.name,
                type: fileData.file.type,
                size: fileData.file.size,
                uploaded: true,
                confirmed: false
              });
            } else {
              reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
            }
          };
          
          xhr.onerror = () => {
            reject(new Error('Error de red'));
          };
        });
        
        // Iniciar subida
        xhr.open('POST', `${API_BASE_URL}${uploadEndpoint}`, true);
        
        // Añadir headers
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
        
        xhr.send(formData);
        
        return await uploadPromise;
      } catch (error) {
        console.error('Error uploading file:', error);
        setInternalError(`Error al subir ${fileData.file.name}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        
        // Devolver un objeto de archivo con error
        return {
          id: fileData.id,
          url: '',
          name: fileData.file.name,
          type: fileData.file.type,
          size: fileData.file.size,
          uploaded: false,
          confirmed: false
        };
      }
    });
    
    try {
      const uploadedFiles = await Promise.all(uploadPromises);
      
      // Filtrar archivos que se subieron correctamente
      const successfulUploads = uploadedFiles.filter(file => file.uploaded);
      
      if (successfulUploads.length === 0) {
        setInternalError('Ningún archivo pudo ser subido');
      } else {
        // Actualizar la lista de archivos
        setFiles(prev => {
          const newFiles = multiple ? [...prev, ...successfulUploads] : successfulUploads;
          // No notificamos cambio aún porque los archivos no están confirmados
          return newFiles;
        });
      }
    } catch (error) {
      console.error('Error en la subida de archivos:', error);
      setInternalError('Error al procesar los archivos');
    } finally {
      setUploading(false);
    }
  };

  // Manejar confirmación de archivo
  const handleConfirmFile = (fileId: string) => {
    setFiles(prev => {
      const updated = prev.map(file => 
        file.id === fileId ? { ...file, confirmed: true } : file
      );
      
      // Notificar cambio con las URLs
      notifyChange(updated);
      
      return updated;
    });
  };

  // Eliminar archivo
  const handleRemoveFile = (fileId: string) => {
    setFiles(prev => {
      const updated = prev.filter(file => file.id !== fileId);
      
      // Notificar cambio con las URLs
      notifyChange(updated);
      
      return updated;
    });
  };

  // Validar si todos los archivos están confirmados
  const areAllFilesConfirmed = () => {
    return files.length > 0 && files.every(file => file.confirmed);
  };

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Manejar eventos de arrastrar y soltar
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Obtener icono según tipo de archivo
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <DocumentIcon className="h-8 w-8 text-secondary-400" />;
    } else if (fileType.includes('pdf')) {
      return <DocumentTextIcon className="h-8 w-8 text-red-500" />;
    } else if (fileType.includes('word') || fileType.includes('doc')) {
      return <DocumentTextIcon className="h-8 w-8 text-blue-500" />;
    } else if (fileType.includes('sheet') || fileType.includes('excel') || fileType.includes('xls')) {
      return <DocumentTextIcon className="h-8 w-8 text-green-500" />;
    } else {
      return <DocumentIcon className="h-8 w-8 text-secondary-400" />;
    }
  };

  // Clases CSS
  const baseUploadAreaClasses = "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors duration-200";
  const activeUploadAreaClasses = "border-primary-500 bg-primary-50 dark:bg-primary-900/20";
  const inactiveUploadAreaClasses = "border-secondary-300 dark:border-secondary-600 hover:border-primary-400 dark:hover:border-primary-500";
  const disabledUploadAreaClasses = "opacity-60 cursor-not-allowed border-secondary-200 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-800";
  const errorUploadAreaClasses = "border-red-300 dark:border-red-700";

  const finalUploadAreaClasses = `
    ${baseUploadAreaClasses}
    ${disabled ? disabledUploadAreaClasses : dragActive ? activeUploadAreaClasses : inactiveUploadAreaClasses}
    ${error || internalError ? errorUploadAreaClasses : ''}
  `;

  const baseLabelClasses = "block text-sm font-medium text-secondary-700 dark:text-secondary-300";
  const finalLabelClasses = `${baseLabelClasses} ${labelClassName}`;

  const baseErrorClasses = "mt-1 text-sm text-red-600 dark:text-red-400 flex items-center";
  const finalErrorClasses = `${baseErrorClasses} ${errorClassName}`;

  const baseHelpTextClasses = "mt-1 text-sm text-secondary-500 dark:text-secondary-400";

  const finalErrorMessage = error || internalError;

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={id} className={finalLabelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Área de subida */}
      <div
        className={finalUploadAreaClasses}
        onDragEnter={!disabled ? handleDrag : undefined}
        onDragOver={!disabled ? handleDrag : undefined}
        onDragLeave={!disabled ? handleDrag : undefined}
        onDrop={!disabled ? handleDrop : undefined}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className="space-y-1 text-center">
          <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-secondary-400" />
          <div className="flex text-sm text-secondary-600 dark:text-secondary-400">
            <label
              htmlFor={id}
              className={`relative cursor-pointer rounded-md bg-white dark:bg-transparent font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <span>{multiple ? 'Seleccionar archivos' : 'Seleccionar archivo'}</span>
              <input
                ref={(node) => {
                  // Asignar a ambas referencias
                  if (node) {
                    fileInputRef.current = node;
                    if (typeof ref === 'function') {
                      ref(node);
                    } else if (ref) {
                      ref.current = node;
                    }
                  }
                }}
                id={id}
                name={name}
                type="file"
                className="sr-only"
                multiple={multiple}
                accept={accept}
                onChange={(e) => handleFiles(e.target.files)}
                disabled={disabled}
                required={required && !areAllFilesConfirmed()}
                onBlur={onBlur}
              />
            </label>
            <p className="pl-1">o arrastra y suelta {multiple ? 'los archivos' : 'el archivo'}</p>
          </div>
          <p className="text-xs text-secondary-500 dark:text-secondary-400">
            {accept === '*/*' ? 'Cualquier tipo de archivo' : accept.replace(/,/g, ', ')} (max. {formatFileSize(maxSize)})
          </p>
        </div>
      </div>
      
      {/* Lista de archivos subidos */}
      {files.length > 0 && (
        <ul className="mt-3 divide-y divide-secondary-200 dark:divide-secondary-700 border border-secondary-200 dark:border-secondary-700 rounded-md">
          {files.map((file) => (
            <li key={file?.id} className="p-3 flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {file.type.startsWith('image/') && file.url ? (
                  <div className="h-16 w-16 flex-shrink-0 bg-secondary-100 dark:bg-secondary-800 rounded overflow-hidden">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Si la imagen no carga, mostrar icono
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.appendChild(
                          document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                        );
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 flex-shrink-0 bg-secondary-100 dark:bg-secondary-800 rounded flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                )}
                
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">
                    {formatFileSize(file.size)}
                  </p>
                  
                  {/* Estado del archivo */}
                  <div className="mt-1">
                    {!file.uploaded ? (
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 py-0.5 px-1.5 rounded">
                        Subiendo... {uploadProgress[file.id] || 0}%
                      </span>
                    ) : !file.confirmed ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 py-0.5 px-1.5 rounded">
                          Pendiente de confirmar
                        </span>
                        <button
                          type="button"
                          onClick={() => handleConfirmFile(file.id)}
                          className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800/40 py-0.5 px-1.5 rounded transition-colors"
                        >
                          Confirmar
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 py-0.5 px-1.5 rounded">
                        Confirmado
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Acciones */}
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file.id)}
                  className="inline-flex text-secondary-400 hover:text-secondary-500 dark:hover:text-secondary-300 focus:outline-none"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {/* Mensaje de error */}
      {finalErrorMessage && (
        <div className={finalErrorClasses}>
          <ExclamationCircleIcon className="h-4 w-4 mr-1 inline" />
          {finalErrorMessage}
        </div>
      )}
      
      {/* Texto de ayuda */}
      {helpText && !finalErrorMessage && (
        <p className={baseHelpTextClasses}>{helpText}</p>
      )}
    </div>
  );
});

GenericFileUpload.displayName = 'GenericFileUpload';

export default GenericFileUpload;