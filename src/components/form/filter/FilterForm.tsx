"use client";

import React, { useState } from "react";
import Input from "../input/InputField";
import Button from "@/components/ui/button/Button";
import { Filter } from "lucide-react";
import { FilterFormProps } from "@/types/FilterFormType";
import ButtonFilterDropdown from "@/components/dropdowns/DropdownFilter";
import SearchAutocomplete from "./SearchAutocomplete";

export default function FilterForm({
  fetchSuppliers,
  setCurrentPage,
  showAll,
  setShowAll,
  filters,
  setFilters,
}: FilterFormProps) {
  const {
    name: filterName,
    status: filterStatus,
    email: filterEmail,
  } = filters;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(name, value);
  };

  const handleStatusChange = (selected: string) => {
    console.log(selected);
    if (selected === "All") {
      setFilters((prev) => ({ ...prev, status: "" }));
      setCurrentPage(1);
      fetchSuppliers();
    } else {
      setFilters((prev) => ({ ...prev, status: selected }));
      setCurrentPage(1);
      fetchSuppliers();
    }
  };

  const handleFilter = () => {
    setCurrentPage(1);
    fetchSuppliers();
  };

  return (
    <>
      {/* <Input
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Search by name"
          className="w-60 rounded border px-4 py-2"
        />
        <input
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          placeholder="Search by email"
          className="w-60 rounded border px-4 py-2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded border px-4 py-2"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>
        <Button
          size="sm"
          className="flex items-center gap-2"
          variant="outline"
          onClick={handleFilter}
        >
          <Filter />
          Filter
        </Button> */}
      {/* <Input
        type="text"
        value={filterName}
        onChange={handleChange}
        placeholder="Search by name"
        className="w-full rounded border px-4 py-2 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/90"
      /> */}
      <SearchAutocomplete fetchSuppliers={fetchSuppliers} />
      <ButtonFilterDropdown onSelect={handleStatusChange} />

      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => {
          setShowAll(!showAll);
          setCurrentPage(1);
          fetchSuppliers();
        }}
      >
        {showAll ? "Paginate" : "Show All"}
      </Button>
    </>
  );
}
