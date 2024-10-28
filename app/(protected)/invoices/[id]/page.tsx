import InvoiceDetailsContent from "./InvoiceDetailsContent";

export const metadata = {
  title: "Invoice details",
};

const InvoiceDetails = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <InvoiceDetailsContent invoiceId={params.id} />
    </>
  );
};

export default InvoiceDetails;
