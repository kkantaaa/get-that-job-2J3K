import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import followIcon from "@/images/getthatjob-page/followIcon.svg";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.svg";
import typeIcon from "@/images/getthatjob-page/typeIcon.svg";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.svg";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";

const JobList = (props) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [appIds, setAppIds] = useState([]);
  const [jobFollowingIds, setJobFollowingIds] = useState([]);
  const keywords = props.text;
  const minSalary = props.minSalary;
  const maxSalary = props.maxSalary;
  const category = props.category;
  const type = props.type;

  const getJobs = async (input) => {
    const { keywords, minSalary, maxSalary, category, type } = input;
    try {
      const params = new URLSearchParams();
      params.append("keywords", keywords);
      params.append("minSalary", minSalary);
      params.append("maxSalary", maxSalary);
      params.append("category", category);
      params.append("type", type);
      const results = await axios.get("http://localhost:4000/jobs", {
        params,
      });

      setJobs(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch jobs data");
    }
  };

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
          className="mr-2 h-[40px] px-[8px] py-[8px] border-2 border-Pink rounded-[16px] bg-White text-Gray text-center text-[14px] tracking-[1.25px] font-Inter hover:bg-Pink hover:text-White"
          onClick={() => navigate(`/user/jobs/${jobId}`)}
        >
          SEE MORE
        </button>
      );
    }
  };

  const getJobFollowing = async () => {
    // console.log(`user id is ${userId}`);
    try {
      const results = await axios.get("http://localhost:4000/following/job");
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
  const handleFollow = async (event) => {
    // event.preventDefault();
    const jobId = event;
    // console.log(`user id : ${userId}`);
    console.log(`job id : ${jobId}`);
    try {
      const data = {
        jobId: jobId,
      };
      await axios.post("http://localhost:4000/following/followjob", data);
    } catch (error) {
      console.error("Error: unable to follow the job", error);
    }
    getJobFollowing();
  };

  // UNFOLLOW LOGIC
  const handleUnfollow = async (event) => {
    // event.preventDefault();
    const jobId = event;
    try {
      const data = {
        jobId: jobId,
      };
      await axios.post("http://localhost:4000/following/unfollowjob", data);
    } catch (error) {
      console.error("Error: unable to unfollow the job", error);
    }
    getJobFollowing();
  };

  // FOLLOW LOGIC
  const followButton = (jobId) => {
    const isFollowing = jobFollowingIds.includes(jobId);
    if (isFollowing) {
      return (
        <button className="flex flex-row">
          <div className="mx-1">
            <img src={pinkFollowIcon} />
          </div>
          {/* ใส่  LOGIC สหรับ UNFOLLOW */}
          <div className="pt-2 font-Inter">
            <button
              value={jobId}
              onClick={(event) => {
                handleUnfollow(event.target.value);
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
          {/* ใส่  LOGIC สหรับ FOLLOW */}
          <div className="pt-2 font-Inter">
            <button
              value={jobId}
              onClick={(event) => {
                handleFollow(event.target.value);
              }}
            >
              FOLLOW
            </button>
          </div>
        </button>
      );
    }
  };

  useEffect(() => {
    getJobs({ keywords, minSalary, maxSalary, category, type });
  }, [keywords, minSalary, maxSalary, category, type, jobFollowingIds]);

  useEffect(() => {
    getJobApp();
    getJobFollowing();
  }, []);

  return (
    <div className="ml-[100px]">
      <div className="m-2">
        <h2 className="font-Montserrat text-DarkGray text-[20px]">
          {jobs && jobs.length > 0 ? (
            <div>{jobs.length} jobs openings</div>
          ) : (
            <div>Loading...</div>
          )}
          {/* {jobs.length} jobs for you */}
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-[12px]">
        {/* ทำเงื่อนไขว่าถ้ามี user_id คู่กับ job_id ในตาราง application ให้ render ปุ่มสีชมพู */}
        {jobs.map((job) => {
          return (
            <div
              key={job.job_id}
              className="rounded-[8px] border-solid border-[1px] w-[290px] h-[170px] my-1 bg-White drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center"
            >
              {/* Job ID {job.job_id} */}
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
  );
};

export default JobList;
