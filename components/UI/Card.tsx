import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = ({ children, ...props }: Readonly<CardProps>) => {
  return (
    <div
      {...props}
      className={twMerge("bg-card rounded-lg md:p-6 p-4", props.className)}
    >
      {children}
    </div>
  );
};

export default Card;
