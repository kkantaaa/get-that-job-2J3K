import Logo from "../../images/landing-page/navlogo1.png";
import { useAuth } from "@/contexts/authentication";
import { useNavigate } from "react-router-dom";

export default function FindThatJobSideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/");
  };

  const handleFindthatJobPage = () => {
    navigate("/user/findthatjob");
  };

  const handleApplicationPage = () => {
    navigate("/user/:user_id/myapplication");
  };

  const handleFollowingPage = () => {
    navigate("/user/:user_id/following");
  };

  const handleProfilePage = () => {
    navigate("/user/profile");
  };

  return (
    <div className="fixed w-[240px] h-screen bg-BackgroundDark flex flex-col">
      <div
        onClick={handleHomePage}
        className="w-[168px] h-fit px-[16px] py-[32px] cursor-pointer"
      >
        <img src={Logo} />
      </div>
      <div className="w-full h-fit font-Inter text-DarkGray ">
        <button
          onClick={handleFindthatJobPage}
          className="flex h-[48px] w-full py-[12px] px-[16px] bg-Background active:bg-Background focus:bg-Background "
        >
          <div className=" h-fit mr-[8px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2951_1739)">
                <path
                  d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z"
                  fill="#373737"
                />
              </g>
              <defs>
                <clipPath id="clip0_2951_1739">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <span className=" h-fit">Find that job</span>
        </button>

        <button
          onClick={handleApplicationPage}
          className="flex h-[48px] w-full py-[12px] px-[16px] active:bg-Background focus:bg-Background"
        >
          <div className=" h-fit mr-[8px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2951_1745)">
                <path
                  d="M20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"
                  fill="#616161"
                />
              </g>
              <defs>
                <clipPath id="clip0_2951_1745">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <span className=" h-fit">Your application</span>
        </button>

        <button
          onClick={handleFollowingPage}
          className="flex h-[48px] w-full py-[12px] px-[16px] active:bg-Background focus:bg-Background"
        >
          <div className=" h-fit mr-[8px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1L13.001 4.062C14.7632 4.28479 16.4013 5.08743 17.6572 6.34351C18.9131 7.5996 19.7155 9.23775 19.938 11H23V13L19.938 13.001C19.7153 14.7631 18.9128 16.401 17.6569 17.6569C16.401 18.9128 14.7631 19.7153 13.001 19.938L13 23H11V19.938C9.23775 19.7155 7.5996 18.9131 6.34351 17.6572C5.08743 16.4013 4.28479 14.7632 4.062 13.001L1 13V11H4.062C4.28459 9.23761 5.08713 7.59934 6.34324 6.34324C7.59934 5.08713 9.23761 4.28459 11 4.062V1H13ZM12 6C10.4087 6 8.88258 6.63214 7.75736 7.75736C6.63214 8.88258 6 10.4087 6 12C6 13.5913 6.63214 15.1174 7.75736 16.2426C8.88258 17.3679 10.4087 18 12 18C13.5913 18 15.1174 17.3679 16.2426 16.2426C17.3679 15.1174 18 13.5913 18 12C18 10.4087 17.3679 8.88258 16.2426 7.75736C15.1174 6.63214 13.5913 6 12 6ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10Z"
                fill="#616161"
              />
            </svg>
          </div>

          <span className=" h-fit">Following</span>
        </button>

        <button
          onClick={handleProfilePage}
          className="flex h-[48px] w-full py-[12px] px-[16px] active:bg-Background focus:bg-Background"
        >
          <div className=" h-fit mr-[8px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2951_1758)">
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
              <g clipPath="url(#clip0_2951_1764)">
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
