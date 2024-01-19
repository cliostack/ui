import React from "react";
import { cn } from "@/lib/cn";

type ViewProps = {} & React.HTMLAttributes<HTMLDivElement>;
const View = ({ className, children, ...rest }: ViewProps) => {
  return (
    <div className={cn("flex", className)} {...rest}>
      {children}
    </div>
  );
};

export default View;
