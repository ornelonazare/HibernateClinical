package com.example.restservice.models.doctor;

import com.example.restservice.models.invoice.Invoice;
import com.example.restservice.models.item.Item;
import com.example.restservice.models.patient.Patient;
import com.example.restservice.models.reports.Report;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="doctor")
@Data
@SuperBuilder
@NoArgsConstructor
//@AllArgsConstructor
public class Doctor implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String doctorname;
    private String speciality;
    private String doctor_address;
    private String hospital_name;
    private String about;
    private String profile_picture;

    @OneToMany(mappedBy = "patient_doctor",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Patient> patients = new ArrayList<>();

    @OneToMany(mappedBy = "report_doctor",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Report> report_doctors = new ArrayList<>();

    @OneToMany(mappedBy = "report_followupdoctor",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Report> report_followupdoctors = new ArrayList<>();

    public Doctor(String doctorname, String speciality, String doctor_address, String hospital_name, String about, String profile_picture) {
        this.doctorname = doctorname;
        this.speciality = speciality;
        this.doctor_address = doctor_address;
        this.hospital_name = hospital_name;
        this.about = about;
        this.profile_picture = profile_picture;
    }

    public void addPatient(Patient patient) {
        patients.add(patient);
        patient.setPatient_doctor(this);
    }
}
