import { useState, useEffect } from "react";
import axios from "axios";
import RecruiterSidebar from "@/components/RecruiterSidebar.jsx";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import typeIcon from "@/images/getthatjob-page/typeIcon.png";
import jobCategoryIcon from "@/images/getthatjob-page/jobCategoryIcon.png";
import dollarIcon from "@/images/getthatjob-page/dollarIcon.png";
import mail_open_line from "@/images/posting-job-page/mail-open-line.png";
import account_circle_line_grey from "@/images/posting-job-page/account-circle-line-grey.png";
import account_circle_line_pink from "@/images/posting-job-page/account-circle-line.png";
import search_line from "@/images/posting-job-page/search-line.png";
import close_circle_line from "@/images/posting-job-page/close-circle-line.png";

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

function JobPosting() {
  const [jobs, setJobs] = useState([]);

  const formattedDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    const formatted = new Date(date).toLocaleDateString("en-GB", options);
    return formatted;
  };

  const getJob = async (data) => {
    try {
      const results = await axios.get(
        `http://localhost:4000/jobs/recruiter?filter=${data}`
      );
      setJobs(results.data.data);
      console.log(results.data.data);
      console.log("Categories get successful");
    } catch (error) {
      console.error("Error: unable to load jobs", error);
    }
  };

  const closedJob = async (data) => {
    console.log(data);
    try {
      await axios.put(`http://localhost:4000/jobs/${data.job_id}`, data);

      console.log(`Job_id ${data.job_id} have closed`);
    } catch (error) {
      console.error("Error: unable to load jobs", error);
    }
  };

  useEffect(() => {
    getJob();
    console.log("Jobs are", jobs);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <RecruiterSidebar />
        <div className="bg-Background w-full flex justify-center">
          <div className="w-[960px] py-8 space-y-4">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
              Job Posting
            </div>

            <div className="w-full p-2 space-y-4">
              <div>
                <label
                  htmlFor="radioLabel"
                  className="text-DarkGray text-Overline font-Inter font-normal tracking-[1.5px]"
                >
                  FILTER YOUR JOB POSTING
                </label>

                <RadioGroup
                  defaultValue="all"
                  className="flex flex-row space-x-1  font-Inter text-Body2 "
                  onValueChange={getJob}
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1" className="text-Gray font-normal ">
                      All
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="ontrack" id="r2" />
                    <Label htmlFor="r2" className="text-Gray font-normal">
                      With candidates on track
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="closed" id="r3" />
                    <Label htmlFor="r3" className="text-Gray font-normal">
                      Closed
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full space-y-2">
                <div className="text-Headline6 text-DarkGray font-Montserrat font-medium">
                  {jobs.length} jobs posting found
                </div>
                <div className=" w-full h-full ">
                  <Accordion type="single" collapsible className="space-y-4">
                    {jobs.map((job, key) => {
                      return (
                        <AccordionItem
                          value={job.job_title}
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
                                    to="/recruiter/jobpostings/show"
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
                                {job.closed_at !== "close" ? (
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
                                    variant="primary"
                                    size="primary"
                                    onClick={() => {
                                      closedJob({
                                        job_id: job.job_id,
                                        closed_at: null,
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
                                )}
                              </div>
                              {/* <Button>
                                  <Link
                                    to="/recruiter/jobpostings/edit"
                                    className="font-Inter text-Button  font-medium tracking-[1px]"
                                  >
                                    Edit
                                  </Link>
                                </Button>*/}
                            </AccordionTrigger>
                          </div>

                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-Subtitle1 text-DarkPink font-Montserrat font-normal">
                                  About the job position
                                </label>
                                <div className="text-DarkGray text-Body2 font-Inter font-normal">
                                  {job.about_job_position}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-Subtitle1 text-DarkPink font-Montserrat font-normal">
                                  Mandatory Requirements
                                </label>
                                <div className="text-DarkGray text-Body2 font-Inter font-normal">
                                  {job.mandatory_requirement}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-Subtitle1 text-DarkPink font-Montserrat font-normal">
                                  Optional Requirements
                                </label>
                                <div className="text-DarkGray text-Body2 font-Inter font-normal">
                                  {job.optional_requirement}
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
export default JobPosting;

/*<Route path="/recruiter/jobpostings/edit" element={<EditJobPostingPage />} />
              <Route path="/recruiter/jobpostings/show" element={<ShowJobPosingPage />} /> */
