import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Label from "@/components/form/Label";

export default function StateFieldInForm({
  register,
  states,
  setStates,
  setCities,
  selectedCountry,
  setSelectedState,
  selectedState,
}: any) {
  const getStatesOfCountry = async (countryCode: string) => {
    // This comes from country-state-city and returns IState[]
    const getStates = State.getStatesOfCountry(countryCode);
    setStates(getStates);
  };

  const getCitiesOfState = async (countryCode: string, stateCode: string) => {
    const getCities = City.getCitiesOfState(countryCode, stateCode);
    setCities(getCities ?? []); // ← Fallback to empty array if undefined
  };

  //   fetch state when country changes
  useEffect(() => {
    if (selectedCountry) {
      getStatesOfCountry(selectedCountry);
      getCitiesOfState(selectedCountry, selectedState);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedState(code);
    getCitiesOfState(selectedCountry, selectedState);
  };

  return (
    <div>
      <Label>State</Label>
      <select
        value={selectedState}
        onChange={handleStateChange}
        disabled={!states.length}
        className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 errors.country ? "border-red-500" : "" h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30`}
      >
        <option value="">Select a state</option>
        {states.map((state: any) => (
          <option key={state.id} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
}
