import { useState, useEffect } from "react";
import axios from "axios";
import YourApplicationSideBar from "@/components/ProfessionalSideBar/YourApplicationSideBar";
import { useForm, Controller } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

import mail_open_line from "@/images/posting-job-page/mail-open-line.png";
import account_circle_line_grey from "@/images/posting-job-page/account-circle-line-grey.png";
import account_circle_line_pink from "@/images/posting-job-page/account-circle-line.png";
import search_line from "@/images/posting-job-page/search-line.png";
import close_circle_line from "@/images/posting-job-page/close-circle-line.png";
import close_circle_line_gray from "@/images/posting-job-page/close-circle-line-gray.png";
import jobCategoryIcon from "@/images/posting-job-page/building-3-line.png";
import typeIcon from "@/images/posting-job-page/calendar-2-line.png";
import dollarIcon from "@/images/posting-job-page/money-dollar-circle-line.png";

//const navigate = useNavigate();

const postJobSchema = yup.object({
  jobTitle: yup.string().required("JOB TITLE is a required field"),
  jobCategory: yup.string().required(),
  jobType: yup.string().required(),
  salaryRangeMin: yup.number().positive().integer().required(),
  salaryRangeMax: yup.number().positive().integer().required(),
  aboutJobPosition: yup.string().required(),
  mandatoryRequirement: yup.string().required(),
  optionalRequirement: yup.string().required(),
});

