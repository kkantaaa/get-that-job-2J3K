// component and files
import ProfessionalSidebar from "@/components/ProfessionalSideBar.jsx";
import ApplicationApplySection from "@/components/ApplicationApplySection";
import SendAPPlicationButton from "@/images/ApllicationApplyPage/SendAPPlicationButton.png"; //img
import FollowButton from "@/images/ApllicationApplyPage/FollowButton.png"; //img
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
  const { jobparams } = useParams();
  const [userid, setuserparams] = useState("");
  // useEffect
  useEffect(() => {
    //0
    const token = localStorage.getItem("token");
    //
    if (token) {
      console.log("Token found in local storage");
    } else {
      console.log("Token not found in local storage");
    }
    //
    try {
      const decoded = jwtDecode(token);
      const user_id_from_token = parseInt(decoded.id);
      setuserparams(user_id_from_token);
      console.log("User ID from token:", user_id_from_token);
    } catch (error) {
      console.error("Token verification failed:", error);
    }
    //
    //1
    const getJobDetail = async () => {
      try {
        const job_id = parseInt(jobparams);
        const getcompanyinfo = await axios.get(
          `http://localhost:4000/testapply/${job_id}`
        );
        setJobDetail(getcompanyinfo.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    //1
    const fetchData = async () => {
      await getJobDetail();
    };

    fetchData();
  }, [jobparams, userid]);
  // moment
  const createdAt = moment(jobDetail.date_time).fromNow();
  //back action and jump to send application button>>>>>>>
  const handleBack = (event) => {
    event.preventDefault();
    // !!check team nakub!!
    navigate("/user/findthatjob");
  };

  const handleSendApplication = () => {
    const button = document.getElementById("sendApplicationButton");
    button.scrollIntoView({ behavior: "smooth" });
  };
  //>>>>>>>>>
  return (
    <>
      <div className="bg-Background overflow-x-hidden">
        <div className="flex flex-row font-Inter text-[16px]">
          <ProfessionalSidebar />
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
                    <img src={jobDetail.avatar} alt="Company Logo" />
                  </div>
                  <div className="ml-[16px] flex flex-col">
                    <div className="font-Montserrat text-[24px] font-normal leading-normal">
                      {jobDetail.company_name}
                    </div>
                    {jobDetail.is_following == true && (
                      <svg
                        width="138"
                        height="41"
                        viewBox="0 0 138 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.5"
                          width="40"
                          height="40"
                          rx="20"
                          fill="#F48FB1"
                        />
                        <g clipPath="url(#clip0_2_271)">
                          <path
                            d="M21 9.5L21.001 12.562C22.7632 12.7848 24.4013 13.5874 25.6572 14.8435C26.9131 16.0996 27.7155 17.7378 27.938 19.5H31V21.5L27.938 21.501C27.7153 23.2631 26.9128 24.901 25.6569 26.1569C24.401 27.4128 22.7631 28.2153 21.001 28.438L21 31.5H19V28.438C17.2378 28.2155 15.5996 27.4131 14.3435 26.1572C13.0874 24.9013 12.2848 23.2632 12.062 21.501L9 21.5V19.5H12.062C12.2846 17.7376 13.0871 16.0993 14.3432 14.8432C15.5993 13.5871 17.2376 12.7846 19 12.562V9.5H21ZM20 14.5C18.4087 14.5 16.8826 15.1321 15.7574 16.2574C14.6321 17.3826 14 18.9087 14 20.5C14 22.0913 14.6321 23.6174 15.7574 24.7426C16.8826 25.8679 18.4087 26.5 20 26.5C21.5913 26.5 23.1174 25.8679 24.2426 24.7426C25.3679 23.6174 26 22.0913 26 20.5C26 18.9087 25.3679 17.3826 24.2426 16.2574C23.1174 15.1321 21.5913 14.5 20 14.5ZM20 18.5C20.5304 18.5 21.0391 18.7107 21.4142 19.0858C21.7893 19.4609 22 19.9696 22 20.5C22 21.0304 21.7893 21.5391 21.4142 21.9142C21.0391 22.2893 20.5304 22.5 20 22.5C19.4696 22.5 18.9609 22.2893 18.5858 21.9142C18.2107 21.5391 18 21.0304 18 20.5C18 19.9696 18.2107 19.4609 18.5858 19.0858C18.9609 18.7107 19.4696 18.5 20 18.5Z"
                            fill="white"
                          />
                        </g>
                        <path
                          d="M45.1186 25.5V15.3182H51.4325V16.6406H46.6548V19.7429H50.9801V21.0604H46.6548V25.5H45.1186ZM63.4162 20.4091C63.4162 21.4962 63.2173 22.4309 62.8196 23.2131C62.4219 23.992 61.8767 24.5919 61.1839 25.0128C60.4946 25.4304 59.7107 25.6392 58.8324 25.6392C57.9508 25.6392 57.1636 25.4304 56.4709 25.0128C55.7815 24.5919 55.2379 23.9903 54.8402 23.2081C54.4425 22.4259 54.2436 21.4929 54.2436 20.4091C54.2436 19.322 54.4425 18.389 54.8402 17.6101C55.2379 16.8279 55.7815 16.228 56.4709 15.8104C57.1636 15.3894 57.9508 15.179 58.8324 15.179C59.7107 15.179 60.4946 15.3894 61.1839 15.8104C61.8767 16.228 62.4219 16.8279 62.8196 17.6101C63.2173 18.389 63.4162 19.322 63.4162 20.4091ZM61.8949 20.4091C61.8949 19.5805 61.7607 18.8828 61.4922 18.3161C61.227 17.746 60.8625 17.3151 60.3984 17.0234C59.9377 16.7285 59.4157 16.581 58.8324 16.581C58.2457 16.581 57.7221 16.7285 57.2614 17.0234C56.8007 17.3151 56.4361 17.746 56.1676 18.3161C55.9025 18.8828 55.7699 19.5805 55.7699 20.4091C55.7699 21.2377 55.9025 21.937 56.1676 22.5071C56.4361 23.0739 56.8007 23.5047 57.2614 23.7997C57.7221 24.0914 58.2457 24.2372 58.8324 24.2372C59.4157 24.2372 59.9377 24.0914 60.3984 23.7997C60.8625 23.5047 61.227 23.0739 61.4922 22.5071C61.7607 21.937 61.8949 21.2377 61.8949 20.4091ZM66.5815 25.5V15.3182H68.1177V24.1776H72.7314V25.5H66.5815ZM75.7338 25.5V15.3182H77.2701V24.1776H81.8837V25.5H75.7338ZM93.3342 20.4091C93.3342 21.4962 93.1353 22.4309 92.7376 23.2131C92.3398 23.992 91.7946 24.5919 91.1019 25.0128C90.4125 25.4304 89.6287 25.6392 88.7504 25.6392C87.8687 25.6392 87.0816 25.4304 86.3888 25.0128C85.6995 24.5919 85.1559 23.9903 84.7582 23.2081C84.3604 22.4259 84.1616 21.4929 84.1616 20.4091C84.1616 19.322 84.3604 18.389 84.7582 17.6101C85.1559 16.8279 85.6995 16.228 86.3888 15.8104C87.0816 15.3894 87.8687 15.179 88.7504 15.179C89.6287 15.179 90.4125 15.3894 91.1019 15.8104C91.7946 16.228 92.3398 16.8279 92.7376 17.6101C93.1353 18.389 93.3342 19.322 93.3342 20.4091ZM91.8129 20.4091C91.8129 19.5805 91.6786 18.8828 91.4102 18.3161C91.145 17.746 90.7804 17.3151 90.3164 17.0234C89.8557 16.7285 89.3337 16.581 88.7504 16.581C88.1637 16.581 87.64 16.7285 87.1793 17.0234C86.7186 17.3151 86.354 17.746 86.0856 18.3161C85.8204 18.8828 85.6879 19.5805 85.6879 20.4091C85.6879 21.2377 85.8204 21.937 86.0856 22.5071C86.354 23.0739 86.7186 23.5047 87.1793 23.7997C87.64 24.0914 88.1637 24.2372 88.7504 24.2372C89.3337 24.2372 89.8557 24.0914 90.3164 23.7997C90.7804 23.5047 91.145 23.0739 91.4102 22.5071C91.6786 21.937 91.8129 21.2377 91.8129 20.4091ZM98.37 25.5L95.5462 15.3182H97.1619L99.1456 23.2031H99.2401L101.303 15.3182H102.904L104.967 23.2081H105.062L107.04 15.3182H108.661L105.832 25.5H104.286L102.143 17.8736H102.064L99.9212 25.5H98.37ZM112.848 15.3182V25.5H111.312V15.3182H112.848ZM124.553 15.3182V25.5H123.142L117.966 18.0327H117.872V25.5H116.335V15.3182H117.757L122.938 22.7955H123.032V15.3182H124.553ZM134.935 18.5348C134.839 18.2332 134.71 17.9631 134.547 17.7244C134.388 17.4825 134.198 17.277 133.975 17.108C133.753 16.9356 133.5 16.8047 133.215 16.7152C132.933 16.6257 132.623 16.581 132.285 16.581C131.712 16.581 131.195 16.7285 130.734 17.0234C130.273 17.3184 129.909 17.7509 129.64 18.321C129.375 18.8878 129.243 19.5821 129.243 20.4041C129.243 21.2294 129.377 21.9271 129.645 22.4972C129.914 23.0672 130.282 23.4998 130.749 23.7947C131.216 24.0897 131.748 24.2372 132.345 24.2372C132.898 24.2372 133.381 24.1245 133.792 23.8991C134.206 23.6738 134.526 23.3556 134.751 22.9446C134.98 22.5303 135.094 22.0431 135.094 21.483L135.492 21.5575H132.578V20.2898H136.581V21.4482C136.581 22.3033 136.398 23.0457 136.034 23.6754C135.672 24.3018 135.172 24.7857 134.532 25.1271C133.896 25.4685 133.167 25.6392 132.345 25.6392C131.423 25.6392 130.615 25.4271 129.919 25.0028C129.226 24.5786 128.686 23.977 128.298 23.1982C127.91 22.416 127.716 21.4879 127.716 20.4141C127.716 19.602 127.829 18.8729 128.054 18.2266C128.28 17.5803 128.596 17.0317 129.004 16.581C129.415 16.1269 129.897 15.7805 130.451 15.5419C131.007 15.3 131.616 15.179 132.275 15.179C132.825 15.179 133.337 15.2602 133.811 15.4226C134.289 15.585 134.713 15.8153 135.084 16.1136C135.459 16.4119 135.769 16.7666 136.014 17.1776C136.259 17.5852 136.425 18.0376 136.511 18.5348H134.935Z"
                          fill="#616161"
                        />
                      </svg>
                    )}
                    {jobDetail.is_following == false && (
                      <img src={FollowButton} alt="Follow Button" />
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
                    <p style={{ fontSize: "16px" }}>{jobDetail.job_category}</p>
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
                  <div>{jobDetail.job_type}</div>
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
              userparams={userid}
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
