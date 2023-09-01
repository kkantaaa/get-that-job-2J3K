import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegisterPage1 from "./pages/UserRegisterPage1.jsx";
import UserRegisterPage2 from "./pages/UserRegisterPage2.jsx";
import UserRegisterPage3 from "./pages/UserRegisterPage3.jsx";
import LoginPage from "./pages/UserLoginPage.jsx";
import "./App.css";

function App() {
  const NoMatch = () => <h1>Page Not Found.</h1>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user/register1" element={<UserRegisterPage1 />} />
          <Route path="/user/register2" element={<UserRegisterPage2 />} />
          <Route path="/user/register3" element={<UserRegisterPage3 />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
