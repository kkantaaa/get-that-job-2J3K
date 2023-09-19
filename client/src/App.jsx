import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/authentication.jsx";
import UserRegisterPage1 from "./pages/UserRegisterPage1.jsx";
import UserRegisterPage2 from "./pages/UserRegisterPage2.jsx";
import UserRegisterPage3 from "./pages/UserRegisterPage3.jsx";
import RecruitRegisterPage1 from "./pages/RecruitRegisterPage1.jsx";
import RecruitRegisterPage2 from "./pages/RecruitRegisterPage2.jsx";
import UserLoginPage from "./pages/UserLoginPage.jsx";
import RecruiterLoginPage from "./pages/RecruiterLoginPage.jsx";
import Homepage from "@/pages/HomePage.jsx";
import JobPosting from "@/pages/Recruiter/JobPostingPage.jsx";
import CreateJobPosting from "@/pages/Recruiter/CreateJobPostingPage.jsx";
import RecruiterProfile from "@/pages/Recruiter/RecruiterProfile.jsx";
import FindThatJobPage from "./pages/FindThatJobPage.jsx";
import JobDetail from "./pages/JobDetail.jsx";
import "./App.css";
import { ContextProvider } from "./contexts/registerContexts.jsx";
import ApplicationApplyPage from "./pages/ApplicationApplyPage.jsx";

function App() {
  // const auth = useAuth(); // ใช้ useAuth เพื่อเข้าถึงสถานะการลงชื่อเข้าใช้

  const NoMatch = () => <h1>Page Not Found.</h1>;

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ContextProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/user/login" element={<UserLoginPage />} />
              <Route path="/recruiter/login" element={<RecruiterLoginPage />} />

              <Route path="/user/register1" element={<UserRegisterPage1 />} />
              <Route path="/user/register2" element={<UserRegisterPage2 />} />
              <Route path="/user/register3" element={<UserRegisterPage3 />} />
              <Route
                path="/recruiter/register1"
                element={<RecruitRegisterPage1 />}
              />
              <Route
                path="/recruiter/register2"
                element={<RecruitRegisterPage2 />}
              />
              <Route path="/user/findthatjob" element={<FindThatJobPage />} />
              {
                //kan's Route : tbd put auth
              }
              <Route
                path="/user/jobs/apply/:jobparams"
                element={<ApplicationApplyPage />}
              />
              <Route path="/recruiter/jobpostings" element={<JobPosting />} />

              <Route
                path="/recruiter/createjobposting"
                element={<CreateJobPosting />}
              />

              <Route
                path="/recruiter/recruiterprofile"
                element={<RecruiterProfile />}
              />
              {/* เพิ่มเงื่อนไขเพื่อตรวจสอบว่าผู้ใช้ลงชื่อเข้าใช้หรือไม่
              {auth.isLoggedIn && (
                <Route
                  path="/recruiter/createjobposting"
                  element={<CreateJobPosting />}
                />
              )} */}

              <Route path="/user/jobs/:job_id" element={<JobDetail />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </ContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
