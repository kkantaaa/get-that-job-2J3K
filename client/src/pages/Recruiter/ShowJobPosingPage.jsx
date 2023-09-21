import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import RecruiterSidebar from "@/components/RecruiterSidebar.jsx";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
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

const handleChange = (data) => {
  console.log(data);
};

function ShowJobPosingPage() {
  console.log(SelectValue);

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
              Show Job Posting
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowJobPosingPage;
