import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/authentication.jsx'
import React from 'react'
import UserRegisterPage1 from './pages/UserRegisterPage1.jsx'
import UserRegisterPage2 from './pages/UserRegisterPage2.jsx'
import UserRegisterPage3 from './pages/UserRegisterPage3.jsx'
import RecruitRegisterPage1 from './pages/RecruitRegisterPage1.jsx'
import RecruitRegisterPage2 from './pages/RecruitRegisterPage2.jsx'
import './App.css'

function App() {
  const NoMatch = () => <h1>Page Not Found.</h1>

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path ="/user/register1" element={<UserRegisterPage1/>}/>
        <Route path ="/user/register2" element={<UserRegisterPage2/>}/>
        <Route path ="/user/register3" element={<UserRegisterPage3/>}/>
        <Route path ="/recruiter/register1" element={<RecruitRegisterPage1/>}/>
        <Route path ="/recruiter/register2" element={<RecruitRegisterPage2/>}/>
        <Route path ="*" element={<NoMatch/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
