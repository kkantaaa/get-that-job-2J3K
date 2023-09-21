import FindThatJobSideBar from "@/components/ProfessionalSideBar/FindThatJobSideBar.jsx";
import { CategorySelector } from "@/components/CategorySelector";
import { TypeSelector } from "@/components/TypeSelector";
import JobList from "@/components/JobList.jsx";
import searchIcon from "@/images/getthatjob-page/searchIcon.svg";
import darkDollarIcon from "@/images/getthatjob-page/darkDollarIcon.svg";
import { useState } from "react";

function FindThatJobPage() {
  const [text, setText] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-row bg-Background">
      <FindThatJobSideBar />
      <div className="flex flex-col w-full ml-[240px] mb-12 bg-Background">
        <div className="w-full pt-8 flex flex-col justify-start items-start">
          <div className="mb-[16px] ml-[96px] text-DarkGray font-Montserrat text-Headline3 font-light">
            Find that job
          </div>
          <div className="flex flex-col ml-[96px]">
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
              <img className="absolute top-2 left-1.5" src={searchIcon} />
            </div>
          </div>
          <div className="flex flew-row ml-[96px]">
            <div className="py-2 pr-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="category-box"
              >
                CATEGORY
              </label>
              <CategorySelector onCategoryChange={handleCategoryChange} />
            </div>

            <div className="p-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="type-box"
              >
                TYPE
              </label>
              <TypeSelector onTypeChange={handleTypeChange} />
            </div>

            <div className="p-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="salary-box"
              >
                SALARY RANGE
              </label>
              <div className="flex flex-row">
                <div className="relative">
                  <input
                    className="h-[36px] w-[102px] rounded-[8px] text-[14px] pl-[26px] border-solid border-[1px] border-Pink bg-White"
                    type="text"
                    id="min-salary-input"
                    placeholder="min"
                    value={minSalary}
                    onChange={(e) => {
                      setMinSalary(e.target.value.replace(/[^0-9]/g, ""));
                    }}
                  />
                  <img className="absolute top-2 left-1" src={darkDollarIcon} />
                </div>

                <span className="p-2 text-LightGray">-</span>

                <div className="relative">
                  <input
                    className="h-[36px] w-[102px] rounded-[8px] text-[14px] pl-[26px] border-solid border-[1px] border-Pink bg-White"
                    type="text"
                    id="max-salary-input"
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
            category={selectedCategory}
            type={selectedType}
            minSalary={minSalary}
            maxSalary={maxSalary}
          />
        </div>
      </div>
    </div>
  );
}
export default FindThatJobPage;
