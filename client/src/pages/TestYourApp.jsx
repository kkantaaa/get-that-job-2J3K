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

import cancelIcon from "../images/ApllicationApplyPage/cancel.svg";
import closedIcon from "../images/ApllicationApplyPage/closed.svg";
import letterIcon from "../images/ApllicationApplyPage/letter.svg";
import letterSentIcon from "../images/ApllicationApplyPage/letter-sent.svg";
import pendingIcon from "../images/ApllicationApplyPage/pending.svg";
import calendar from "../images/ApllicationApplyPage/calendar-lightgray.svg";
import category from "../images/ApllicationApplyPage/category.svg";
import dollarIcon from "../images/ApllicationApplyPage/dollar.svg";
import timeIcon from "../images/ApllicationApplyPage/time-lightgray.svg";

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

function TestYourApp() {
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
                  onValueChange="n/a"
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
                  0 applications found
                </div>

                {/* ส่วน Accordian */}
                <Accordion>
                  <AccordionItem>
                    <AccordionTrigger>
                      {/* Big container */}
                      <div className="flex flex-row py-[16px]">
                        {/* section 1*/}
                        <div className="font-Montserrat flex flex-row">
                          <div className="w-[59px] h-[59px] bg-Pink rounded-sm">
                            {" "}
                            logo
                          </div>
                          <div className="flex flex-col ml-[16px] justify-center">
                            <p className="text-DarkGray text-[20px] text-normal leading-[28px] tracking-[0.15px]">
                              {" "}
                              The Job Title
                            </p>
                            <p className="text-Gray text-[14px] font-normal leading-[18px] tracking-[0.1px]">
                              {" "}
                              Company Name{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div className="flex flex-col font-Inter text-LightGray text-[12px] font-normal leading-[16px] tracking-[0.4px]">
                        <div className="flex flex-row">
                            <img src={category} />
                            <p>Manufacturing</p>
                            <img src={calendar} />
                            <p>Full time</p>
                        </div>
                        <div className="mt-[8px] flex flex-row">
                            <img src={dollarIcon} />
                            <p>2.0 k</p> -<p>2.5 k</p>
                            <img src={timeIcon} />
                            <p>Posted 2 days ago</p>
                          </div>
                        </div>


                      {/* Section 3 */}
                      <div className="m-[4px] flex flex-row font-Inter text-Gray text-[12px] font-normal leading-[16px] tracking-[0.4px]">
                        <div className="flex flex-col w-[80px] h-[47px] items-center">
                          <img className="w-[15px] h-[15px]" src={letterIcon} />
                          <p>sent 1 minute ago</p>
                        </div>
                        <div className="flex flex-col text-Pink w-[80px] h-[47px] items-center">
                          <img
                            className="w-[15px] h-[15px]"
                            src={pendingIcon}
                          />
                          <p>Waiting for review</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent></AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TestYourApp;
