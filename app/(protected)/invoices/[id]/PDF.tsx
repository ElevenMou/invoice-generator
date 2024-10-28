import IInvoiceDetails from "@/types/IInvoiceDetails";
import { PDFViewer } from "@react-pdf/renderer";
import pdfTemplate from "@/components/PDF/templates";

const PDF = ({ invoice }: { invoice: IInvoiceDetails }) => {
  const MyDocument = pdfTemplate.find(
    (t) => t.id === invoice.template
  )?.template;

  return (
    <>
      <PDFViewer
        showToolbar={true}
        width="100%"
        style={{ height: "calc(100vh - 240px)" }}
      >
        <MyDocument invoice={invoice} />
      </PDFViewer>
    </>
  );
};

export default PDF;
