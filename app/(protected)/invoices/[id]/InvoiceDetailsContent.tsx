"use client";

import Loading from "@/components/UI/Loading";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useEffect, useState } from "react";
import InvoiceDetailsForm from "./InvoiceDetailsForm";
import InvoiceSettingsForm from "./InvoiceSettingsForm";
import ContentTop from "@/components/layout/ContentTop";
import Button, { btnPrimaryStyle, btnStyle } from "@/components/UI/Button";
import { useRouter } from "next/navigation";
import PDF from "./PDF";
import { isMobile } from "react-device-detect";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "@/components/PDF/Document-01";
import IInvoiceDetails from "@/types/IInvoiceDetails";
import { twMerge } from "tailwind-merge";
import { DocumentArrowDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import InvoiceTemplates from "./InvoiceTemplates";

const initialInvoiceState: IInvoiceDetails = {
  _id: "",
  company: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    identifiers: [{ label: "", value: "" }],
  },
  client: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    identifiers: [{ label: "", value: "" }],
  },
  invoiceNumber: "",
  date: new Date(),
  dueDate: new Date(),
  status: "draft",
  items: [
    {
      quantity: 1,
      price: 0,
      total: 0,
      tax: 0,
    },
  ],
  subtotal: 0,
  taxTotal: 0,
  total: 0,
  currency: "USD",
  notes: "",
  settings: {
    company: {
      address: {
        showAddress: true,
        showStreet: true,
        showCity: true,
        showPostalCode: true,
        showCountry: true,
      },
      showEmail: true,
      showPhone: true,
      showLogo: true,
      showSignature: true,
    },
    client: {
      address: {
        showAddress: true,
        showStreet: true,
        showCity: true,
        showPostalCode: true,
        showCountry: true,
      },
      showEmail: true,
      showPhone: true,
      showLogo: true,
    },
    showDueDate: true,
    items: {
      showQuantity: true,
      showTax: true,
      showTotal: true,
    },
    showNotes: true,
    colors: [
      {
        label: "Primary",
        value: "#5358e4",
      },
      {
        label: "Text",
        value: "#121722",
      },
      {
        label: "Text Light",
        value: "#60737D",
      },
      {
        label: "Background",
        value: "#ffffff",
      },
      {
        label: "Card",
        value: "#F2F5F9",
      },
    ],
    language: "en",
  },
};

const InvoiceDetailsContent = ({ invoiceId }: { invoiceId: string }) => {
  const [invoice, setInvoice] = useState<IInvoiceDetails>(initialInvoiceState);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isNewInvoice = invoiceId === "new";

  useEffect(() => {
    if (!isNewInvoice) {
      fetchInvoice();
    } else {
      setDataLoaded(true);
    }
  }, [invoiceId]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoice${
          isNewInvoice ? "" : `/${invoice._id}`
        }`,
        {
          method: isNewInvoice ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoice),
        }
      );

      if (response.ok) {
        const data = await response.json();
        router.push(`/invoices/${data._id}`);
      } else {
        throw new Error("Failed to save invoice");
      }
    } catch (error) {
      setError("Failed to save invoice details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this invoice?"
    );
    if (!confirm) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoice/${invoiceId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        router.push("/invoices");
      } else {
        throw new Error("Failed to delete invoice");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInvoice = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoice/${invoiceId}/details`
      );
      if (response.ok) {
        const data = await response.json();
        setInvoice(data);
      } else {
        throw new Error("Failed to fetch invoice");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDataLoaded(true);
    }
  };

  if (!dataLoaded) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <ContentTop>
        <h1>{invoiceId !== "new" ? "Edit invoice" : "New invoice"}</h1>
        <div
          className={twMerge("flex justify-end gap-4", isMobile && "w-full")}
        >
          {!isNewInvoice && (
            <>
              <PDFDownloadLink
                document={<MyDocument invoice={invoice} />}
                fileName={`invoice-${invoice.invoiceNumber}.pdf`}
                className={twMerge(btnStyle, btnPrimaryStyle)}
              >
                <DocumentArrowDownIcon className="w-6 h-6" />
              </PDFDownloadLink>
              <Button
                type="button"
                variant="default"
                onClick={handleDelete}
                className={twMerge("gap-2", isMobile ? "flex-1" : "min-w-40")}
              >
                Delete
              </Button>
            </>
          )}
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className={isMobile ? "flex-1" : "min-w-40"}
          >
            {isNewInvoice ? "Create" : "Save"}
          </Button>
        </div>
      </ContentTop>
      {isNewInvoice ? (
        <InvoiceDetailsForm invoice={invoice} setInvoice={setInvoice} />
      ) : (
        <Tabs>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Setting</Tab>
            <Tab>Template</Tab>
            {!isMobile && <Tab>Document</Tab>}
          </TabList>
          <TabPanel>
            <InvoiceDetailsForm invoice={invoice} setInvoice={setInvoice} />
          </TabPanel>
          <TabPanel>
            <InvoiceSettingsForm invoice={invoice} setInvoice={setInvoice} />
          </TabPanel>
          <TabPanel>
            <InvoiceTemplates invoice={invoice} setInvoice={setInvoice} />
          </TabPanel>
          {!isMobile && (
            <TabPanel>
              <PDF invoice={invoice} />
            </TabPanel>
          )}
        </Tabs>
      )}

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </form>
  );
};

export default InvoiceDetailsContent;
