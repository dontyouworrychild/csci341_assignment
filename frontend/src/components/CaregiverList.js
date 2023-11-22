import React, { useEffect, useState } from 'react';

import './CaregiverList.css'
import 'bootstrap/dist/css/bootstrap.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
// import MakeAppointment from './MakeAppointment';
const url = "http://77.243.80.52:8001";
export default function AppointmentList() {
  const [caregivers, setCaregivers] = useState([]);
  const [madeAppointment, setMadeAppointment] = useState([]);
  const [token, setToken] = useState();
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const handleMakeAppointment = (caregiver) => {
    setSelectedCaregiver(caregiver);
  };


  const fetchData = async () => {
    try {
      const response = await fetch(`${url}/caregivers/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCaregivers(data);
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
    {selectedCaregiver ? (
      <MakeAppointment caregiver={selectedCaregiver} setSelectedCaregiver={setSelectedCaregiver}/>
    ) : (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div>
          <h1>Caregivers</h1>
          <ul className="list-group list-group-flush" style={{ width: "400px" }}>
            {caregivers.map((caregiver, index) => (
              <li
                key={caregiver.id}
                className="list-group-item"
                style={{ cursor: "pointer" }}
              >
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                    {index+1} | {caregiver.given_name} {caregiver.surname}
                    </div>
                    <button onClick={() => handleMakeAppointment(caregiver)} className='button button4' >
                        Make Appointment
                    </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
    </>
  );
}



  
function MakeAppointment({caregiver, setSelectedCaregiver}) { 

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [workHours, setWorkHours] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try { 
            const response = await fetch(`${url}/appointments/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({appointment_date: date, appointment_time: time, work_hours: workHours, caregiver: caregiver.id})
              });
              if(response.ok) {
                const data = await response.json()
                console.log(data);
                setSelectedCaregiver(false);
              }
        } catch(error) {
            console.error(error);
        }
    }

  return ( 
    <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{ display: 'block',  
                    width: 700,  
                    padding: 30 }}>
        <Button style={{marginLeft: "110px"}} onClick={() => setSelectedCaregiver(null)}>
            Go back
        </Button>
        <div style={{display: "flex", justifyContent: 'center', marginBottom: "20px"}}>
            <h4>Appointment form</h4>
        </div>
        <div style={{display: "flex", justifyContent: 'center', marginBottom: "20px"}}>
            <h4>{caregiver.given_name} {caregiver.surname}</h4>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
        <Form style={{width: "400px"}} onSubmit={handleSubmit}> 
        <Form.Group> 
            <Form.Label>Choose data</Form.Label> 
            <Form.Control type="text" 
                            placeholder="2023-12-19" value={date} onChange={(e) => setDate(e.target.value)} /> 
            </Form.Group> 
            <Form.Group> 
            <Form.Label>Choose time:</Form.Label> 
            <Form.Control type="text" 
                            placeholder="15:00:00" value={time} onChange={(e) => setTime(e.target.value)}/> 
            </Form.Group> 
            <Form.Group> 
            <Form.Label>Work hours:</Form.Label> 
            <Form.Control type="text" placeholder="5" value={workHours} onChange={(e) => setWorkHours(e.target.value)}/> 
            </Form.Group> 
            <Button variant="primary" type="submit" style={{marginTop: "20px"}}> 
                Make an appointment 
            </Button> 
        </Form> 
        </div>
        </div> 
    </div>
  ); 
}
