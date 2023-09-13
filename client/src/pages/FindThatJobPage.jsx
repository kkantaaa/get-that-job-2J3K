import ProfessionalSidebar from "@/components/ProfessionalSidebar.jsx";
// import searchline from "@/images/findthatjob-page/search-line.png";

function FindThatJobPage() {
  return (
    <div className="w-full flex  flex-row justify-spacearound">
      <ProfessionalSidebar />
      <div className="w-full px-12 py-6 flex flex-col justify-start items-start">
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
          <div className="flex flex-col">
            <label
              className="w-fit text-[10px] text-LightGray"
              htmlFor="search-box"
            >
              CATEGORY
            </label>
            <input
              className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
              type="text"
              id="search-input"
              placeholder="Select a category"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="w-fit text-[10px] text-LightGray"
              htmlFor="search-box"
            >
              TYPE
            </label>
            <input
              className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
              type="text"
              id="search-input"
              placeholder="Select a type"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="w-fit text-[10px] text-LightGray"
              htmlFor="search-box"
            >
              SALARY RANGE
            </label>
            <div>
              <input
                className="h-[36px] w-[102px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                type="text"
                id="search-input"
                placeholder="min"
              />
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
    </div>
  );
}
export default FindThatJobPage;
