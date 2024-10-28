"use client";

import SelectItem from "@/components/PDF/SelectItem";
import pdfTemplate from "@/components/PDF/templates";
import Card from "@/components/UI/Card";
import IInvoiceDetails from "@/types/IInvoiceDetails";
import Image from "next/image";

interface IInvoiceTemplateProps {
  invoice: IInvoiceDetails;
  setInvoice: React.Dispatch<React.SetStateAction<IInvoiceDetails>>;
}
const InvoiceTemplates = ({ invoice, setInvoice }: IInvoiceTemplateProps) => {
  return (
    <Card className="grid gap-4 grid-cols-responsive">
      {pdfTemplate.map((template) => (
        <SelectItem
          key={template.id}
          selected={template.id === invoice.template}
          onClick={() =>
            setInvoice({
              ...invoice,
              settings: {
                ...invoice.settings,
                colors: template.colors,
              },
              template: template.id,
            })
          }
        >
          <Image
            src={`/images/pdf-templates/${template.image}`}
            alt={template.name}
            width={250}
            height={200}
          />
        </SelectItem>
      ))}
    </Card>
  );
};

export default InvoiceTemplates;
