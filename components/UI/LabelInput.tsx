import React from "react";
import { twMerge } from "tailwind-merge";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  setValue?: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  children?: React.ReactNode;
}

const LabelInput = ({
  label,
  setValue,
  type = "text",
  placeholder = "Enter a value",
  autoComplete = "",
  className,
  children,
  ...props
}: LabelInputProps) => {
  return (
    <label
      className={twMerge(
        "w-full",
        type === "checkbox" &&
          "flex items-center justify-start gap-2 flex-row-reverse w-fit",
        className
      )}
    >
      {label && (
        <span className="block text-sm font-medium text-text">{label}</span>
      )}

      {children ? (
        children
      ) : (
        <>
          <input
            {...props}
            type={type}
            onChange={(e) => setValue && setValue(e.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={twMerge(
              "w-full h-11 mt-1 py-2 px-4 border border-neutral_3 rounded-md bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              type === "checkbox" && "w-6 h-6 mt-0",
              type === "color" && "py-1 px-2 "
            )}
          />
          {type === "checkbox" && <div className="custom-checkbox"></div>}
        </>
      )}
    </label>
  );
};

export default LabelInput;
