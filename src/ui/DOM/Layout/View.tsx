import React, { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ViewProps = React.HTMLAttributes<HTMLDivElement>;

const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ className, children, ...rest }: ViewProps, ref) => {
    return (
      <div ref={ref} className={cn("flex", className)} {...rest}>
        {children}
      </div>
    );
  }
);

export default View;
