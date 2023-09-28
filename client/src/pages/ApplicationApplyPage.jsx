// component and files
import FindThatJobSideBar from "@/components/ProfessionalSideBar/FindThatJobSideBar.jsx";
import ApplicationApplySection from "@/components/ApplicationApplySection";
import SendAPPlicationButton from "@/images/ApllicationApplyPage/SendAPPlicationButton.png"; //img
import FollowButton from "@/images/ApllicationApplyPage/FollowButton.svg"; //img
import FollowButtonG from "@/images/ApllicationApplyPage/FollowButtonGrey.svg"; //img
//functions, method and libaries
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import moment from "moment";
//init
moment().format();

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function ApplicationApplyPage() {
  // nav
  const navigate = useNavigate();
  // state
  const [jobDetail, setJobDetail] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const { jobparams } = useParams();
  const [user_id, setuserparams] = useState("");
  // useEffect
  useEffect(() => {
    //0
    const token = localStorage.getItem("token");
    //
    if (!token) {
      console.log("Token not found in local storage");
    }
    //
    try {
      const decoded = jwtDecode(token);
      const user_id_from_token = parseInt(decoded.user_id);
      setuserparams(user_id_from_token);
    } catch (error) {
      console.log("Token verification failed:", error);
    }
    //
    //1
    //1.1
    const getJobDetail = async () => {
      try {
        const job_id = parseInt(jobparams);
        const getcompanyinfo = await axios.get(
          `http://localhost:4000/apply/${job_id}`
        );
        setJobDetail(getcompanyinfo.data);
        // console.log(getcompanyinfo.data); // leave it in case adjust what data to fetch/not fetch
      } catch (error) {
        console.log(error);
      }
    };
    //1.2
    const getUserDetail = async () => {
      try {
        const getuserinfo = await axios.get(
          `http://localhost:4000/apply/u/${user_id}`
        );
        setUserDetail(getuserinfo.data);
        // console.log(getuserinfo.data); // leave it in case adjust what data to fetch/not fetch
      } catch (error) {
        // console.log(error);  // leave it cause the catch error can't be empty
      }
    };
    //2
    const fetchData = async () => {
      await getJobDetail();
      await getUserDetail();
    };

    fetchData();
  }, [jobparams, user_id]);
  // moment
  const createdAt = moment(jobDetail.opened_at).fromNow();
  //handlers
  //1
  //back action and jump to send application button>>>>>>>
  const handleBack = (event) => {
    const job_id = parseInt(jobparams);
    event.preventDefault();
    // !!check team nakub!!
    navigate(`/user/jobs/${job_id}`);
  };
  //2
  const handleSendApplication = () => {
    const button = document.getElementById("sendApplicationButton");
    button.scrollIntoView({ behavior: "smooth" });
  };
  //3
  const handleFollowButton = () => {
    console.log("clicked");
    const user_id = parseInt(userDetail.user_id);
    const recruiter_id = parseInt(jobDetail.recruiter_id);
    console.log(jobDetail.recruiter_id);
    console.log(userDetail.recruiter_id);
    if (userDetail.recruiter_id !== null) {
      console.log("same");
      axios.delete(
        `http://localhost:4000/apply/unfollow/${user_id}/${recruiter_id}`
      );
    } else {
      console.log("not same");
      axios.post(
        `http://localhost:4000/apply/follow/${user_id}/${recruiter_id}`
      );
    }
    window.location.reload();
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>render>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  return (
    <>
      <div className="bg-Background overflow-x-hidden">
        <div className="flex flex-row font-Inter text-[16px]">
          <FindThatJobSideBar />
          {
            // application show job + company section
          }
          <div className="ml-[350px] mt-[32px] wrapper overflow-x-auto">
            {
              // back button>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            }
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.63599L15.778 7.04999L10.828 12Z"
                  fill="#616161"
                />
              </svg>
              <p className="uppercase cursor-pointer" onClick={handleBack}>
                Back
              </p>
            </div>
            {
              // job + company  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            }
            {
              // avatar + company name + follow button
              // job title + posted at
            }
            <div className="mt-[16px]">
              <div className="flex flex-row">
                <div className="flex flex-row">
                  <div className="w-[74px] h-[74px] flex shrink-0 bg-white rounded-[8px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
                    <img src={jobDetail.company_logo} alt="Company Logo" />
                  </div>
                  <div className="ml-[16px] flex flex-col">
                    <div className="font-Montserrat text-[24px] font-normal leading-normal">
                      {jobDetail.company_name}
                    </div>
                    {jobDetail.recruiter_id == userDetail.recruiter_id && (
                      <button onClick={handleFollowButton}>
                        <img
                          onClick={handleFollowButton}
                          src={FollowButton}
                          alt="Following Button"
                        />
                      </button>
                    )}
                    {jobDetail.recruiter_id !== userDetail.recruiter_id && (
                      <button onClick={handleFollowButton}>
                        <img
                          onClick={handleFollowButton}
                          src={FollowButtonG}
                          alt="Follow Button"
                        />
                      </button>
                    )}
                  </div>
                </div>
                <button onClick={handleSendApplication} className="ml-auto">
                  <img
                    src={SendAPPlicationButton}
                    alt="Send Application Button"
                  />
                </button>
              </div>
            </div>
            <h1 className="text-[48px] mt-[16px] text-center font-Montserrat font-normal leading-normal">
              {jobDetail.job_title}
            </h1>
            <div className="flex flex-row uppercase justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
              >
                <path
                  d="M8 13.75C4.54813 13.75 1.75 10.9519 1.75 7.5C1.75 4.04813 4.54813 1.25 8 1.25C11.4519 1.25 14.25 4.04813 14.25 7.5C14.25 10.9519 11.4519 13.75 8 13.75ZM8 12.5C9.32608 12.5 10.5979 11.9732 11.5355 11.0355C12.4732 10.0979 13 8.82608 13 7.5C13 6.17392 12.4732 4.90215 11.5355 3.96447C10.5979 3.02678 9.32608 2.5 8 2.5C6.67392 2.5 5.40215 3.02678 4.46447 3.96447C3.52678 4.90215 3 6.17392 3 7.5C3 8.82608 3.52678 10.0979 4.46447 11.0355C5.40215 11.9732 6.67392 12.5 8 12.5ZM8.625 7.5H11.125V8.75H7.375V4.375H8.625V7.5Z"
                  fill="#616161"
                />
              </svg>
              <p className="ml-[4px] text-[10px] text-Gray font-normal tracking-[1.5px] leading-normal"></p>
              <p> Posted: {createdAt} </p>
            </div>
            {
              // cataegory + type + salary section
            }
            <div className="mt-[16px] font-Montserrat flex flex-row justify-center">
              <div className="w-[281px] h-[77px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] border-DarkPink border-[1px] bg-white rounded-lg flex flex-col justify-center items-center">
                <div className="font-normal not-italic tracking-[0.15px]">
                  Category
                </div>
                <div className="flex flex-row items-center text-[24px] not-italic font-normal leading-normal">
                  <svg
                    className="mr-[4px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="29"
                    viewBox="0 0 30 29"
                    fill="none"
                  >
                    <path
                      d="M12.5833 12.2174V1.20825L25.875 8.45825V25.3749H4.125V8.45825L12.5833 12.2174ZM15 5.27913V15.9366L6.54167 12.1775V22.9583H23.4583V9.89254L15 5.28033V5.27913Z"
                      fill="#616161"
                    />
                  </svg>
                  <div>
                    <p style={{ fontSize: "24px" }}>
                      {jobDetail.category_name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="ml-[32px] w-[281px] h-[77px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] border-DarkPink border-[1px] bg-white rounded-lg flex flex-col justify-center items-center">
                <div className="font-normal not-italic tracking-[0.15px]">
                  Type
                </div>
                <div className="flex flex-row items-center  text-[24px] not-italic font-normal leading-normal">
                  <svg
                    className="mr-[4px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="29"
                    viewBox="0 0 30 29"
                    fill="none"
                  >
                    <path
                      d="M21.0417 3.62492H25.875C26.1955 3.62492 26.5028 3.75222 26.7294 3.97883C26.956 4.20544 27.0833 4.51278 27.0833 4.83325V24.1666C27.0833 24.4871 26.956 24.7944 26.7294 25.021C26.5028 25.2476 26.1955 25.3749 25.875 25.3749H4.12499C3.80452 25.3749 3.49718 25.2476 3.27057 25.021C3.04396 24.7944 2.91666 24.4871 2.91666 24.1666V4.83325C2.91666 4.51278 3.04396 4.20544 3.27057 3.97883C3.49718 3.75222 3.80452 3.62492 4.12499 3.62492H8.95832V1.20825H11.375V3.62492H18.625V1.20825H21.0417V3.62492ZM24.6667 13.2916H5.33332V22.9583H24.6667V13.2916ZM18.625 6.04158H11.375V8.45825H8.95832V6.04158H5.33332V10.8749H24.6667V6.04158H21.0417V8.45825H18.625V6.04158ZM7.74999 15.7083H10.1667V18.1249H7.74999V15.7083ZM13.7917 15.7083H16.2083V18.1249H13.7917V15.7083ZM19.8333 15.7083H22.25V18.1249H19.8333V15.7083Z"
                      fill="#616161"
                    />
                  </svg>
                  <div>{jobDetail.type_name}</div>
                </div>
              </div>

              <div className="ml-[32px] w-[281px] h-[77px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] border-DarkPink border-[1px] bg-white rounded-lg flex flex-col justify-center items-center">
                <div className="font-normal not-italic tracking-[0.15px]">
                  Salary
                </div>
                <div className="flex flex-row items-center  text-[24px] not-italic font-normal leading-normal">
                  <svg
                    className="mr-[4px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="29"
                    viewBox="0 0 30 29"
                    fill="none"
                  >
                    <path
                      d="M15 26.5834C8.32638 26.5834 2.91667 21.1737 2.91667 14.5001C2.91667 7.82646 8.32638 2.41675 15 2.41675C21.6736 2.41675 27.0833 7.82646 27.0833 14.5001C27.0833 21.1737 21.6736 26.5834 15 26.5834ZM15 24.1667C17.5638 24.1667 20.0225 23.1483 21.8354 21.3354C23.6482 19.5226 24.6667 17.0638 24.6667 14.5001C24.6667 11.9363 23.6482 9.47757 21.8354 7.66472C20.0225 5.85186 17.5638 4.83341 15 4.83341C12.4362 4.83341 9.97749 5.85186 8.16464 7.66472C6.35179 9.47757 5.33334 11.9363 5.33334 14.5001C5.33334 17.0638 6.35179 19.5226 8.16464 21.3354C9.97749 23.1483 12.4362 24.1667 15 24.1667ZM10.7708 16.9167H17.4167C17.5769 16.9167 17.7306 16.8531 17.8439 16.7398C17.9572 16.6265 18.0208 16.4728 18.0208 16.3126C18.0208 16.1523 17.9572 15.9987 17.8439 15.8854C17.7306 15.7721 17.5769 15.7084 17.4167 15.7084H12.5833C11.7822 15.7084 11.0138 15.3902 10.4473 14.8236C9.88077 14.2571 9.56251 13.4888 9.56251 12.6876C9.56251 11.8864 9.88077 11.118 10.4473 10.5515C11.0138 9.98501 11.7822 9.66675 12.5833 9.66675H13.7917V7.25008H16.2083V9.66675H19.2292V12.0834H12.5833C12.4231 12.0834 12.2694 12.1471 12.1561 12.2604C12.0428 12.3737 11.9792 12.5273 11.9792 12.6876C11.9792 12.8478 12.0428 13.0015 12.1561 13.1148C12.2694 13.2281 12.4231 13.2917 12.5833 13.2917H17.4167C18.2178 13.2917 18.9862 13.61 19.5527 14.1765C20.1192 14.743 20.4375 15.5114 20.4375 16.3126C20.4375 17.1138 20.1192 17.8821 19.5527 18.4486C18.9862 19.0152 18.2178 19.3334 17.4167 19.3334H16.2083V21.7501H13.7917V19.3334H10.7708V16.9167Z"
                      fill="#616161"
                    />
                  </svg>
                  <p className="minsalary">{jobDetail.salary_min}</p>
                  <p className="ml-1 mr-1">-</p>
                  <p className="maxsalary">{jobDetail.salary_max}</p>
                </div>
              </div>
            </div>
            {
              // user apply section
            }
            <ApplicationApplySection
              userDetail={userDetail}
              jobparams={jobparams}
              companyname={jobDetail.company_name}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationApplyPage;
// /user/application/apply
