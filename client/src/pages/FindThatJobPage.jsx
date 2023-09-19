import FindThatJobSideBar from "@/components/ProfessionalSideBar/FindThatJobSideBar.jsx";
import { CategorySelector } from "@/components/CategorySelector";
import { TypeSelector } from "@/components/TypeSelector";
import JobList from "@/components/JobList.jsx";
import searchIcon from "@/images/getthatjob-page/searchIcon.png";
import darkDollarIcon from "@/images/getthatjob-page/darkDollarIcon.png";
import { useState } from "react";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FindThatJobPage() {
  const [text, setText] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  //เพิ่ม variable สำหรับ parameter อื่นๆ

  // const handleInputChange = (event) => {
  //   console.log(event.target);
  //   const text = event.target.value;
  //   const min = event.target.min;
  //   const max = event.target.value;
  //   setText(text);
  //   setMinSalary(min);
  //   setMaxSalary(max);
  // };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full min-h-screen flex flex-row justify-spacearound bg-Background">
      <FindThatJobSideBar />
      <div className="flex flex-col w-full ml-[240px] mb-12">
        <div className="w-full px-12 pt-8 flex flex-col justify-start items-start">
          <div className="mb-[16px]  text-DarkGray font-Montserrat text-Headline3 font-light">
            Find that job
          </div>
          <div className="flex flex-col">
            <label
              className="w-fit text-[10px] text-LightGray"
              htmlFor="search-box"
            >
              SEARCH BY JOB TITLE OR COMPANY NAME
            </label>
            <div className="relative" onSubmit={handleSubmit}>
              <input
                className="h-[36px] w-[360px] rounded-[8px] text-[14px] pl-[28px] border-solid border-[1px] border-Pink bg-White"
                type="text"
                id="search-input"
                placeholder="manufacturing, sales, swim"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <img
                className="absolute top-2 left-1.5"
                src={searchIcon}
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="flex flew-row">
            <div className="py-2 pr-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="category-box"
              >
                CATEGORY
              </label>
              {/* <Select>
                <SelectTrigger className="h-[36px] w-[280px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White">
                  <SelectValue
                    className="text-LightGray text-[14px]"
                    placeholder="Select a category"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    className="text-LightGray text-[14px]"
                    value=""
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    Select a category
                  </SelectItem>

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
                </SelectContent>
              </Select> */}
              {/* <CategorySelector selectedCategory={setCategory} /> */}
              <div>
                <select
                  className="h-[36px] w-[280px] rounded-[8px] text-LightGray text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Sales">Sales</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Legal">Legal</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>

            <div className="p-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="type-box"
              >
                TYPE
              </label>
              {/* <TypeSelector /> */}
              <div>
                <select
                  className="h-[36px] w-[280px] rounded-[8px] text-LightGray text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                  value={type}
                  onChange={handleTypeChange}
                >
                  <option value="">Select a type</option>
                  <option value="Full time">Full time</option>
                  <option value="Part time">Part time</option>
                </select>
              </div>
            </div>

            <div className="p-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="search-box"
              >
                SALARY RANGE
              </label>
              <div className="flex flex-row">
                <div className="relative">
                  <input
                    className="h-[36px] w-[102px] rounded-[8px] text-[14px] pl-[26px] border-solid border-[1px] border-Pink bg-White"
                    type="text"
                    id="search-input"
                    placeholder="min"
                    value={minSalary}
                    onChange={(e) => {
                      setMinSalary(e.target.value.replace(/[^0-9]/g, ""));
                    }}
                  />
                  <img
                    className="absolute top-2 left-1"
                    src={darkDollarIcon}
                    width={20}
                    height={20}
                  />
                </div>

                <span className="p-2 text-LightGray">-</span>

                <div className="relative">
                  <input
                    className="h-[36px] w-[102px] rounded-[8px] text-[14px] pl-[26px] border-solid border-[1px] border-Pink bg-White"
                    type="text"
                    id="search-input"
                    placeholder="max"
                    value={maxSalary}
                    onChange={(e) => {
                      setMaxSalary(e.target.value.replace(/[^0-9]/g, ""));
                    }}
                  />
                  <img
                    className="absolute top-2 left-1"
                    src={darkDollarIcon}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-12">
          <JobList
            text={text}
            minSalary={minSalary}
            maxSalary={maxSalary}
            category={category}
            type={type}
          />
        </div>
      </div>
    </div>
  );
}
export default FindThatJobPage;
