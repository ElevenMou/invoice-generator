import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "link";
  size?: "default" | "sm";
  loading?: boolean;
}

export const btnStyle =
  "h-11 relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary_5 text-primary_5 bg-card hover:text-primary_3 hover:border-primary_3 px-4 py-2";
export const btnPrimaryStyle =
  "bg-primary_5 text-neutral_0 hover:bg-primary_3 hover:text-neutral_0";
export const btnLinkStyle =
  "text-primary hover:text-primary_3 underline underline-offset-4 border-none bg-none";

const Button = ({
  className,
  variant = "default",
  size = "default",
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(`
          ${
            variant === "link"
              ? btnLinkStyle
              : `
          ${btnStyle} ${className} ${
                  variant === "primary" ? btnPrimaryStyle : ""
                } ${size === "sm" ? "h-8 px-2 py-1" : "px-4 py-2"}`
          }`)}
      disabled={loading || props.disabled}
    >
      {loading ? "Loading..." : props.children}
    </button>
  );
};
Button.displayName = "Button";

export default Button;
