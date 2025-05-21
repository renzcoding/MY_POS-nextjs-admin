"use client";

import { useState } from "react";
import Input from "../input/InputField";
import { SearchAutocompleteProps } from "@/types/FilterFormType";

export default function SearchAutocomplete({
  fetchListData,
  setFilters,
  currentSegment,
}: SearchAutocompleteProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    let filterKey; // 🔁 You can make this dynamic later

    if (currentSegment === "customer") {
      filterKey = "firstname"; // 🔁 You can make this dynamic later
    } else {
      filterKey = "name"; // 🔁 You can make this dynamic later
    }
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
    setSuggestions([]);

    if (value.length <= 1) {
      setShowSuggestions(false);
      return;
    }

    try {
      const params = new URLSearchParams({ [filterKey]: value }).toString();
      const res = await fetch(`/api/${currentSegment}/?${params}`);
      // const res = await fetch(`/api/${currentSegment}/?name=${value}`);
      const result = await res.json();

      console.log("Fetched result:", result, params);

      if (Array.isArray(result.data)) {
        // set just the names
        if (currentSegment === "customer") {
          setSuggestions(result.data.map((item: any) => item.firstname));
        } else {
          setSuggestions(result.data.map((item: any) => item.name));
        }
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Autocomplete fetch error:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (name: string) => {
    setInputValue(name);
    if (currentSegment === "customer") {
      setFilters((prev) => ({ ...prev, firstname: name }));
    } else {
      setFilters((prev) => ({ ...prev, name }));
    }
    setShowSuggestions(false);
    fetchListData(); // your custom fetch logic
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search by name"
        className="w-full rounded border px-4 py-2"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded border bg-white shadow">
          {suggestions.map((name) => (
            <li
              key={name}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
