import FollowingSideBar from "@/components/ProfessionalSideBar/FollowingSideBar";
// import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useAuth } from "@/contexts/authentication";
import axios from "axios";
import JobFollowingList from "@/components/JobFollowList";
import CompanyFollowingList from "@/components/CompanyFollowList";

function FollowingPage() {
  // const { userData } = useAuth();
  const [jobFollow, setJobFollow] = useState([]);
  const [companyFollow, setCompanyFollow] = useState([]);

  const getJobFollow = async () => {
    // console.log(userId);
    try {
      const results = await axios.get("http://localhost:4000/following/job");
      //   console.log(results.data.data);
      //   const followJobIds = results.data.data.map((obj) => {
      //     return obj.job_id;
      //   });
      //   setJobFollow(followJobIds);
      setJobFollow(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch job following", error);
    }
  };

  const getCompanyFollow = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/following/companyinfo`
      );
      setCompanyFollow(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch company following", error);
    }
  };

  useEffect(() => {
    getCompanyFollow();
  }, [companyFollow]);

  useEffect(() => {
    getJobFollow();
  }, [jobFollow]);

  return (
    <div className="min-w-screen min-h-screen flex flex-row bg-Background">
      <FollowingSideBar />
      <h1 className="ml-[240px] bg-Background">
        <div className="w-full pt-8 flex flex-col justify-start items-start">
          <div className="mb-[16px] ml-[120px] text-DarkGray font-Montserrat text-Headline3 font-light">
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
