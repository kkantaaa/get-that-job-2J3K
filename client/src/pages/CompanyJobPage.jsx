import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/authentication";
import FollowingSideBar from "@/components/ProfessionalSideBar/FollowingSideBar.jsx";
import ArrowLeft from "../images/job-detail-page/arrow-left-black.svg";
import followIcon from "@/images/getthatjob-page/followIcon.svg";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.svg";
import typeIcon from "@/images/getthatjob-page/typeIcon.svg";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.svg";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";

function CompanyJobPage() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { recruiter_id } = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [appIds, setAppIds] = useState([]);
  const [jobFollowingIds, setJobFollowingIds] = useState([]);
  const [companyFollowIds, setCompanyFollowIds] = useState([]);

  const getCompanyJobs = async () => {
    //
    try {
      // console.log(recruiter_id); = 83 รับ recruiter_id มาจากหน้าก่อนหน้า ได้
      const results = await axios.get(
        `http://localhost:4000/following/companyjob/${recruiter_id}`
      );
      // console.log(results.data.data);
      setCompanyJobs(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch jobs data");
    }
  };

  const getJobApp = async (input) => {
    const userId = input;
    // console.log(`user id is ${userId}`);
    try {
      const params = new URLSearchParams();
      params.append("userId", userId);
      const results = await axios.get("http://localhost:4000/jobapp", {
        params,
      });

      const jobIds = results.data.data.map((obj) => {
        return obj.job_id;
      });
      setAppIds(jobIds);
      // console.log(appIds);
    } catch (error) {
      console.error("Error: unable to get the job application data", error);
    }
  };

  const seemoreButton = (jobId) => {
    const isApplied = appIds.includes(jobId); //set job_id
    if (isApplied) {
      return (
        <button className="mr-2 h-[40px] px-[8px] py-[6px] border-2 border-BackgroundDark rounded-[16px] bg-BackgroundDark text-Gray text-center text-[14px] tracking-[1.25px] font-Inter">
          APPLIED
        </button>
      );
    } else {
      return (
        <button
          className="mr-2 h-[40px] px-[8px] py-[8px] border-2 border-Pink rounded-[16px] bg-White text-Gray text-center text-[14px] tracking-[1.25px] font-Inter hover:bg-Pink hover:text-White"
          onClick={() => navigate(`/user/jobs/${jobId}`)}
        >
          SEE MORE
        </button>
      );
    }
  };

  const getJobFollowing = async (input) => {
    const userId = input;
    // console.log(`user id is ${userId}`);
    try {
      const params = new URLSearchParams();
      params.append("userId", userId);
      const results = await axios.get("http://localhost:4000/following/job", {
        params,
      });
      // console.log(results.data.data);
      const jobFollowingIds = results.data.data.map((obj) => {
        return obj.job_id;
      });
      // console.log(jobFollowingIds);
      setJobFollowingIds(jobFollowingIds);
    } catch (error) {
      console.error("Error: unable to get the job following data", error);
    }
  };

  // FOLLOW LOGIC
  const handleJobFollow = async (event) => {
    // event.preventDefault();
    const userId = userData.user.user_id;
    const jobId = event;
    console.log(`user id : ${userId}`);
    console.log(`job id : ${jobId}`);
    try {
      const data = {
        userId: userId,
        jobId: jobId,
      };
      // const params = new URLSearchParams();
      // params.append("userId", userId);
      // params.append("jobId", jobId);
      await axios.post("http://localhost:4000/following/followjob", data);
    } catch (error) {
      console.error("Error: unable to follow the job", error);
    }
    getJobFollowing(userData.user.user_id);
  };

  // UNFOLLOW LOGIC
  const handleJobUnfollow = async (event) => {
    // event.preventDefault();
    const userId = userData.user.user_id;
    const jobId = event;
    try {
      const data = {
        userId: userId,
        jobId: jobId,
      };
      // const params = new URLSearchParams();
      // params.append("userId", userId);
      // params.append("jobId", jobId);
      await axios.post("http://localhost:4000/following/unfollowjob", data);
    } catch (error) {
      console.error("Error: unable to unfollow the job", error);
    }
    getJobFollowing(userData.user.user_id);
  };

  const jobFollowButton = (jobId) => {
    const isFollowing = jobFollowingIds.includes(jobId);
    if (isFollowing) {
      return (
        <button className="flex flex-row">
          <div className="mx-1">
            <img src={pinkFollowIcon} />
          </div>
          <div className="pt-2 font-Inter">
            <button
              value={jobId}
              onClick={(event) => {
                handleJobUnfollow(event.target.value); //รับค่า jobId ได้ OK
              }}
            >
              FOLLOWING
            </button>
          </div>
        </button>
      );
    } else {
      return (
        <button className="flex flex-row pr-4">
          <div className="mx-0">
            <img src={followIcon} />
          </div>
          <div className="pt-2 font-Inter">
            <button
              value={jobId}
              onClick={(event) => {
                handleJobFollow(event.target.value); //รับค่า jobId ได้ OK
              }}
            >
              FOLLOW
            </button>
          </div>
        </button>
      );
    }
  };

  const getCompanyFollow = async () => {
    const userId = userData.user.user_id;
    try {
      const params = new URLSearchParams();
      params.append("userId", userId);
      const results = await axios.get(
        `http://localhost:4000/following/companyinfo`,
        {
          params,
        }
      );
      const companyFollowIds = results.data.data.map((obj) => {
        return obj.recruiter_id;
      });
      setCompanyFollowIds(companyFollowIds);
    } catch (error) {
      console.error("Error: Failed to fetch company following", userId, error);
    }
  };

  const companyFollowButton = (recruiterId) => {
    const isFollowing = companyFollowIds.includes(recruiterId);
    if (isFollowing) {
      return (
        <button className="flex flex-row">
          <div className="mx-1">
            <img src={pinkFollowIcon} />
          </div>
          <div className="pt-2 font-Inter">
            <button
              value={recruiterId}
              onClick={(event) => {
                handleCompanyUnfollow(event.target.value);
              }}
            >
              FOLLOWING
            </button>
          </div>
        </button>
      );
    } else {
      return (
        <button className="flex flex-row pr-4">
          <div className="mx-0">
            <img src={followIcon} />
          </div>
          <div className="pt-2 font-Inter">
            <button
              value={recruiterId}
              onClick={(event) => {
                handleCompanyFollow(event.target.value);
              }}
            >
              FOLLOW
            </button>
          </div>
        </button>
      );
    }
  };

  // FOLLOW LOGIC
  const handleCompanyFollow = async (event) => {
    const userId = userData.user.user_id;
    const recruiterId = event;
    console.log(`user id : ${userId}`);
    console.log(`job id : ${recruiterId}`);
    try {
      const data = {
        userId: userId,
        recruiterId: recruiterId,
      };
      await axios.post("http://localhost:4000/following/followcompany", data);
    } catch (error) {
      console.error("Error: unable to follow the company", error);
    }
    getCompanyFollow(userData.user.user_id);
  };

  // UNFOLLOW LOGIC
  const handleCompanyUnfollow = async (event) => {
    const userId = userData.user.user_id;
    const recruiterId = event;
    try {
      const data = {
        userId: userId,
        recruiterId: recruiterId,
      };
      await axios.post("http://localhost:4000/following/unfollowcompany", data);
    } catch (error) {
      console.error("Error: unable to unfollow the company", error);
    }
    getCompanyFollow(userData.user.user_id);
  };

  useEffect(() => {
    getCompanyFollow();
  }, [companyFollowIds]);

  useEffect(() => {
    getCompanyJobs();
    getJobApp(userData.user.user_id);
    getJobFollowing(userData.user.user_id);
  }, []);

  // const companyLogo = companyJobs[0].company_logo;
  // const companyName = companyJobs[0].company_name;

  // {
  //   companyJobs && companyJobs.length > 0 ? (
  //     <div className="flex flex-row">{companyJobs[0].company_name}</div>
  //   ) : (
  //     <div>Loading...</div>
  //   );
  // }

  return (
    <>
      <div className="bg-Background overflow-x-hidden min-w-screen min-h-screen">
        <div className="flex flex-row font-Inter text-[16px]">
          <FollowingSideBar />

          <div className="ml-[350px] mt-[32px] wrapper overflow-x-auto">
            {/* BackButton */}
            <div className="flex flex-row">
              <img src={ArrowLeft} alt="arrow-left-black-icon" />
              <p
                className="uppercase cursor-pointer"
                onClick={() => navigate("/user/following")}
              >
                Back
              </p>
            </div>

            {/* Section 1: Company Logo / Info / Apply Button1 */}
            <div className="mt-[16px]">
              <div className="flex flex-row">
                <div className="flex flex-row">
                  <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
                    {companyJobs && companyJobs.length > 0 ? (
                      <div className="flex flex-row">
                        <img src={companyJobs[0].company_logo} />
                      </div>
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                  <div className="ml-[16px] flex flex-col">
                    <div className="font-Montserrat text-[24px] font-normal leading-normal">
                      {/* {companyJobs[0].company_name} */}
                      {companyJobs && companyJobs.length > 0 ? (
                        <div className="flex flex-row">
                          {companyJobs[0].company_name}
                        </div>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </div>
                    <div className="text-Gray hover:text-Pink">
                      {companyFollowButton(recruiter_id)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Job Rendering */}
            <div className="">
              {/* User ID {userData.user.user_id} */}
              <div className="m-2 text-[18px]">
                <h2 className="font-Montserrat">
                  {companyJobs.length} jobs for you
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
                {companyJobs.map((job) => {
                  return (
                    <div
                      key={job.job_id}
                      className="rounded-[8px] border-solid border-[1px] w-[290px] h-[170px] my-1 bg-White drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center"
                    >
                      {/* Job ID {job.job_id} */}
                      <div className="flex flex-col justify-end items-center mx-1">
                        <div className="flex flex-row mt-3">
                          <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] justify-center items-center mr-4">
                            <img src={job.company_logo} />
                          </div>
                          <div className="flex flex-col p-2">
                            <div className="flex flex-row w-fit text-[14px] text-LightGray font-Inter">
                              <img className="pr-1" src={jobCategoryIcon} />
                              {job.category_name}
                            </div>
                            <div className="text-scale-[16px]">
                              {job.job_title.slice(0, 20)}
                            </div>
                            <div className="text-[15px] text-Gray">
                              {job.company_name}
                            </div>
                            <div className="flex flex-row">
                              <div className="flex flex-row pr-1 text-LightGray text-[12px] font-Inter">
                                <img className="mr-1" src={typeIcon} />
                                {job.type_name}
                              </div>
                              <div className="flex flex-row pl-1 text-LightGray text-[12px] font-Inter">
                                <img className="mx-1" src={dollarIcon} />
                                {(job.salary_min / 1000).toFixed(1)}k -
                                {(job.salary_max / 1000).toFixed(1)}k
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="text-Gray text-[14px] hover:text-Pink">
                            {jobFollowButton(job.job_id)}
                          </div>
                          <div className="pl-4 text-[14px]">
                            {seemoreButton(job.job_id)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyJobPage;
