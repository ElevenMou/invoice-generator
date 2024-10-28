import language from "@/types/Language";

interface IInvoiceSettings {
  company?: {
    address?: {
      showAddress?: boolean;
      showStreet?: boolean;
      showCity?: boolean;
      showPostalCode?: boolean;
      showCountry?: boolean;
    };
    showEmail?: boolean;
    showPhone?: boolean;
    showLogo?: boolean;
    showSignature?: boolean;
  };
  client?: {
    address?: {
      showAddress?: boolean;
      showStreet?: boolean;
      showCity?: boolean;
      showPostalCode?: boolean;
      showCountry?: boolean;
    };
    showEmail?: boolean;
    showPhone?: boolean;
    showLogo?: boolean;
  };
  showDueDate?: boolean;
  items?: {
    showQuantity?: boolean;
    showTax?: boolean;
    showTotal?: boolean;
  };
  showTaxTotal?: boolean;
  showNotes?: boolean;
  colors?: Array<{ label: string; value: string }>;
  language?: language;
}

export default IInvoiceSettings;
