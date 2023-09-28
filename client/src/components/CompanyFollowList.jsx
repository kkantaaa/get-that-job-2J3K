import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/authentication";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";
import jobOpeningIcon from "@/images/getthatjob-page/jobOpeningIcon.svg";

const CompanyFollowingList = (props) => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [companyJobsCount, setCompanyJobsCount] = useState([]);
  const companyFollow = props.data;

  const getCompanyJobsCount = async () => {
    const userId = userData.user.user_id;
    try {
      const params = new URLSearchParams();
      params.append("userId", userId);
      const results = await axios.get(
        `http://localhost:4000/following/companycount`,
        {
          params,
        }
      );
      setCompanyJobsCount(results.data.data);
    } catch (error) {
      console.error("Error: Failed to fetch company following", error);
    }
  };

  useEffect(() => {
    getCompanyJobsCount();
  }, []);

  // console.log("companyJobsCount : ");
  // console.log(companyJobsCount.filter((job) => job.recruiter_id == 83)[0]); TESTT

  // const counts = companyJobsCount.map((obj) => {
  //   return obj.job_count;
  // });
  // console.log("counts : ");
  // console.log(counts);

  // {
  //   companyJobs && companyJobs.length > 0 ? (
  //     <div className="flex flex-row">
  //       {
  //         companyJobsCount.filter(
  //           (job) => job.recruiter_id == follow.recruiter_id
  //         )[0].job_count
  //       }
  //     </div>
  //   ) : (
  //     <div>Loading...</div>
  //   );
  // }

  return (
    <div className="ml-[120px]">
      <div className="m-2 text-[18px]">
        <h2 className="font-Montserrat">
          You are following {companyFollow.length} companies
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        {companyFollow.map((follow) => {
          // const count = companyJobsCount.filter(
          //   (job) => job.recruiter_id == follow.recruiter_id
          // )[0].job_count;
          return (
            <div
              key={follow.recruiter_id}
              className="rounded-[8px] border-solid border-[1px] w-[290px] my-1 bg-White drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center"
            >
              <div className="flex flex-col justify-end items-center mx-1">
                <div className="flex flex-row mt-3">
                  <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] justify-center items-center mr-4">
                    <img src={follow.company_logo} alt={follow.company_name} />
                  </div>
                  <div className="flex flex-col p-2">
                    <div className="text-[20px]">{follow.company_name}</div>
                    <div className="flex flex-row pr-1 pt-1 text-LightGray text-[12px] font-Inter">
                      <img
                        className="mr-1"
                        src={jobOpeningIcon}
                        alt="Job Opening Icon"
                      />
                      <div>
                        {companyJobsCount && companyJobsCount.length > 0 ? (
                          <div className="flex flex-row">
                            {
                              companyJobsCount.filter(
                                (job) => job.recruiter_id == follow.recruiter_id
                              )[0].job_count
                            }{" "}
                            jobs openings
                          </div>
                        ) : (
                          <div>Loading...</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row pb-[16px] text-Gray">
                  <div className="hover:text-Pink">
                    <button className="flex flex-row font-Inter">
                      <div className="mx-1">
                        <img src={pinkFollowIcon} alt="Pink Follow Icon" />
                      </div>
                      <div className="pt-2">FOLLOWING</div>
                    </button>
                  </div>
                  <div className="pl-4">
                    <button
                      className="mr-2 h-[40px] px-[8px] py-[6px] border-2 border-Pink rounded-[16px] bg-White text-Gray text-center text-[14px] tracking-[1.25px] font-Inter hover:bg-Pink hover:text-White"
                      onClick={() =>
                        navigate(`/user/companyjob/${follow.recruiter_id}`)
                      }
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

export default CompanyFollowingList;
