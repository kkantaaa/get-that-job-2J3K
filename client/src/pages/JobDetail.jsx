import ProfessionalSidebar from "@/components/ProfessionalSideBar.jsx";

function JobDetail() {
  return (
    <>
      <div className="bg-Background overflow-x-hidden">
        <div className="flex flex-row font-Inter">
          <ProfessionalSidebar />
          <div className="ml-[120px] mt-[32px]">
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
              <p className="uppercase">Back</p>
            </div>
            <div className="mt-[16px]">
              <div className="flex flex-row">
                <div>Company SA</div>
                <button className="hover:bg-LightPink pt-4 justify-center flex flex-row text-white font-[500px] tracking-[1.25px] leading-[24px] rounded-2xl w-[173px] h-[56px] bg-Pink uppercase ml-[960px] mr-[120px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4.965 5.09593L8.511 17.5059L11.551 11.4259L17.188 9.17093L4.965 5.09593ZM2.899 2.29993L21.705 8.56793C21.8023 8.60019 21.8874 8.6616 21.9487 8.74383C22.0099 8.82606 22.0444 8.92514 22.0475 9.02763C22.0505 9.13013 22.022 9.23108 21.9657 9.31682C21.9095 9.40255 21.8282 9.46892 21.733 9.50693L13 12.9999L8.575 21.8499C8.52997 21.94 8.45877 22.0145 8.37073 22.0634C8.28268 22.1124 8.1819 22.1336 8.08159 22.1243C7.98128 22.115 7.88611 22.0756 7.80856 22.0113C7.73101 21.947 7.6747 21.8608 7.647 21.7639L2.26 2.91093C2.23505 2.82334 2.23449 2.7306 2.25839 2.64272C2.28228 2.55484 2.32973 2.47516 2.3956 2.41227C2.46147 2.34939 2.54327 2.30568 2.63216 2.28589C2.72105 2.26609 2.81367 2.27094 2.9 2.29993H2.899Z"
                      fill="white"
                    />
                  </svg>
                  <div className="ml-[4px]">Apply now</div>
                </button>
              </div>
            </div>
            <h1 className="text-[48px] mt-[16px] text-center font-Montserrat font-normal leading-normal">
              The Job Title
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
              <p className="ml-[4px] text-[10px] text-Gray font-normal tracking-[1.5px] leading-normal">
                Post 2 Days Ago
              </p>
            </div>
            <div className="mt-[16px]">Category Type Salary</div>
            <div className="mt-[54px]">
              <h2 className="text-[24px] font-Montserrat text-DarkPink font-normal leading-normal">
                About Company
              </h2>
              <p className="w-[760px] h-[192px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque porta nunc viverra velit tincidunt, non vehicula
                augue vehicula. Donec viverra luctus nisl, sed vehicula ligula.
                Vivamus maximus metus a magna fermentum ullamcorper. Phasellus
                ultrices vestibulum ligula ut pellentesque. Quisque quis congue
                quam. Nunc porttitor risus lorem, in blandit augue iaculis
                vitae. Cras sit amet fringilla neque. Fusce ac elit ut quam
                ultrices bibendum. Curabitur vitae dignissim quam. Suspendisse
                aliquet massa id orci volutpat ullamcorper. Nunc at ante sem.
                Etiam elementum, mi eget aliquam lobortis, elit libero tempus
                ex, vel pretium nisi risus ac augue.
              </p>
            </div>
            <div className="mt-[16px]">
              <h2 className="text-[24px] font-Montserrat text-DarkPink font-normal leading-normal">
                About the job position
              </h2>
              <p className="w-[760px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque porta nunc viverra velit tincidunt, non vehicula
                augue vehicula. Donec viverra luctus nisl, sed vehicula ligula.
                Vivamus maximus metus a magna fermentum ullamcorper. Phasellus
                ultrices vestibulum ligula ut pellentesque. Quisque quis congue
                quam. Nunc porttitor risus lorem, in blandit augue iaculis
                vitae. Cras sit amet fringilla neque. Fusce ac elit ut quam
                ultrices bibendum. Curabitur vitae dignissim quam. Suspendisse
                aliquet massa id orci volutpat ullamcorper. Nunc at ante sem.
                Etiam elementum, mi eget aliquam lobortis, elit libero tempus
                ex, vel pretium nisi risus ac augue.
              </p>
            </div>
            <div className="mt-[16px]">
              <h2 className="text-[24px] font-Montserrat text-DarkPink font-normal leading-normal">
                Mandatory Requirements
              </h2>
              <p className="w-[760px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque porta nunc viverra velit tincidunt, non vehicula
                augue vehicula. Donec viverra luctus nisl, sed vehicula ligula.
                Vivamus maximus metus a magna fermentum ullamcorper. Phasellus
                ultrices vestibulum ligula ut pellentesque. Quisque quis congue
                quam.
              </p>
            </div>
            <div className="mt-[16px]">
              <h2 className="text-[24px] font-Montserrat text-DarkPink font-normal leading-normal">
                Optional Requirements
              </h2>
              <p className="w-[760px]">
                - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />- Maecenas vel metus imperdiet, malesuada dolor a,
                pulvinar tellus.
              </p>
            </div>
            <div className="flex flex-row justify-center items-center mt-[16px]">
              <button className="mt-[16px] hover:bg-LightPink pt-4 justify-center flex flex-row text-white font-[500px] tracking-[1.25px] leading-[24px] rounded-2xl w-[173px] h-[56px] bg-Pink uppercase">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.965 5.09593L8.511 17.5059L11.551 11.4259L17.188 9.17093L4.965 5.09593ZM2.899 2.29993L21.705 8.56793C21.8023 8.60019 21.8874 8.6616 21.9487 8.74383C22.0099 8.82606 22.0444 8.92514 22.0475 9.02763C22.0505 9.13013 22.022 9.23108 21.9657 9.31682C21.9095 9.40255 21.8282 9.46892 21.733 9.50693L13 12.9999L8.575 21.8499C8.52997 21.94 8.45877 22.0145 8.37073 22.0634C8.28268 22.1124 8.1819 22.1336 8.08159 22.1243C7.98128 22.115 7.88611 22.0756 7.80856 22.0113C7.73101 21.947 7.6747 21.8608 7.647 21.7639L2.26 2.91093C2.23505 2.82334 2.23449 2.7306 2.25839 2.64272C2.28228 2.55484 2.32973 2.47516 2.3956 2.41227C2.46147 2.34939 2.54327 2.30568 2.63216 2.28589C2.72105 2.26609 2.81367 2.27094 2.9 2.29993H2.899Z"
                    fill="white"
                  />
                </svg>
                <div className="ml-[4px]">Apply now</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
