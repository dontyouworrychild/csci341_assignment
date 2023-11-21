
import React, { useState } from "react"
import {useNavigate} from 'react-router-dom';
import './Login.css'
const url = "http://77.243.80.52";
export default function (props) {
  let [authMode, setAuthMode] = useState("member")
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "member" ? "caregiver" : "member")
  }
  const [emailMember, setEmailMember] = useState("");
  const [passwordMember, setPasswordMember] = useState("");
  const [givenNameMember, setGivenNameMember] = useState("");
  const [surnameMember, setSurnameMember] = useState("");
  const [cityMember, setCityMember] = useState("");
  const [phoneNumberMember, setPhoneNumberMember] = useState("");
  const [profileDescriptionMember, setProfileDescriptionMember] = useState("");
  const [houseRulesMember, setHouseRulesMember] = useState("");

  const [errorMember, setErrorMember] = useState("");
  const [errorCaregiver, setErrorCaregiver] = useState("");

  const handleSubmitMember = async (event) => {
    event.preventDefault();
    const response = await fetch(`${url}/register_member/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailMember, password: passwordMember, password2: passwordMember, given_name: givenNameMember, surname: surnameMember, city: cityMember, phone_number: phoneNumberMember, profile_description: profileDescriptionMember, house_rules: houseRulesMember })
    });

    if(response.ok) {
      const data = await response.json();
      console.log(data);
      navigate('/login')
    } else {
      setErrorMember("There are errors in filling form");
      setTimeout(() => {
        setErrorMember("");
      }, 3000);
    }
  } 

  const [emailCaregiver, setEmailCaregiver] = useState("");
  const [passwordCaregiver, setPasswordCaregiver] = useState("");
  const [givenNameCaregiver, setGivenNameCaregiver] = useState("");
  const [surnameCaregiver, setSurnameCaregiver] = useState("");
  const [cityCaregiver, setCityCaregiver] = useState("");
  const [phoneNumberCaregiver, setPhoneNumberCaregiver] = useState("");
  const [profileDescriptionCaregiver, setProfileDescriptionCaregiver] = useState("");
  const [caregivingTypeCaregiver, setCaregivingTypeCaregiver] = useState("");
  const [genderCaregiver, setGenderCaregiver] = useState("");
  const [hourlyRateCaregiver, setHourlyRateCaregiver] = useState("");

  const handleSubmitCaregiver = async (event) => {
    event.preventDefault();
    const response = await fetch(`${url}/register_caregiver/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailCaregiver, password: passwordCaregiver, password2: passwordCaregiver, given_name: givenNameCaregiver, surname: surnameCaregiver, city: cityCaregiver, phone_number: phoneNumberCaregiver, profile_description: profileDescriptionCaregiver, caregiving_type: caregivingTypeCaregiver, gender: genderCaregiver, hourly_rate: hourlyRateCaregiver })
    });
    if(response.ok) {
      const data = await response.json();
      console.log(data);
      navigate('/login')
    } else {
      setErrorCaregiver("There are errors in filling form")
      setTimeout(() => {
        setErrorCaregiver("");
      }, 3000);
    }
  }

  if (authMode === "member") {

    return (
        <div className="Auth-form-container" style={{marginTop: "246px"}}>
        <form className="Auth-form" onSubmit={handleSubmitMember}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up as a Member</h3>
            <div className="text-center" style={{cursor: "pointer"}}>
              Register as a Caregiver? {""}
              <span className="link-primary" onClick={changeAuthMode}>
                 Yes
              </span>
            </div>
            <span style={{color: "red", fontSize: "12px"}}>{errorMember}</span>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="user@gmail.com"
                value={emailMember}
                onChange={(e) => setEmailMember(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="password"
                value={passwordMember}
                onChange={(e) => setPasswordMember(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Given name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Bekzat"
                value={givenNameMember}
                onChange={(e) => setGivenNameMember(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Surname</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Kumarov"
                value={surnameMember}
                onChange={(e) => setSurnameMember(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>City</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Astana"
                value={cityMember}
                onChange={(e) => setCityMember(e.target.value)}
             
              />
            </div>
            <div className="form-group mt-3">
              <label>Phone number</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="+77013223344"
                value={phoneNumberMember}
                onChange={(e) => setPhoneNumberMember(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Profile description</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="I am working for 5 years..."
                value={profileDescriptionMember}
                onChange={(e) => setProfileDescriptionMember(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>House Rules</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="No pets."
                value={houseRulesMember}
                onChange={(e) => setHouseRulesMember(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container" style={{marginTop: "328px"}}>
      <form className="Auth-form" onSubmit={handleSubmitCaregiver}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up as a Caregiver</h3>
          <div className="text-center" style={{cursor: "pointer"}}>
          Register as a Member? {""}
            <span className="link-primary" onClick={changeAuthMode}>
              Yes
            </span>
          </div>
          <span style={{color: "red", fontSize: "12px"}}>{errorCaregiver}</span>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="user@gmail.com"
              value={emailCaregiver}
              onChange={(e) => setEmailCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="password"
              value={passwordCaregiver}
              onChange={(e) => setPasswordCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Given name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Asset"
              value={givenNameCaregiver}
              onChange={(e) => setGivenNameCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Surname</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Berdibek"
              value={surnameCaregiver}
              onChange={(e) => setSurnameCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>City</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Astana"
              value={cityCaregiver}
              onChange={(e) => setCityCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Phone number</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="+77013223344"
              value={phoneNumberCaregiver}
              onChange={(e) => setPhoneNumberCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Profile description</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="I am working for 5 years..."
              value={profileDescriptionCaregiver}
              onChange={(e) => setProfileDescriptionCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Caregiving type</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Elderly care"
              value={caregivingTypeCaregiver}
              onChange={(e) => setCaregivingTypeCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Gender</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Male/Female"
              value={genderCaregiver}
              onChange={(e) => setGenderCaregiver(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Hourly Rate</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="5"
              value={hourlyRateCaregiver}
              onChange={(e) => setHourlyRateCaregiver(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
