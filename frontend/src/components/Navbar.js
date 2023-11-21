import React, { useContext, useState, useEffect } from "react";
// import UserContext from "../UserContext";
import {useNavigate} from 'react-router-dom';


const Navbar = () => {

    // const [currentUser, setCurrentUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogOut = () => {
        localStorage.removeItem('user');
        // setCurrentUser({});
        navigate('/');
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const user = localStorage.getItem('user');
              if (user) {
                setCurrentUser(JSON.parse(user));
                console.log(currentUser);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
        
          fetchUserData();
    }, [])

    return (
        <>
        {currentUser ? 
             <div style={{height: "100px", backgroundColor: "#C7DCA7", display: "flex", justifyContent: "space-between"}}>
                   <div style={{display: "flex", alignItems: "center", marginLeft: "30px", fontSize: "20px"}}>
                       <a style={{textDecoration: "none"}} href='/'><p>Online Caregivers Platform</p></a>
    
                   </div>
                   <div style={{display: "flex", alignItems: "center", marginRight: "50px"}}>
                    {currentUser.role == "caregiver" &&
                        <> 
                            <div style={{marginRight: "40px"}}>
                                <b><a style={{textDecoration: "none"}} href='/received_appointments'>My appointments</a></b>
                            </div>
                            <div style={{marginRight: "40px"}}>
                                <b><a style={{textDecoration: "none"}} href='/all_jobs'>Jobs</a></b>
                            </div>
                       </>
                    }
                    {currentUser.role == "member" && 
                        <>
                            <div style={{marginRight: "40px"}}>
                                <b><a style={{textDecoration: "none"}} href='/jobs'>My posted jobs</a></b>
                            </div>
                            <div style={{marginRight: "40px"}}>
                                <b><a style={{textDecoration: "none"}} href='/job_applications'>Received Job Applications</a></b>
                            </div>
                            <div style={{marginRight: "40px"}}>
                                <b><a style={{textDecoration: "none"}} href='/caregivers'>Caregivers</a></b>
                            </div>
                            <div style={{marginRight: "40px"}}>
                                <b><a style={{textDecoration: "none"}} href='/appointments'>Appointments</a></b>
                            </div>
                        </>
                    }

                       <div style={{marginRight: "100px"}}>
                           <b><a style={{textDecoration: "none"}} href='/logout' onClick={() => handleLogOut()}>Logout</a></b>
                       </div>
                   </div>
              </div>
        : 
           <div style={{height: "100px", backgroundColor: "#C7DCA7", display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center", marginLeft: "30px", fontSize: "20px"}}>
                    <a style={{textDecoration: "none"}} href='/'><p>Online Caregivers Platform</p></a>
 
                </div>
                <div style={{display: "flex", alignItems: "center", marginRight: "50px"}}>
                    <div style={{marginRight: "100px"}}>
                        <b><a style={{textDecoration: "none"}} href='/register'>Sign up as a Caregiver/Member</a></b>
                    </div>
                    <div style={{marginRight: "100px"}}>
                        <b><a style={{textDecoration: "none"}} href='/login'>Sign in</a></b>
                    </div>
                </div>
           </div>
        }
        </>
    );
};
 
export default Navbar;