import ContentTop from "@/components/layout/ContentTop";
import ClientDetailsFrom from "./ClientDetailsFrom";

export const metadata = {
  title: "Client details",
};

const ClientDetails = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ContentTop>
        <h1>{params.id !== "new" ? "Edit client" : "New client"}</h1>
      </ContentTop>
      <ClientDetailsFrom clientId={params.id} />
    </>
  );
};

export default ClientDetails;
