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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

const [jobs, setJobs] = useState([]);

const getJob = async () => {
  try {
    const results = await axios.get("http://localhost:4000/jobs");
    console.log(results);
    setJobs(results);
    console.log("Categories get successful");
  } catch (error) {
    console.error("Error: unable to load jobs", error);
  }
};

useEffect(() => {
  getJob();
  console.log("Jobs are", jobs);
}, []);

function JobPostingPage() {
  return (
    <>
      <div className="flex flex-row">
        <RecruiterSidebar />
        <div className="bg-Background w-full flex justify-center">
          <div className="w-[960px] py-8 ">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
              Job Posting
            </div>
            <div className="w-full mt-4 p-2 space-y-2">
              <RadioGroup
                defaultValue="all"
                className="flex flex-row text-Body2 text-Gray font-Inter font-normal space-x-1"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="all" id="r1" />
                  <Label htmlFor="r1">All</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="ontrack" id="r2" />
                  <Label htmlFor="r2">With candidates on track</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="closed" id="r3" />
                  <Label htmlFor="r3">Closed</Label>
                </div>
              </RadioGroup>
              <div className="text-Headline6 text-DarkGray font-Montserrat font-medium">
                jobs posting found
              </div>
              <div className="bg-white w-full h-20"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default JobPostingPage;
