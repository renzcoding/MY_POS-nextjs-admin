"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import { FilterFormProps } from "@/types/FilterFormType";
import ButtonFilterDropdown from "@/components/dropdowns/DropdownFilter";
import SearchAutocomplete from "./SearchAutocomplete";

export default function FilterForm({
  fetchListData,
  pagination,
  filters,
  setFilters,
  currentSegment,
}: FilterFormProps) {
  const { setCurrentPage, showAll, setShowAll } = pagination;
  const {
    name: filterName,
    username: filterUsername,
    firstname: filterFirstname,
    status: filterStatus,
    email: filterEmail,
  } = filters;

  const handleStatusChange = (selected: string) => {
    if (selected === "All") {
      setFilters((prev) => ({ ...prev, status: "" }));
      if (!filterName) {
        setFilters((prev) => ({ ...prev, name: "" }));
      }
      if (!filterFirstname) {
        setFilters((prev) => ({ ...prev, firstname: "" }));
      }
      if (!filterEmail) {
        setFilters((prev) => ({ ...prev, email: "" }));
      }
      setCurrentPage(1);
      fetchListData();
    } else {
      setFilters((prev) => ({ ...prev, status: selected }));
      setCurrentPage(1);
      fetchListData();
    }
  };

  return (
    <>
      <SearchAutocomplete
        fetchListData={fetchListData}
        setFilters={setFilters}
        currentSegment={currentSegment}
      />
      <ButtonFilterDropdown onSelect={handleStatusChange} />

      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => {
          setShowAll(!showAll);
          setCurrentPage(1);
          fetchListData();
        }}
      >
        {showAll ? "Paginate" : "Show All"}
      </Button>
    </>
  );
}
