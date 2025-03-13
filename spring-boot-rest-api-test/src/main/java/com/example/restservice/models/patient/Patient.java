package com.example.restservice.models.patient;

import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.invoice.Invoice;
import com.example.restservice.models.reports.Report;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static jakarta.persistence.ConstraintMode.NO_CONSTRAINT;

@Entity
@Table(name="patient")
@Data
@SuperBuilder
@NoArgsConstructor
//@AllArgsConstructor

public class Patient implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dob;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate entrydate ;
    private Integer age;
    private String gender;
    private String occupation;
    private String healthinsuranceno;
    private String healthcareprovider;
    private String patientaddress;
    private Integer contact;

    /*@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="patient_doctor_id")
    private Doctor patient_doctor;
    //private Integer doctorid;*/
    @Column(name="patient_doctor_id")
    private Integer patient_doctor;

    @OneToOne(mappedBy = "patient_invoice",
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonIgnore
    private Invoice invoice_patient;

    @OneToMany(
            cascade = CascadeType.ALL, orphanRemoval = false)
    @JsonIgnore
    @JoinColumn(name = "report_patient_id")
    private List<Report> report_patients = new ArrayList<>();


    public Patient(String name,LocalDate entrydate ,LocalDate dob, Integer age, String gender, String occupation, String healthinsuranceno, String healthcareprovider, String patientaddress, Integer contact) {
        this.name = name;
        this.entrydate = entrydate;
        this.dob = dob;
        this.age = age;
        this.gender = gender;
        this.occupation = occupation;
        this.healthinsuranceno = healthinsuranceno;
        this.healthcareprovider = healthcareprovider;
        this.patientaddress = patientaddress;
        this.contact = contact;
    }

    public void addReport_patients(Report report) {
        report_patients.add(report);
    }
}