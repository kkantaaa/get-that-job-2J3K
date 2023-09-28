import { useEffect, useState, useRef } from "react";
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
import FileInputIcon from "@/images/registration-page/upload-line.svg";

//const navigate = useNavigate();

const postJobSchema = yup.object({
  companyLogo: yup.string().required("Company Logo is a required field"),
  companyEmail: yup.string().required("Company Email is a required field"),
  companyName: yup.string().required("Company Name is a required field"),
  companyWebsite: yup.string().required("Company Website is a required field"),
  aboutCompany: yup
    .string()
    .required("Company Description is a required field"),
});

function RecruiterProfile() {
  const form = useForm({ resolver: yupResolver(postJobSchema) });
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const results = await axios.get(
        "http://localhost:4000/profile/recruiter"
      );
      setProfile(results.data.data[0]);
      console.log(results.data.data[0]);
      console.log("Profile get successful");
    } catch (error) {
      console.error("Error: unable to load Profile", error);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    getProfile();
    console.log("profile is", profile);
  }, []);

  /*if (profile === null) {
    // Render a loading state or a spinner while profile is being fetched
    return <p>Loading profile...</p>;
  }
*/
  const onSubmit = async (data) => {
    try {
      try {
        console.log(data);
        // await axios.put("http://localhost:4000/jobs", data);
        console.log("Edit profile successful");
      } catch (error) {
        console.error("Error: unable to edit", error);
      }
      //navigate("/recruiter/jobpostings");
    } catch (error) {
      console.error("Error during edit profile", error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <RecruiterSidebar />
        <div className="bg-Background w-full flex justify-center">
          <div className="w-[960px] py-8 space-y-4">
            <div className="Title text-Headline4 text-DarkGray font-Montserrat font-normal tracking-[0.25px]">
              Profile
            </div>

            {profile === null ? (
              <p className=" text-Headline6 text-DarkGray font-Montserrat font-medium animate-pulse ">
                Loading profile. . .
              </p>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <div className="PersonalInfo w-full p-2 ">
                    <div className="w-[300px] space-y-2">
                      <FormField
                        control={form.control}
                        name="companyLogo"
                        defaultValue={profile.company_logo}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-row items-center space-x-2">
                              <img
                                src={profile.company_logo}
                                alt="Preview"
                                className="rounded-lg"
                                style={{ maxWidth: "80px" }}
                              />
                              <div className="w-full space-y-1 text-Gray">
                                <FormLabel>COMPANY LOGO</FormLabel>
                                <FormControl>
                                  <div className="w-fit flex flex-row items-center space-x-2">
                                    <label
                                      className="w-[134px]  bg-Pink text-white hover:bg-LightPink active:bg-DarkPink h-9 p-2 rounded-lg space-x-2 flex flex-row"
                                      htmlFor="imageInput"
                                    >
                                      <img
                                        src={FileInputIcon}
                                        alt="File Input"
                                      />
                                      <div className="w-[90px] font-Inter font-normal text-Body2 text-White tracking-[0.25px]">
                                        Choose a file
                                      </div>
                                    </label>
                                    <Input
                                      type="file"
                                      className="block w-[100px] h-full text-Body2  border-0 p-0  bg-Background file:hidden"
                                      id="imageInput"
                                      accept=".jpg, .png, .jpeg, .gif"
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription>
                                  <div className="text-LightGray ">
                                    PNG, JPEC, IMG
                                  </div>
                                </FormDescription>
                              </div>
                            </div>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyEmail"
                        defaultValue={profile.email}
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
                        defaultValue={profile.company_name}
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
                        defaultValue={profile.company_website}
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
                        defaultValue={profile.about_company}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ABOUT THE COMPANY</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Descrip the company"
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default RecruiterProfile;
