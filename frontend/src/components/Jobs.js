import React, { useEffect, useState } from 'react';

import './CaregiverList.css'
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/css/bootstrap.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
import {useNavigate} from 'react-router-dom';
// import MakeAppointment from './MakeAppointment';
const url = "http://77.243.80.52";
export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [selectedCreateJob, setSelectedCreateJob] = useState(false);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/api/my_posted_jobs/`, {
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
  }, [selectedCreateJob])

  return (
    <>
    {selectedCreateJob ? (
        <>
            <CreateJob setSelectedCreateJob={setSelectedCreateJob}/>
        </>
    ) : (
        <>
    <div style={{display: "flex", justifyContent: 'center', marginTop: "30px"}}>
        <Button style={{width: "200px"}} onClick={() => setSelectedCreateJob(true)}>
            Create job
        </Button>
    </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div>
          <h1>My posted jobs</h1>
          <ul className="list-group list-group-flush" style={{ width: "450px" }}>
            {jobs.map((jobs, index) => (
              <li
                key={jobs.id}
                className="list-group-item"
                style={{ cursor: "pointer" }}
              >
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", height: "50px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                    {index+1} | {jobs.required_caregiving_type}
                    </div>
                    <div>
                        Posted: {jobs.date_posted}
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </>
    )}
    </>
  );
}


function CreateJob({setSelectedCreateJob}) { 
    const [type, setType] = useState("");
    const [otherRequirements, setOtherRequirements] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token')
        try { 
            const response = await fetch(`${url}/jobs/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({required_caregiving_type: type, other_requirements: otherRequirements})
              });
              if(response.ok) {
                const data = await response.json()
                console.log(data);
                setSelectedCreateJob(false);
              }
        } catch(error) {
            console.error(error);
        }


      };
    return ( 
      <div style={{display: "flex", justifyContent: "center"}}>
          <div style={{ display: 'block',  
                      width: 700,  
                      padding: 30 }}>
          <Button style={{marginLeft: "110px"}} onClick={() => setSelectedCreateJob(false)}>
              Go back
          </Button>
          <div style={{display: "flex", justifyContent: 'center', marginBottom: "20px"}}>
              <h4>Form for creating a job</h4>
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
          <Form style={{width: "400px"}} onSubmit={handleSubmit}> 
          <Form.Group> 
              <Form.Label>Required caregiving type:</Form.Label> 
              <Form.Control type="text" 
                              placeholder="Elderly people" value={type} onChange={(e) => setType(e.target.value)}/> 
              </Form.Group> 
              <Form.Group> 
              <Form.Label>Other requirements:</Form.Label> 
              <Form.Control type="text" 
                              placeholder="No pets." value={otherRequirements} onChange={(e) => setOtherRequirements(e.target.value)} /> 
              </Form.Group> 
              <Button variant="primary" type="submit" style={{marginTop: "20px"}}> 
                  Create a job
              </Button> 
          </Form> 
          </div>
          </div> 
      </div>
    ); 
  }
