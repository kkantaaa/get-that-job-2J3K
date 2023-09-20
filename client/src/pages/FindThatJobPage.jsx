import FindThatJobSideBar from "@/components/ProfessionalSideBar/FindThatJobSideBar.jsx";
import { CategorySelector } from "@/components/CategorySelector";
import { TypeSelector } from "@/components/TypeSelector";
import JobList from "@/components/JobList.jsx";
import searchIcon from "@/images/getthatjob-page/searchIcon.png";
import darkDollarIcon from "@/images/getthatjob-page/darkDollarIcon.png";
import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";

function FindThatJobPage() {
  const [text, setText] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  // const [categories, setCategories] = useState([]);
  // const [type, setType] = useState("");

  //สำหรับ categorySelector
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // console.log("this is selected category");
    // console.log(selectedCategory);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    // console.log("this is selected type");
    // console.log(selectedType);
  };

  //category/type Selector แบบไม่ใช้ shadcn*
  // const handleCategoryChange = (e) => {
  //   setSelectedCategory(e.target.value);
  // };
  // const handleTypeChange = (e) => {
  //   setType(e.target.value);
  // };

  // const getCategories = async () => {
  //   try {
  //     const results = await axios.get("http://localhost:4000/category");
  //     setCategories(results.data.result);
  //   } catch (error) {
  //     console.error("Error: Failed to fetch categories data");
  //   }
  // };

  // const getType = async () => {
  //   try {
  //     const results = await axios.get("http://localhost:4000/type");
  //     setType(results.data.result);
  //   } catch (error) {
  //     console.error("Error: Failed to fetch categories data");
  //   }
  // };

  // useEffect(() => {
  //   getCategories();
  //   getType();
  // }, []);

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

              <CategorySelector onCategoryChange={handleCategoryChange} />

              {/* Render categorySelector แบบไม่ใช้ shadcn*/}
              {/* <div>
                <select
                  className="h-[36px] w-[280px] rounded-[8px] text-LightGray text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category, key) => {
                    return (
                      <option value={category.category_name}>
                        {category.category_name}
                      </option>
                    );
                  })}
                </select>
              </div> */}
            </div>

            <div className="p-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="type-box"
              >
                TYPE
              </label>
              <TypeSelector onTypeChange={handleTypeChange} />
              {/* <div>
                <select
                  className="h-[36px] w-[280px] rounded-[8px] text-LightGray text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                  value={type}
                  onChange={handleTypeChange}
                >
                  <option value="">Select a type</option>
                  <option value="Full time">Full time</option>
                  <option value="Part time">Part time</option>
                </select>
              </div> */}
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
