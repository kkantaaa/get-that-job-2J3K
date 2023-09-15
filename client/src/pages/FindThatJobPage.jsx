import FindThatJobSideBar from "@/components/ProfessionalSideBar/FindThatJobSideBar.jsx";
import { CategorySelector } from "@/components/CategorySelector";
import { TypeSelector } from "@/components/TypeSelector";
import JobList from "@/components/JobList.jsx";
import searchIcon from "@/images/getthatjob-page/searchIcon.png";
import darkDollarIcon from "@/images/getthatjob-page/darkDollarIcon.png";
import { useState } from "react";

function FindThatJobPage() {
  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    const text = event.target.value;
    setText(text);
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
                onChange={handleInputChange}
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
                htmlFor="search-box"
              >
                CATEGORY
              </label>
              <CategorySelector />
            </div>
            <div className="p-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="search-box"
              >
                TYPE
              </label>
              <TypeSelector />
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
          <JobList value={text} />
        </div>
      </div>
    </div>
  );
}
export default FindThatJobPage;
