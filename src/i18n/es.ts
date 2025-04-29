const es = {
  translation: {
    models: {
      enums: {
        customerType: {
          RETAIL: "Minorista",
          WHOLESALE: "Mayorista"
        },
        customerSegment: {
          GENERAL: "General",
          VIP: "VIP",
          STRATEGIC: "Estratégico",
          OCCASIONAL: "Ocasional"
        },
        addressType: {
          BILLING: "Facturación",
          SHIPPING: "Envío",
          BOTH: "Ambos",
          MAIN: "Principal"
        },
        paymentTerms: {
          IMMEDIATE: "Pago Inmediato",
          END_OF_MONTH: "Fin de Mes",
          FIFTEEN_DAYS: "15 Días",
          THIRTY_DAYS: "30 Días",
          SIXTY_DAYS: "60 Días"
        },
        productionStatus: {
          PLANNED: "Planificada",
          IN_PROGRESS: "En Progreso",
          COMPLETED: "Completada",
          CANCELLED: "Cancelada",
          ON_HOLD: "En Pausa"
        },
        defectSeverity: {
          MINOR: "Menor",
          MAJOR: "Mayor",
          CRITICAL: "Crítico"
        },
        purchaseStatus: {
          DRAFT: "Borrador",
          CONFIRMED: "Confirmada",
          RECEIVED: "Recibida",
          CANCELLED: "Cancelada",
          PARTIALLY_RECEIVED: "Recibida Parcialmente"
        },
        saleStatus: {
          DRAFT: "Borrador",
          CONFIRMED: "Confirmada",
          DELIVERED: "Entregada",
          CANCELLED: "Cancelada",
          PARTIALLY_DELIVERED: "Entregada Parcialmente",
          INVOICED: "Facturada",
          RETURNED: "Devuelta"
        },
        returnStatus: {
          PENDING: "Pendiente",
          APPROVED: "Aprobada",
          REJECTED: "Rechazada",
          COMPLETED: "Completada",
          REFUNDED: "Reembolsada"
        },
        returnCondition: {
          GOOD: "Buen Estado",
          DAMAGED: "Dañado",
          DEFECTIVE: "Defectuoso",
          OPENED: "Abierto/Usado",
          UNOPENED: "Sin Abrir"
        },
        quotationStatus: {
          DRAFT: "Borrador",
          SENT: "Enviado",
          ACCEPTED: "Aceptado",
          REJECTED: "Rechazado",
          EXPIRED: "Expirado",
          CONVERTED: "Convertido a Venta"
        },
        invoiceType: {
          PURCHASE: "Factura de Compra",
          SALE: "Factura de Venta"
        },
        invoiceStatus: {
          DRAFT: "Borrador",
          CONFIRMED: "Confirmada",
          PAID: "Pagada",
          PARTIALLY_PAID: "Parcialmente Pagada",
          CANCELLED: "Cancelada",
          OVERDUE: "Vencida"
        },
        paymentMethod: {
          CASH: "Efectivo",
          BANK_TRANSFER: "Transferencia Bancaria",
          CREDIT_CARD: "Tarjeta de Crédito",
          SEPA_DIRECT_DEBIT: "Domiciliación SEPA",
          CHECK: "Cheque",
          OTHER: "Otro"
        },
        sepaStatus: {
          DRAFT: "Borrador",
          GENERATED: "Generada",
          SUBMITTED: "Enviada",
          REJECTED: "Rechazada",
          PROCESSED: "Procesada",
          PARTIALLY_PROCESSED: "Procesada Parcialmente"
        },
        accountType: {
          ASSET: "Activo",
          LIABILITY: "Pasivo",
          EQUITY: "Patrimonio Neto",
          INCOME: "Ingresos",
          EXPENSE: "Gastos"
        }
      },

      user: {
        title: "Usuarios",
        fields: {
          id: "ID",
          email: "Correo Electrónico",
          password: "Contraseña",
          firstName: "Nombre",
          lastName: "Apellido",
          active: "Activo",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          role: "Rol",
          roleId: "ID de Rol",
          employee: "Empleado",
          auditLogs: "Registros de Auditoría",
          apiKeys: "Claves API",
          lastLogin: "Último Inicio de Sesión",
          failedAttempts: "Intentos Fallidos",
          lockedUntil: "Bloqueado Hasta",
          passwordResetToken: "Token de Restablecimiento de Contraseña",
          passwordHistory: "Historial de Contraseñas"
        }
      },

      passwordHistory: {
        title: "Historial de Contraseñas",
        fields: {
          id: "ID",
          userId: "ID de Usuario",
          user: "Usuario",
          password: "Contraseña Anterior",
          createdAt: "Fecha de Cambio"
        }
      },

      apiKey: {
        title: "Claves API",
        fields: {
          id: "ID",
          userId: "ID de Usuario",
          user: "Usuario",
          keyValue: "Valor de la Clave",
          name: "Nombre",
          expiresAt: "Expira En",
          lastUsed: "Último Uso",
          createdAt: "Fecha de Creación"
        }
      },

      role: {
        title: "Roles",
        fields: {
          id: "ID",
          name: "Nombre",
          description: "Descripción",
          permissions: "Permisos",
          users: "Usuarios"
        }
      },

      permission: {
        title: "Permisos",
        fields: {
          id: "ID",
          name: "Nombre",
          description: "Descripción",
          roles: "Roles"
        }
      },

      employee: {
        title: "Empleados",
        fields: {
          id: "ID",
          nif: "NIF",
          address: "Dirección",
          phone: "Teléfono",
          position: "Puesto",
          salary: "Salario",
          hireDate: "Fecha de Contratación",
          userId: "ID de Usuario",
          user: "Usuario",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          warehouseId: "ID de Almacén",
          warehouse: "Almacén",
          department: "Departamento",
          emergencyContact: "Contacto de Emergencia",
          productionsAsResponsible: "Producciones como Responsable",
          qualityControlsAsInspector: "Controles de Calidad como Inspector",
          purchasesAsRequester: "Compras como Solicitante",
          purchasesAsApprover: "Compras como Aprobador",
          salesAsSalesRep: "Ventas como Comercial",
          quotationsAsCreator: "Presupuestos como Creador",
          invoicesAsCreator: "Facturas como Creador",
          paymentsAsRecorder: "Pagos como Registrador",
          sepaRemittancesAsCreator: "Remesas SEPA como Creador",
          accountingEntriesAsCreator: "Asientos como Creador"
        }
      },

      supplier: {
        title: "Proveedores",
        fields: {
          id: "ID",
          name: "Nombre",
          nif: "NIF",
          address: "Dirección",
          phone: "Teléfono",
          email: "Correo Electrónico",
          contactPerson: "Persona de Contacto",
          active: "Activo",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          deletedAt: "Fecha de Eliminación",
          purchases: "Compras",
          materials: "Materiales",
          addresses: "Direcciones",
          contacts: "Contactos",
          paymentTerms: "Condiciones de Pago",
          notes: "Notas"
        }
      },

      supplierAddress: {
        title: "Direcciones de Proveedor",
        fields: {
          id: "ID",
          supplierId: "ID de Proveedor",
          supplier: "Proveedor",
          addressType: "Tipo de Dirección",
          street: "Calle",
          city: "Ciudad",
          postalCode: "Código Postal",
          region: "Región",
          country: "País",
          isDefault: "Predeterminada"
        }
      },

      supplierContact: {
        title: "Contactos de Proveedor",
        fields: {
          id: "ID",
          supplierId: "ID de Proveedor",
          supplier: "Proveedor",
          name: "Nombre",
          position: "Cargo",
          phone: "Teléfono",
          email: "Correo Electrónico",
          isPrimary: "Principal"
        }
      },

      customer: {
        title: "Clientes",
        fields: {
          id: "ID",
          name: "Nombre",
          nif: "NIF",
          address: "Dirección",
          phone: "Teléfono",
          email: "Correo Electrónico",
          contactPerson: "Persona de Contacto",
          customerType: "Tipo de Cliente",
          paymentTerms: "Condiciones de Pago",
          sepaEnabled: "SEPA Habilitado",
          sepaMandateId: "ID Mandato SEPA",
          sepaIban: "IBAN SEPA",
          active: "Activo",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          deletedAt: "Fecha de Eliminación",
          sales: "Ventas",
          quotations: "Presupuestos",
          addresses: "Direcciones",
          contacts: "Contactos",
          creditLimit: "Límite de Crédito",
          discountRate: "Tasa de Descuento",
          customerSince: "Cliente Desde",
          segment: "Segmento",
          returnOrders: "Devoluciones"
        }
      },

      customerAddress: {
        title: "Direcciones de Cliente",
        fields: {
          id: "ID",
          customerId: "ID de Cliente",
          customer: "Cliente",
          addressType: "Tipo de Dirección",
          street: "Calle",
          city: "Ciudad",
          postalCode: "Código Postal",
          region: "Región",
          country: "País",
          isDefault: "Predeterminada"
        }
      },

      customerContact: {
        title: "Contactos de Cliente",
        fields: {
          id: "ID",
          customerId: "ID de Cliente",
          customer: "Cliente",
          name: "Nombre",
          position: "Cargo",
          phone: "Teléfono",
          email: "Correo Electrónico",
          isPrimary: "Principal",
          department: "Departamento"
        }
      },

      warehouse: {
        title: "Almacenes",
        fields: {
          id: "ID",
          code: "Código",
          name: "Nombre",
          address: "Dirección",
          active: "Activo",
          isDefault: "Predeterminado",
          locations: "Ubicaciones",
          employees: "Empleados",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización"
        }
      },

      warehouseLocation: {
        title: "Ubicaciones de Almacén",
        fields: {
          id: "ID",
          warehouseId: "ID de Almacén",
          warehouse: "Almacén",
          code: "Código",
          description: "Descripción",
          productLocations: "Productos",
          materialLocations: "Materiales"
        }
      },

      material: {
        title: "Materiales",
        fields: {
          id: "ID",
          code: "Código",
          name: "Nombre",
          description: "Descripción",
          unitOfMeasure: "Unidad de Medida",
          stockQuantity: "Cantidad en Stock",
          minStockLevel: "Stock Mínimo",
          costPrice: "Precio de Coste",
          active: "Activo",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          deletedAt: "Fecha de Eliminación",
          suppliers: "Proveedores",
          purchaseItems: "Líneas de Compra",
          productionInputs: "Entradas de Producción",
          categoryId: "ID de Categoría",
          category: "Categoría",
          locations: "Ubicaciones"
        }
      },

      materialSupplier: {
        title: "Proveedores de Material",
        fields: {
          materialId: "ID de Material",
          material: "Material",
          supplierId: "ID de Proveedor",
          supplier: "Proveedor",
          supplierCode: "Código del Proveedor",
          price: "Precio",
          leadTimeDays: "Plazo de Entrega (días)",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          isPreferred: "Preferido",
          minOrderQuantity: "Cantidad Mínima",
          lastPurchaseDate: "Última Compra"
        }
      },

      materialCategory: {
        title: "Categorías de Material",
        fields: {
          id: "ID",
          name: "Nombre",
          description: "Descripción",
          parentId: "ID Padre",
          parent: "Categoría Padre",
          children: "Subcategorías",
          materials: "Materiales"
        }
      },

      materialLocation: {
        title: "Ubicaciones de Material",
        fields: {
          id: "ID",
          materialId: "ID de Material",
          material: "Material",
          locationId: "ID de Ubicación",
          location: "Ubicación",
          quantity: "Cantidad"
        }
      },

      product: {
        title: "Productos",
        fields: {
          id: "ID",
          code: "Código",
          name: "Nombre",
          description: "Descripción",
          unitOfMeasure: "Unidad de Medida",
          stockQuantity: "Cantidad en Stock",
          minStockLevel: "Stock Mínimo",
          retailPrice: "Precio Minorista",
          wholesalePrice: "Precio Mayorista",
          costPrice: "Precio de Coste",
          taxRate: "Tasa de Impuesto",
          active: "Activo",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          deletedAt: "Fecha de Eliminación",
          productionOutputs: "Salidas de Producción",
          saleItems: "Líneas de Venta",
          quotationItems: "Líneas de Presupuesto",
          categoryId: "ID de Categoría",
          category: "Categoría",
          images: "Imágenes",
          attributes: "Atributos",
          locations: "Ubicaciones",
          barcode: "Código de Barras",
          weight: "Peso",
          dimensions: "Dimensiones"
        }
      },

      productCategory: {
        title: "Categorías de Producto",
        fields: {
          id: "ID",
          name: "Nombre",
          description: "Descripción",
          parentId: "ID Padre",
          parent: "Categoría Padre",
          children: "Subcategorías",
          products: "Productos"
        }
      },

      productImage: {
        title: "Imágenes de Producto",
        fields: {
          id: "ID",
          productId: "ID de Producto",
          product: "Producto",
          url: "URL",
          alt: "Texto Alternativo",
          isPrimary: "Principal",
          sortOrder: "Orden"
        }
      },

      productAttribute: {
        title: "Atributos de Producto",
        fields: {
          id: "ID",
          productId: "ID de Producto",
          product: "Producto",
          name: "Nombre",
          value: "Valor"
        }
      },

      productLocation: {
        title: "Ubicaciones de Producto",
        fields: {
          id: "ID",
          productId: "ID de Producto",
          product: "Producto",
          locationId: "ID de Ubicación",
          location: "Ubicación",
          quantity: "Cantidad"
        }
      },

      production: {
        title: "Órdenes de Producción",
        fields: {
          id: "ID",
          reference: "Referencia",
          startDate: "Fecha de Inicio",
          endDate: "Fecha de Fin",
          status: "Estado",
          notes: "Notas",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          inputs: "Entradas",
          outputs: "Salidas",
          warehouseId: "ID de Almacén",
          warehouse: "Almacén",
          responsibleId: "ID de Responsable",
          responsible: "Responsable",
          qualityControls: "Controles de Calidad",
          laborCost: "Coste de Mano de Obra",
          overheadCost: "Costes Indirectos",
          batchNumber: "Número de Lote"
        }
      },

      productionInput: {
        title: "Entradas de Producción",
        fields: {
          id: "ID",
          productionId: "ID de Producción",
          production: "Producción",
          materialId: "ID de Material",
          material: "Material",
          quantity: "Cantidad",
          unitCost: "Coste Unitario",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          locationId: "ID de Ubicación",
          location: "Ubicación"
        }
      },

      productionOutput: {
        title: "Salidas de Producción",
        fields: {
          id: "ID",
          productionId: "ID de Producción",
          production: "Producción",
          productId: "ID de Producto",
          product: "Producto",
          quantity: "Cantidad",
          finalCost: "Coste Final",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          locationId: "ID de Ubicación",
          location: "Ubicación"
        }
      },

      qualityControl: {
        title: "Controles de Calidad",
        fields: {
          id: "ID",
          productionId: "ID de Producción",
          production: "Producción",
          inspectionDate: "Fecha de Inspección",
          inspectorId: "ID de Inspector",
          inspector: "Inspector",
          passedInspection: "Inspección Aprobada",
          notes: "Notas",
          defects: "Defectos"
        }
      },

      qualityDefect: {
        title: "Defectos de Calidad",
        fields: {
          id: "ID",
          qualityControlId: "ID de Control",
          qualityControl: "Control de Calidad",
          defectType: "Tipo de Defecto",
          description: "Descripción",
          severity: "Gravedad",
          quantity: "Cantidad"
        }
      },

      purchase: {
        title: "Órdenes de Compra",
        fields: {
          id: "ID",
          reference: "Referencia",
          supplierId: "ID de Proveedor",
          supplier: "Proveedor",
          date: "Fecha",
          expectedDelivery: "Entrega Prevista",
          status: "Estado",
          totalAmount: "Importe Total",
          notes: "Notas",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          items: "Líneas",
          invoices: "Facturas",
          warehouseId: "ID de Almacén",
          warehouse: "Almacén",
          requesterId: "ID de Solicitante",
          requester: "Solicitante",
          approverId: "ID de Aprobador",
          approver: "Aprobador",
          receivedDate: "Fecha de Recepción",
          deliveryNote: "Número de Albarán",
          discountPercent: "Descuento (%)"
        }
      },

      purchaseItem: {
        title: "Líneas de Compra",
        fields: {
          id: "ID",
          purchaseId: "ID de Compra",
          purchase: "Compra",
          materialId: "ID de Material",
          material: "Material",
          quantity: "Cantidad",
          unitPrice: "Precio Unitario",
          taxRate: "Tasa de Impuesto",
          total: "Total",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          receivedQuantity: "Cantidad Recibida",
          locationId: "ID de Ubicación",
          location: "Ubicación",
          discountPercent: "Descuento (%)",
          notes: "Notas"
        }
      },

      sale: {
        title: "Ventas",
        fields: {
          id: "ID",
          reference: "Referencia",
          customerId: "ID de Cliente",
          customer: "Cliente",
          date: "Fecha",
          deliveryDate: "Entrega Prevista",
          status: "Estado",
          totalAmount: "Importe Total",
          notes: "Notas",
          fromQuotation: "Desde Presupuesto",
          quotationId: "ID de Presupuesto",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          items: "Líneas",
          invoices: "Facturas",
          warehouseId: "ID de Almacén",
          warehouse: "Almacén",
          salesRepId: "ID de Comercial",
          salesRep: "Comercial",
          deliveryAddress: "Dirección de Entrega",
          shippingMethod: "Método de Envío",
          paymentMethod: "Método de Pago",
          discountPercent: "Descuento (%)",
          returnOrders: "Devoluciones",
          deliveryNote: "Número de Albarán"
        }
      },

      saleItem: {
        title: "Líneas de Venta",
        fields: {
          id: "ID",
          saleId: "ID de Venta",
          sale: "Venta",
          productId: "ID de Producto",
          product: "Producto",
          quantity: "Cantidad",
          unitPrice: "Precio Unitario",
          taxRate: "Tasa de Impuesto",
          total: "Total",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          deliveredQuantity: "Cantidad Entregada",
          locationId: "ID de Ubicación",
          location: "Ubicación",
          discountPercent: "Descuento (%)",
          notes: "Notas",
          returnItems: "Devoluciones"
        }
      },

      returnOrder: {
        title: "Devoluciones",
        fields: {
          id: "ID",
          reference: "Referencia",
          saleId: "ID de Venta",
          sale: "Venta",
          customerId: "ID de Cliente",
          customer: "Cliente",
          date: "Fecha",
          reason: "Motivo",
          status: "Estado",
          totalAmount: "Importe Total",
          notes: "Notas",
          items: "Líneas",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización"
        }
      },

      returnOrderItem: {
        title: "Líneas de Devolución",
        fields: {
          id: "ID",
          returnOrderId: "ID de Devolución",
          returnOrder: "Devolución",
          saleItemId: "ID de Línea de Venta",
          saleItem: "Línea de Venta",
          productId: "ID de Producto",
          product: "Producto",
          quantity: "Cantidad",
          unitPrice: "Precio Unitario",
          total: "Total",
          reason: "Razón",
          condition: "Condición"
        }
      },

      quotation: {
        title: "Presupuestos",
        fields: {
          id: "ID",
          reference: "Referencia",
          customerId: "ID de Cliente",
          customer: "Cliente",
          date: "Fecha",
          validUntil: "Válido Hasta",
          status: "Estado",
          totalAmount: "Importe Total",
          notes: "Notas",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          items: "Líneas",
          sales: "Ventas Generadas",
          creatorId: "ID de Creador",
          creator: "Creador",
          discountPercent: "Descuento (%)"
        }
      },

      quotationItem: {
        title: "Líneas de Presupuesto",
        fields: {
          id: "ID",
          quotationId: "ID de Presupuesto",
          quotation: "Presupuesto",
          productId: "ID de Producto",
          product: "Producto",
          quantity: "Cantidad",
          unitPrice: "Precio Unitario",
          taxRate: "Tasa de Impuesto",
          total: "Total",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          discountPercent: "Descuento (%)",
          notes: "Notas"
        }
      },

      invoice: {
        title: "Facturas",
        fields: {
          id: "ID",
          invoiceNumber: "Número de Factura",
          invoiceType: "Tipo de Factura",
          date: "Fecha de Emisión",
          dueDate: "Fecha de Vencimiento",
          status: "Estado",
          totalBase: "Base Imponible",
          totalTax: "Total Impuestos",
          totalAmount: "Importe Total",
          notes: "Notas",
          purchases: "Compras Relacionadas",
          sales: "Ventas Relacionadas",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          accountingEntry: "Asiento Contable",
          aeatSubmitted: "Enviado a AEAT",
          aeatSubmissionDate: "Fecha de Envío AEAT",
          aeatSubmissionId: "ID de Envío AEAT",
          payments: "Pagos",
          fiscalYearId: "ID de Ejercicio",
          fiscalYear: "Ejercicio Fiscal",
          creatorId: "ID de Creador",
          creator: "Creador",
          creditNote: "Nota de Crédito",
          originalInvoiceId: "ID Factura Original",
          originalInvoice: "Factura Original",
          correctionInvoices: "Facturas Rectificativas"
        }
      },

      payment: {
        title: "Pagos",
        fields: {
          id: "ID",
          reference: "Referencia",
          invoiceId: "ID de Factura",
          invoice: "Factura",
          amount: "Importe",
          date: "Fecha",
          paymentMethod: "Método de Pago",
          notes: "Notas",
          sepaRemittanceId: "ID de Remesa SEPA",
          sepaRemittance: "Remesa SEPA",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          accountingEntry: "Asiento Contable",
          recordedById: "ID de Registrador",
          recordedBy: "Registrador",
          bankReference: "Referencia Bancaria"
        }
      },

      sepaRemittance: {
        title: "Remesas SEPA",
        fields: {
          id: "ID",
          reference: "Referencia",
          generationDate: "Fecha de Generación",
          submissionDate: "Fecha de Envío",
          status: "Estado",
          totalAmount: "Importe Total",
          messageId: "ID de Mensaje",
          notes: "Notas",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          payments: "Pagos",
          creatorId: "ID de Creador",
          creator: "Creador"
        }
      },

      fiscalYear: {
        title: "Ejercicios Fiscales",
        fields: {
          id: "ID",
          name: "Nombre",
          startDate: "Inicio",
          endDate: "Fin",
          isClosed: "Cerrado",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          accountingEntries: "Asientos Contables",
          budgets: "Presupuestos",
          invoices: "Facturas"
        }
      },

      accountingAccount: {
        title: "Cuentas Contables",
        fields: {
          id: "ID",
          code: "Código",
          name: "Nombre",
          accountType: "Tipo de Cuenta",
          isActive: "Activo",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          debitEntries: "Apuntes Debe",
          creditEntries: "Apuntes Haber",
          budgets: "Presupuestos",
          parentId: "ID de Cuenta Padre",
          parent: "Cuenta Padre",
          children: "Subcuentas"
        }
      },

      accountBudget: {
        title: "Presupuestos Contables",
        fields: {
          id: "ID",
          fiscalYearId: "ID de Ejercicio",
          fiscalYear: "Ejercicio Fiscal",
          accountId: "ID de Cuenta",
          account: "Cuenta",
          budgetAmount: "Presupuesto Total",
          jan: "Enero",
          feb: "Febrero",
          mar: "Marzo",
          apr: "Abril",
          may: "Mayo",
          jun: "Junio",
          jul: "Julio",
          aug: "Agosto",
          sep: "Septiembre",
          oct: "Octubre",
          nov: "Noviembre",
          dec: "Diciembre",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización"
        }
      },

      accountingEntry: {
        title: "Asientos Contables",
        fields: {
          id: "ID",
          reference: "Referencia",
          date: "Fecha",
          description: "Descripción",
          isAdjustment: "Es Ajuste",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización",
          lines: "Líneas",
          invoiceId: "ID de Factura",
          invoice: "Factura",
          paymentId: "ID de Pago",
          payment: "Pago",
          fiscalYearId: "ID de Ejercicio",
          fiscalYear: "Ejercicio Fiscal",
          creatorId: "ID de Creador",
          creator: "Creador",
          entryType: "Tipo de Asiento"
        }
      },

      accountingEntryLine: {
        title: "Líneas de Asiento",
        fields: {
          id: "ID",
          entryId: "ID de Asiento",
          entry: "Asiento",
          description: "Descripción",
          debitAccountId: "ID Cuenta Debe",
          debitAccount: "Cuenta Debe",
          creditAccountId: "ID Cuenta Haber",
          creditAccount: "Cuenta Haber",
          amount: "Importe",
          createdAt: "Fecha de Creación",
          updatedAt: "Fecha de Actualización"
        }
      },

      auditLog: {
        title: "Registros de Auditoría",
        fields: {
          id: "ID",
          userId: "ID de Usuario",
          user: "Usuario",
          action: "Acción",
          entityType: "Tipo de Entidad",
          entityId: "ID de Entidad",
          oldValue: "Valor Anterior",
          newValue: "Valor Nuevo",
          ipAddress: "IP",
          userAgent: "Agente de Usuario",
          timestamp: "Fecha y Hora"
        }
      }

    },
    commons: {
      backToList: "Volver a la lista",
      noData: "No hay datos disponibles",
      loading: "Cargando...",
      forms: {
        create: "Crear",
        update: "Actualizar",
        delete: "Eliminar",
        cancel: "Cancelar",
        save: "Guardar",
        edit: "Editar",
        view: "Ver",
        search: "Buscar",
        clear: "Limpiar",
        select: "Seleccionar",
        selectAll: "Seleccionar todo",
        selectNone: "Deseleccionar todo",
        selectSome: "Seleccionar algunos",
        selectOne: "Seleccionar uno",
        new: "Nuevo",
        back: "Volver",
        upload: "Subir",
        download: "Descargar",
        print: "Imprimir",
        export: "Exportar",
        filter: "Filtrar",
        sort: "Ordenar"
      },
      errors: {
        mustBeFilled: "Este campo es obligatorio",
        invalidEmail: "Correo electrónico inválido",
        invalidPhone: "Número de teléfono inválido",
        invalidUrl: "URL inválida",
        invalidDate: "Fecha inválida",
        invalidNumber: "Número inválido",
        invalidPassword: "Contraseña inválida",
        invalidDni: "Documento inválido",
        passwordsMustMatch: "Las contraseñas deben coincidir"
      },
      code: "Código",
      name: "Nombre",
      stock: "Stock",
      minLevel: "Nivel Mínimo",
      price: "Precio",
      cost: "Costo",
      reference: "Referencia",
      date: "Fecha",
      dueDate: "Fecha Vencimiento",
      status: "Estado",
      amount: "Importe",
      number: "Número",
      type: "Tipo",
      startDate: "Fecha Inicio",
      warehouse: "Almacén",
      responsible: "Responsable",
      products: "Productos",
    },
    auth: {
      errors: {
        enterYourName: "Ingrese su nombre",
        emailIsRequired: "El correo electrónico es obligatorio",
        passwordIsRequired: "La contraseña es obligatoria",
        usernameIsRequired: "El nombre de usuario es obligatorio",
        invalidEmail: "Correo electrónico inválido",
        passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
        passwordsDoNotMatch: "Las contraseñas no coinciden",
        userNotFound: "Usuario no encontrado",
        invalidCredentials: "Credenciales inválidas",
        accountLocked: "Cuenta bloqueada",
        sessionExpired: "Sesión expirada"
      },
      login: "Iniciar sesión",
      logout: "Cerrar sesión",
      register: {
        title: "Registro",
        description: "¿Ya tienes una cuenta?",
        fields: {
          username: "Nombre de usuario",
          usernamePlaceholder: "Ingrese su nombre de usuario",
          email: "Correo electrónico",
          emailPlaceholder: "Ingrese su correo electrónico",
          password: "Contraseña",
          passwordPlaceholder: "Ingrese su contraseña",
          confirmPassword: "Confirmar contraseña",
          confirmPasswordPlaceholder: "Confirme su contraseña",
          fullName: "Nombre completo",
          fullNamePlaceholder: "Ingrese su nombre completo",
          phone: "Teléfono",
          phonePlaceholder: "Ingrese su número de teléfono",
          role: "Rol",
          acceptTerms: "Acepto los términos y condiciones"
        }
      },
      email: "Correo electrónico",
      password: "Contraseña",
      rememberMe: "Recordarme",
      forgotPassword: "Olvidé mi contraseña",
      resetPassword: "Restablecer contraseña",
      sendResetLink: "Enviar enlace de restablecimiento",
      passwordConfirmation: "Confirmación de contraseña",
      passwordResetSuccess: "Contraseña restablecida con éxito. Inicie sesión.",
      passwordResetError: "Error al restablecer la contraseña. Intente nuevamente.",
      mfaSetup: "Configurar autenticación de dos factores",
      mfaVerify: "Verificar código de autenticación",
      mfaEnterCode: "Ingrese el código de verificación"
    },
    dashboard: {
      title: "Panel de Control",
      monthlySales: "Ventas del Mes",
      monthlyPurchases: "Compras del Mes",
      grossProfit: "Beneficio Bruto",
      salesTrend: "Tendencia de Ventas",
      topProducts: "Productos más Vendidos",
      topCustomers: "Clientes Principales",
      lowStockProducts: "Productos con Poco Stock",
      lowStockMaterials: "Materiales con Poco Stock",
      pendingInvoices: "Facturas Pendientes",
      ongoingProduction: "Producción en Curso",
    },
    sections: {
      dashboard: "Panel de Control",
      users: "Usuarios",
      contacts: "Contactos",
      inventory: "Inventario",
      products: "Productos",
      production: "Producción",
      sales: "Ventas",
      finance: "Finanzas",
      map: "Mapa",
      includes: "Incluye"
    },
    sidebar: {
      dashboard: "Panel de Control",
      inventory: "Inventario",
      sales: "Ventas",
      purchases: "Compras",
      production: "Producción",
      accounting: "Contabilidad",
      admin: "Administración",
    },
    dateFilter: {
      selectRange: "Seleccionar período",
      selectPeriod: "Seleccionar período",
      customRange: "Período personalizado",
      startDate: "Fecha inicio",
      endDate: "Fecha fin",
      apply: "Aplicar",
      today: "Hoy",
      yesterday: "Ayer",
      last7Days: "Últimos 7 días",
      last30Days: "Últimos 30 días",
      thisMonth: "Este mes",
      lastMonth: "Mes anterior",
      thisQuarter: "Este trimestre",
      lastQuarter: "Trimestre anterior",
      thisYear: "Este año",
      lastYear: "Año anterior"
    }
  }
};

export default es;