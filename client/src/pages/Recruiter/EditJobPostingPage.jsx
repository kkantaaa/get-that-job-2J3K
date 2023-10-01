import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import RecruiterSidebar from "@/components/RecruiterSidebar.jsx";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import money_dollar_circle_fill from "@/images/posting-job-page/money_dollar_circle_fill.png";

//const navigate = useNavigate();

const postJobSchema = yup.object({
  job_title: yup.string().required("JOB TITLE is a required field"),
  category_name: yup.string().required("JOB CATEGORY is a required field"),
  type_name: yup.string().required("JOB TYPE is a required field"),
  salary_min: yup
    .number()
    .positive("SALARY MIN is not a positive number.")
    .integer()
    .typeError("SALARY MIN is not a positive number.")
    .required(),
  salary_max: yup
    .number()
    .positive("SALARY MAX is not a positive number.")
    .integer()
    .typeError("SALARY MAX is not a positive number.")
    .required(),
  about_job_position: yup
    .string()
    .required("ABOUT THE JOB POSITION is a required field"),
  mandatory_requirement: yup
    .string()
    .required("MANDATORY REQUIREMENTS is a required field"),
  optional_requirement: yup
    .string()
    .required("OPTIONAL REQUIREMENTS is a required field"),
});

function CreateJobPosting() {
  const form = useForm({ resolver: yupResolver(postJobSchema) });
  const navigate = useNavigate();
  const { toast } = useToast();
  const param = useParams();
  const [jobs, setJobs] = useState(null);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [newcategory, setNewcategory] = useState("");

  const getJobs = async (param) => {
    try {
      const results = await axios.get(
        `http://localhost:4000/jobs/recruiter/${param.jobId}`
      );
      setJobs(results.data.data[0]);

      console.log("jobs", results.data.data[0]);

      console.log("Jobs get successful");
    } catch (error) {
      console.error("Error: unable to load jobs", error);
    }
  };

  const getCategories = async () => {
    try {
      const results = await axios.get("http://localhost:4000/category");
      //const categories = results.data.result;
      setCategories(results.data.result);
      console.log("categories are", results.data.result);

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
      console.log("Types are", results.data.result);
      console.log("Types get successful");
    } catch (error) {
      console.error("Error: unable to load Types", error);
    }
  };

  useEffect(() => {
    getCategories();
    getTypes();
    getJobs(param);
  }, []);

  const createCategory = async () => {
    try {
      const capitalizedValue =
        newcategory.charAt(0).toUpperCase() +
        newcategory.slice(1).toLowerCase();
      const fetchCategory = {
        category_name: capitalizedValue,
      };
      console.log(fetchCategory);
      await axios.post("http://localhost:4000/category", fetchCategory);
      console.log("Create new category successful");
      toast({
        description: "Create new category successful.",
      });
      getCategories();
    } catch (error) {
      console.error("Error: unable to post", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("data submit Input", data);
      try {
        const updateData = {
          ...data,
          job_id: param.jobId,
        };
        console.log(updateData);

        await axios.put(
          `http://localhost:4000/jobs/${param.jobId}`,
          updateData
        );
        console.log("Job edit", updateData);
        console.log("Posting successful");
        toast({
          title: `Job: ${data.job_title}`,
          description: "Edit job successful.",
        });
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
              Edit job posting
            </div>
            {jobs === null ? (
              <p className=" text-Headline6 text-DarkGray font-Montserrat font-medium animate-pulse ">
                Loading profile. . .
              </p>
            ) : (
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
                        name="job_title"
                        defaultValue={jobs.job_title}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>JOB TITLE</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Software engineer"
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
                        name="category_name"
                        defaultValue={jobs.category_name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>JOB CATEGORY</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select or create a category" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Categories</SelectLabel>
                                </SelectGroup>
                                <div className="flex flex-row max-w-[282px] pl-5 items-center space-x-2">
                                  <Input
                                    type="text"
                                    placeholder="Create a category"
                                    className="flex-initial w-full"
                                    value={newcategory}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      setNewcategory(e.target.value);
                                      console.log(e.target.value);
                                    }}
                                  />
                                  <Button
                                    size="secondary"
                                    className="flex-initial w-2/5"
                                    onClick={createCategory}
                                  >
                                    Create
                                  </Button>
                                </div>
                                <ScrollArea className="h-40 w-full ">
                                  {categories.map((category, key) => {
                                    return (
                                      <SelectItem
                                        value={category.category_name}
                                        key={key}
                                      >
                                        {category.category_name}
                                      </SelectItem>
                                    );
                                  })}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="type_name"
                        defaultValue={jobs.type_name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TYPE</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Types</SelectLabel>
                                </SelectGroup>
                                <ScrollArea className="h-40 w-full ">
                                  {types.map((type, key) => {
                                    return (
                                      <SelectItem
                                        value={type.type_name}
                                        key={key}
                                      >
                                        {type.type_name}
                                      </SelectItem>
                                    );
                                  })}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <label
                        htmlFor="inputLabel"
                        className="text-DarkGray text-Overline font-Inter font-normal tracking-[1.5px]"
                      >
                        SALARY RANGE
                      </label>
                      <div className=" w-[231px] flex flex-row items-center ">
                        <FormField
                          control={form.control}
                          name="salary_min"
                          defaultValue={jobs.salary_min}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="min"
                                  className="pl-9 bg-origin-padding bg-[url('@/images/posting-job-page/money_dollar_circle_fill.png')] bg-no-repeat bg-[length:20px_20px] bg-[center_left_8px] "
                                  {...field}
                                ></Input>
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <hr className="w-[11px] h-[2px] mx-2 rounded-[2px] bg-LightGray" />

                        <FormField
                          control={form.control}
                          name="salary_max"
                          defaultValue={jobs.salary_max}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="max"
                                  className="pl-9 bg-origin-padding bg-[url('@/images/posting-job-page/money_dollar_circle_fill.png')] bg-no-repeat bg-[length:20px_20px] bg-[center_left_8px] "
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
                  </div>

                  <div className="ProfessionalInfo w-full p-2 ">
                    <div className="text-Headline5 text-DarkGray font-Montserrat font-normal">
                      Additional information
                    </div>
                    <div className="w-full ">
                      <FormField
                        control={form.control}
                        name="about_job_position"
                        defaultValue={jobs.about_job_position}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ABOUT THE JOB POSITION</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the main functions and characteristics of your job position"
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
                        name="mandatory_requirement"
                        defaultValue={jobs.mandatory_requirement}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MANDATORY REQUIREMENTS</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List each mandatory requirement in a new line"
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
                        name="optional_requirement"
                        defaultValue={jobs.optional_requirement}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OPTIONAL REQUIREMENTS</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List each optional requirement in a new line"
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
                    className="h-10 w-[153px]"
                    variant="default"
                    size="secondary"
                  >
                    EDIT THIS JOB
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateJobPosting;
