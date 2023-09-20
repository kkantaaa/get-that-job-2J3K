import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[76px] w-[760px] rounded-lg border border-Pink bg-White px-2 py-2 text-Body2 ring-offset-Pink file:border-0 file:bg-White file:text-Body2 file:font-normal placeholder:text-LightGray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-Pink disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
