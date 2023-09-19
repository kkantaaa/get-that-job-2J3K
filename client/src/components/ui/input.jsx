import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-lg border border-Pink bg-White px-2 py-2 text-Body2 ring-offset-Pink file:border-0 file:bg-White file:text-Body2 file:font-normal placeholder:text-LightGray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-Pink disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export { Input };
