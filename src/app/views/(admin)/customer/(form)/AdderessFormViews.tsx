"use client";

import ComponentCard from "@/components/common/ComponentCard";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import CitiesFieldInForm from "@/components/globals/locations/CitiesFieldInForm";
import CountriesFieldInForm from "@/components/globals/locations/CountriesFieldInForm";
import StateFieldInForm from "@/components/globals/locations/StatesFieldInForm";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

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

interface AddressFormViewsProps {
  register: any; // Replace with proper react-hook-form type if available
}

export default function AdderessFormViews({ register }: AddressFormViewsProps) {
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const { control } = useForm();

  return (
    <ComponentCard title="Address Information">
      <div className="space-6 flex flex-row justify-between gap-4">
        <div className="w-full">
          {/* <Controller
            name="countryId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CountriesFieldInForm
                {...field} // gives value & onChange
                setStates={setStates}
                setCities={setCities}
                setSelectedCountry={setSelectedCountry}
              />
            )}
          /> */}
          <CountriesFieldInForm
            register={register}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            setStates={setStates}
            setCities={setCities}
          />
        </div>
        <div className="w-full">
          <div>
            <StateFieldInForm
              register={register}
              states={states}
              setStates={setStates}
              setCities={setCities}
              selectedCountry={selectedCountry}
              setSelectedState={setSelectedState}
              selectedState={selectedState}
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <CitiesFieldInForm
              register={register}
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              cities={cities}
              setCities={setCities}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <div>
            <Label>Street Address</Label>
            <TextArea
              rows={3}
              {...register("address")}
              placeholder="Enter your address"
            />
          </div>
        </div>
        <div className="w-full">
          <div>
            <Label>Zip Code</Label>
            <Select
              options={[{ value: "123456", label: "123456" }]} // Replace with real zip code list or input
              placeholder="Select zip code"
              {...register("postalCode")}
            />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
