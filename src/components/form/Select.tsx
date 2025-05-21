import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  // onChange: (value: string) => void;
  onChange: (value: string | Option) => void;
  className?: string;
  defaultValue?: string;
  returnObject?: boolean; // <— NEW
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  returnObject = false,
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);

    const selectedOption = options.find(
      (opt) => String(opt.value) === String(value),
    );

    if (returnObject) {
      if (selectedOption) {
        onChange(selectedOption);
      } else {
        console.warn("Selected option not found:", value);
      }
    } else {
      onChange(value);
    }
  };

  return (
    <select
      className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
        selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-400 dark:text-gray-400"
      } ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >
      {/* Placeholder option */}
      <option
        value=""
        disabled
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
