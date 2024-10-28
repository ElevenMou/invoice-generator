"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Pagination from "@/components/UI/Pagination";
import ICompany from "@/types/ICompany";

const ITEMS_PER_PAGE = 15;

const CompaniesList = () => {
  const [allCompanies, setAllCompanies] = useState<ICompany[]>([]);
  const [displayedCompanies, setDisplayedCompanies] = useState<ICompany[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async (page: number) => {
    console.log("Fetch companies");

    setLoading(true);
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company?limit=${ITEMS_PER_PAGE}&page=${page}`
      );
      if (resp.ok) {
        const data = await resp.json();
        const newCompanies = data.companies;
        setAllCompanies((prevCompanies) => {
          const startIndex = (page - 1) * ITEMS_PER_PAGE;
          const updatedCompanies = [...prevCompanies];
          newCompanies?.forEach((company: ICompany, index: number) => {
            updatedCompanies[startIndex + index] = company;
          });
          return updatedCompanies;
        });
        setTotalItems(data.total);
        return newCompanies;
      } else {
        console.error("Failed to fetch companies:", resp.statusText);
        return [];
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedCompanies = async (page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    let companiesToDisplay = allCompanies.slice(startIndex, endIndex);

    if (
      companiesToDisplay.some((company) => company === undefined) ||
      companiesToDisplay.length === 0
    ) {
      const newCompanies = await fetchCompanies(page);
      companiesToDisplay = newCompanies;
    }

    setDisplayedCompanies(companiesToDisplay);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    updateDisplayedCompanies(currentPage);
  }, [currentPage]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Identifier</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          ) : displayedCompanies?.length > 0 ? (
            displayedCompanies.map((company) => (
              <tr key={company._id}>
                <td data-header="Name">{company.name}</td>
                <td data-header="Address">
                  {`${company.address.street} ${company.address.city} ${company.address.postalCode} ${company.address.country}`}
                </td>
                <td data-header="Email">{company.email}</td>
                <td data-header="Identifier">
                  {company?.identifiers[0].value}
                </td>
                <td data-header="Actions">
                  <Link
                    href={`/companies/${company._id}`}
                    className="whitespace-nowrap"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No companies found</td>
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

export default CompaniesList;
