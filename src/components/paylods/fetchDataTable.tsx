"use client";

import { useState } from "react";

const [suppliers, setSuppliers] = useState<any[]>([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const limit = 10; // items per page

// Filter state
const [filterName, setFilterName] = useState("");
const [filterStatus, setFilterStatus] = useState("");
const [filterEmail, setFilterEmail] = useState("");
const [showAll, setShowAll] = useState(false);
const [loading, setLoading] = useState(false);

export const fetchDataTable = async () => {
  setLoading(true);
  const query = new URLSearchParams({
    page: currentPage.toString(),
    limit: limit.toString(),
    name: filterName,
    status: filterStatus,
    email: filterEmail,
    showAll: showAll.toString(),
  });
  const res = await fetch(`/api/supplier?${query.toString()}`);
  const result = await res.json();
  console.log("this is result", result);
  setSuppliers(result.data);
  // onDataReady?.(result.data);
  setTotalPages(result.totalPages);
};
