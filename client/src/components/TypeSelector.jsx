import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TypeSelector({ onTypeChange }) {
  const [type, setType] = useState([]);

  const handleTypeChange = (e) => {
    const selectedType = e;
    onTypeChange(selectedType);
  };

  const getType = async () => {
    try {
      const results = await axios.get("http://localhost:4000/type");
      setType(results.data.result);
    } catch (error) {
      console.error("Error: Failed to fetch type data");
    }
  };

  useEffect(() => {
    getType();
  }, []);

  return (
    <Select onValueChange={handleTypeChange}>
      <SelectTrigger className="h-[36px] w-[280px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White">
        <SelectValue
          className="text-LightGray text-[14px]"
          placeholder="Select a type"
        />
      </SelectTrigger>

      <SelectContent>
        <SelectItem className="text-LightGray text-[14px]" value="">
          Select a type
        </SelectItem>
        {type.map((type, key) => (
          <SelectItem
            className="text-LightGray text-[14px]"
            value={type.type_name}
          >
            {type.type_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
