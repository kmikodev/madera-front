const pl = {
    translation: {
      models: {
        enums: {
          customerType: {
            RETAIL: "Detaliczny",
            WHOLESALE: "Hurtowy"
          },
          customerSegment: {
            GENERAL: "Ogólny",
            VIP: "VIP",
            STRATEGIC: "Strategiczny",
            OCCASIONAL: "Okazjonalny"
          },
          addressType: {
            BILLING: "Fakturowanie",
            SHIPPING: "Wysyłka",
            BOTH: "Oba",
            MAIN: "Główne"
          },
          paymentTerms: {
            IMMEDIATE: "Natychmiastowa",
            END_OF_MONTH: "Koniec Miesiąca",
            FIFTEEN_DAYS: "15 Dni",
            THIRTY_DAYS: "30 Dni",
            SIXTY_DAYS: "60 Dni"
          },
          productionStatus: {
            PLANNED: "Zaplanowana",
            IN_PROGRESS: "W Trakcie",
            COMPLETED: "Zakończona",
            CANCELLED: "Anulowana",
            ON_HOLD: "Wstrzymana"
          },
          defectSeverity: {
            MINOR: "Błahy",
            MAJOR: "Poważny",
            CRITICAL: "Krytyczny"
          },
          purchaseStatus: {
            DRAFT: "Szkic",
            CONFIRMED: "Potwierdzona",
            RECEIVED: "Otrzymana",
            CANCELLED: "Anulowana",
            PARTIALLY_RECEIVED: "Częściowo Otrzymana"
          },
          saleStatus: {
            DRAFT: "Szkic",
            CONFIRMED: "Potwierdzona",
            DELIVERED: "Dostarczona",
            CANCELLED: "Anulowana",
            PARTIALLY_DELIVERED: "Częściowo Dostarczona",
            INVOICED: "Zafakturowana",
            RETURNED: "Zwrócona"
          },
          returnStatus: {
            PENDING: "Oczekująca",
            APPROVED: "Zatwierdzona",
            REJECTED: "Odrzucona",
            COMPLETED: "Zakończona",
            REFUNDED: "Zrefundowana"
          },
          returnCondition: {
            GOOD: "Dobry Stan",
            DAMAGED: "Uszkodzony",
            DEFECTIVE: "Defektowy",
            OPENED: "Otwarty/Używany",
            UNOPENED: "Nieotwarty"
          },
          quotationStatus: {
            DRAFT: "Szkic",
            SENT: "Wysłana",
            ACCEPTED: "Zaakceptowana",
            REJECTED: "Odrzucona",
            EXPIRED: "Wygasła",
            CONVERTED: "Przekonwertowana na Sprzedaż"
          },
          invoiceType: {
            PURCHASE: "Faktura Zakupu",
            SALE: "Faktura Sprzedaży"
          },
          invoiceStatus: {
            DRAFT: "Szkic",
            CONFIRMED: "Potwierdzona",
            PAID: "Opłacona",
            PARTIALLY_PAID: "Częściowo Opłacona",
            CANCELLED: "Anulowana",
            OVERDUE: "Przeterminowana"
          },
          paymentMethod: {
            CASH: "Gotówka",
            BANK_TRANSFER: "Przelew Bankowy",
            CREDIT_CARD: "Karta Kredytowa",
            SEPA_DIRECT_DEBIT: "Polecenie Zapłaty SEPA",
            CHECK: "Czek",
            OTHER: "Inne"
          },
          sepaStatus: {
            DRAFT: "Szkic",
            GENERATED: "Wygenerowana",
            SUBMITTED: "Złożona",
            REJECTED: "Odrzucona",
            PROCESSED: "Przetworzona",
            PARTIALLY_PROCESSED: "Częściowo Przetworzona"
          },
          accountType: {
            ASSET: "Aktywa",
            LIABILITY: "Zobowiązania",
            EQUITY: "Kapitał Własny",
            INCOME: "Przychody",
            EXPENSE: "Koszty"
          }
        },
  
        user: {
          title: "Użytkownicy",
          fields: {
            id: "ID",
            email: "E-mail",
            password: "Hasło",
            firstName: "Imię",
            lastName: "Nazwisko",
            active: "Aktywny",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            role: "Rola",
            roleId: "ID Roli",
            employee: "Pracownik",
            auditLogs: "Logi Audytu",
            apiKeys: "Klucze API",
            lastLogin: "Ostatnie Logowanie",
            failedAttempts: "Nieudane Próby",
            lockedUntil: "Zablokowany Do",
            passwordResetToken: "Token Resetu Hasła",
            passwordHistory: "Historia Haseł"
          }
        },
  
        passwordHistory: {
          title: "Historia Haseł",
          fields: {
            id: "ID",
            userId: "ID Użytkownika",
            user: "Użytkownik",
            password: "Poprzednie Hasło",
            createdAt: "Data Zmiany"
          }
        },
  
        apiKey: {
          title: "Klucze API",
          fields: {
            id: "ID",
            userId: "ID Użytkownika",
            user: "Użytkownik",
            keyValue: "Wartość Klucza",
            name: "Nazwa",
            expiresAt: "Wygasa",
            lastUsed: "Ostatnie Użycie",
            createdAt: "Data Utworzenia"
          }
        },
  
        role: {
          title: "Role",
          fields: {
            id: "ID",
            name: "Nazwa",
            description: "Opis",
            permissions: "Uprawnienia",
            users: "Użytkownicy"
          }
        },
  
        permission: {
          title: "Uprawnienia",
          fields: {
            id: "ID",
            name: "Nazwa",
            description: "Opis",
            roles: "Role"
          }
        },
  
        employee: {
          title: "Pracownicy",
          fields: {
            id: "ID",
            nif: "NIP",
            address: "Adres",
            phone: "Telefon",
            position: "Stanowisko",
            salary: "Wynagrodzenie",
            hireDate: "Data Zatrudnienia",
            userId: "ID Użytkownika",
            user: "Użytkownik",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            warehouseId: "ID Magazynu",
            warehouse: "Magazyn",
            department: "Dział",
            emergencyContact: "Kontakt Awaryjny",
            productionsAsResponsible: "Produkcje (Odpowiedzialny)",
            qualityControlsAsInspector: "Kontrole Jakości (Inspektor)",
            purchasesAsRequester: "Zamówienia (Zgłaszający)",
            purchasesAsApprover: "Zamówienia (Zatwierdzający)",
            salesAsSalesRep: "Sprzedaże (Przedstawiciel)",
            quotationsAsCreator: "Oferty (Twórca)",
            invoicesAsCreator: "Faktury (Twórca)",
            paymentsAsRecorder: "Płatności (Rejestrator)",
            sepaRemittancesAsCreator: "Remity SEPA (Twórca)",
            accountingEntriesAsCreator: "Zapisy Księgowe (Twórca)"
          }
        },
  
        supplier: {
          title: "Dostawcy",
          fields: {
            id: "ID",
            name: "Nazwa",
            nif: "NIP",
            address: "Adres",
            phone: "Telefon",
            email: "E-mail",
            contactPerson: "Osoba Kontaktowa",
            active: "Aktywny",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            deletedAt: "Data Usunięcia",
            purchases: "Zamówienia",
            materials: "Materiały",
            addresses: "Adresy",
            contacts: "Kontakty",
            paymentTerms: "Warunki Płatności",
            notes: "Uwagi"
          }
        },
  
        supplierAddress: {
          title: "Adresy Dostawcy",
          fields: {
            id: "ID",
            supplierId: "ID Dostawcy",
            supplier: "Dostawca",
            addressType: "Typ Adresu",
            street: "Ulica",
            city: "Miasto",
            postalCode: "Kod Pocztowy",
            region: "Region",
            country: "Kraj",
            isDefault: "Domyślny"
          }
        },
  
        supplierContact: {
          title: "Kontakty Dostawcy",
          fields: {
            id: "ID",
            supplierId: "ID Dostawcy",
            supplier: "Dostawca",
            name: "Imię",
            position: "Stanowisko",
            phone: "Telefon",
            email: "E-mail",
            isPrimary: "Główny"
          }
        },
  
        customer: {
          title: "Klienci",
          fields: {
            id: "ID",
            name: "Nazwa",
            nif: "NIP",
            address: "Adres",
            phone: "Telefon",
            email: "E-mail",
            contactPerson: "Osoba Kontaktowa",
            customerType: "Typ Klienta",
            paymentTerms: "Warunki Płatności",
            sepaEnabled: "SEPA Włączone",
            sepaMandateId: "ID Mandatu SEPA",
            sepaIban: "IBAN SEPA",
            active: "Aktywny",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            deletedAt: "Data Usunięcia",
            sales: "Sprzedaże",
            quotations: "Oferty",
            addresses: "Adresy",
            contacts: "Kontakty",
            creditLimit: "Limit Kredytowy",
            discountRate: "Stawka Rabatu",
            customerSince: "Klient Od",
            segment: "Segment",
            returnOrders: "Zwroty"
          }
        },
  
        customerAddress: {
          title: "Adresy Klienta",
          fields: {
            id: "ID",
            customerId: "ID Klienta",
            customer: "Klient",
            addressType: "Typ Adresu",
            street: "Ulica",
            city: "Miasto",
            postalCode: "Kod Pocztowy",
            region: "Region",
            country: "Kraj",
            isDefault: "Domyślny"
          }
        },
  
        customerContact: {
          title: "Kontakty Klienta",
          fields: {
            id: "ID",
            customerId: "ID Klienta",
            customer: "Klient",
            name: "Imię",
            position: "Stanowisko",
            phone: "Telefon",
            email: "E-mail",
            isPrimary: "Główny",
            department: "Dział"
          }
        },
  
        warehouse: {
          title: "Magazyny",
          fields: {
            id: "ID",
            code: "Kod",
            name: "Nazwa",
            address: "Adres",
            active: "Aktywny",
            isDefault: "Domyślny",
            locations: "Lokalizacje",
            employees: "Pracownicy",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji"
          }
        },
  
        warehouseLocation: {
          title: "Lokalizacje Magazynu",
          fields: {
            id: "ID",
            warehouseId: "ID Magazynu",
            warehouse: "Magazyn",
            code: "Kod",
            description: "Opis",
            productLocations: "Produkty",
            materialLocations: "Materiały"
          }
        },
  
        material: {
          title: "Materiały",
          fields: {
            id: "ID",
            code: "Kod",
            name: "Nazwa",
            description: "Opis",
            unitOfMeasure: "Jednostka Miary",
            stockQuantity: "Ilość w Magazynie",
            minStockLevel: "Minimalny Poziom",
            costPrice: "Cena Zakupu",
            active: "Aktywny",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            deletedAt: "Data Usunięcia",
            suppliers: "Dostawcy",
            purchaseItems: "Pozycje Zakupów",
            productionInputs: "Wejścia Produkcji",
            categoryId: "ID Kategorii",
            category: "Kategoria",
            locations: "Lokalizacje"
          }
        },
  
        materialSupplier: {
          title: "Dostawcy Materiałów",
          fields: {
            materialId: "ID Materiału",
            material: "Materiał",
            supplierId: "ID Dostawcy",
            supplier: "Dostawca",
            supplierCode: "Kod Dostawcy",
            price: "Cena",
            leadTimeDays: "Czas Dostawy (dni)",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            isPreferred: "Preferowany",
            minOrderQuantity: "Minimalna Ilość Zamówienia",
            lastPurchaseDate: "Data Ostatniego Zakupu"
          }
        },
  
        materialCategory: {
          title: "Kategorie Materiałów",
          fields: {
            id: "ID",
            name: "Nazwa",
            description: "Opis",
            parentId: "ID Rodzica",
            parent: "Kategoria Rodzic",
            children: "Podkategorie",
            materials: "Materiały"
          }
        },
  
        materialLocation: {
          title: "Lokalizacje Materiałów",
          fields: {
            id: "ID",
            materialId: "ID Materiału",
            material: "Materiał",
            locationId: "ID Lokalizacji",
            location: "Lokalizacja",
            quantity: "Ilość"
          }
        },
  
        product: {
          title: "Produkty",
          fields: {
            id: "ID",
            code: "Kod",
            name: "Nazwa",
            description: "Opis",
            unitOfMeasure: "Jednostka Miary",
            stockQuantity: "Ilość w Magazynie",
            minStockLevel: "Minimalny Poziom",
            retailPrice: "Cena Detaliczna",
            wholesalePrice: "Cena Hurtowa",
            costPrice: "Cena Zakupu",
            taxRate: "Stawka Podatku",
            active: "Aktywny",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            deletedAt: "Data Usunięcia",
            productionOutputs: "Wyjścia Produkcji",
            saleItems: "Pozycje Sprzedaży",
            quotationItems: "Pozycje Ofert",
            categoryId: "ID Kategorii",
            category: "Kategoria",
            images: "Obrazy",
            attributes: "Atrybuty",
            locations: "Lokalizacje",
            barcode: "Kod Kreskowy",
            weight: "Waga",
            dimensions: "Wymiary"
          }
        },
  
        productCategory: {
          title: "Kategorie Produktów",
          fields: {
            id: "ID",
            name: "Nazwa",
            description: "Opis",
            parentId: "ID Rodzica",
            parent: "Kategoria Rodzic",
            children: "Podkategorie",
            products: "Produkty"
          }
        },
  
        productImage: {
          title: "Obrazy Produktów",
          fields: {
            id: "ID",
            productId: "ID Produktu",
            product: "Produkt",
            url: "URL",
            alt: "Tekst Alternatywny",
            isPrimary: "Główny",
            sortOrder: "Kolejność"
          }
        },
  
        productAttribute: {
          title: "Atrybuty Produktów",
          fields: {
            id: "ID",
            productId: "ID Produktu",
            product: "Produkt",
            name: "Nazwa",
            value: "Wartość"
          }
        },
  
        productLocation: {
          title: "Lokalizacje Produktów",
          fields: {
            id: "ID",
            productId: "ID Produktu",
            product: "Produkt",
            locationId: "ID Lokalizacji",
            location: "Lokalizacja",
            quantity: "Ilość"
          }
        },
  
        production: {
          title: "Zlecenia Produkcyjne",
          fields: {
            id: "ID",
            reference: "Referencja",
            startDate: "Data Rozpoczęcia",
            endDate: "Data Zakończenia",
            status: "Status",
            notes: "Uwagi",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            inputs: "Wejścia",
            outputs: "Wyjścia",
            warehouseId: "ID Magazynu",
            warehouse: "Magazyn",
            responsibleId: "ID Odpowiedzialnego",
            responsible: "Odpowiedzialny",
            qualityControls: "Kontrole Jakości",
            laborCost: "Koszt Robocizny",
            overheadCost: "Koszty Pośrednie",
            batchNumber: "Numer Partii"
          }
        },
  
        productionInput: {
          title: "Wejścia Produkcyjne",
          fields: {
            id: "ID",
            productionId: "ID Produkcji",
            production: "Produkcja",
            materialId: "ID Materiału",
            material: "Materiał",
            quantity: "Ilość",
            unitCost: "Koszt Jednostkowy",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            locationId: "ID Lokalizacji",
            location: "Lokalizacja"
          }
        },
  
        productionOutput: {
          title: "Wyjścia Produkcyjne",
          fields: {
            id: "ID",
            productionId: "ID Produkcji",
            production: "Produkcja",
            productId: "ID Produktu",
            product: "Produkt",
            quantity: "Ilość",
            finalCost: "Końcowy Koszt",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            locationId: "ID Lokalizacji",
            location: "Lokalizacja"
          }
        },
  
        qualityControl: {
          title: "Kontrole Jakości",
          fields: {
            id: "ID",
            productionId: "ID Produkcji",
            production: "Produkcja",
            inspectionDate: "Data Kontroli",
            inspectorId: "ID Inspektora",
            inspector: "Inspektor",
            passedInspection: "Zdał Kontrolę",
            notes: "Uwagi",
            defects: "Defekty"
          }
        },
  
        qualityDefect: {
          title: "Defekty Jakości",
          fields: {
            id: "ID",
            qualityControlId: "ID Kontroli",
            qualityControl: "Kontrola Jakości",
            defectType: "Rodzaj Defektu",
            description: "Opis",
            severity: "Krytyczność",
            quantity: "Ilość"
          }
        },
  
        purchase: {
          title: "Zamówienia Zakupu",
          fields: {
            id: "ID",
            reference: "Referencja",
            supplierId: "ID Dostawcy",
            supplier: "Dostawca",
            date: "Data",
            expectedDelivery: "Planowana Dostawa",
            status: "Status",
            totalAmount: "Kwota Całkowita",
            notes: "Uwagi",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            items: "Pozycje",
            invoices: "Faktury",
            warehouseId: "ID Magazynu",
            warehouse: "Magazyn",
            requesterId: "ID Zleceniodawcy",
            requester: "Zleceniodawca",
            approverId: "ID Zatwierdzającego",
            approver: "Zatwierdzający",
            receivedDate: "Data Otrzymania",
            deliveryNote: "Numer Dokumentu",
            discountPercent: "Rabat (%)"
          }
        },
  
        purchaseItem: {
          title: "Pozycje Zakupów",
          fields: {
            id: "ID",
            purchaseId: "ID Zamówienia",
            purchase: "Zamówienie",
            materialId: "ID Materiału",
            material: "Materiał",
            quantity: "Ilość",
            unitPrice: "Cena Jednostkowa",
            taxRate: "Stawka Podatku",
            total: "Razem",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            receivedQuantity: "Otrzymana Ilość",
            locationId: "ID Lokalizacji",
            location: "Lokalizacja",
            discountPercent: "Rabat (%)",
            notes: "Uwagi"
          }
        },
  
        sale: {
          title: "Sprzedaże",
          fields: {
            id: "ID",
            reference: "Referencja",
            customerId: "ID Klienta",
            customer: "Klient",
            date: "Data",
            deliveryDate: "Planowana Dostawa",
            status: "Status",
            totalAmount: "Kwota Całkowita",
            notes: "Uwagi",
            fromQuotation: "Z Oferty",
            quotationId: "ID Oferty",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            items: "Pozycje",
            invoices: "Faktury",
            warehouseId: "ID Magazynu",
            warehouse: "Magazyn",
            salesRepId: "ID Przedstawiciela",
            salesRep: "Przedstawiciel",
            deliveryAddress: "Adres Dostawy",
            shippingMethod: "Metoda Wysyłki",
            paymentMethod: "Metoda Płatności",
            discountPercent: "Rabat (%)",
            returnOrders: "Zwroty",
            deliveryNote: "Numer Dokumentu"
          }
        },
  
        saleItem: {
          title: "Pozycje Sprzedaży",
          fields: {
            id: "ID",
            saleId: "ID Sprzedaży",
            sale: "Sprzedaż",
            productId: "ID Produktu",
            product: "Produkt",
            quantity: "Ilość",
            unitPrice: "Cena Jednostkowa",
            taxRate: "Stawka Podatku",
            total: "Razem",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            deliveredQuantity: "Dostarczona Ilość",
            locationId: "ID Lokalizacji",
            location: "Lokalizacja",
            discountPercent: "Rabat (%)",
            notes: "Uwagi",
            returnItems: "Zwroty"
          }
        },
  
        returnOrder: {
          title: "Zwroty",
          fields: {
            id: "ID",
            reference: "Referencja",
            saleId: "ID Sprzedaży",
            sale: "Sprzedaż",
            customerId: "ID Klienta",
            customer: "Klient",
            date: "Data",
            reason: "Powód",
            status: "Status",
            totalAmount: "Kwota Całkowita",
            notes: "Uwagi",
            items: "Pozycje",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji"
          }
        },
  
        returnOrderItem: {
          title: "Pozycje Zwrotów",
          fields: {
            id: "ID",
            returnOrderId: "ID Zwrotu",
            returnOrder: "Zwrot",
            saleItemId: "ID Pozycji Sprzedaży",
            saleItem: "Pozycja Sprzedaży",
            productId: "ID Produktu",
            product: "Produkt",
            quantity: "Ilość",
            unitPrice: "Cena Jednostkowa",
            total: "Razem",
            reason: "Powód",
            condition: "Stan"
          }
        },
  
        quotation: {
          title: "Oferty",
          fields: {
            id: "ID",
            reference: "Referencja",
            customerId: "ID Klienta",
            customer: "Klient",
            date: "Data",
            validUntil: "Ważne Do",
            status: "Status",
            totalAmount: "Kwota Całkowita",
            notes: "Uwagi",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            items: "Pozycje",
            sales: "Sprzedaże Stworzone",
            creatorId: "ID Twórcy",
            creator: "Twórca",
            discountPercent: "Rabat (%)"
          }
        },
  
        quotationItem: {
          title: "Pozycje Oferty",
          fields: {
            id: "ID",
            quotationId: "ID Oferty",
            quotation: "Oferta",
            productId: "ID Produktu",
            product: "Produkt",
            quantity: "Ilość",
            unitPrice: "Cena Jednostkowa",
            taxRate: "Stawka Podatku",
            total: "Razem",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            discountPercent: "Rabat (%)",
            notes: "Uwagi"
          }
        },
  
        invoice: {
          title: "Faktury",
          fields: {
            id: "ID",
            invoiceNumber: "Numer Faktury",
            invoiceType: "Rodzaj Faktury",
            date: "Data Wystawienia",
            dueDate: "Data Płatności",
            status: "Status",
            totalBase: "Podstawa Opodatkowania",
            totalTax: "Podatek",
            totalAmount: "Kwota Całkowita",
            notes: "Uwagi",
            purchases: "Zamówienia Zakupu",
            sales: "Sprzedaże",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            accountingEntry: "Zapis Księgowy",
            aeatSubmitted: "Wysłano do AEAT",
            aeatSubmissionDate: "Data Wysłania do AEAT",
            aeatSubmissionId: "ID Wysłania",
            payments: "Płatności",
            fiscalYearId: "ID Roku Finansowego",
            fiscalYear: "Rok Finansowy",
            creatorId: "ID Twórcy",
            creator: "Twórca",
            creditNote: "Nota Korygująca",
            originalInvoiceId: "ID Oryginalnej Faktury",
            originalInvoice: "Oryginalna Faktura",
            correctionInvoices: "Faktury Korygujące"
          }
        },
  
        payment: {
          title: "Płatności",
          fields: {
            id: "ID",
            reference: "Referencja",
            invoiceId: "ID Faktury",
            invoice: "Faktura",
            amount: "Kwota",
            date: "Data",
            paymentMethod: "Metoda Płatności",
            notes: "Uwagi",
            sepaRemittanceId: "ID Remitu SEPA",
            sepaRemittance: "Remit SEPA",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            accountingEntry: "Zapis Księgowy",
            recordedById: "ID Rejestrującego",
            recordedBy: "Rejestrujący",
            bankReference: "Referencja Bankowa"
          }
        },
  
        sepaRemittance: {
          title: "Remity SEPA",
          fields: {
            id: "ID",
            reference: "Referencja",
            generationDate: "Data Generacji",
            submissionDate: "Data Złożenia",
            status: "Status",
            totalAmount: "Kwota Całkowita",
            messageId: "ID Wiadomości",
            notes: "Uwagi",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            payments: "Płatności",
            creatorId: "ID Twórcy",
            creator: "Twórca"
          }
        },
  
        fiscalYear: {
          title: "Lata Finansowe",
          fields: {
            id: "ID",
            name: "Nazwa",
            startDate: "Data Rozpoczęcia",
            endDate: "Data Zakończenia",
            isClosed: "Zamknięty",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            accountingEntries: "Zapisy Księgowe",
            budgets: "Budżety",
            invoices: "Faktury"
          }
        },
  
        accountingAccount: {
          title: "Konta Księgowe",
          fields: {
            id: "ID",
            code: "Kod",
            name: "Nazwa",
            accountType: "Rodzaj Konta",
            isActive: "Aktywne",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            debitEntries: "Zapisy Wn",
            creditEntries: "Zapisy Ma",
            budgets: "Budżety",
            parentId: "ID Konta Rodzica",
            parent: "Konto Rodzica",
            children: "Podkonta"
          }
        },
  
        accountBudget: {
          title: "Budżety Kont",
          fields: {
            id: "ID",
            fiscalYearId: "ID Roku Finansowego",
            fiscalYear: "Rok Finansowy",
            accountId: "ID Konta",
            account: "Konto",
            budgetAmount: "Całkowity Budżet",
            jan: "Styczeń",
            feb: "Luty",
            mar: "Marzec",
            apr: "Kwiecień",
            may: "Maj",
            jun: "Czerwiec",
            jul: "Lipiec",
            aug: "Sierpień",
            sep: "Wrzesień",
            oct: "Październik",
            nov: "Listopad",
            dec: "Grudzień",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji"
          }
        },
  
        accountingEntry: {
          title: "Zapisy Księgowe",
          fields: {
            id: "ID",
            reference: "Referencja",
            date: "Data",
            description: "Opis",
            isAdjustment: "Korekta",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji",
            lines: "Pozycje",
            invoiceId: "ID Faktury",
            invoice: "Faktura",
            paymentId: "ID Płatności",
            payment: "Płatność",
            fiscalYearId: "ID Roku Finansowego",
            fiscalYear: "Rok Finansowy",
            creatorId: "ID Twórcy",
            creator: "Twórca",
            entryType: "Typ Zapisu"
          }
        },
  
        accountingEntryLine: {
          title: "Pozycje Zapisu",
          fields: {
            id: "ID",
            entryId: "ID Zapisu",
            entry: "Zapis",
            description: "Opis",
            debitAccountId: "ID Konta Wn",
            debitAccount: "Konto Wn",
            creditAccountId: "ID Konta Ma",
            creditAccount: "Konto Ma",
            amount: "Kwota",
            createdAt: "Data Utworzenia",
            updatedAt: "Data Aktualizacji"
          }
        },
  
        auditLog: {
          title: "Logi Audytu",
          fields: {
            id: "ID",
            userId: "ID Użytkownika",
            user: "Użytkownik",
            action: "Akcja",
            entityType: "Typ Encji",
            entityId: "ID Encji",
            oldValue: "Stara Wartość",
            newValue: "Nowa Wartość",
            ipAddress: "Adres IP",
            userAgent: "User Agent",
            timestamp: "Znacznik Czasu"
          }
        }
  
      },
      commons: {
        backToList: "Powrót do listy",
        noData: "Brak danych",
        loading: "Ładowanie...",
        forms: {
          create: "Utwórz",
          update: "Aktualizuj",
          delete: "Usuń",
          cancel: "Anuluj",
          save: "Zapisz",
          edit: "Edytuj",
          view: "Wyświetl",
          search: "Szukaj",
          clear: "Wyczyść",
          select: "Wybierz",
          selectAll: "Wybierz wszystko",
          selectNone: "Odznacz wszystko",
          selectSome: "Wybierz kilka",
          selectOne: "Wybierz jedno",
          new: "Nowy",
          back: "Wstecz",
          upload: "Prześlij",
          download: "Pobierz",
          print: "Drukuj",
          export: "Eksportuj",
          filter: "Filtruj",
          sort: "Sortuj"
        },
        errors: {
          mustBeFilled: "To pole jest wymagane",
          invalidEmail: "Nieprawidłowy e-mail",
          invalidPhone: "Nieprawidłowy numer telefonu",
          invalidUrl: "Nieprawidłowy URL",
          invalidDate: "Nieprawidłowa data",
          invalidNumber: "Nieprawidłowy numer",
          invalidPassword: "Nieprawidłowe hasło",
          invalidDni: "Nieprawidłowy dokument",
          passwordsMustMatch: "Hasła muszą być takie same"
        },
        code: "Kod",
        name: "Nazwa",
        stock: "Stan",
        minLevel: "Poziom Min.",
        price: "Cena",
        cost: "Koszt",
        reference: "Referencja",
        date: "Data",
        dueDate: "Data Płatności",
        status: "Status",
        amount: "Kwota",
        number: "Numer",
        type: "Rodzaj",
        startDate: "Data Rozpoczęcia",
        warehouse: "Magazyn",
        responsible: "Odpowiedzialny",
        products: "Produkty",
      },
      auth: {
        errors: {
          enterYourName: "Wprowadź swoje imię",
          emailIsRequired: "E-mail jest wymagany",
          passwordIsRequired: "Hasło jest wymagane",
          usernameIsRequired: "Nazwa użytkownika jest wymagana",
          invalidEmail: "Nieprawidłowy e-mail",
          passwordTooShort: "Hasło musi mieć co najmniej 6 znaków",
          passwordsDoNotMatch: "Hasła nie pasują",
          userNotFound: "Użytkownik nie znaleziony",
          invalidCredentials: "Nieprawidłowe dane",
          accountLocked: "Konto zablokowane",
          sessionExpired: "Sesja wygasła"
        },
        login: "Zaloguj się",
        logout: "Wyloguj się",
        register: {
          title: "Rejestracja",
          description: "Masz już konto?",
          fields: {
            username: "Nazwa użytkownika",
            usernamePlaceholder: "Wprowadź nazwę użytkownika",
            email: "E-mail",
            emailPlaceholder: "Wprowadź e-mail",
            password: "Hasło",
            passwordPlaceholder: "Wprowadź hasło",
            confirmPassword: "Potwierdź hasło",
            confirmPasswordPlaceholder: "Potwierdź hasło",
            fullName: "Imię i Nazwisko",
            fullNamePlaceholder: "Wprowadź imię i nazwisko",
            phone: "Telefon",
            phonePlaceholder: "Wprowadź numer telefonu",
            role: "Rola",
            acceptTerms: "Akceptuję regulamin"
          }
        },
        email: "E-mail",
        password: "Hasło",
        rememberMe: "Zapamiętaj mnie",
        forgotPassword: "Zapomniałem hasła",
        resetPassword: "Zresetuj hasło",
        sendResetLink: "Wyślij link resetujący",
        passwordConfirmation: "Potwierdzenie hasła",
        passwordResetSuccess: "Hasło zostało zresetowane. Zaloguj się.",
        passwordResetError: "Błąd resetowania hasła. Spróbuj ponownie.",
        mfaSetup: "Konfiguracja 2FA",
        mfaVerify: "Weryfikacja kodu 2FA",
        mfaEnterCode: "Wprowadź kod weryfikacji"
      },
      dashboard: {
        title: "Panel Sterowania",  
        monthlySales: "Miesięczna Sprzedaż",
        monthlyPurchases: "Miesięczne Zakupy",
        grossProfit: "Zysk Brutto",
        salesTrend: "Trend Sprzedaży",
        topProducts: "Najlepsze Produkty",
        topCustomers: "Najlepsi Klienci",
        lowStockProducts: "Niski Stan Produktów",
        lowStockMaterials: "Niski Stan Materiałów",
        pendingInvoices: "Niezapłacone Faktury",
        ongoingProduction: "Produkcja w Toku"
      },
      sections: {
        dashboard: "Panel Sterowania",
        users: "Użytkownicy",
        contacts: "Kontakty",
        inventory: "Magazyn",
        products: "Produkty",
        production: "Produkcja",
        sales: "Sprzedaż",
        finance: "Finanse",
        map: "Mapa",
        includes: "Zawiera"
      },
      sidebar: {
        dashboard: "Panel Sterowania",
        inventory: "Magazyn",
        sales: "Sprzedaż",
        purchases: "Zakupy",
        production: "Produkcja",
        accounting: "Księgowość",
        admin: "Administracja"
      },
      dateFilter: {
        selectRange: "Wybierz zakres",
        selectPeriod: "Wybierz okres",
        customRange: "Niestandardowy zakres",
        startDate: "Data rozpoczęcia",
        endDate: "Data zakończenia",
        apply: "Zastosuj",
        today: "Dziś",
        yesterday: "Wczoraj",
        last7Days: "Ostatnie 7 dni",
        last30Days: "Ostatnie 30 dni",
        thisMonth: "Ten miesiąc",
        lastMonth: "Poprzedni miesiąc",
        thisQuarter: "Ten kwartał",
        lastQuarter: "Poprzedni kwartał",
        thisYear: "Ten rok",
        lastYear: "Poprzedni rok"
      }
    }
  };
  
  export default pl;
  