import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TypeSelector() {
  return (
    <Select>
      <SelectTrigger className="h-[36px] w-[280px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White">
        <SelectValue
          className="text-LightGray text-[14px]"
          placeholder="Select a category"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-LightGray text-[14px]">
            <p className="text-LightGray text-[14px]">-- Select a type --</p>
          </SelectLabel>
          <SelectItem className="text-LightGray text-[14px]" value="Full time">
            Full time
          </SelectItem>
          <SelectItem className="text-LightGray text-[14px]" value="Part time">
            Part time
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
