import { useState, useEffect } from "react";
import axios from "axios";
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
import money_dollar_circle_fill from "@/images/posting-job-page/money_dollar_circle_fill.png";

//const navigate = useNavigate();

const postJobSchema = yup.object({
  jobTitle: yup.string().required("JOB TITLE is a required field"),
  jobCategory: yup.string().required(),
  jobType: yup.string().required(),
  salaryRangeMin: yup.number().positive().integer().required(),
  salaryRangeMax: yup
    .number()
    .positive("JOB TITLE is a required field")
    .integer()
    .required(),
  aboutJobPosition: yup.string().required(),
  mandatoryRequirement: yup.string().required(),
  optionalRequirement: yup.string().required(),
});

function CreateJobPosting() {
  const form = useForm({ resolver: yupResolver(postJobSchema) });
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  const getCategories = async () => {
    try {
      const results = await axios.get("http://localhost:4000/category");
      //const categories = results.data.result;
      setCategories(results.data.result);
      console.log("Categories get successful");
    } catch (error) {
      console.error("Error: unable to load categories", error);
    }
  };

  const getTypes = async () => {
    try {
      const results = await axios.get("http://localhost:4000/type");
      //const categories = results.data.result;
      setTypes(results.data.result);
      console.log("Types get successful");
    } catch (error) {
      console.error("Error: unable to load Types", error);
    }
  };

  useEffect(() => {
    getCategories();
    getTypes();
    console.log("categories are", categories);
    console.log("Types are", types);
  }, []);

  const onSubmit = async (data) => {
    try {
      try {
        console.log(data);
        await axios.post("http://localhost:4000/jobs", data);
        console.log("Posting successful");
      } catch (error) {
        console.error("Error: unable to post", error);
      }
      //navigate("/recruiter/jobpostings");
    } catch (error) {
      console.error("Error during posting job", error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <RecruiterSidebar />
        <div className="bg-Background w-full flex justify-center">
          <div className="w-[960px] py-8 space-y-4">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
              Profile
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="PersonalInfo w-full p-2 ">
                  <div className="text-Headline5 text-DarkGray font-Montserrat font-normal">
                    Main information
                  </div>
                  <div className="w-[300px] ">
                    <FormField
                      control={form.control}
                      name="companyEmail"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>COMPANY EMAIL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="GET_THAT_JOB@mail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>COMPANY NAME</FormLabel>
                          <FormControl>
                            <Input placeholder="GET THAT JOB" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyWebsite"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>COMPANY WEBSITE</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="www.getthatjob.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aboutCompany"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ABOUT THE COMPANY</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the company"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-10 w-fit"
                  variant="default"
                  size="secondary"
                >
                  <div className="font-Inter font-medium text-Button text-White tracking-[1.25px]">
                    UPDATE PROFILE
                  </div>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateJobPosting;
