import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import RecruiterSidebar from "@/components/RecruiterSidebar.jsx";
import { useForm, Controller } from "react-hook-form";
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
import jobCategoryIcon from "@/images/posting-job-page/building-3-line.png";
import typeIcon from "@/images/posting-job-page/calendar-2-line.png";
import dollarIcon from "@/images/posting-job-page/money-dollar-circle-line.png";
import linkedin from "@/images/posting-job-page/show-job/linkedin-box-line.png";

const handleChange = (data) => {
  console.log(data);
};

function ShowJobPosingPage() {
  //const navigate = useNavigate();
  const param = useParams();
  const [job, setJob] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const formattedDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    const formatted = new Date(date).toLocaleDateString("en-GB", options);
    return formatted;
  };

  const getJob = async () => {
    try {
      const jobsResults = await axios.get(
        `http://localhost:4000/jobs/recruiter/${param.jobId}`
      );
      setJob(jobsResults.data.data);
      console.log("Jobs get successful");
      console.log("Jobs are", job);
    } catch (error) {
      console.error("Error: unable to load jobs", error);
    }
  };

  const getCandidates = async () => {
    try {
      const candidatesResults = await axios.get(
        `http://localhost:4000/apply/recruiter/${param.jobId}`
      );
      setCandidates(candidatesResults.data);
      console.log("Candidates get successful");
      console.log("Candidates are", candidates);
    } catch (error) {
      console.error("Error: unable to load candidates", error);
    }
  };

  const onFilterChange = (data) => {
    console.log(data);
  };

  useEffect(() => {
    getJob();
    getCandidates();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <RecruiterSidebar />
        <div className="bg-Background w-full flex justify-center">
          <div className="w-[960px] py-8 space-y-4">
            <Button variant="ghost" size="primary">
              <Link
                to="/recruiter/jobpostings"
                className="font-Inter text-Button text-Gray font-medium tracking-[1.25px] space-x-2"
              >
                <div className="space-x-1 flex flex-row">
                  <ChevronLeft className="h-6 w-6 " />
                  <div>BACK</div>
                </div>
              </Link>
            </Button>

            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
              Show Job Posting {param.jobId}
            </div>

            <div className="w-full space-y-2">
              <div className=" w-full h-full ">
                <Accordion type="single" collapsible className="space-y-4">
                  {job.map((job, jobKey) => {
                    return (
                      <AccordionItem
                        value={job.job_id}
                        key={jobKey}
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
                              <Button variant="primary" size="primary">
                                <div className="font-Inter text-Button text-White font-medium tracking-[1.25px] space-x-2">
                                  <div className="space-x-1 flex flex-row">
                                    <img
                                      src={close_circle_line}
                                      className="w-[24px] h-[24px] "
                                    />
                                    <div>CLOSE</div>
                                  </div>
                                </div>
                              </Button>
                            </div>
                            <Button variant="primary" size="primary">
                              <Link
                                to={`/recruiter/jobpostings/edit/${job.job_id}`}
                                className="font-Inter text-Button  font-medium tracking-[1px]"
                              >
                                EDIT
                              </Link>
                            </Button>
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
                onValueChange={onFilterChange}
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
                  <RadioGroupItem value="inProgress" id="r3" />
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
              </RadioGroup>
            </div>
            <div className="w-full space-y-2">
              <div className="text-Headline6 text-DarkGray font-Montserrat font-medium">
                {candidates.length} jobs posting found
              </div>
              <div className=" w-full h-full ">
                <Accordion type="single" collapsible className="space-y-4">
                  {candidates.map((candidate, candidateKey) => {
                    return (
                      <AccordionItem
                        value={candidate.user_id}
                        key={candidateKey}
                        className="space-y-[10px]"
                      >
                        <div className="flex flex-row ">
                          <AccordionTrigger>
                            <div className="">
                              <div className="w-fit text-Headline6 text-DarkGray font-Montserrat font-medium">
                                {candidate.user_name}
                              </div>
                              <div className=" font-Montserrat font-medium text-Subtitle2 text-Gray tracking-[0.1px] flex flex-row  space-x-1">
                                <div className="space-x-1 flex flex-row justify-center items-center">
                                  <img
                                    src={linkedin}
                                    className="w-[18px] h-[18px]"
                                  />
                                  <div>{candidate.user_linkedin}</div>
                                </div>
                              </div>
                            </div>

                            <div className=" font-Inter font-normal text-Caption text-LightGray tracking-[0.4px] flex flex-col space-x-2">
                              <div className="space-x-1 flex flex-row">
                                <img
                                  src={jobCategoryIcon}
                                  className="w-[15px] h-[15px]"
                                />
                                <div>{candidate.category_name}</div>
                              </div>

                              <div className="space-x-1 flex flex-row">
                                <img
                                  src={typeIcon}
                                  className="w-[15px] h-[15px]"
                                />
                                <div>{candidate.type_name}</div>
                              </div>

                              <div className="space-x-1 flex flex-row">
                                <img
                                  src={dollarIcon}
                                  className="w-[15px] h-[15px] "
                                />
                                <div>
                                  {(candidate.salary_min / 1000).toFixed(1)}k -{" "}
                                  {candidate.salary_max / 1000}k
                                </div>
                              </div>
                            </div>

                            <div className="w-fit h-fit font-Inter font-normal text-Caption text-Gray flex flex-row space-x-1 ">
                              <div className="w-20 h-12 flex flex-col items-center ">
                                <img
                                  src={mail_open_line}
                                  className="w-[15px] h-[15px] "
                                />
                                Open on {formattedDate(candidate.opened_at)}
                              </div>
                              <div className="w-20 h-12 ">
                                <div className="flex flex-row justify-center space-x-1 ">
                                  <img
                                    src={account_circle_line_grey}
                                    className="w-[15px] h-[15px] "
                                  />
                                  <div>{candidate.total_candidates}</div>
                                </div>
                                Total Candidates
                              </div>
                              <div className="w-20 h-12 text-Pink">
                                <div className="flex flex-row justify-center space-x-1 ">
                                  <img
                                    src={account_circle_line_pink}
                                    className="w-[15px] h-[15px] "
                                  />
                                  <div>{candidate.candidates_on_track} </div>
                                </div>
                                Candidates on track
                              </div>
                            </div>

                            <Button
                              variant="secondary"
                              size="secondary"
                              className="font-Inter text-Button  font-medium tracking-[1px]"
                            >
                              MARK AS FINISHED
                            </Button>
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
                                Professional experience
                              </label>
                              <div className="text-DarkGray text-Body2 font-Inter font-normal">
                                {candidate.professional_experience}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-Subtitle1 text-DarkPink font-Montserrat font-normal">
                                Why are you interested in working at{" "}
                                {job.company_name}
                              </label>
                              <div className="text-DarkGray text-Body2 font-Inter font-normal">
                                {candidate.interested_reason}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="secondary"
                            size="secondary"
                            className="font-Inter text-Button  font-medium tracking-[1px]"
                          >
                            DOWNLOAD CV
                          </Button>
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
    </>
  );
}
export default ShowJobPosingPage;
