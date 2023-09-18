import { StylesConfig } from "react-select";

export const inputClass = `w-full rounded-sm border-none bg-neutral-200 p-1 px-2 text-lg
text-gray-950 outline-none outline-offset-2 
focus:outline-blue-700 dark:bg-gray-700 dark:text-gray-200`;

export const buttonClass = `mt-2 w-fit bg-blue-700 px-10 py-1.5 font-sans 
text-base font-bold uppercase transition-all duration-100 active:bg-blue-600`;

export const customStyles: StylesConfig = {
  singleValue: (provided: any) => ({
    ...provided,
    color: "#e5e7eb",
    FontFace: "sans-serif",
    fontSize: "1.125rem",
  }),
  option: (provided: any) => ({
    ...provided,
    color: "#e5e7eb",
    fontFamily: "sans-serif",
  }),
  control: (base: any, state: any) => ({
    ...base,
    border: state.isFocused ? "none" : "none",
    outline: state.isFocused ? "2px solid #1d4ed8" : "none",
    outlineOffset: "2px",
    borderRadius: "2px",
    color: "black",
    boxShadow: "none",
    fontFamily: "sans-serif",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#e5e7eb",
  }),
};

export const SelectTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#60a5fa",
    primary: "#3b82f6",
    neutral0: "#374151",
    neutral5: "#374151",
    neutral10: "#374151",
  },
});
