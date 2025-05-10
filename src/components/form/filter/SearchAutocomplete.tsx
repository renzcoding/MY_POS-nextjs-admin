"use client";

import { useEffect, useState } from "react";
import Input from "../input/InputField";

export default function SearchAutocomplete(fetchSuppliers: any) {
  const [filterName, setFilterName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterName(value);

    if (value.length > 1) {
      // Fetch matching supplier names
      const res = await fetch(`/api/supplier/?name=${value}`);
      const data = await res.json();
      console.log("ths data", data.data);
      setSuggestions(data.data); // 👈 Must be an array
      //   if (Array.isArray(data)) {
      //   } else {
      //     setSuggestions([]);
      //   }

      console.log("Suggestions:", suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (name: string) => {
    setFilterName(name);
    setShowSuggestions(false);
    fetchSuppliers(); // your custom fetch logic
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={filterName}
        onChange={handleChange}
        placeholder="Search by name"
        className="w-full rounded border px-4 py-2"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded border bg-white shadow">
          <li>fdsasfdsa</li>
          <li>hahah</li>
          <li>hahaha</li>
          <li>mamama</li>
        </ul>
      )}
    </div>
  );
}
