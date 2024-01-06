import React from "react";
import { cn } from "../../../utils/cn";

type VStackProps = {} & React.HTMLAttributes<HTMLDivElement>;
const VStack = ({ className, children, ...rest }: VStackProps) => {
  return (
    <div className={cn("flex flex-col", className)} {...rest}>
      {children}
    </div>
  );
};

export default VStack;
