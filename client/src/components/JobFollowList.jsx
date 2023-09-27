import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/authentication";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.svg";
import typeIcon from "@/images/getthatjob-page/typeIcon.svg";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.svg";
// import followIcon from "@/images/getthatjob-page/followIcon.svg";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";

const JobFollowingList = (props) => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [appIds, setAppIds] = useState([]);
  const jobs = props.data;

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

  useEffect(() => {
    getJobApp(userData.user.user_id);
  }, []);

  return (
    <div className="ml-[120px]">
      <div className="m-2 text-[18px]">
        <h2 className="font-Montserrat">
          You are following {jobs.length} jobs
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-2 xl:grid-cols-3 2xl:grid-cols-4">
        {jobs.map((job) => {
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
                  <div className="hover:text-Pink">
                    <button className="flex flex-row font-Inter">
                      <div className="mx-1">
                        <img src={pinkFollowIcon} />
                      </div>
                      <div className="pt-2">FOLLOWING</div>
                    </button>
                  </div>
                  <div className="pl-4">{seemoreButton(job.job_id)}</div>
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
