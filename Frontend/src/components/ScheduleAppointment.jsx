import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import "../styles/MedicalPage.css";
import DateTimeSelection from './DateTimeSelection';
const ScheduleAppointment = () => {
  const [doctors, setDoctors] = useState([]);

  const [allDoctorsView,set_allDoctorsView] = useState(true);
  const [particularDoctor,set_particularDoctor] = useState();
  const [id,setid]=useState();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get("doctors");
        setDoctors(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        
      }
    };

    fetchDoctors();
  }, []);


  return (
<div className="container">
  {allDoctorsView && <div className="row">
    {doctors.map((item, index) => (
      <button className="btn btn-success col-3" key={index} onClick={()=>{
        set_allDoctorsView(false);
        set_particularDoctor(true);
        setid(item._id);
      }}>
        <h1>{item.firstName}</h1>
        <p>{item.specialization}</p>
        <p>{item.experienceYears}</p>
        <p>{item._id}</p>
      </button>
    ))}


    
  </div>}
  {particularDoctor && <DateTimeSelection id={id}/>}
</div>

  );
};

export default ScheduleAppointment;
