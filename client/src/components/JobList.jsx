import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import followIcon from "@/images/getthatjob-page/followIcon.png";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.png";
import typeIcon from "@/images/getthatjob-page/typeIcon.png";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.png";

const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { control, handleSubmit, setValue } = useForm(); //ต้องใช้ไหม

  const getJobs = async () => {
    const jobDataFromServer = await axios.get("http://localhost:4000/jobs");
    // console.log("Jobs from server");
    // console.log(jobDataFromServer.data.data);
    setJobs(jobDataFromServer.data.data);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="">
      <div className="m-2 text-[18px]">
        <h2 className="">{jobs.length} jobs for you</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        {jobs.map((job) => {
          return (
            <div
              key={job.job_id}
              className="rounded-[8px] border-solid border-[1px] bg-White drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center"
            >
              <div className="flex flex-col justify-center items-center m-2">
                <div className="flex flex-row mt-2">
                  <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center">
                    LOGO
                  </div>
                  <div className="flex flex-col p-2">
                    <div className="flex flex-row w-fit text-[14px] text-LightGray">
                      <img src={jobCategoryIcon} />
                      {job.job_category}
                    </div>
                    <div className="">{job.job_title}</div>
                    <div className="text-[15px] text-Gray">
                      The company name id : {job.company_id}
                    </div>
                    <div className="flex flex-row">
                      <div className="flex flex-row text-LightGray">
                        <img src={typeIcon} />
                        {/* {job.job_type_id} */}
                        Full-time
                      </div>
                      <div className="flex flex-row text-LightGray">
                        <img className="" src={dollarIcon} />
                        {(job.salary_min / 1000).toFixed(1)}k -
                        {(job.salary_max / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="pr-2 py-2">
                    <button className="flex flex-row">
                      <img className="px-2" src={followIcon} />
                      FOLLOW
                    </button>
                  </div>
                  <div className="px-2 pb-2">
                    <button
                      className="mr-[16px] h-[40px] px-[8px] py-[6px] border-2 border-Pink rounded-[16px] text-Gray text-center text-[14px] tracking-[1.25px]"
                      onClick={() => navigate(`/user/jobs/${job.job_id}`)}
                    >
                      SEE MORE
                    </button>
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
