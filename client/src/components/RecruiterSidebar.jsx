import Logo from "../images/landing-page/navlogo1.png";
import { useAuth } from "@/contexts/authentication";
import { useNavigate } from "react-router-dom";

export default function RecruiterSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="w-[240px] h-screen bg-BackgroundDark flex flex-col relative">
      <div className="w-[168px] h-fit px-[16px] py-[32px]">
        <img src={Logo} />
      </div>

      <div className="w-full h-fit font=Inter text-DarkGray ">
        <button
          className="flex h-[48px] w-full py-[12px] px-[16px] active:bg-Background focus:bg-Background "
          onClick={() => {
            navigate("/recruiter/jobpostings");
          }}
        >
          <div className=" h-fit mr-[8px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2951_696)">
                <path
                  d="M7 5V2C7 1.73478 7.10536 1.48043 7.29289 1.29289C7.48043 1.10536 7.73478 1 8 1H16C16.2652 1 16.5196 1.10536 16.7071 1.29289C16.8946 1.48043 17 1.73478 17 2V5H21C21.2652 5 21.5196 5.10536 21.7071 5.29289C21.8946 5.48043 22 5.73478 22 6V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V6C2 5.73478 2.10536 5.48043 2.29289 5.29289C2.48043 5.10536 2.73478 5 3 5H7ZM4 16V19H20V16H4ZM4 14H20V7H4V14ZM9 3V5H15V3H9ZM11 11H13V13H11V11Z"
                  fill="#616161"
                />
              </g>
              <defs>
                <clipPath id="clip0_2951_696">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <span className=" h-fit">Job Postings</span>
        </button>
        <button
          className="flex h-[48px] w-full py-[12px] px-[16px] active:bg-Background focus:bg-Background"
          onClick={() => {
            navigate("/recruiter/createjobposting");
          }}
        >
          <div className=" h-fit mr-[8px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2951_702)">
                <path
                  d="M15 4H5V20H19V8H15V4ZM3 2.992C3 2.444 3.447 2 3.999 2H16L21 7V20.993C21.0009 21.1243 20.976 21.2545 20.9266 21.3762C20.8772 21.4979 20.8043 21.6087 20.7121 21.7022C20.6199 21.7957 20.5101 21.8701 20.3892 21.9212C20.2682 21.9723 20.1383 21.9991 20.007 22H3.993C3.73038 21.9982 3.47902 21.8931 3.29322 21.7075C3.10742 21.5219 3.00209 21.2706 3 21.008V2.992ZM11 11V8H13V11H16V13H13V16H11V13H8V11H11Z"
                  fill="#616161"
                />
              </g>
              <defs>
                <clipPath id="clip0_2951_702">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <span className=" h-fit">Create New Job</span>
        </button>

        <button
          className="flex h-[48px] w-full py-[12px] px-[16px] active:bg-Background focus:bg-Background"
          onClick={() => {
            navigate("/recruiter/recruiterprofile");
          }}
        >
          <div className=" h-fit mr-[8px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2951_1758)">
                <path
                  d="M4 22C4 19.8783 4.84285 17.8434 6.34315 16.3431C7.84344 14.8429 9.87827 14 12 14C14.1217 14 16.1566 14.8429 17.6569 16.3431C19.1571 17.8434 20 19.8783 20 22H18C18 20.4087 17.3679 18.8826 16.2426 17.7574C15.1174 16.6321 13.5913 16 12 16C10.4087 16 8.88258 16.6321 7.75736 17.7574C6.63214 18.8826 6 20.4087 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                  fill="#616161"
                />
              </g>
              <defs>
                <clipPath id="clip0_2951_1758">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <span className=" h-fit">Profile</span>
        </button>

        <button
          className="flex h-[48px] w-full py-[12px] px-[16px] active:bg-Background focus:bg-Background"
          onClick={() => {
            logout();
          }}
        >
          <div className=" h-fit mr-[8px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2951_1764)">
                <path
                  d="M5 11H13V13H5V16L0 12L5 8V11ZM4 18H6.708C7.86269 19.0183 9.28669 19.6819 10.8091 19.9109C12.3316 20.14 13.8878 19.9249 15.291 19.2915C16.6942 18.6581 17.8849 17.6332 18.7201 16.3398C19.5553 15.0465 19.9995 13.5396 19.9995 12C19.9995 10.4604 19.5553 8.95354 18.7201 7.66019C17.8849 6.36683 16.6942 5.34194 15.291 4.7085C13.8878 4.07506 12.3316 3.85998 10.8091 4.08906C9.28669 4.31815 7.86269 4.98167 6.708 6H4C4.93066 4.75718 6.13833 3.74851 7.52707 3.05414C8.91581 2.35978 10.4473 1.99884 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C10.4473 22.0012 8.91581 21.6402 7.52707 20.9459C6.13833 20.2515 4.93066 19.2428 4 18Z"
                  fill="#616161"
                />
              </g>
              <defs>
                <clipPath id="clip0_2951_1764">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <span className=" h-fit">Log out</span>
        </button>
      </div>
      <div className="w-full absolute bottom-[30px] text-[12px] text-Gray">
        <span className="px-[16px]">© 2021 - Get That Job</span>
      </div>
    </div>
  );
}
