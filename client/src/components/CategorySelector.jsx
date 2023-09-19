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
import { useState } from "react";

export function CategorySelector() {
  const [category, setCategory] = useState("");
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
            <p className="text-LightGray text-[14px]">
              -- Select a category --
            </p>
          </SelectLabel>

          <SelectItem
            className="text-LightGray text-[14px]"
            value="Software Developer"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            Software Developer
          </SelectItem>
          <SelectItem
            className="text-LightGray text-[14px]"
            value="Sales"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            Sales
          </SelectItem>

          <SelectItem
            className="text-LightGray text-[14px]"
            value="Graphic Designer"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            Graphic Designer
          </SelectItem>

          <SelectItem
            className="text-LightGray text-[14px]"
            value="Digital Marketing"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            Digital Marketing
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
