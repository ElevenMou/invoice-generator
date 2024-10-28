import ContentTop from "@/components/layout/ContentTop";
import { btnPrimaryStyle, btnStyle } from "@/components/UI/Button";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import ClientsList from "./ClientsList";

export const metadata = {
  title: "Clients",
};

const ClientsPage = async () => {

  return (
    <>
      <ContentTop>
        <h1>Clients</h1>
        <Link
          href="/clients/new"
          className={twMerge(btnStyle, btnPrimaryStyle)}
        >
          New client
        </Link>
      </ContentTop>
      <ClientsList />
    </>
  );
};

export default ClientsPage;
