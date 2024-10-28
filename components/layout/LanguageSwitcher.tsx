"use client";
import CustomSelect, { Option } from "@/components/UI/Select";
import language from "@/types/Language";

type LanguageSwitcherProps = {
  setValue: (value: language) => void;
  value?: language;
};

const LanguageSwitcher = ({ setValue, value }: LanguageSwitcherProps) => {
  const options: Option[] = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "Spanish", value: "es" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Portuguese", value: "pt" },
    { label: "Arabic", value: "ar" },
    { label: "Russian", value: "ru" },
    { label: "Turkish", value: "tr" },
    { label: "Polish", value: "pl" },
    { label: "Dutch", value: "nl" },
  ];

  return (
    <CustomSelect
      isClearable
      options={options}
      value={options.find((c) => c.value === value)}
      placeholder="Select a language"
      onChange={(value) => setValue(value?.value as language)}
    />
  );
};

export default LanguageSwitcher;
