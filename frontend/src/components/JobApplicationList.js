import React, { useEffect, useState } from 'react';

import './CaregiverList.css'
import 'bootstrap/dist/css/bootstrap.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
// import MakeAppointment from './MakeAppointment';
const url = "http://77.243.80.52";
export default function AppointmentList() {
  const [jobApplications, setJobApplications] = useState([]);


  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${url}/api/my_job_applications/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobApplications(data);
      } else {
        console.log("There are some problems");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div>
          <h1>Received Job Applications</h1>
          <ul className="list-group list-group-flush" style={{ width: "400px" }}>
            {jobApplications.map((jobApplication, index) => (
              <li
                key={jobApplications.id}
                className="list-group-item"
                style={{ cursor: "pointer" }}
              >
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                    {index+1} | {jobApplication.caregiver.given_name} {jobApplication.caregiver.surname} applied to {jobApplication.job.required_caregiving_type}
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

