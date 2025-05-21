import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Label from "@/components/form/Label";

interface ICountry {
  name: string;
  isoCode: string;
}

interface IState {
  name: string;
  isoCode: string;
  countryCode: string;
}

interface ICity {
  name: string;
  countryCode: string;
  stateCode?: string;
}

interface Props {
  value: string; // from Controller
  onChange: (val: string) => void; // from Controller
  setSelectedCountry: (val: string) => void;
  setStates: (st: IState[]) => void;
  setCities: (ct: ICity[]) => void;
}

export default function CountriesFieldInForm({
  value,
  onChange,
  setSelectedCountry,
  setStates,
  setCities,
}: any) {
  const [countries, setCountries] = useState<ICountry[]>([]);

  const getAllCountries = async () => {
    const getCountries = Country.getAllCountries();
    setCountries(getCountries);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleCountryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const code = e.target.value;
    setSelectedCountry(code);
    onChange(code); // update RHF form value
    setStates(State.getStatesOfCountry(code));
    setCities([]);
  };

  return (
    <>
      <Label>Country</Label>
      <select
        value={value}
        onChange={handleCountryChange}
        className={`shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 errors.country ? "border-red-500" : "" h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30`}
      >
        <option value="">Select a country</option>
        {countries.map((country: any) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
    </>
  );
}
