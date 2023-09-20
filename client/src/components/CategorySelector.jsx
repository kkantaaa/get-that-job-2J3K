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

export function CategorySelector({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e;
    onCategoryChange(selectedCategory);
  };

  const getCategories = async () => {
    try {
      const results = await axios.get("http://localhost:4000/category");
      setCategories(results.data.result);
    } catch (error) {
      console.error("Error: Failed to fetch categories data");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Select onValueChange={handleCategoryChange}>
      <SelectTrigger className="h-[36px] w-[280px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White">
        <SelectValue
          className="text-LightGray text-[14px]"
          placeholder="Select a category"
        />
      </SelectTrigger>

      <SelectContent>
        <SelectItem className="text-LightGray text-[14px]" value="">
          Select a category
        </SelectItem>
        {categories.map((category, key) => (
          <SelectItem
            className="text-LightGray text-[14px]"
            value={category.category_name}
          >
            {category.category_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
