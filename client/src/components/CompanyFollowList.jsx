import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/authentication";
// import dollarIcon from "@/images/getthatjob-page/dollarIcon.svg";
// import typeIcon from "@/images/getthatjob-page/typeIcon.svg";
// import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.svg";
// import followIcon from "@/images/getthatjob-page/followIcon.svg";
import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";
import jobOpeningIcon from "@/images/getthatjob-page/jobOpeningIcon.svg";

const CompanyFollowingList = (props) => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [companyJobs, setCompanyJobs] = useState([]);
  const [companyJobsCount, setCompanyJobsCount] = useState([]);
  const companyFollow = props.data;

  //   const getCompanyJobs = async (input) => {
  //     const recruiterId = input;
  //     const userId = userData.user.user_id;
  //     try {
  //       const params = new URLSearchParams();
  //       params.append("userId", userId);
  //       params.append("recruiterId", recruiterId); //แบ่ง render ตาม recruiter_id
  //       const results = await axios.get(
  //         `http://localhost:4000/following/company`,
  //         {
  //           params,
  //         }
  //       );
  //       setCompanyJobs(results.data.data);
  //     } catch (error) {
  //       console.error("Error: Failed to fetch company following", error);
  //     }
  //   };

  const getCompanyJobsCount = async () => {
    const userId = userData.user.user_id;
    try {
      const params = new URLSearchParams();
      params.append("userId", userId);
      //   params.append("recruiterId", recruiterId); //แบ่ง render ตาม recruiter_id
      const results = await axios.get(
        `http://localhost:4000/following/companycount`,
        {
          params,
        }
      );
      //   console.log(results.data.data);
      setCompanyJobsCount(results.data.data);

      //   const count = companyJobsCount.filter((job) => job.recruiter_id == 83)[0]
      //     .job_count;
      //   console.log(count);
    } catch (error) {
      console.error("Error: Failed to fetch company following", error);
    }
  };

  useEffect(() => {
    getCompanyJobsCount();
  }, []);

  return (
    <div className="ml-[120px]">
      <div className="m-2 text-[18px]">
        <h2 className="font-Montserrat">
          You are following {companyFollow.length} companies
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-2 xl:grid-cols-3 2xl:grid-cols-4">
        {companyFollow.map((follow) => {
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
                        {
                          companyJobsCount.filter(
                            (job) => job.recruiter_id == follow.recruiter_id
                          )[0].job_count
                        }{" "}
                        jobs openings
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
                      //   onClick={() => navigate(`/user/jobs/`)} เปลี่ยน naviagte ไปหน้าแสดง jobs ของ company
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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "@/contexts/authentication";
// import pinkFollowIcon from "@/images/getthatjob-page/pinkFollowIcon.svg";
// import jobOpeningIcon from "@/images/getthatjob-page/jobOpeningIcon.svg";

// const CompanyFollowingList = (props) => {
//   const navigate = useNavigate();
//   const { userData } = useAuth();
//   const [companyJobs, setCompanyJobs] = useState([]);
//   const companyFollow = props.data;

//   const getCompanyJobs = async (input) => {
//     const recruiterId = input;
//     const userId = userData.user.user_id;
//     try {
//       const params = new URLSearchParams();
//       params.append("userId", userId);
//       params.append("recruiterId", recruiterId); //แบ่ง render ตาม recruiter_id
//       const results = await axios.get(
//         `http://localhost:4000/following/company`,
//         {
//           params,
//         }
//       );
//       return results.data.data;
//     } catch (error) {
//       console.error("Error: Failed to fetch company following", error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchCompanyJobs = async () => {
//       const jobsData = await Promise.all(
//         companyFollow.map((follow) => getCompanyJobs(follow.recruiter_id))
//       );
//       setCompanyJobs(jobsData.flat());
//     };

//     fetchCompanyJobs();
//   }, [companyFollow, userData]);

//   return (
//     <div className="ml-[120px]">
//       <div className="m-2 text-[18px]">
//         <h2 className="font-Montserrat">
//           You are following {companyFollow.length} companies
//         </h2>
//       </div>
//       <div className="grid lg:grid-cols-2 gap-2 xl:grid-cols-3 2xl:grid-cols-4">
//         {companyFollow.map((follow) => (
//           <div
//             key={follow.recruiter_id}
//             className="rounded-[8px] border-solid border-[1px] w-[290px] my-1 bg-White drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] justify-center items-center"
//           >
//             <div className="flex flex-col justify-end items-center mx-1">
//               <div className="flex flex-row mt-3">
//                 <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] justify-center items-center mr-4">
//                   <img src={follow.company_logo} alt={follow.company_name} />
//                 </div>
//                 <div className="flex flex-col p-2">
//                   <div className="text-[20px]">{follow.company_name}</div>
//                   <div className="flex flex-row pr-1 pt-1 text-LightGray text-[12px] font-Inter">
//                     <img
//                       className="mr-1"
//                       src={jobOpeningIcon}
//                       alt="Job Opening Icon"
//                     />
//                     <div>{companyJobs.length} jobs openings</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-row pb-[16px] text-Gray">
//                 <div className="hover:text-Pink">
//                   <button className="flex flex-row font-Inter">
//                     <div className="mx-1">
//                       <img src={pinkFollowIcon} alt="Pink Follow Icon" />
//                     </div>
//                     <div className="pt-2">FOLLOWING</div>
//                   </button>
//                 </div>
//                 <div className="pl-4">
//                   <button className="mr-2 h-[40px] px-[8px] py-[6px] border-2 border-Pink rounded-[16px] bg-White text-Gray text-center text-[14px] tracking-[1.25px] font-Inter hover:bg-Pink hover:text-White">
//                     SEE MORE
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CompanyFollowingList;
