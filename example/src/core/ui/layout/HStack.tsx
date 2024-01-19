import React from "react";
import { cn } from "@/lib/cn";

type HStackProps = {} & React.HTMLAttributes<HTMLDivElement>;
const HStack = ({ className, children, ...rest }: HStackProps) => {
  return (
    <div className={cn("flex self-stretch", className)} {...rest}>
      {children}
    </div>
  );
};

export default HStack;
