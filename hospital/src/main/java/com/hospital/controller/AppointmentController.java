package com.hospital.controller;

import com.hospital.model.Appointment;
import com.hospital.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository repo;

    // Book Appointment
    @PostMapping("/appointments")
    public Appointment book(@RequestBody Appointment appointment) {
        return repo.save(appointment);
    }

    // Get all appointments
    @GetMapping("/appointments")
    public List<Appointment> getAll() {
        return repo.findAll();
    }

    // Get by doctor
    @GetMapping("/appointments/doctor/{doctorId}")
    public List<Appointment> getByDoctor(@PathVariable Long doctorId) {
        return repo.findByDoctorId(doctorId);
    }

    // Get by patient
    @GetMapping("/appointments/patient/{patientName}")
    public List<Appointment> getByPatient(@PathVariable String patientName) {
        return repo.findByPatientName(patientName);
    }

    // Get by phone number
    @GetMapping("/appointments/phone/{phoneNumber}")
    public List<Appointment> getByPhone(@PathVariable String phoneNumber) {
        return repo.findByPhoneNumber(phoneNumber);
    }
}