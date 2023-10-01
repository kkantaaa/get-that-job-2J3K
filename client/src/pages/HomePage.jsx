import landingPage1 from "@/images/landing-page/landingPage1.png";
import landingPage2 from "@/images/landing-page/landingPage2.png";
import member1 from "@/images/landing-page/member1.png";
import member2 from "@/images/landing-page/member2.png";
import member3 from "@/images/landing-page/member3.png";
import member4 from "@/images/landing-page/member4.png";
import Jajha from "@/images/landing-page/member/Jajha.jpg";
import Jumb from "@/images/landing-page/member/Jumb.jpg";
import Kaka from "@/images/landing-page/member/kaka.jpg";
import Keem from "@/images/landing-page/member/Keem.jpg";
import githubIconButton from "@/images/landing-page/githubIconButton.png";
import linkinIconButton from "@/images/landing-page/linkinIconButton.png";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar.jsx";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <NavBar />
      <div className="bg-Background h-[833px] py-[10px] mt-[64px] flex flex-col justify-center items-center">
        <div className="mb-[16px]  text-DarkGray font-Montserrat text-Headline2 font-light">
          The place where
          <br />
          you get <span className="text-Pink">that</span> job
        </div>
        <div className="my-[16px]  text-black font-Montserrat text-Headline5 font-normal text-center">
          With our Machine Learning algorithm you will get that job
          <br />
          in no time. We promise you! Just give us the money and we
          <br />
          will take care of it.
        </div>
        <Button className="my-[16px] w-[264px]">
          <Link
            to="/user/register1"
            className="font-Inter text-Button  font-medium tracking-[1px]"
          >
            CREATE AN ACCOUNT NOW
          </Link>
        </Button>
        <img src={landingPage1} className="w-[1062px] h-[350px] my-[16px] " />
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

      <footer className=" bg-Background-foreground w-full flex justify-center">
        <div className=" h-[537px] w-full mx-[8.333%] flex flex-col justify-around items-center divide-y-[1px] divide-DarkPink">
          <div className=" h-[486px] w-full flex justify-center items-center">
            <div className="w-[80%] flex flex-col items-center">
              <div className=" text-DarkPink text-Headline3 font-normal font-Montserrat ">
                Meet the team
              </div>
              <div className=" h-[273px] flex flex-row justify-center items-center">
                <div className=" w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center">
                    <img
                      src={Jajha}
                      className="w-[160px] h-[160px] rounded-full

"
                    />
                  </div>
                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Jajha.P
                  </div>
                  <div className=" mt-[8px] flex flex-row justify-around">
                    <a
                      href="https://github.com/jashleyx"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={githubIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/patriciasingha"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={linkinIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                  </div>
                </div>

                <div className=" w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center">
                    <img
                      src={Jumb}
                      className="w-[160px] h-[160px] rounded-full"
                    />
                  </div>
                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Jumb.K
                  </div>
                  <div className=" mt-[8px] flex flex-row justify-around">
                    <a
                      href="https://github.com/JumbKWC"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={githubIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kritwatchara-wangkhumphai-b2a57b288/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={linkinIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                  </div>
                </div>

                <div className=" w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center">
                    <img
                      src={member3}
                      className="w-[160px] h-[160px] rounded-full"
                    />
                  </div>
                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Kan.K
                  </div>
                  <div className=" mt-[8px] flex flex-row justify-around">
                    <a href="" target="_blank" rel="noopener noreferrer">
                      <img
                        src={githubIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                    <a href="" target="_blank" rel="noopener noreferrer">
                      <img
                        src={linkinIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                  </div>
                </div>

                <div className=" w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center">
                    <img
                      src={Kaka}
                      className="w-[160px] h-[160px] rounded-full"
                    />
                  </div>
                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Kaka.K
                  </div>
                  <div className=" mt-[8px] flex flex-row justify-around">
                    <a
                      href="https://github.com/kkantaaa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={githubIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                    <a
                      href="www.linkedin.com/in/kanta-vanitchasatit-892165239"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={linkinIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                  </div>
                </div>

                <div className=" w-[240px] mx-[16px] flex flex-col justify-center items-center">
                  <div className="w-[180px] h-[180px] flex flex-col justify-center items-center">
                    <img
                      src={Keem}
                      className="w-[160px] h-[160px] rounded-full"
                    />
                  </div>
                  <div className="text-black text-Headline5 font-normal font-Montserratflex">
                    Keem.S
                  </div>
                  <div className=" mt-[8px] flex flex-row justify-around">
                    <a
                      href="https://github.com/MrKeem"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={githubIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sahapap-samathi-238570226/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={linkinIconButton}
                        className="w-[40px] h-[40px] mx-[16px] "
                      />
                    </a>
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
      </footer>
    </>
  );
}

export default Homepage;
