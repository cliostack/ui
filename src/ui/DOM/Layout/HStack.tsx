import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";

type HStackProps = React.HTMLAttributes<HTMLDivElement>;
const HStack = forwardRef<HTMLDivElement, HStackProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div className={cn("flex", className)} {...rest} ref={ref}>
        {children}
      </div>
    );
  }
);

export default HStack;
