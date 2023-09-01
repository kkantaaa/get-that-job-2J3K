import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import UserRegisterPage1 from './pages/UserRegisterPage1.jsx'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
    <Router>
      <Routes>
        <Route path ="/register1" element={<UserRegisterPage1/>}/>
      </Routes>
    </Router>
    </BrowserRouter>
    </>
  )
}

export default App
