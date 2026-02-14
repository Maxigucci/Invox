import Select from "react-select";
import countryList from "react-select-country-list";
import { useMemo } from "react";

export default function CountrySelect() {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <Select
      options={options}
      styles={{
      container: (base) => ({
        ...base,
        width: "auto",
        display: "inline-block",
      }),
  }}
      placeholder="Select a country"
      isSearchable
    />
  );
}