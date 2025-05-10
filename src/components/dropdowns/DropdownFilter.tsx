"use client";
import { useState } from "react";

export default function ButtonFilterDropdown({
  onSelect,
}: {
  onSelect: (status: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Filter by Status");

  const options = ["All", "Active", "Inactive"];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex w-48 justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        {selected}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="border-b px-4 py-2 text-xs font-semibold text-gray-500">
            Filter by Status
          </div>
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                  onSelect(option);
                }}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
