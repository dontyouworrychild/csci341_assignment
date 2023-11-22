import React, { useEffect, useState } from 'react';

import './CaregiverList.css'
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/css/bootstrap.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
// import MakeAppointment from './MakeAppointment';
const url = "http://77.243.80.52:8001";
export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [selectedApply, setSelectedApply] = useState(false);
  const [update, setUpdate] = useState(false);
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  const handleApply = async (job) => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${url}/job_applications/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ job })
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.log("There are some problems with handle apply");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setUpdate(!update);
  }

  const fetchData = async () => {
    try {
    const token = localStorage.getItem('token')
      const response = await fetch(`${url}/api/all_jobs/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        console.log(data);
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

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
            <h1>Jobs that are available</h1>
            </div>
          <ul className="list-group list-group-flush" style={{ width: "700px" }}>
            {jobs && jobs.map((job, index) => (
              <li
                key={job.id}
                className="list-group-item"
                style={{ cursor: "pointer" }}
              >
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", height: "50px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                    {index + 1} | {job.required_caregiving_type} | posted at {formatDate(job.date_posted)}
                    </div>
                    {job.applied ? 
                    <button className='button button4' style={{width: "150px", backgroundColor: "#5F9DD8", color: "white"}} >
                        You applied
                    </button> : 
                    <button onClick={() => handleApply(job.id)} className='button button4' style={{width: "150px"}} >
                        Apply
                    </button>
                    }
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </>
    </>
  );
}
