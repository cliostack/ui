import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";

type VStackProps = React.HTMLAttributes<HTMLDivElement>;

const VStack = forwardRef<HTMLDivElement, VStackProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div className={cn("flex flex-col", className)} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

export default VStack;