function YourApplication() {
  const [applications, setApplications] = useState([]);
  const {user_id} = useParams();

  const formattedDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    const formatted = new Date(date).toLocaleDateString("en-GB", options);
    return formatted;
  };

  const getApplication = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/apply/user/${user_id}`
      );
      setApplications(results.data.data);
      console.log(results.data.data);
      console.log("Loaded the applications successfully");
    } catch (error) {
      console.error("Error: unable to load applications", error);
    }
  };

  useEffect(() => {
    getApplication();
    console.log("My Application are", applications);
  }, []);

  return (
    <>
      <div className="flex flex-row bg-Background overflow-x-hidden">
        <YourApplicationSideBar />
        <div className="bg-Background w-full flex justify-center overflow-x-hidden">
          <div className="w-[960px] py-8 space-y-4">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
            Your applications
            </div>

            <div className="w-full p-2 space-y-4">
              <div>
                <label
                  htmlFor="radioLabel"
                  className="text-DarkGray uppercase text-Overline font-Inter font-normal tracking-[1.5px]"
                >
                  filter your applications
                </label>

                <RadioGroup
                  defaultValue="all"
                  className="flex flex-row space-x-1 font-normal font-Inter text-Body2 tracking-[o.25px]"
                  onValueChange={getApplication}
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1" className="text-Gray font-normal ">
                      All
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="waiting" id="r2" />
                    <Label htmlFor="r2" className="text-Gray font-normal">
                      Waiting
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="closed" id="r3" />
                    <Label htmlFor="r3" className="text-Gray font-normal">
                      In progress
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="finished" id="r4" />
                    <Label htmlFor="r4" className="text-Gray font-normal">
                      Finished
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="declined" id="r5" />
                    <Label htmlFor="r5" className="text-Gray font-normal">
                      Declined
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full space-y-2">
                <div className="text-Headline6 text-DarkGray font-Montserrat font-medium">
                  {jobs.length} applications found
                </div>
                <div className=" w-full h-full ">
                  <Accordion type="single" collapsible className="space-y-4">
                    {jobs.map((job, key) => {
                      return (
                        <AccordionItem
                          value={job.job_id}
                          key={key}
                          className="space-y-[10px]"
                        >
                          <div className="flex flex-row ">
                            <AccordionTrigger>
                              <div className="">
                                <div className="w-fit text-Headline6 text-DarkGray font-Montserrat font-medium">
                                  {job.job_title}
                                </div>
                                <div className=" font-Inter font-normal text-Caption text-LightGray tracking-[0.4px] flex flex-row space-x-2">
                                  <div className="space-x-1 flex flex-row">
                                    <img
                                      src={jobCategoryIcon}
                                      className="w-[15px] h-[15px]"
                                    />
                                    <div>{job.category_name}</div>
                                  </div>

                                  <div className="space-x-1 flex flex-row">
                                    <img
                                      src={typeIcon}
                                      className="w-[15px] h-[15px]"
                                    />
                                    <div>{job.type_name}</div>
                                  </div>

                                  <div className="space-x-1 flex flex-row">
                                    <img
                                      src={dollarIcon}
                                      className="w-[15px] h-[15px] "
                                    />
                                    <div>
                                      {(job.salary_min / 1000).toFixed(1)}k -{" "}
                                      {job.salary_max / 1000}k
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="w-fit h-fit font-Inter font-normal text-Caption text-Gray flex flex-row space-x-1 ">
                                <div className="w-20 h-12 flex flex-col items-center ">
                                  <img
                                    src={mail_open_line}
                                    className="w-[15px] h-[15px] "
                                  />
                                  Open on {formattedDate(job.opened_at)}
                                </div>
                                <div className="w-20 h-12 ">
                                  <div className="flex flex-row justify-center space-x-1 ">
                                    <img
                                      src={account_circle_line_grey}
                                      className="w-[15px] h-[15px] "
                                    />
                                    <div>{job.total_candidates}</div>
                                  </div>
                                  Total Candidates
                                </div>
                                <div className="w-20 h-12 text-Pink">
                                  <div className="flex flex-row justify-center space-x-1 ">
                                    <img
                                      src={account_circle_line_pink}
                                      className="w-[15px] h-[15px] "
                                    />
                                    <div>{job.candidates_on_track} </div>
                                  </div>
                                  Candidates on track
                                </div>
                              </div>

                              <div className="flex flex-row w-[250px] justify-between ">
                                <Button variant="ghost" size="primary">
                                  <Link
                                    to={`/recruiter/jobpostings/show/${job.job_id}`}
                                    className="font-Inter text-Button text-Gray font-medium tracking-[1.25px] space-x-2"
                                  >
                                    <div className="space-x-1 flex flex-row">
                                      <img
                                        src={search_line}
                                        className="w-[24px] h-[24px] "
                                      />
                                      <div>SHOW</div>
                                    </div>
                                  </Link>
                                </Button>

                                {/* ทำให้คลิกแล้วปุ่มเปลี่ยนสีไม่เป็นคับ */}
                                {!job.closed_at ? (
                                  <Button
                                    variant="primary"
                                    size="primary"
                                    onClick={() => {
                                      closedJob({
                                        job_id: job.job_id,
                                        closed_at: "closed",
                                      });
                                    }}
                                  >
                                    <div className="font-Inter text-Button text-White font-medium tracking-[1.25px] space-x-2">
                                      <div className="space-x-1 flex flex-row">
                                        <img
                                          src={close_circle_line}
                                          className="w-[24px] h-[24px]"
                                          alt="Close Icon"
                                        />
                                        <div>CLOSE</div>
                                      </div>
                                    </div>
                                  </Button>
                                ) : (
                                  <Button
                                    disabled
                                    variant="disabled"
                                    size="primary"
                                    onClick={() => {
                                      closedJob({
                                        job_id: job.job_id,
                                        closed_at: null,
                                      });
                                    }}
                                  >
                                    <div className="font-Inter text-Button text-LightGray font-medium tracking-[1.25px] space-x-2">
                                      <div className="space-x-1 flex flex-row">
                                        <img
                                          src={close_circle_line_gray}
                                          className="w-[24px] h-[24px]"
                                          alt="Close Icon"
                                        />
                                        <div>CLOSED</div>
                                      </div>
                                    </div>
                                  </Button>
                                )}
                              </div>
                              <Button variant="primary" size="primary">
                                <Link
                                  to={`/recruiter/jobpostings/edit/${job.job_id}`}
                                  className="font-Inter text-Button  font-medium tracking-[1px]"
                                >
                                  EDIT
                                </Link>
                              </Button>
                            </AccordionTrigger>
                          </div>

                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-Subtitle1 text-DarkPink font-Montserrat font-normal">
                                  Professional Experience
                                </label>
                                <div className="text-DarkGray text-Body2 font-Inter font-normal">
                                  {job.about_job_position}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-Subtitle1 text-DarkPink font-Montserrat font-normal">
                                Why are you interested in working at {job.company_name}
                                </label>
                                <div className="text-DarkGray text-Body2 font-Inter font-normal">
                                  {job.mandatory_requirement}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default YourApplication;