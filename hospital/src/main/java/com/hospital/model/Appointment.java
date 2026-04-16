package com.hospital.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String phoneNumber;
    private Long doctorId;
    private String date;
    private String time;
    private String reason;
}