import ContentTop from "@/components/layout/ContentTop";
import CompanyDetailsFrom from "./CompanyDetailsFrom";

export const metadata = {
  title: "Company details",
};

const NewCompany = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ContentTop>
        <h1>{params.id !== "new" ? "Edit company" : "New company"}</h1>
      </ContentTop>
      <CompanyDetailsFrom companyId={params.id} />
    </>
  );
};

export default NewCompany;
