import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";
import { twMerge } from "tailwind-merge";

interface SelectItemProps {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

const SelectItem = ({ children, onClick, selected }: SelectItemProps) => {
  return (
    <div
      className={twMerge(
        "relative w-fit cursor-pointer shadow-md rounded-xl overflow-hidden border-2 border-transparent hover:border-primary_3 transition-all duration-300",
        selected ? "border-primary_5" : ""
      )}
      onClick={onClick}
    >
      <div
        className={twMerge(
          "absolute bottom-5 right-5 w-8 h-8 rounded-full border-2 border-primary_5 grid place-items-center transition-all duration-300 ",
          selected ? "bg-primary_5" : "bg-card"
        )}
      >
        {selected ? (
          <CheckIcon
            className="w-5 h-5 text-neutral_0"
            style={{ strokeWidth: 4 }}
          />
        ) : (
          <>&nbsp;</>
        )}
      </div>
      {children}
    </div>
  );
};

export default SelectItem;
