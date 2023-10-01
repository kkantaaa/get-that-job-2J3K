import FollowingSideBar from "@/components/ProfessionalSideBar/FollowingSideBar";
import JobFollowingList from "@/components/JobFollowList";
import CompanyFollowingList from "@/components/CompanyFollowList";

function FollowingPage() {
  return (
    <div className="min-w-screen min-h-screen flex flex-row bg-Background">
      <FollowingSideBar />
      <h1 className="ml-[240px] bg-Background">
        <div className="w-full pt-8 flex flex-col justify-start items-start">
          <div className="mb-[16px] ml-[100px] text-DarkGray font-Montserrat text-Headline4">
            Following
          </div>
          <div className="mb-[16px]">
            <JobFollowingList />
          </div>
        </div>
        <div>
          <CompanyFollowingList />
        </div>
      </h1>
    </div>
  );
}

export default FollowingPage;
