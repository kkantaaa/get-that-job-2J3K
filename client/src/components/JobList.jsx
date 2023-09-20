import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import followIcon from "@/images/getthatjob-page/followIcon.svg";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.svg";
import typeIcon from "@/images/getthatjob-page/typeIcon.svg";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.svg";

const JobList = (props) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const keywords = props.text;
  const minSalary = props.minSalary;
  const maxSalary = props.maxSalary;
  const category = props.category;
  const type = props.type;

  // console.log(`category from joblist : ${category}`);

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

      // console.log("Jobs from server");
      // console.log(results.data.data);
      setJobs(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch jobs data");
    }
  };

  useEffect(() => {
    getJobs({ keywords, minSalary, maxSalary, category, type });
  }, [keywords, minSalary, maxSalary, category, type]);

  return (
    <div className="ml-12">
      <div className="m-2 text-[18px]">
        <h2 className="font-Montserrat">{jobs.length} jobs for you</h2>
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
                  <div className="pr-2 py-2">
                    <button className="flex flex-row font-Inter">
                      {/* <img className="" src={followIcon} /> */}
                      <div className="mx-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_3973_554)">
                            <path
                              d="M13 1L13.001 4.062C14.7632 4.28479 16.4013 5.08743 17.6572 6.34351C18.9131 7.5996 19.7155 9.23775 19.938 11H23V13L19.938 13.001C19.7153 14.7631 18.9128 16.401 17.6569 17.6569C16.401 18.9128 14.7631 19.7153 13.001 19.938L13 23H11V19.938C9.23775 19.7155 7.5996 18.9131 6.34351 17.6572C5.08743 16.4013 4.28479 14.7632 4.062 13.001L1 13V11H4.062C4.28459 9.23761 5.08713 7.59934 6.34324 6.34324C7.59934 5.08713 9.23761 4.28459 11 4.062V1H13ZM12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12C18 10.4087 17.3679 8.88258 16.2426 7.75736C15.1174 6.63214 13.5913 6 12 6ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10Z"
                              fill="#616161"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3973_554">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      FOLLOW
                    </button>
                  </div>
                  <div className="px-2">
                    <button
                      className="mr-2 h-[40px] px-[8px] py-[6px] border-2 border-Pink rounded-[16px] text-Gray text-center text-[14px] tracking-[1.25px] font-Inter"
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
