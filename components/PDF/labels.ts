import { it } from "node:test";

interface ILabel {
  invoice: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  billedTo: string;
  email: string;
  phone: string;
  total: string;
  items: {
    title: string;
    description: string;
    quantity: string;
    price: string;
    tax: string;
    total: string;
  };
  signature: string;
  notes: string;
}

const labels: { [key: string]: ILabel } = {
  en: {
    invoice: "Invoice",
    invoiceNo: "Invoice No",
    date: "Date",
    dueDate: "Due Date",
    billedTo: "Billed To",
    email: "Email",
    phone: "Phone",
    total: "Total",
    items: {
      title: "Services",
      description: "Description",
      quantity: "Quantity",
      price: "Price",
      tax: "Tax",
      total: "Total",
    },
    signature: "Signature",
    notes: "Notes",
  },

  fr: {
    invoice: "Facture",
    invoiceNo: "N° de facture",
    date: "Date",
    dueDate: "Echeance",
    billedTo: "Facturé à",
    email: "Email",
    phone: "Téléphone",
    total: "Total",
    items: {
      title: "Services",
      description: "Description",
      quantity: "Quantité",
      price: "Prix",
      tax: "TVA",
      total: "Total",
    },
    signature: "Signature",
    notes: "Notes",
  },

  es: {
    invoice: "Factura",
    invoiceNo: "Número de Factura",
    date: "Fecha",
    dueDate: "Fecha de Vencimiento",
    billedTo: "Facturado a",
    email: "Email",
    phone: "Telefono",
    total: "Total",
    items: {
      title: "Servicios",
      description: "Descripción",
      quantity: "Cant.",
      price: "Precio",
      tax: "IVA",
      total: "Total",
    },
    signature: "Firma",
    notes: "Notas",
  },

  de: {
    invoice: "Rechnung",
    invoiceNo: "Rechnungsnummer",
    date: "Datum",
    dueDate: "Faelligkeit",
    billedTo: "Rechnung an",
    email: "E-Mail",
    phone: "Telefon",
    total: "Total",
    items: {
      title: "Dienstleistungen",
      description: "Beschreibung",
      quantity: "Menge",
      price: "Preis",
      tax: "MwSt.",
      total: "Total",
    },
    signature: "Unterschrift",
    notes: "Notizen",
  },

  it: {
    invoice: "Fattura",
    invoiceNo: "Numero di Fattura",
    date: "Data",
    dueDate: "Scadenza",
    billedTo: "Fatturato a",
    email: "Email",
    phone: "Telefono",
    total: "Totale",
    items: {
      title: "Servizi",
      description: "Descrizione",
      quantity: "Quantità",
      price: "Prezzo",
      tax: "IVA",
      total: "Totale",
    },
    signature: "Firma",
    notes: "Note",
  },

  pt: {
    invoice: "Fatura",
    invoiceNo: "Número da Fatura",
    date: "Data",
    dueDate: "Vencimento",
    billedTo: "Faturado a",
    email: "Email",
    phone: "Telefone",
    total: "Total",
    items: {
      title: "Serviços",
      description: "Descrição",
      quantity: "Quantidade",
      price: "Preço",
      tax: "IVA",
      total: "Total",
    },
    signature: "Assinatura",
    notes: "Notas",
  },

  ar: {
    invoice: "فاتورة",
    invoiceNo: "رقم الفاتورة",
    date: "تاريخ",
    dueDate: "تاريخ الاستحقاق",
    billedTo: "فاتورة لـ",
    email: "بريد الكتروني",
    phone: "هاتف",
    total: "المجموع",
    items: {
      title: "الخدمات",
      description: "وصف",
      quantity: "الكمية",
      price: "السعر",
      tax: "الضريبة",
      total: "المجموع",
    },
    signature: "التوقيع",
    notes: "ملاحظات",
  },

  ru: {
    invoice: "Счет",
    invoiceNo: "Номер счета",
    date: "Дата",
    dueDate: "Срок оплаты",
    billedTo: "Счет выставлен",
    email: "Электронная почта",
    phone: "Телефон",
    total: "Всего",
    items: {
      title: "Услуги",
      description: "Описание",
      quantity: "Количество",
      price: "Цена",
      tax: "Налог",
      total: "Всего",
    },
    signature: "Подпись",
    notes: "Заметки",
  },

  tr: {
    invoice: "Fatura",
    invoiceNo: "Fatura No",
    date: "Tarih",
    dueDate: "Vade Tarihi",
    billedTo: "Fatura Edildi",
    email: "Email",
    phone: "Telefon",
    total: "Toplam",
    items: {
      title: "Hizmetler",
      description: "Acıklama",
      quantity: "Miktar",
      price: "Fiyat",
      tax: "KDV",
      total: "Toplam",
    },
    signature: "Iz",
    notes: "Notlar",
  },

  pl: {
    invoice: "Faktura",
    invoiceNo: "Numer faktury",
    date: "Data",
    dueDate: "Termin zapłaty",
    billedTo: "Faktura do",
    email: "E-mail",
    phone: "Telefon",
    total: "Suma",
    items: {
      title: "Usługi",
      description: "Opis",
      quantity: "Ilosc",
      price: "Cena",
      tax: "Podatek",
      total: "Suma",
    },
    signature: "Podpis",
    notes: "Notatki",
  },

  nl: {
    invoice: "Factuur",
    invoiceNo: "Factuurnummer",
    date: "Datum",
    dueDate: "Vervaldatum",
    billedTo: "Factuur aan",
    email: "E-mail",
    phone: "Telefoon",
    total: "Totaal",
    items: {
      title: "Diensten",
      description: "Omschrijving",
      quantity: "Aantal",
      price: "Prijs",
      tax: "BTW",
      total: "Totaal",
    },
    signature: "Handtekening",
    notes: "Notities",
  },
};

export default labels;
