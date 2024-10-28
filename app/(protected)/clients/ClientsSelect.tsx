"use client";

import CustomSelect, { Option } from "@/components/UI/Select";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 20;

type ClientsSelectProps = {
  setValue: (value: string) => void;
  value?: string;
};

const ClientsSelect = ({ setValue, value }: ClientsSelectProps) => {
  const [clients, setClients] = useState<Option[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/client/select?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      if (resp.ok) {
        const data = await resp.json();
        setClients((prev) => [...prev, ...data.options]);
        setTotalItems(data.total);
      } else {
        console.error("Failed to fetch clients:", resp.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page]);
  return (
    <CustomSelect
      isClearable
      options={clients}
      placeholder="Select a client"
      value={clients.find((client) => client.value === value)}
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

export default ClientsSelect;
