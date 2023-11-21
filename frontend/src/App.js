// import './App.css'
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Register";
import Login from "./components/Login";
import NoPage from "./components/NoPage"
import AppointmentList from "./components/AppointmentList";
import CaregiverList from "./components/CaregiverList";

import "bootstrap/dist/css/bootstrap.min.css"

import UserContext, { UserProvider } from "./UserContext";
import JobList from "./components/Jobs";
import JobsCaregiver from "./components/JobsCaregiver";
import AppointmentListCaregiver from "./components/AppointmentListCaregiver"
import JobApplicationList from "./components/JobApplicationList"


function App() {

  // const {userRole} = useUser();

  return (
    <>
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home />}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/appointments' element={<AppointmentList/>}/>
            <Route path='/caregivers' element={<CaregiverList/>}/>
            <Route path='/job_applications' element={<JobApplicationList/>}/>
            <Route path='/jobs' element={<JobList/>}/>
            <Route path='/all_jobs' element={<JobsCaregiver/>}/>
            <Route path='/received_appointments' element={<AppointmentListCaregiver/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
