import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/authentication";
import FollowingSideBar from "@/components/ProfessionalSideBar/FollowingSideBar.jsx";
import FollowingStatus from "../images/job-detail-page/FollowButton.svg";
import ArrowLeft from "../images/job-detail-page/arrow-left-black.svg";
import followIcon from "@/images/getthatjob-page/followIcon.svg";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.svg";
import typeIcon from "@/images/getthatjob-page/typeIcon.svg";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.svg";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";

function CompanyJobPage() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  // const [jobDetail, setJobDetail] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [appIds, setAppIds] = useState([]);
  const [jobFollowingIds, setJobFollowingIds] = useState([]);
  const { recruiter_id } = useParams();

  const getCompanyJobs = async () => {
    try {
      // console.log(recruiter_id); = 83 OK
      const results = await axios.get(
        `http://localhost:4000/following/companyjob/${recruiter_id}`
      );
      // console.log(results.data.data);
      setCompanyJobs(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch jobs data");
    }
  };

  useEffect(() => {
    getCompanyJobs();
  }, []);

  // const getJobDetail = async () => {
  //   try {
  //     const result = await axios.get(`http://localhost:4000/jobs/${job_id}`);
  //     console.log(result.data.data);
  //     setJobDetail(result.data.data);
  //   } catch (error) {
  //     console.error(
  //       "Error: Failed to fetch job data for job_id:",
  //       job_id,
  //       error
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getJobDetail();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [job_id]);

  // const handleJobApplication = (event) => {
  //   event.preventDefault();
  //   navigate(`/user/jobs/apply/${job_id}`);
  // };

  // const createdAt = moment(jobDetail.opened_at).fromNow();

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

  const followButton = (jobId) => {
    const isFollowing = jobFollowingIds.includes(jobId);
    if (isFollowing) {
      return (
        <button className="flex flex-row">
          <div className="mx-1">
            <img src={pinkFollowIcon} />
          </div>
          <div className="pt-2 font-Inter">FOLLOWING</div>
        </button>
      );
    } else {
      return (
        <button className="flex flex-row pr-4">
          <div className="mx-0">
            <img src={followIcon} />
          </div>
          <div className="pt-2 font-Inter">FOLLOW</div>
        </button>
      );
    }
  };

  useEffect(() => {
    getJobApp(userData.user.user_id);
    getJobFollowing(userData.user.user_id);
  }, []);
  console.log(`companyjob[0]`);
  // console.log(companyJobs[0].company_name);
  console.log(companyJobs[0]);
  // const companyLogo = companyJobs[0].company_logo;
  // const companyName = companyJobs[0].company_name;

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
                // onClick={() => navigate("/user/following")}
              >
                Back
              </p>
            </div>

            {/* Section 1: Company Logo / Info / Apply Button1 */}
            <div className="mt-[16px]">
              <div className="flex flex-row">
                <div className="flex flex-row">
                  <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
                    <img src={companyJobs[0].company_logo} />
                  </div>
                  <div className="ml-[16px] flex flex-col">
                    <div className="font-Montserrat text-[24px] font-normal leading-normal">
                      {companyJobs[0].company_name}
                    </div>
                    <img
                      className="w-[138px] h-[40px]"
                      src={FollowingStatus}
                      alt="following-button"
                    />
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
              <div className="grid lg:grid-cols-2 gap-2 xl:grid-cols-3 2xl:grid-cols-4">
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
                            <div className="">{job.job_title}</div>
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
                            {followButton(job.job_id)}
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
