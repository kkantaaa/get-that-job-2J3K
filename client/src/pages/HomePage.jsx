import landingPage1 from "@/images/landing-page/landingPage1.png";
import landingPage2 from "@/images/landing-page/landingPage2.png";
import member1 from "@/images/landing-page/member1.png";
import member2 from "@/images/landing-page/member2.png";
import member3 from "@/images/landing-page/member3.png";
import member4 from "@/images/landing-page/member4.png";
import githubIconButton from "@/images/landing-page/githubIconButton.png";
import linkinIconButton from "@/images/landing-page/linkinIconButton.png";
import navLogo1 from "@/images/landing-page/navLogo1.png";
import signupIcon from "@/images/landing-page/signupIcon.png";
import loginIcon from "@/images/landing-page/loginIcon.png";
import { Button } from "@/components/ui/button";

function Homepage() {
  return (
    <>
      <nav className="bg-White h-[64px] flex justify-center">
        <div className="w-full h-full mx-[8.333%] flex flex-row  justify-between items-center ">
          <img src={navLogo1} className="w-[136px] h-[40px] " />
          <div className=" w-[257px] h-[40px] flex  flex-row  justify-between">
            <Button variant="secondary" size="secondary" className="w-[129px] ">
              <div className=" w-full flex flex-row justify-between">
                <img src={signupIcon} className="w-[24px] h-[24px] " />
                <div className="font-Inter text-Button font-medium tracking-[1.25px] ">
                  SIGN UP
                </div>
              </div>
            </Button>
            <Button variant="secondary" size="secondary" className="w-[112px]">
              <div className=" w-full flex flex-row justify-between">
                <img src={loginIcon} className="w-[24px] h-[24px]" />
                <div className="font-Inter text-Button font-medium tracking-[1.25px] ">
                  LOGIN
                </div>
              </div>
            </Button>
          </div>
        </div>
      </nav>

      <div className="bg-Background h-[833px] flex flex-col justify-around items-center">
        <div className=" text-DarkGray font-Montserrat text-Headline2 font-light">
          The place where
          <br />
          you get <span className="text-Pink">that</span> job
        </div>
        <div className="text-black font-Montserrat text-Headline5 font-normal ">
          With our Machine Learning algorithm you will get that job
          <br />
          in no time. We promise you! Just give us the money and we
          <br />
          will take care of it.
        </div>
        <Button className="w-[264px]">
          <div className="font-Inter text-Button font-medium tracking-[1px]">
            CREATE AN ACCOUNT NOW
          </div>
        </Button>
        <img src={landingPage1} className="w-[1062px] h-[350px]" />
      </div>

      <div className=" w-full flex  flex-row h-[472px]">
        <div className="bg-DarkPink w-3/5 h-full">
          <div className=" bg-DarkPink px-[13.63636%] py-[64px] h-full flex flex-col justify-between text-left">
            <div className=" text-White font-Montserrat text-Headline3 font-normal">
              Find your next job
            </div>
            <div className=" text-White font-Montserrat text-Headline5 font-normal">
              Our Machine learning algorithm is so good that it’s even illegal
              in some countries. Join us to use our barelly legal algorithm that
              is actually a group of interns that work on our basement.
            </div>

            <div className="text-White font-Montserrat text-Headline5 font-normal">
              We have a job for you, no matter your background or previous
              experience. Is sending random memes through chat your only skill?
              That’s ok, we got you, our Rock Star Meme Curator role is here for
              you.
            </div>
          </div>
        </div>
        <div className="bg-white w-2/5 flex justify-center items-center">
          <img src={landingPage2} className="w-[335px] h-[242px] " />
        </div>
      </div>

      <div className=" bg-Background-foreground w-full flex justify-center">
        <div className=" h-[537px] w-full mx-[8.333%] flex flex-col justify-around items-center divide-y-[1px] divide-DarkPink">
          <div className=" h-[486px] w-full flex justify-center items-center">
            <div className="w-[80%]">
              <div className=" text-DarkPink text-Headline3 font-normal font-Montserratflex">
                Meet the team
              </div>
              <div className=" h-[273px] flex flex-row justify-center items-center">
                <div className=" w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center">
                    <img src={member1} className="w-[160px] h-[160px] " />
                  </div>
                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Ruby Ramirez
                  </div>
                  <div className=" mt-[8px] flex flex-row justify-around">
                    <img
                      src={githubIconButton}
                      className="w-[40px] h-[40px] mx-[16px] "
                    />
                    <img
                      src={linkinIconButton}
                      className="w-[40px] h-[40px] mx-[16px] "
                    />
                  </div>
                </div>

                <div className=" w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center">
                    <img src={member2} className="w-[160px] h-[160px] " />
                  </div>
                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Javier Escribano
                  </div>
                  <div className=" mt-[8px] flex flex-row justify-around">
                    <img
                      src={githubIconButton}
                      className="w-[40px] h-[40px] mx-[16px] "
                    />
                    <img
                      src={linkinIconButton}
                      className="w-[40px] h-[40px] mx-[16px] "
                    />
                  </div>
                </div>

                <div className=" w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center">
                    <img src={member3} className="w-[160px] h-[160px] " />
                  </div>
                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Frabcisca Reategui
                  </div>
                  <div className=" mt-[8px] flex flex-row justify-around">
                    <img
                      src={githubIconButton}
                      className="w-[40px] h-[40px] mx-[16px] "
                    />
                    <img
                      src={linkinIconButton}
                      className="w-[40px] h-[40px] mx-[16px] "
                    />
                  </div>
                </div>

                <div className="w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <img src={member4} className="w-[180px] h-[180px] " />

                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Rual Rubina
                  </div>
                  <div className="mt-[8px] flex flex-row justify-around">
                    <img
                      src={githubIconButton}
                      className="w-[40px] h-[40px] mx-[16px] "
                    />
                    <img
                      src={linkinIconButton}
                      className="w-[40px] h-[40px] mx-[16px] "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" h-[50px] w-full flex justify-center items-center">
            <div className="text-DarkGray text-Subtitle2 font-medium font-Montserratflex">
              © 2021 - Get That Job
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
