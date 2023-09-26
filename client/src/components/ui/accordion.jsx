import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

// eslint-disable-next-line react/prop-types
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("rounded-lg bg-White p-4 mt-[16px] drop-shadow-[0_2px_5px_rgba(0,0,0,0.20)] ", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "h-12  flex flex-1 items-center justify-between  font-medium space-x-[10px] transition-all [&[data-state=open]>svg]:opacity-0 ",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200 " />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "w-[760px] overflow-hidden text-DarkGray text-Body2 font-Inter font-normal transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

/* <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "h-12  flex flex-1 items-center justify-between  font-medium space-x-[10px] transition-all [&[data-state=open]>svg]:opacity-0 bg-red-200",
          className
        )}
        {...props}
      >
        {children}
        <div className="h-full  flex flex-col justify-end">
          <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200 " />
        </div>
      </AccordionPrimitive.Trigger>*/
