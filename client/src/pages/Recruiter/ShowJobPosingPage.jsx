import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, Download } from "lucide-react";
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
import close_circle_line_gray from "@/images/posting-job-page/close-circle-line-gray.png";
import jobCategoryIcon from "@/images/posting-job-page/building-3-line.png";
import typeIcon from "@/images/posting-job-page/calendar-2-line.png";
import dollarIcon from "@/images/posting-job-page/money-dollar-circle-line.png";
import linkedin from "@/images/posting-job-page/show-job/linkedin-box-line.png";
import { createClient } from "@supabase/supabase-js";
import mail_line from "@/images/posting-job-page/show-job/mail-line.png";
import phone_line from "@/images/posting-job-page/show-job/phone-line.png";
import pause_circle_line from "@/images/posting-job-page/show-job/pause-circle-line.png";
import download_line from "@/images/posting-job-page/show-job/download-line.png";

function ShowJobPosingPage() {
  //const navigate = useNavigate();
  const param = useParams();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState(null);
  const [status, setStatus] = useState("all");

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
    } catch (error) {
      console.error("Error: unable to load jobs", error);
    }
  };

  const getCandidates = async (status) => {
    try {
      const candidatesResults = await axios.get(
        `http://localhost:4000/apply/recruiter/${param.jobId}?status=${status}`
      );
      setCandidates(candidatesResults.data);
      console.log("Candidates get successful");
    } catch (error) {
      console.error("Error: unable to load candidates", error);
    }
  };

  const download = async (data) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data: file, error } = await supabase.storage
        .from("testbucket")
        .download(`${data.cv}`);

      if (error) {
        console.error("Error downloading file:", error.message);
        return;
      }

      if (!file) {
        console.error("File not found.");
        return;
      }

      const blob = new Blob([file], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.cv}`;
      a.style.display = "none";

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error: unable to download", error);
    }
  };

  const closedJob = async (data) => {
    console.log(data);
    try {
      await axios.put(`http://localhost:4000/jobs/${data.job_id}`, data);
    } catch (error) {
      console.error("Error: unable to load jobs", error);
    }
  };

  const changeStatus = async (data) => {
    try {
      await axios.put(
        `http://localhost:4000/apply/recruiter/${data.application_id}`,
        data
      );
    } catch (error) {
      console.error("Error: unable to load jobs", error);
    }
  };

  useEffect(() => {
    getJob();
    /*getCandidates(status);
  }, [candidates]);*/
    console.log("Jobs are", job);
    getCandidates("all");
    console.log("Candidates are", candidates);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <RecruiterSidebar />
        <div className="bg-Background w-full flex justify-center">
          <div className="w-[960px] py-8 space-y-4">
            <Button variant="bare" size="bare">
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

            {job === null ? (
              <p className=" text-Headline6 text-DarkGray font-Montserrat font-medium animate-pulse ">
                Loading job. . .
              </p>
            ) : (
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
            )}

            <div className="w-full p-2 space-y-4">
              <div>
                <label
                  htmlFor="radioLabel"
                  className="text-DarkGray text-Overline font-Inter font-normal tracking-[1.5px]"
                >
                  FILTER YOUR JOB POSTING
                </label>

                <RadioGroup
                  defaultValue=""
                  className="flex flex-row space-x-1  font-Inter text-Body2 "
                  onValueChange={(value) => {
                    setStatus(value);
                  }}
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
                    <RadioGroupItem value="inprogress" id="r3" />
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

              {candidates === null || job === null ? (
                <p className=" text-Headline6 text-DarkGray font-Montserrat font-medium animate-pulse ">
                  Loading candidates. . .
                </p>
              ) : (
                <div className="w-full space-y-2">
                  <div className="text-Headline6 text-DarkGray font-Montserrat font-medium">
                    {candidates.length} jobs posting found
                  </div>
                  <div className=" w-full h-full ">
                    <Accordion type="single" collapsible className="space-y-4">
                      {candidates === null ? (
                        <p className=" text-Headline6 text-DarkGray font-Montserrat font-medium animate-pulse ">
                          Loading job. . .
                        </p>
                      ) : (
                        candidates.map((candidate, candidateKey) => {
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
                                  <div className=" font-Inter font-normal text-Caption text-LightGray tracking-[0.4px] flex flex-col items-start  space-y-1">
                                    <div className="space-x-1 flex flex-row">
                                      <img
                                        src={mail_line}
                                        className="w-[15px] h-[15px]"
                                      />
                                      <div>{candidate.email}</div>
                                    </div>

                                    <div className="space-x-1 flex flex-row ">
                                      <img
                                        src={phone_line}
                                        className="w-[15px] h-[15px]"
                                      />
                                      <div>{candidate.user_phone}</div>
                                    </div>
                                  </div>
                                  Waiting for review
                                  {candidate.application_status ===
                                  "waiting" ? (
                                    <Button
                                      variant="secondary"
                                      size="secondary"
                                      className="font-Inter text-Button font-medium tracking-[1px]"
                                      onClick={() => {
                                        changeStatus({
                                          application_id:
                                            candidate.application_id,
                                          application_status: "inprogress",
                                        });
                                      }}
                                    >
                                      MARK AS STARTED
                                    </Button>
                                  ) : candidate.application_status ===
                                    "inprogress" ? (
                                    <Button
                                      variant="secondary"
                                      size="secondary"
                                      className="font-Inter text-Button font-medium tracking-[1px]"
                                      onClick={() => {
                                        changeStatus({
                                          application_id:
                                            candidate.application_id,
                                          application_status: "finished",
                                        });
                                      }}
                                    >
                                      MARK AS FINISHED
                                    </Button>
                                  ) : (
                                    <Button
                                      disabled
                                      variant="disabled"
                                      size="secondary"
                                      className="font-Inter text-Button font-medium tracking-[1px]"
                                    >
                                      FINISHED
                                    </Button>
                                  )}
                                  {/* <Button>
                                  <Link
                                    to="/recruiter/jobpostings/edit"

                                  <div className="w-fit h-fit font-Inter font-normal text-Caption text-Gray flex flex-row space-x-1 ">
                                    <div className="w-20 h-12 flex flex-col items-center ">
                                      <img
                                        src={mail_line}
                                        className="w-[15px] h-[15px] "
                                      />
                                      Open on{" "}
                                      {formattedDate(candidate.sent_date)}
                                    </div>

                                    <div className="w-20 h-12 text-Pink">
                                      <div className="flex flex-row justify-center space-x-1 ">
                                        <img
                                          src={pause_circle_line}
                                          className="w-[15px] h-[15px] "
                                        />
                                        <div>
                                          {candidate.candidates_on_track}{" "}
                                        </div>
                                      </div>
                                      Waiting for review
                                    </div>
                                  </div>

                                  <Button
                                    variant="secondary"
                                    size="secondary"
                                    className="font-Inter text-Button  font-medium tracking-[1px]"
                                  >
                                    MARK AS STARTED
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
                                      {job[0].company_name}
                                    </label>
                                    <div className="text-DarkGray text-Body2 font-Inter font-normal">
                                      {candidate.interested_reason}
                                    </div>
                                  </div>
                                </div>

                                <div className="w-full  mt-4  flex justify-center items-center ">
                                  <Button
                                    variant="secondary"
                                    size="secondary"
                                    className=" "
                                    onClick={() => {
                                      download({
                                        cv: candidate.cv,
                                      });
                                    }}
                                  >
                                    <div className=" font-Inter text-Button font-medium tracking-[1.25px] space-x-2 flex flex-row ">
                                      <img
                                        src={download_line}
                                        className="w-[24px] h-[24px] "
                                      />
                                      <div> DOWNLOAD CV</div>
                                    </div>
                                  </Button>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })
                      )}
                    </Accordion>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowJobPosingPage;
