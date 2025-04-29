const en = {
  translation: {
    models: {
      enums: {
        customerType: {
          RETAIL: "Retail",
          WHOLESALE: "Wholesale"
        },
        customerSegment: {
          GENERAL: "General",
          VIP: "VIP",
          STRATEGIC: "Strategic",
          OCCASIONAL: "Occasional"
        },
        addressType: {
          BILLING: "Billing",
          SHIPPING: "Shipping",
          BOTH: "Both",
          MAIN: "Main"
        },
        paymentTerms: {
          IMMEDIATE: "Immediate Payment",
          END_OF_MONTH: "End of Month",
          FIFTEEN_DAYS: "15 Days",
          THIRTY_DAYS: "30 Days",
          SIXTY_DAYS: "60 Days"
        },
        productionStatus: {
          PLANNED: "Planned",
          IN_PROGRESS: "In Progress",
          COMPLETED: "Completed",
          CANCELLED: "Cancelled",
          ON_HOLD: "On Hold"
        },
        defectSeverity: {
          MINOR: "Minor",
          MAJOR: "Major",
          CRITICAL: "Critical"
        },
        purchaseStatus: {
          DRAFT: "Draft",
          CONFIRMED: "Confirmed",
          RECEIVED: "Received",
          CANCELLED: "Cancelled",
          PARTIALLY_RECEIVED: "Partially Received"
        },
        saleStatus: {
          DRAFT: "Draft",
          CONFIRMED: "Confirmed",
          DELIVERED: "Delivered",
          CANCELLED: "Cancelled",
          PARTIALLY_DELIVERED: "Partially Delivered",
          INVOICED: "Invoiced",
          RETURNED: "Returned"
        },
        returnStatus: {
          PENDING: "Pending",
          APPROVED: "Approved",
          REJECTED: "Rejected",
          COMPLETED: "Completed",
          REFUNDED: "Refunded"
        },
        returnCondition: {
          GOOD: "Good Condition",
          DAMAGED: "Damaged",
          DEFECTIVE: "Defective",
          OPENED: "Opened/Used",
          UNOPENED: "Unopened"
        },
        quotationStatus: {
          DRAFT: "Draft",
          SENT: "Sent",
          ACCEPTED: "Accepted",
          REJECTED: "Rejected",
          EXPIRED: "Expired",
          CONVERTED: "Converted to Sale"
        },
        invoiceType: {
          PURCHASE: "Purchase Invoice",
          SALE: "Sales Invoice"
        },
        invoiceStatus: {
          DRAFT: "Draft",
          CONFIRMED: "Confirmed",
          PAID: "Paid",
          PARTIALLY_PAID: "Partially Paid",
          CANCELLED: "Cancelled",
          OVERDUE: "Overdue"
        },
        paymentMethod: {
          CASH: "Cash",
          BANK_TRANSFER: "Bank Transfer",
          CREDIT_CARD: "Credit Card",
          SEPA_DIRECT_DEBIT: "SEPA Direct Debit",
          CHECK: "Check",
          OTHER: "Other"
        },
        sepaStatus: {
          DRAFT: "Draft",
          GENERATED: "Generated",
          SUBMITTED: "Submitted",
          REJECTED: "Rejected",
          PROCESSED: "Processed",
          PARTIALLY_PROCESSED: "Partially Processed"
        },
        accountType: {
          ASSET: "Asset",
          LIABILITY: "Liability",
          EQUITY: "Equity",
          INCOME: "Income",
          EXPENSE: "Expense"
        }
      },

      user: {
        title: "Users",
        fields: {
          id: "ID",
          email: "Email",
          password: "Password",
          firstName: "First Name",
          lastName: "Last Name",
          active: "Active",
          createdAt: "Created At",
          updatedAt: "Updated At",
          role: "Role",
          roleId: "Role ID",
          employee: "Employee",
          auditLogs: "Audit Logs",
          apiKeys: "API Keys",
          lastLogin: "Last Login",
          failedAttempts: "Failed Attempts",
          lockedUntil: "Locked Until",
          passwordResetToken: "Password Reset Token",
          passwordHistory: "Password History"
        }
      },

      passwordHistory: {
        title: "Password History",
        fields: {
          id: "ID",
          userId: "User ID",
          user: "User",
          password: "Previous Password",
          createdAt: "Change Date"
        }
      },

      apiKey: {
        title: "API Keys",
        fields: {
          id: "ID",
          userId: "User ID",
          user: "User",
          keyValue: "Key Value",
          name: "Name",
          expiresAt: "Expires At",
          lastUsed: "Last Used",
          createdAt: "Created At"
        }
      },

      role: {
        title: "Roles",
        fields: {
          id: "ID",
          name: "Name",
          description: "Description",
          permissions: "Permissions",
          users: "Users"
        }
      },

      permission: {
        title: "Permissions",
        fields: {
          id: "ID",
          name: "Name",
          description: "Description",
          roles: "Roles"
        }
      },

      employee: {
        title: "Employees",
        fields: {
          id: "ID",
          nif: "Tax ID",
          address: "Address",
          phone: "Phone",
          position: "Position",
          salary: "Salary",
          hireDate: "Hire Date",
          userId: "User ID",
          user: "User",
          createdAt: "Created At",
          updatedAt: "Updated At",
          warehouseId: "Warehouse ID",
          warehouse: "Warehouse",
          department: "Department",
          emergencyContact: "Emergency Contact",
          productionsAsResponsible: "Productions as Responsible",
          qualityControlsAsInspector: "Quality Controls as Inspector",
          purchasesAsRequester: "Purchases as Requester",
          purchasesAsApprover: "Purchases as Approver",
          salesAsSalesRep: "Sales as Sales Rep",
          quotationsAsCreator: "Quotations as Creator",
          invoicesAsCreator: "Invoices as Creator",
          paymentsAsRecorder: "Payments as Recorder",
          sepaRemittancesAsCreator: "SEPA Remittances as Creator",
          accountingEntriesAsCreator: "Accounting Entries as Creator"
        }
      },

      supplier: {
        title: "Suppliers",
        fields: {
          id: "ID",
          name: "Name",
          nif: "Tax ID",
          address: "Address",
          phone: "Phone",
          email: "Email",
          contactPerson: "Contact Person",
          active: "Active",
          createdAt: "Created At",
          updatedAt: "Updated At",
          deletedAt: "Deleted At",
          purchases: "Purchases",
          materials: "Materials",
          addresses: "Addresses",
          contacts: "Contacts",
          paymentTerms: "Payment Terms",
          notes: "Notes"
        }
      },

      supplierAddress: {
        title: "Supplier Addresses",
        fields: {
          id: "ID",
          supplierId: "Supplier ID",
          supplier: "Supplier",
          addressType: "Address Type",
          street: "Street",
          city: "City",
          postalCode: "Postal Code",
          region: "Region",
          country: "Country",
          isDefault: "Default"
        }
      },

      supplierContact: {
        title: "Supplier Contacts",
        fields: {
          id: "ID",
          supplierId: "Supplier ID",
          supplier: "Supplier",
          name: "Name",
          position: "Position",
          phone: "Phone",
          email: "Email",
          isPrimary: "Primary"
        }
      },

      customer: {
        title: "Customers",
        fields: {
          id: "ID",
          name: "Name",
          nif: "Tax ID",
          address: "Address",
          phone: "Phone",
          email: "Email",
          contactPerson: "Contact Person",
          customerType: "Customer Type",
          paymentTerms: "Payment Terms",
          sepaEnabled: "SEPA Enabled",
          sepaMandateId: "SEPA Mandate ID",
          sepaIban: "SEPA IBAN",
          active: "Active",
          createdAt: "Created At",
          updatedAt: "Updated At",
          deletedAt: "Deleted At",
          sales: "Sales",
          quotations: "Quotations",
          addresses: "Addresses",
          contacts: "Contacts",
          creditLimit: "Credit Limit",
          discountRate: "Discount Rate",
          customerSince: "Customer Since",
          segment: "Segment",
          returnOrders: "Return Orders"
        }
      },

      customerAddress: {
        title: "Customer Addresses",
        fields: {
          id: "ID",
          customerId: "Customer ID",
          customer: "Customer",
          addressType: "Address Type",
          street: "Street",
          city: "City",
          postalCode: "Postal Code",
          region: "Region",
          country: "Country",
          isDefault: "Default"
        }
      },

      customerContact: {
        title: "Customer Contacts",
        fields: {
          id: "ID",
          customerId: "Customer ID",
          customer: "Customer",
          name: "Name",
          position: "Position",
          phone: "Phone",
          email: "Email",
          isPrimary: "Primary",
          department: "Department"
        }
      },

      warehouse: {
        title: "Warehouses",
        fields: {
          id: "ID",
          code: "Code",
          name: "Name",
          address: "Address",
          active: "Active",
          isDefault: "Default",
          locations: "Locations",
          employees: "Employees",
          createdAt: "Created At",
          updatedAt: "Updated At"
        }
      },

      warehouseLocation: {
        title: "Warehouse Locations",
        fields: {
          id: "ID",
          warehouseId: "Warehouse ID",
          warehouse: "Warehouse",
          code: "Code",
          description: "Description",
          productLocations: "Products",
          materialLocations: "Materials"
        }
      },

      material: {
        title: "Materials",
        fields: {
          id: "ID",
          code: "Code",
          name: "Name",
          description: "Description",
          unitOfMeasure: "Unit of Measure",
          stockQuantity: "Stock Quantity",
          minStockLevel: "Minimum Stock Level",
          costPrice: "Cost Price",
          active: "Active",
          createdAt: "Created At",
          updatedAt: "Updated At",
          deletedAt: "Deleted At",
          suppliers: "Suppliers",
          purchaseItems: "Purchase Items",
          productionInputs: "Production Inputs",
          categoryId: "Category ID",
          category: "Category",
          locations: "Locations"
        }
      },

      materialSupplier: {
        title: "Material Suppliers",
        fields: {
          materialId: "Material ID",
          material: "Material",
          supplierId: "Supplier ID",
          supplier: "Supplier",
          supplierCode: "Supplier Code",
          price: "Price",
          leadTimeDays: "Lead Time (Days)",
          createdAt: "Created At",
          updatedAt: "Updated At",
          isPreferred: "Preferred",
          minOrderQuantity: "Minimum Order Quantity",
          lastPurchaseDate: "Last Purchase Date"
        }
      },

      materialCategory: {
        title: "Material Categories",
        fields: {
          id: "ID",
          name: "Name",
          description: "Description",
          parentId: "Parent ID",
          parent: "Parent Category",
          children: "Subcategories",
          materials: "Materials"
        }
      },

      materialLocation: {
        title: "Material Locations",
        fields: {
          id: "ID",
          materialId: "Material ID",
          material: "Material",
          locationId: "Location ID",
          location: "Location",
          quantity: "Quantity"
        }
      },

      product: {
        title: "Products",
        fields: {
          id: "ID",
          code: "Code",
          name: "Name",
          description: "Description",
          unitOfMeasure: "Unit of Measure",
          stockQuantity: "Stock Quantity",
          minStockLevel: "Minimum Stock Level",
          retailPrice: "Retail Price",
          wholesalePrice: "Wholesale Price",
          costPrice: "Cost Price",
          taxRate: "Tax Rate",
          active: "Active",
          createdAt: "Created At",
          updatedAt: "Updated At",
          deletedAt: "Deleted At",
          productionOutputs: "Production Outputs",
          saleItems: "Sale Items",
          quotationItems: "Quotation Items",
          categoryId: "Category ID",
          category: "Category",
          images: "Images",
          attributes: "Attributes",
          locations: "Locations",
          barcode: "Barcode",
          weight: "Weight",
          dimensions: "Dimensions"
        }
      },

      productCategory: {
        title: "Product Categories",
        fields: {
          id: "ID",
          name: "Name",
          description: "Description",
          parentId: "Parent ID",
          parent: "Parent Category",
          children: "Subcategories",
          products: "Products"
        }
      },

      productImage: {
        title: "Product Images",
        fields: {
          id: "ID",
          productId: "Product ID",
          product: "Product",
          url: "URL",
          alt: "Alt Text",
          isPrimary: "Primary",
          sortOrder: "Sort Order"
        }
      },

      productAttribute: {
        title: "Product Attributes",
        fields: {
          id: "ID",
          productId: "Product ID",
          product: "Product",
          name: "Name",
          value: "Value"
        }
      },

      productLocation: {
        title: "Product Locations",
        fields: {
          id: "ID",
          productId: "Product ID",
          product: "Product",
          locationId: "Location ID",
          location: "Location",
          quantity: "Quantity"
        }
      },

      production: {
        title: "Production Orders",
        fields: {
          id: "ID",
          reference: "Reference",
          startDate: "Start Date",
          endDate: "End Date",
          status: "Status",
          notes: "Notes",
          createdAt: "Created At",
          updatedAt: "Updated At",
          inputs: "Inputs",
          outputs: "Outputs",
          warehouseId: "Warehouse ID",
          warehouse: "Warehouse",
          responsibleId: "Responsible ID",
          responsible: "Responsible",
          qualityControls: "Quality Controls",
          laborCost: "Labor Cost",
          overheadCost: "Overhead Cost",
          batchNumber: "Batch Number"
        }
      },

      productionInput: {
        title: "Production Inputs",
        fields: {
          id: "ID",
          productionId: "Production ID",
          production: "Production",
          materialId: "Material ID",
          material: "Material",
          quantity: "Quantity",
          unitCost: "Unit Cost",
          createdAt: "Created At",
          updatedAt: "Updated At",
          locationId: "Location ID",
          location: "Location"
        }
      },

      productionOutput: {
        title: "Production Outputs",
        fields: {
          id: "ID",
          productionId: "Production ID",
          production: "Production",
          productId: "Product ID",
          product: "Product",
          quantity: "Quantity",
          finalCost: "Final Cost",
          createdAt: "Created At",
          updatedAt: "Updated At",
          locationId: "Location ID",
          location: "Location"
        }
      },

      qualityControl: {
        title: "Quality Controls",
        fields: {
          id: "ID",
          productionId: "Production ID",
          production: "Production",
          inspectionDate: "Inspection Date",
          inspectorId: "Inspector ID",
          inspector: "Inspector",
          passedInspection: "Inspection Passed",
          notes: "Notes",
          defects: "Defects"
        }
      },

      qualityDefect: {
        title: "Quality Defects",
        fields: {
          id: "ID",
          qualityControlId: "Quality Control ID",
          qualityControl: "Quality Control",
          defectType: "Defect Type",
          description: "Description",
          severity: "Severity",
          quantity: "Quantity"
        }
      },

      purchase: {
        title: "Purchase Orders",
        fields: {
          id: "ID",
          reference: "Reference",
          supplierId: "Supplier ID",
          supplier: "Supplier",
          date: "Date",
          expectedDelivery: "Expected Delivery",
          status: "Status",
          totalAmount: "Total Amount",
          notes: "Notes",
          createdAt: "Created At",
          updatedAt: "Updated At",
          items: "Items",
          invoices: "Invoices",
          warehouseId: "Warehouse ID",
          warehouse: "Warehouse",
          requesterId: "Requester ID",
          requester: "Requester",
          approverId: "Approver ID",
          approver: "Approver",
          receivedDate: "Received Date",
          deliveryNote: "Delivery Note",
          discountPercent: "Discount (%)"
        }
      },

      purchaseItem: {
        title: "Purchase Items",
        fields: {
          id: "ID",
          purchaseId: "Purchase ID",
          purchase: "Purchase",
          materialId: "Material ID",
          material: "Material",
          quantity: "Quantity",
          unitPrice: "Unit Price",
          taxRate: "Tax Rate",
          total: "Total",
          createdAt: "Created At",
          updatedAt: "Updated At",
          receivedQuantity: "Received Quantity",
          locationId: "Location ID",
          location: "Location",
          discountPercent: "Discount (%)",
          notes: "Notes"
        }
      },

      sale: {
        title: "Sales",
        fields: {
          id: "ID",
          reference: "Reference",
          customerId: "Customer ID",
          customer: "Customer",
          date: "Date",
          deliveryDate: "Delivery Date",
          status: "Status",
          totalAmount: "Total Amount",
          notes: "Notes",
          fromQuotation: "From Quotation",
          quotationId: "Quotation ID",
          createdAt: "Created At",
          updatedAt: "Updated At",
          items: "Items",
          invoices: "Invoices",
          warehouseId: "Warehouse ID",
          warehouse: "Warehouse",
          salesRepId: "Sales Rep ID",
          salesRep: "Sales Rep",
          deliveryAddress: "Delivery Address",
          shippingMethod: "Shipping Method",
          paymentMethod: "Payment Method",
          discountPercent: "Discount (%)",
          returnOrders: "Return Orders",
          deliveryNote: "Delivery Note"
        }
      },

      saleItem: {
        title: "Sale Items",
        fields: {
          id: "ID",
          saleId: "Sale ID",
          sale: "Sale",
          productId: "Product ID",
          product: "Product",
          quantity: "Quantity",
          unitPrice: "Unit Price",
          taxRate: "Tax Rate",
          total: "Total",
          createdAt: "Created At",
          updatedAt: "Updated At",
          deliveredQuantity: "Delivered Quantity",
          locationId: "Location ID",
          location: "Location",
          discountPercent: "Discount (%)",
          notes: "Notes",
          returnItems: "Return Items"
        }
      },

      returnOrder: {
        title: "Return Orders",
        fields: {
          id: "ID",
          reference: "Reference",
          saleId: "Sale ID",
          sale: "Sale",
          customerId: "Customer ID",
          customer: "Customer",
          date: "Date",
          reason: "Reason",
          status: "Status",
          totalAmount: "Total Amount",
          notes: "Notes",
          items: "Items",
          createdAt: "Created At",
          updatedAt: "Updated At"
        }
      },

      returnOrderItem: {
        title: "Return Order Items",
        fields: {
          id: "ID",
          returnOrderId: "Return Order ID",
          returnOrder: "Return Order",
          saleItemId: "Sale Item ID",
          saleItem: "Sale Item",
          productId: "Product ID",
          product: "Product",
          quantity: "Quantity",
          unitPrice: "Unit Price",
          total: "Total",
          reason: "Reason",
          condition: "Condition"
        }
      },

      quotation: {
        title: "Quotations",
        fields: {
          id: "ID",
          reference: "Reference",
          customerId: "Customer ID",
          customer: "Customer",
          date: "Date",
          validUntil: "Valid Until",
          status: "Status",
          totalAmount: "Total Amount",
          notes: "Notes",
          createdAt: "Created At",
          updatedAt: "Updated At",
          items: "Items",
          sales: "Generated Sales",
          creatorId: "Creator ID",
          creator: "Creator",
          discountPercent: "Discount (%)"
        }
      },

      quotationItem: {
        title: "Quotation Items",
        fields: {
          id: "ID",
          quotationId: "Quotation ID",
          quotation: "Quotation",
          productId: "Product ID",
          product: "Product",
          quantity: "Quantity",
          unitPrice: "Unit Price",
          taxRate: "Tax Rate",
          total: "Total",
          createdAt: "Created At",
          updatedAt: "Updated At",
          discountPercent: "Discount (%)",
          notes: "Notes"
        }
      },

      invoice: {
        title: "Invoices",
        fields: {
          id: "ID",
          invoiceNumber: "Invoice Number",
          invoiceType: "Invoice Type",
          date: "Issue Date",
          dueDate: "Due Date",
          status: "Status",
          totalBase: "Base Amount",
          totalTax: "Total Tax",
          totalAmount: "Total Amount",
          notes: "Notes",
          purchases: "Related Purchases",
          sales: "Related Sales",
          createdAt: "Created At",
          updatedAt: "Updated At",
          accountingEntry: "Accounting Entry",
          aeatSubmitted: "Submitted to AEAT",
          aeatSubmissionDate: "AEAT Submission Date",
          aeatSubmissionId: "AEAT Submission ID",
          payments: "Payments",
          fiscalYearId: "Fiscal Year ID",
          fiscalYear: "Fiscal Year",
          creatorId: "Creator ID",
          creator: "Creator",
          creditNote: "Credit Note",
          originalInvoiceId: "Original Invoice ID",
          originalInvoice: "Original Invoice",
          correctionInvoices: "Correction Invoices"
        }
      },

      payment: {
        title: "Payments",
        fields: {
          id: "ID",
          reference: "Reference",
          invoiceId: "Invoice ID",
          invoice: "Invoice",
          amount: "Amount",
          date: "Date",
          paymentMethod: "Payment Method",
          notes: "Notes",
          sepaRemittanceId: "SEPA Remittance ID",
          sepaRemittance: "SEPA Remittance",
          createdAt: "Created At",
          updatedAt: "Updated At",
          accountingEntry: "Accounting Entry",
          recordedById: "Recorder ID",
          recordedBy: "Recorder",
          bankReference: "Bank Reference"
        }
      },

      sepaRemittance: {
        title: "SEPA Remittances",
        fields: {
          id: "ID",
          reference: "Reference",
          generationDate: "Generation Date",
          submissionDate: "Submission Date",
          status: "Status",
          totalAmount: "Total Amount",
          messageId: "Message ID",
          notes: "Notes",
          createdAt: "Created At",
          updatedAt: "Updated At",
          payments: "Payments",
          creatorId: "Creator ID",
          creator: "Creator"
        }
      },

      fiscalYear: {
        title: "Fiscal Years",
        fields: {
          id: "ID",
          name: "Name",
          startDate: "Start Date",
          endDate: "End Date",
          isClosed: "Closed",
          createdAt: "Created At",
          updatedAt: "Updated At",
          accountingEntries: "Accounting Entries",
          budgets: "Budgets",
          invoices: "Invoices"
        }
      },

      accountingAccount: {
        title: "Accounting Accounts",
        fields: {
          id: "ID",
          code: "Code",
          name: "Name",
          accountType: "Account Type",
          isActive: "Active",
          createdAt: "Created At",
          updatedAt: "Updated At",
          debitEntries: "Debit Entries",
          creditEntries: "Credit Entries",
          budgets: "Budgets",
          parentId: "Parent Account ID",
          parent: "Parent Account",
          children: "Subaccounts"
        }
      },

      accountBudget: {
        title: "Accounting Budgets",
        fields: {
          id: "ID",
          fiscalYearId: "Fiscal Year ID",
          fiscalYear: "Fiscal Year",
          accountId: "Account ID",
          account: "Account",
          budgetAmount: "Total Budget",
          jan: "January",
          feb: "February",
          mar: "March",
          apr: "April",
          may: "May",
          jun: "June",
          jul: "July",
          aug: "August",
          sep: "September",
          oct: "October",
          nov: "November",
          dec: "December",
          createdAt: "Created At",
          updatedAt: "Updated At"
        }
      },

      accountingEntry: {
        title: "Accounting Entries",
        fields: {
          id: "ID",
          reference: "Reference",
          date: "Date",
          description: "Description",
          isAdjustment: "Is Adjustment",
          createdAt: "Created At",
          updatedAt: "Updated At",
          lines: "Lines",
          invoiceId: "Invoice ID",
          invoice: "Invoice",
          paymentId: "Payment ID",
          payment: "Payment",
          fiscalYearId: "Fiscal Year ID",
          fiscalYear: "Fiscal Year",
          creatorId: "Creator ID",
          creator: "Creator",
          entryType: "Entry Type"
        }
      },

      accountingEntryLine: {
        title: "Accounting Entry Lines",
        fields: {
          id: "ID",
          entryId: "Entry ID",
          entry: "Entry",
          description: "Description",
          debitAccountId: "Debit Account ID",
          debitAccount: "Debit Account",
          creditAccountId: "Credit Account ID",
          creditAccount: "Credit Account",
          amount: "Amount",
          createdAt: "Created At",
          updatedAt: "Updated At"
        }
      },

      auditLog: {
        title: "Audit Logs",
        fields: {
          id: "ID",
          userId: "User ID",
          user: "User",
          action: "Action",
          entityType: "Entity Type",
          entityId: "Entity ID",
          oldValue: "Old Value",
          newValue: "New Value",
          ipAddress: "IP Address",
          userAgent: "User Agent",
          timestamp: "Timestamp"
        }
      }
    },

    commons: {
      backToList: "Back to List",
      noData: "No data available",
      loading: "Loading...",
      forms: {
        create: "Create",
        update: "Update",
        delete: "Delete",
        cancel: "Cancel",
        save: "Save",
        edit: "Edit",
        view: "View",
        search: "Search",
        clear: "Clear",
        select: "Select",
        selectAll: "Select All",
        selectNone: "Select None",
        selectSome: "Select Some",
        selectOne: "Select One",
        new: "New",
        back: "Back",
        upload: "Upload",
        download: "Download",
        print: "Print",
        export: "Export",
        filter: "Filter",
        sort: "Sort"
      },
      errors: {
        mustBeFilled: "This field is required",
        invalidEmail: "Invalid email",
        invalidPhone: "Invalid phone number",
        invalidUrl: "Invalid URL",
        invalidDate: "Invalid date",
        invalidNumber: "Invalid number",
        invalidPassword: "Invalid password",
        invalidDni: "Invalid document",
        passwordsMustMatch: "Passwords must match"
      },
      code: "Code",
      name: "Name",
      stock: "Stock",
      minLevel: "Minimum Level",
      price: "Price",
      cost: "Cost",
      reference: "Reference",
      date: "Date",
      dueDate: "Due Date",
      status: "Status",
      amount: "Amount",
      number: "Number",
      type: "Type",
      startDate: "Start Date",
      warehouse: "Warehouse",
      responsible: "Responsible",
      products: "Products",
    },

    auth: {
      errors: {
        enterYourName: "Enter your name",
        emailIsRequired: "Email is required",
        passwordIsRequired: "Password is required",
        usernameIsRequired: "Username is required",
        invalidEmail: "Invalid email",
        passwordTooShort: "Password must be at least 6 characters",
        passwordsDoNotMatch: "Passwords do not match",
        userNotFound: "User not found",
        invalidCredentials: "Invalid credentials",
        accountLocked: "Account locked",
        sessionExpired: "Session expired"
      },
      login: "Log in",
      logout: "Log out",
      register: {
        title: "Register",
        description: "Already have an account?",
        fields: {
          username: "Username",
          usernamePlaceholder: "Enter your username",
          email: "Email",
          emailPlaceholder: "Enter your email",
          password: "Password",
          passwordPlaceholder: "Enter your password",
          confirmPassword: "Confirm Password",
          confirmPasswordPlaceholder: "Confirm your password",
          fullName: "Full Name",
          fullNamePlaceholder: "Enter your full name",
          phone: "Phone",
          phonePlaceholder: "Enter your phone number",
          role: "Role",
          acceptTerms: "I accept the terms and conditions"
        }
      },
      email: "Email",
      password: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password",
      resetPassword: "Reset password",
      sendResetLink: "Send reset link",
      passwordConfirmation: "Password confirmation",
      passwordResetSuccess: "Password reset successfully. Log in.",
      passwordResetError: "Error resetting password. Try again.",
      mfaSetup: "Set up two-factor authentication",
      mfaVerify: "Verify authentication code",
      mfaEnterCode: "Enter the verification code"
    },

    dashboard: {
      title: "Dashboard",
      monthlySales: "Monthly Sales",
      monthlyPurchases: "Monthly Purchases",
      grossProfit: "Gross Profit",
      salesTrend: "Sales Trend",
      topProducts: "Top Selling Products",
      topCustomers: "Top Customers",
      lowStockProducts: "Low Stock Products",
      lowStockMaterials: "Low Stock Materials",
      pendingInvoices: "Pending Invoices",
      ongoingProduction: "Ongoing Production",
    },

    sections: {
      dashboard: "Dashboard",
      users: "Users",
      contacts: "Contacts",
      inventory: "Inventory",
      products: "Products",
      production: "Production",
      sales: "Sales",
      finance: "Finance",
      map: "Map",
      includes: "Includes"
    },

    sidebar: {
      dashboard: "Dashboard",
      inventory: "Inventory",
      sales: "Sales",
      purchases: "Purchases",
      production: "Production",
      accounting: "Accounting",
      admin: "Administration",
    },

    dateFilter: {
      selectRange: "Select range",
      selectPeriod: "Select period",
      customRange: "Custom range",
      startDate: "Start date",
      endDate: "End date",
      apply: "Apply",
      today: "Today",
      yesterday: "Yesterday",
      last7Days: "Last 7 days",
      last30Days: "Last 30 days",
      thisMonth: "This month",
      lastMonth: "Last month",
      thisQuarter: "This quarter",
      lastQuarter: "Last quarter",
      thisYear: "This year",
      lastYear: "Last year"
    }
  }
};

export default en;