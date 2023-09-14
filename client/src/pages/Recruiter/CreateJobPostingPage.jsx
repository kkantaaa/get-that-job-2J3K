import { useEffect } from "react";
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

function CreateJobPosting() {
  const form = useForm({ resolver: yupResolver(postJobSchema) });

  const onSubmit = (e) => {
    console.log(e);
    //navigate("/recruiter/createjobposting");
  };

  return (
    <>
      <div className="flex flex-row">
        <RecruiterSidebar />
        <div className="bg-Background w-full flex justify-center">
          <div className="w-[960px] py-8 ">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal">
              Create new job posting
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="PersonalInfo w-full my-4 p-2">
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
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                  Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                  Pineapple
                                </SelectItem>
                              </SelectGroup>
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
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Types</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                  Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                  Pineapple
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <label htmlFor="inputLabel">SALARY RANGE</label>
                    <div className=" w-[231px] flex flex-row items-center ">
                      <FormField
                        control={form.control}
                        name="salaryRangeMin"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel></FormLabel>
                            <FormControl>
                              <Input placeholder="min" {...field} />
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

                <div className="ProfessionalInfo w-full my-4 p-2">
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
                  POST THIS JOB
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
