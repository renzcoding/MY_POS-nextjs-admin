import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Label from "@/components/form/Label";

export default function CitiesFieldInForm({
  register,
  selectedCountry,
  selectedState,
  selectedCity,
  cities,
  setCities,
  setSelectedCity,
}: any) {
  const getCitiesOfState = async (countryCode: string, stateCode: string) => {
    const getCities = City.getCitiesOfState(countryCode, stateCode);
    setCities(getCities ?? []); // ← Fallback to empty array if undefined
  };

  //   fetch state when country changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCitiesOfState(selectedCountry, selectedState);
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState, selectedCity]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedCity(code);
  };

  return (
    <div>
      <Label>State</Label>
      <select
        value={selectedCity}
        onChange={(e) => handleCityChange(e)}
        disabled={!cities.length}
        className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 errors.country ? "border-red-500" : "" h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30`}
      >
        <option value="">Select city</option>
        {cities.map((city: any) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
