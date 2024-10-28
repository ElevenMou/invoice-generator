import IClient from "@/types/IClient";
import ICompany from "@/types/ICompany";
import IInvoiceSettings from "./IInvoiceSettings";

interface IInvoiceDetails {
  _id: string;
  company: ICompany;
  client: IClient;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  items: Array<{
    description?: string;
    quantity: number;
    price: number;
    tax?: number;
    total: number;
  }>;
  subtotal: number;
  taxTotal: number;
  total: number;
  currency: string;
  notes?: string;
  payment?: {
    method?: string;
    date?: Date;
    amount?: number;
    notes?: string;
  };
  settings?: IInvoiceSettings;
  template?: string;
}

export default IInvoiceDetails;
