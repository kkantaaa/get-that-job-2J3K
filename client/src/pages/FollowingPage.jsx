import FollowingSideBar from "@/components/ProfessionalSideBar/FollowingSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authentication";
import axios from "axios";

function FollowingPage() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [jobFollow, setJobFollow] = useState([]);
  const [companyFollow, setCompanyFollow] = useState([]);

  const getJobFollow = async (input) => {
    const userId = input;
    // console.log(userId);
    try {
      const params = new URLSearchParams();
      params.append("userId", userId);
      const results = await axios.get("http://localhost:4000/following/job", {
        params,
      });
      //   console.log(results.data.data);
      //   const followJobIds = results.data.data.map((obj) => {
      //     return obj.job_id;
      //   });
      //   setJobFollow(followJobIds);
      setJobFollow(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch job following", userId, error);
    }
  };

  //   const getCompanyFollow = async (input) => {
  //     const userId = input;
  //     try {
  //       const params = new URLSearchParams();
  //       params.append("userId", userId);
  //       const results = await axios.get(`http://localhost:4000/follow/company`, {
  //         params,
  //       });
  //       console.log(results.data.data);
  //       setCompanyFollow(results.data.data);
  //     } catch (error) {
  //       console.error("Error: Failed to fetch company following", job_id, error);
  //     }
  //   };

  useEffect(() => {
    getJobFollow(userData.user.user_id);
    //   getCompanyFollow(userData.user.user_id);
  }, []);

  return (
    <div className="min-w-screen min-h-screen flex flex-row bg-Background">
      <FollowingSideBar />
      <h1 className="ml-[240px] bg-Background">
        <div className="w-full pt-8 flex flex-col justify-start items-start">
          <div className="mb-[16px] ml-[96px] text-DarkGray font-Montserrat text-Headline3 font-light">
            Following
          </div>
          <div>
            <JobFollowList data={data} />
          </div>
        </div>
      </h1>
    </div>
  );
}

export default FollowingPage;
