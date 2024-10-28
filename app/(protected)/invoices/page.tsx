import ContentTop from "@/components/layout/ContentTop";
import { btnPrimaryStyle, btnStyle } from "@/components/UI/Button";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import InvoicesList from "./InvoicesList";

export const metadata = {
  title: "Invoices",
};
const InvoicesPage = async () => {
  return (
    <>
      <ContentTop>
        <h1>Invoices</h1>
        <Link
          href="/invoices/new"
          className={twMerge(btnStyle, btnPrimaryStyle)}
        >
          New invoice
        </Link>
      </ContentTop>
      <InvoicesList />
    </>
  );
};

export default InvoicesPage;
