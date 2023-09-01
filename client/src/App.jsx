import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRegisterPage1 from "./pages/UserRegisterPage1.jsx";
import "./App.css";
import LoginPage from "./pages/UserLoginPage.jsx";

function App() {
  const NoMatch = () => <h1>Page Not Found.</h1>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user/register1" element={<UserRegisterPage1 />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
