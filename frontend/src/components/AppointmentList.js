import React, { useEffect, useState } from 'react';

import './CaregiverList.css'
import 'bootstrap/dist/css/bootstrap.css'; 
// import MakeAppointment from './MakeAppointment';
const url = "http://77.243.80.52:8001";
export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }
  function convertToShortTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
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
        const reversedData = [...data].reverse();
        setAppointments(reversedData);
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
                            {appointment.caregiver.given_name} {appointment.caregiver.surname}
                        </div>
                        <div style={{marginLeft: "10px"}}>
                            {appointment.work_hours} hours
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        {appointment.status == "Rejected" ? (
                            <p style={{color: "red"}}>Rejected</p>
                        ) 
                         : (appointment.status == "Accepted" ? 
                         (<p style={{color: "green"}}>Accepted</p>) : 
                         (<p style={{color: "gray"}}>Scheduled</p>))
                         }
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
