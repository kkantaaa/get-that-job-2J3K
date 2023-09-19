import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import followIcon from "@/images/getthatjob-page/followIcon.png";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.png";
import typeIcon from "@/images/getthatjob-page/typeIcon.png";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.png";
import testLogo from "@/images/getthatjob-page/Baby.png";

const JobList = (props) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const keywords = props.text;
  const minSalary = props.minSalary;
  const maxSalary = props.maxSalary;

  const getJobs = async (input) => {
    const { keywords, minSalary, maxSalary } = input;
    try {
      const params = new URLSearchParams();
      params.append("keywords", keywords);
      params.append("minSalary", minSalary);
      params.append("maxSalary", maxSalary);
      const results = await axios.get("http://localhost:4000/jobs", {
        params,
      });

      console.log("Jobs from server");
      console.log(results.data.data);
      setJobs(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch jobs data");
    }
  };

  useEffect(() => {
    getJobs({ keywords, minSalary, maxSalary });
  }, [keywords, minSalary, maxSalary]);

  return (
    <div className="ml-12">
      <div className="m-2 text-[18px]">
        <h2 className="font-Montserrat">{jobs.length} jobs for you</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {jobs.map((job) => {
          return (
            <div
              key={job.job_id}
              className="rounded-[8px] border-solid border-[1px] w-[320px] bg-White drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center"
            >
              <div className="flex flex-col justify-end items-center mt-2 mx-2">
                <div className="flex flex-row mt-2">
                  <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] justify-center items-center mr-4">
                    <img src={job.company_logo} />
                  </div>
                  <div className="flex flex-col p-2">
                    <div className="flex flex-row w-fit text-[14px] text-LightGray">
                      <img src={jobCategoryIcon} />
                      {job.category_name}
                    </div>
                    <div className="">{job.job_title}</div>
                    <div className="text-[15px] text-Gray">
                      {job.company_name}
                    </div>
                    <div className="flex flex-row">
                      <div className="flex flex-row text-LightGray">
                        <img src={typeIcon} />
                        {job.type_name}
                      </div>
                      <div className="flex flex-row text-LightGray">
                        <img className="" src={dollarIcon} />
                        {(job.salary_min / 1000).toFixed(1)}k -
                        {(job.salary_max / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row pb-2">
                  <div className="pr-2 py-2">
                    <button className="flex flex-row">
                      <img className="" src={followIcon} />
                      FOLLOW
                    </button>
                  </div>
                  <div className="px-2">
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
