import React, { useState } from "react";
import { useEffect } from "react";
import { FaHospitalSymbol } from "react-icons/fa";

import axios from "axios";
import "./App.css";

function Dashboard({ setIsLoggedIn, user }) {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [doctors, setDoctors] = useState([]);
const [selectedDoctor, setSelectedDoctor] = useState("");
const [timeSlot, setTimeSlot] = useState("");
const [diagnosis, setDiagnosis] = useState("");
const [prescription, setPrescription] = useState("");
const [notes, setNotes] = useState("");


  const bookAppointment = () => {
  axios.post("http://localhost:8080/api/appointment", {
    patientName: name,
    doctorName: selectedDoctor,
    timeSlot: timeSlot,
    date: "2026-04-16",
    diagnosis: diagnosis,
    prescription: prescription,
    notes: notes
  }).then(() => {
    alert("Appointment Booked!");
    fetchAppointments();
  });
  setName("");
  setSelectedDoctor("");
  setTimeSlot("");
  setDiagnosis("");
  setPrescription("");
  setNotes("");
};

  const fetchAppointments = () => {
    axios.get("http://localhost:8080/api/appointments")
      .then((res) => setAppointments(res.data));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
  axios.get("http://localhost:8080/api/doctors")
    .then((res) => setDoctors(res.data));

  fetchAppointments();
}, []);

  return (
    <div className="dashboard">
      
      {/* Header */}
      <div className="header">
      <h2 className="logo" onClick={fetchAppointments}>
  <FaHospitalSymbol className="logo-icon" />
  Vishal Mega Hospital
</h2>

        <div className="profile-section">
          <div 
            className="profile-icon"
            onClick={() => setShowProfile(!showProfile)}
            >
            👤
          </div>

          {showProfile && (
  <div className="profile-dropdown">
    <div className="profile-info">
      <div className="avatar">👤</div>
      <div>
        <p className="welcome">
  Hello, {user?.username || "Vishal"} 👋
</p>

<p className="email">
  {user?.email || "vishaldhiman@gmail.com"}
</p>
      </div>
    </div>

    <button className="logout-btn" onClick={logout}>
      Logout
    </button>
  </div>
)}       </div>
 
      </div>

      <div className="main">

        {/* Left Side */}
        <div className="left-panel">
          <h3>Book Appointment</h3>

          <input
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


<select
  value={selectedDoctor}
  onChange={(e) => setSelectedDoctor(e.target.value)}
>
  <option value="">Select Doctor</option>
  {doctors.map((doc) => (
    <option key={doc.id} value={doc.name}>
      {doc.name} ({doc.specialization})
    </option>
  ))}
</select>

<select
  value={timeSlot}
  onChange={(e) => setTimeSlot(e.target.value)}
>
  <option value="">Select Time Slot</option>
  <option>09:00 AM</option>
  <option>10:00 AM</option>
  <option>11:00 AM</option>
  <option>02:00 PM</option>
  <option>03:00 PM</option>
</select>
<input
  placeholder="Diagnosis"
  value={diagnosis}
  onChange={(e) => setDiagnosis(e.target.value)}
/>

<input
  placeholder="Prescription"
  value={prescription}
  onChange={(e) => setPrescription(e.target.value)}
/>

<input
  placeholder="Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>
          <button onClick={bookAppointment}>
            Book Appointment
          </button>
        </div>

        {/* Right Side */}
        <div className="right-panel">
          <div className="appointments-header">
            <h3>Appointments</h3>
            <button className="refresh-btn" onClick={fetchAppointments}>
            ⟳
            </button> 
            </div>

          <div className="appointments-list">
            {appointments.map((a, index) => (
              <div key={index} className="card">
  <p><strong>👤</strong> {a.patientName}</p>
  <p><strong>🩺</strong> {a.doctorName}</p>
  <p><strong>📅</strong> {a.date}</p>
  <p><strong>⏰</strong> {a.timeSlot}</p>

  <hr />

  <p><strong>🧾 Diagnosis:</strong> {a.diagnosis}</p>
  <p><strong>💊 Prescription:</strong> {a.prescription}</p>
  <p><strong>📝 Notes:</strong> {a.notes}</p>
</div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;