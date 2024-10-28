"use client";

import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/UI/Pagination";
import IClient from "@/types/IClient";
import Link from "next/link";

const ITEMS_PER_PAGE = 15;

const ClientsList = () => {
  const [allClients, setAllClients] = useState<IClient[]>([]);
  const [displayedClients, setDisplayedClients] = useState<IClient[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchClients = async (page: number) => {
    setLoading(true);
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/client?limit=${ITEMS_PER_PAGE}&page=${page}`
      );
      if (resp.ok) {
        const data = await resp.json();
        const newClients = data.clients;
        setAllClients((prevClients) => {
          const startIndex = (page - 1) * ITEMS_PER_PAGE;
          const updatedClients = [...prevClients];
          newClients?.forEach((client: IClient, index: number) => {
            updatedClients[startIndex + index] = client;
          });
          return updatedClients;
        });
        setTotalItems(data.total);
        return newClients;
      } else {
        console.error("Failed to fetch clients:", resp.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedClients = async (page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    let clientsToDisplay = allClients.slice(startIndex, endIndex);

    if (
      clientsToDisplay.some((client) => client === undefined) ||
      clientsToDisplay.length === 0
    ) {
      const newClients = await fetchClients(page);
      clientsToDisplay = newClients;
    }

    setDisplayedClients(clientsToDisplay);
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
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : displayedClients?.length > 0 ? (
            displayedClients.map((client) => (
              <tr key={client._id}>
                <td data-header="Name">{client.name}</td>
                <td data-header="Address">
                  {`${client.address.street}, ${client.address.city}, ${client.address.postalCode} ${client.address.country}`}
                </td>
                <td data-header="Email">{client.email}</td>
                <td data-header="Phone">{client.phone}</td>
                <td data-header="Actions">
                  <Link
                    href={`/clients/${client._id}`}
                    className="whitespace-nowrap"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No clients found</td>
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

export default ClientsList;
