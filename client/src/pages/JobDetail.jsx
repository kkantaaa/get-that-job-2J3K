import ProfessionalSidebar from "@/components/ProfessionalSideBar.jsx";

function JobDetail() {

  return (
    <>
      <div className="bg-Background">
        <div className="flex flex-row">
          <ProfessionalSidebar />
          <div className="ml-[120px] mt-[32px]">
            <div className="flex flex-row">
              <p> ← </p>
              <p className="uppercase">Back</p>
            </div>
            <div className="mt-[16px]">
              <div className="flex flex-row">
                <div>Company SA</div>
                <button className="uppercase ml-[960px] mr-[120px]">
                  Apply now
                </button>
              </div>
            </div>
            <h1 className="text-[48px] mt-[16px] text-center font-Montserrat font-normal leading-normal">
              The Job Title
            </h1>
            <div className="flex flex-row uppercase justify-center">
              <div className="text-[10px] text-Gray font-normal tracking-[1.5px] leading-normal">
                icon clock
              </div>
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
            <button className="mt-[16px]">Apply now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
