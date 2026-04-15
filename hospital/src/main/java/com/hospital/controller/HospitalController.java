package com.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.model.Appointment;
import com.hospital.model.Doctor;
import com.hospital.model.Patient;
import com.hospital.model.User;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class HospitalController {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/patient")
    public Patient addPatient(@RequestBody Patient p) {
        return patientRepo.save(p);
    }

    @GetMapping("/patients")
    public List<Patient> getPatients() {
        return patientRepo.findAll();
    }

    @PostMapping("/appointment")
    public Appointment book(@RequestBody Appointment a) {
        return appointmentRepo.save(a);
    }

    @GetMapping("/appointments")
    public List<Appointment> getAppointments() {
        return appointmentRepo.findAll();
    }

    @Autowired
    private DoctorRepository doctorRepo;
    
    @GetMapping("/doctors")
    public List<Doctor> getDoctors() {
        return doctorRepo.findAll();
    }

    // Create user
    @PostMapping("/user")
    public User createUser(@RequestBody User user) {
        return userRepo.save(user);
    }

    // Login
    @PostMapping("/login")
public User login(@RequestBody User user) {
    User u = userRepo.findByUsername(user.getUsername());

    if (u != null && u.getPassword().equals(user.getPassword())) {
        return u;
    }

    return null;
}
}