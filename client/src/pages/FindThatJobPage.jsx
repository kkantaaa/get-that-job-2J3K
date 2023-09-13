import ProfessionalSidebar from "@/components/ProfessionalSidebar.jsx";
// import searchline from "@/images/findthatjob-page/search-line.png";
import { CategorySelector } from "@/components/CategorySelector";
import { TypeSelector } from "@/components/TypeSelector";
import JobList from "@/components/JobList.jsx";

function FindThatJobPage() {
  return (
    <div className="w-full flex flex-row justify-spacearound">
      <ProfessionalSidebar />
      <div className="flex flex-col w-full bg-Background">
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
            <input
              className="h-[36px] w-[360px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
              type="text"
              id="search-input"
              placeholder="manufacturing, sales, swim"
            />
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
              {/* <input
              className="h-[36px] w-[280px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
              type="text"
              id="search-input"
              placeholder="Select a category"
            /> */}
            </div>
            <div className="p-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="search-box"
              >
                TYPE
              </label>
              <TypeSelector />
              {/* <input
              className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
              type="text"
              id="search-input"
              placeholder="Select a type"
            /> */}
            </div>
            <div className="p-2 flex flex-col">
              <label
                className="w-fit text-[10px] text-LightGray"
                htmlFor="search-box"
              >
                SALARY RANGE
              </label>
              <div className="">
                <input
                  className="h-[36px] w-[102px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                  type="text"
                  id="search-input"
                  placeholder="min"
                />
                <span className="p-2 text-LightGray">-</span>
                <input
                  className="h-[36px] w-[102px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                  type="text"
                  id="search-input"
                  placeholder="max"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Render Jobs List Compentent here*/}
        <div className="mx-12">
          <JobList />
        </div>
      </div>
    </div>
  );
}
export default FindThatJobPage;
