import React from "react";
import Select, { StylesConfig, Props as SelectProps } from "react-select";

export type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps
  extends Omit<SelectProps<Option, false>, "options"> {
  options: Option[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  styles,
  ...rest
}) => {
  const customStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "2.75rem",
      minHeight: "2.75rem",
      marginTop: "0.25rem",
      border: `1px solid var(--color-neutral-3)`,
      borderRadius: "0.375rem",
      backgroundColor: "var(--color-background)",
      color: "var(--color-text)",
      outline: "none",
      transition: "border-color 0.3s, box-shadow 0.3s",
      "&:hover": {
        borderColor: "var(--color-neutral-3)",
      },
      boxShadow: state.isFocused ? "0 0 0 2px var(--color-primary-5)" : "none",
      borderColor: state.isFocused ? "transparent" : "var(--color-neutral-3)",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 0.75rem",
      height: "2.75rem",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
      color: "var(--color-text)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--color-text)",
      margin: "0",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--color-neutral-5)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--color-primary-5)"
        : state.isFocused
        ? "var(--color-primary-3)"
        : "var(--color-card)",
      color: state.isSelected ? "var(--color-neutral-0)" : "var(--color-text)",
      fontWeight: state.isSelected || state.isFocused ? "500" : "normal",
      "&:active": {
        backgroundColor: "var(--color-primary-5)",
        color: "var(--color-neutral-0)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--color-background)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "2.75rem",
    }),
    ...(styles || {}),
  };

  return <Select<Option> options={options} styles={customStyles} {...rest} />;
};

export default CustomSelect;
