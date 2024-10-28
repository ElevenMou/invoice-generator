"use client";

import CustomSelect, { Option } from "@/components/UI/Select";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 20;

type CompaniesSelectProps = {
  setValue: (value: string) => void;
  value?: string;
};

const CompaniesSelect = ({ setValue, value }: CompaniesSelectProps) => {
  const [companies, setCompanies] = useState<Option[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company/select?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      if (resp.ok) {
        const data = await resp.json();
        setCompanies((prev) => [...prev, ...data.options]);
        setTotalItems(data.total);
      } else {
        console.error("Failed to fetch companies:", resp.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);
  return (
    <CustomSelect
      isClearable
      options={companies}
      value={companies.find((c) => c.value === value)}
      placeholder="Select a company"
      onChange={(value) => setValue(value?.value || "")}
      isLoading={loading}
      onMenuScrollToBottom={() => {
        if (page * ITEMS_PER_PAGE < totalItems) {
          setPage(page + 1);
        }
      }}
    />
  );
};

export default CompaniesSelect;
