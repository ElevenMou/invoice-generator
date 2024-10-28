import Card from "@/components/UI/Card";
import React from "react";

interface StaticsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
}

const StaticsCard = ({ label, value, ...props }: StaticsCardProps) => {
  return (
    <Card className={props.className}>
      <h2 className="mb-2 text-sm ">{label}</h2>
      <p className="text-7xl font-bold">{value}</p>
    </Card>
  );
};

export default StaticsCard;
