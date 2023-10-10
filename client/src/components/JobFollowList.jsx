import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.svg";
import typeIcon from "@/images/getthatjob-page/typeIcon.svg";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.svg";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";

const JobFollowingList = () => {
  const navigate = useNavigate();
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

  // UNFOLLOW LOGIC
  const handleUnfollow = async (event) => {
    const jobId = event;
    try {
      const data = {
        jobId: jobId,
      };
      await axios.post("http://localhost:4000/following/unfollowjob", data);
    } catch (error) {
      console.error("Error: unable to unfollow the job", error);
    }
    getJobFollow();
  };

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
  }, []);

  return (
    <div className="ml-[100px]">
      <div className="m-2">
        <h2 className="font-Montserrat text-DarkGray text-[20px]">
          {jobFollow ? (
            <span className="flex flex-row">
              You are following {jobFollow.length} jobs
            </span>
          ) : (
            <div>Loading...</div>
          )}
          {/* You are following {jobFollow.length} jobs */}
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-[12px]">
        {jobFollow.map((job) => {
          return (
            <div
              key={job.job_id}
              className="rounded-[8px] border-solid border-[1px] w-[290px] h-[170px] my-1 bg-White drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center"
            >
              <div className="flex flex-col justify-end items-center mx-1">
                <div className="flex flex-row mt-3">
                  <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] justify-center items-center mr-2">
                    <img src={job.company_logo} />
                  </div>
                  <div className="flex flex-col pr-1 py-2">
                    <div className="flex flex-row w-fit text-[14px] text-LightGray font-Inter">
                      <img className="pr-1" src={jobCategoryIcon} />
                      {job.category_name}
                    </div>
                    <div className="text-sclae-[20px] text-DarkGray">
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
