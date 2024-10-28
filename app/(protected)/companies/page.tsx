import ContentTop from "@/components/layout/ContentTop";
import { btnPrimaryStyle, btnStyle } from "@/components/UI/Button";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import CompaniesList from "./CompaniesList";

export const metadata = {
  title: "Companies",
};

const CompaniesPage = async () => {

  return (
    <>
      <ContentTop>
        <h1>Companies</h1>
        <Link
          href="/companies/new"
          className={twMerge(btnStyle, btnPrimaryStyle)}
        >
          New company
        </Link>
      </ContentTop>
      <CompaniesList />
    </>
  );
};

export default CompaniesPage;
