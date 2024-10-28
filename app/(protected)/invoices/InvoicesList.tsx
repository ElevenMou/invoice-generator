"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/UI/Pagination";
import IInvoice from "@/types/IInvoice";

const ITEMS_PER_PAGE = 15;

const InvoicesList = () => {
  const [allClients, setAllClients] = useState<IInvoice[]>([]);
  const [displayedClients, setDisplayedClients] = useState<IInvoice[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchClients = async (page: number) => {
    setLoading(true);
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoice?limit=${ITEMS_PER_PAGE}&page=${page}`
      );
      if (resp.ok) {
        const data = await resp.json();
        const newClients = data.invoices;
        setAllClients((prevClients) => {
          const startIndex = (page - 1) * ITEMS_PER_PAGE;
          const updatedClients = [...prevClients];
          newClients?.forEach((invoice: IInvoice, index: number) => {
            updatedClients[startIndex + index] = invoice;
          });
          return updatedClients;
        });
        setTotalItems(data.total);
        return newClients;
      } else {
        console.error("Failed to fetch invoices:", resp.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedClients = async (page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    let invoicesToDisplay = allClients.slice(startIndex, endIndex);

    if (
      invoicesToDisplay.some((invoice) => invoice === undefined) ||
      invoicesToDisplay.length === 0
    ) {
      const newClients = await fetchClients(page);
      invoicesToDisplay = newClients;
    }

    setDisplayedClients(invoicesToDisplay);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    updateDisplayedClients(currentPage);
  }, [currentPage]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Company</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          ) : displayedClients?.length > 0 ? (
            displayedClients.map((invoice) => (
              <tr key={invoice._id}>
                <td data-header="Number">{invoice.invoiceNumber}</td>
                <td data-header="Company">{invoice.company}</td>
                <td data-header="Client">{invoice.client}</td>
                <td data-header="Date">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td data-header="Total">{invoice.total}</td>
                <td data-header="Actions">
                  <div className="flex gap-2">
                    <Link
                      href={`/invoices/${invoice._id}`}
                      className="whitespace-nowrap"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No invoices found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default InvoicesList;
