import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "@/contexts/authentication";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.svg";
import typeIcon from "@/images/getthatjob-page/typeIcon.svg";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.svg";
import followIcon from "@/images/getthatjob-page/followIcon.svg";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";

const JobFollowingList = () => {
  const navigate = useNavigate();
  // const { userData } = useAuth();
  const [appIds, setAppIds] = useState([]);
  const [jobFollow, setJobFollow] = useState([]);

  const getJobApp = async () => {
    // console.log(`user id is ${userId}`);
    try {
      const results = await axios.get("http://localhost:4000/jobapp");

      const jobIds = results.data.data.map((obj) => {
        return obj.job_id;
      });
      setAppIds(jobIds);
      // console.log(appIds);
    } catch (error) {
      console.error("Error: unable to get the job application data", error);
    }
  };

  // FOLLOW LOGIC
  // const handleFollow = async (event) => {
  //   // event.preventDefault();
  //   const userId = userData.user.user_id;
  //   const jobId = event;
  //   console.log(`user id : ${userId}`);
  //   console.log(`job id : ${jobId}`);
  //   try {
  //     const data = {
  //       userId: userId,
  //       jobId: jobId,
  //     };
  //     // const params = new URLSearchParams();
  //     // params.append("userId", userId);
  //     // params.append("jobId", jobId);
  //     await axios.post("http://localhost:4000/following/followjob", data);
  //   } catch (error) {
  //     console.error("Error: unable to follow the job", error);
  //   }
  //   // getJobFollowing(userData.user.user_id);
  // };

  // UNFOLLOW LOGIC
  const handleUnfollow = async (event) => {
    const jobId = event;
    try {
      const data = {
        jobId: jobId,
      };
      // const params = new URLSearchParams();
      // params.append("userId", userId);
      // params.append("jobId", jobId);
      await axios.post("http://localhost:4000/following/unfollowjob", data);
    } catch (error) {
      console.error("Error: unable to unfollow the job", error);
    }
    getJobFollow();
  };

  // const followButton = (jobId) => {
  //   const isFollowing = jobFollow.includes(jobId);
  //   if (isFollowing) {
  //     return (
  //       <button className="flex flex-row">
  //         <div className="mx-1">
  //           <img src={pinkFollowIcon} />
  //         </div>
  //         {/* ใส่  LOGIC สหรับ UNFOLLOW */}
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <button className="flex flex-row pr-4">
  //         <div className="mx-0">
  //           <img src={followIcon} />
  //         </div>
  //         {/* ใส่  LOGIC สหรับ FOLLOW */}
  //         <div className="pt-2 font-Inter">
  //           <button
  //             value={jobId}
  //             onClick={(event) => {
  //               handleFollow(event.target.value); //รับค่า jobId ได้ OK
  //             }}
  //           >
  //             FOLLOW
  //           </button>
  //         </div>
  //       </button>
  //     );
  //   }
  // };

  const seemoreButton = (jobId) => {
    const isApplied = appIds.includes(jobId);
    if (isApplied) {
      return (
        <button className="mr-2 h-[40px] px-[8px] py-[6px] border-2 border-BackgroundDark rounded-[16px] bg-BackgroundDark text-Gray text-center text-[14px] tracking-[1.25px] font-Inter">
          APPLIED
        </button>
      );
    } else {
      return (
        <button
          className="mr-2 h-[40px] px-[8px] py-[6px] border-2 border-Pink rounded-[16px] bg-White text-Gray text-center text-[14px] tracking-[1.25px] font-Inter hover:bg-Pink hover:text-White"
          onClick={() => navigate(`/user/jobs/${jobId}`)}
        >
          SEE MORE
        </button>
      );
    }
  };

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

  useEffect(() => {
    getJobApp();
  }, []);

  useEffect(() => {
    getJobFollow();
  }, [jobFollow]);

  return (
    <div className="ml-[120px]">
      <div className="m-2 text-[18px]">
        <h2 className="font-Montserrat">
          You are following {jobFollow.length} jobs
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        {jobFollow.map((job) => {
          return (
            <div
              key={job.job_id}
              className="rounded-[8px] border-solid border-[1px] w-[290px] h-[170px] my-1 bg-White drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center"
            >
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
                      {job.job_title.slice(0, 23)}
                    </div>
                    <div className="text-[14px] text-Gray">
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
                    <button
                      className="flex flex-row font-Inter"
                      onClick={() => {
                        handleUnfollow(job.job_id); //รับค่า jobId ได้ OK
                      }}
                    >
                      <div className="mx-1">
                        <img src={pinkFollowIcon} />
                      </div>
                      <div className="pt-2 text-[14px]">FOLLOWING</div>
                    </button>
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
  );
};

export default JobFollowingList;
