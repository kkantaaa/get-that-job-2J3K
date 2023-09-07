import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication.jsx";
import UserRegisterPage1 from "./pages/UserRegisterPage1.jsx";
import UserRegisterPage2 from "./pages/UserRegisterPage2.jsx";
import UserRegisterPage3 from "./pages/UserRegisterPage3.jsx";
import RecruitRegisterPage1 from "./pages/RecruitRegisterPage1.jsx";
import RecruitRegisterPage2 from "./pages/RecruitRegisterPage2.jsx";
import UserLoginPage from "./pages/UserLoginPage.jsx";
import RecruiterLoginPage from "./pages/RecruiterLoginPage.jsx";
import Homepage from "@/pages/HomePage.jsx";
import FindThatJobPage from "./pages/FindThatJobPage.jsx";
import JobPostings from "./pages/JobPostingsPage.jsx";
import "./App.css";
import { ContextProvider } from "./contexts/registerContexts.jsx";

function App() {
  const NoMatch = () => <h1>Page Not Found.</h1>;

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ContextProvider>
            {" "}
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
              <Route path="/recruiter/jobpostings" element={<JobPostings />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </ContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
