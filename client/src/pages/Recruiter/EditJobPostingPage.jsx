import { useState, useEffect } from "react";
import axios from "axios";
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
              Edit job posting
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
                      name="jobTitle"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>JOB TITLE</FormLabel>
                          <FormControl>
                            <Input placeholder="Software engineer" {...field} />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobCategory"
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
                            </SelectContent>
                          </Select>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobType"
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
                              {types.map((type, key) => {
                                return (
                                  <SelectItem value={type.type_name} key={key}>
                                    {type.type_name}
                                  </SelectItem>
                                );
                              })}
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
                        name="salaryRangeMin"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                              <Input placeholder="min" {...field}></Input>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <hr className="w-[11px] h-[2px] mx-2 rounded-[2px] bg-LightGray" />

                      <FormField
                        control={form.control}
                        name="salaryRangeMax"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                              <Input placeholder="max" {...field} />
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
                      name="aboutJobPosition"
                      defaultValue=""
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
                      name="mandatoryRequirement"
                      defaultValue=""
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
                      name="optionalRequirement"
                      defaultValue=""
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
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateJobPosting;
