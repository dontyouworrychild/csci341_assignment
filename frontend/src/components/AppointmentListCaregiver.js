import React, { useEffect, useState } from 'react';

import './CaregiverList.css'
import 'bootstrap/dist/css/bootstrap.css'; 
import { Button } from 'react-bootstrap';
// import MakeAppointment from './MakeAppointment';

const url = "http://77.243.80.52:8001";
export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [update, setUpdate] = useState(false);
  
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  function convertToShortTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  const handleReply = async ({id, status_answer}) => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${url}/appointments/${id}/`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: status_answer })
        })
        if(response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log("There are certain problme bruh");
        }
        setUpdate(!update);
    } catch(error) {
        console.error(error);
    }
  }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/api/my_appointments/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const filteredAppointments = data.filter(appointment => 
            appointment.status === "Scheduled" || appointment.status === "Accepted"
          );
        setAppointments(filteredAppointments);
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
  }, [update])

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <div>
          <h1>Appointments</h1>
          <ul className="list-group list-group-flush" style={{ width: "600px", }}>
            {appointments.map((appointment, index) => (
              <li
                key={appointment.id}
                className="list-group-item"
                style={{ cursor: "pointer" }}
              >
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", height: "50px"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div>
                            {formatDate(appointment.appointment_date)} {convertToShortTime(appointment.appointment_time)}
                        </div>
                        <div style={{marginLeft: "10px"}}>
                            {appointment.member.given_name} {appointment.member.surname}
                        </div>
                        <div style={{marginLeft: "10px"}}>
                            {appointment.work_hours} hours
                        </div>
                    </div>
                    {appointment.status == "Scheduled" ? (
                        <div>
                        <Button style={{marginRight: "15px", backgroundColor: "green", border: "1px green"}} onClick={() => handleReply({id:appointment.id, status_answer:"Accepted"})}>
                            Accept
                        </Button>
                        <Button style={{backgroundColor: "red", border: "1px red"}} onClick={() => handleReply({id:appointment.id, status_answer:"Rejected"})}>
                            Reject
                        </Button>
                    </div>
                    ) : (
                        <div>
                        Accepted
                    </div>
                    )}
                    
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
