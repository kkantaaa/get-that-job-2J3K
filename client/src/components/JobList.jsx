import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const { control, handleSubmit, setValue } = useForm(); //ต้องใช้ไหม

  const getJobs = async () => {
    const jobDataFromServer = await axios.get("http://localhost:4000/jobs");
    console.log("Jobs from server");
    console.log(jobDataFromServer.data.data);
    setJobs(jobDataFromServer.data.data);
  };

  useEffect(() => {
    getJobs();
  }, []);

  const totaljobs = jobs.length;

  return (
    <div className="">
      <h2 className="">{totaljobs} jobs for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map((job) => {
          return (
            <div key={job.job_id} className="bg-BackgroundDark">
              <p>Category : {job.job_category}</p>
              <h1>Title : {job.job_title}</h1>
              <h2>Company : {job.company_id}</h2>
              <h2>Type : {job.job_type_id}</h2>
              <h2>
                Salary : {job.salary_min} - {job.salary_max}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobList;
