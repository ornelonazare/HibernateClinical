package com.example.restservice.models.reports;

import com.example.restservice.models.diet.Diet;
import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.item.Item;
import com.example.restservice.models.medicin.Medicin;

import com.example.restservice.models.patient.Patient;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

@Entity
@Table(name="report")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Report implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    /*@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "report_patient_id")
    private Patient report_patient;*/
    @Column(name="report_patient_id")
    private Integer report_patient;
    //private int patientid;



   /* @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "report_doctor_id")
    private Doctor report_doctor;*/
    @Column(name="report_doctor_id")
    private Integer report_doctor;
    //private int doctorid;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate createddate = LocalDate.from(DateTimeFormatter.ISO_LOCAL_DATE.parse("2018-03-09"));
    private String bloodpressure;
    private Double pulserate;
    private Double weight;

    @ElementCollection
    @JsonIgnore
    private List<String> allergies = new ArrayList<>();


    @ElementCollection
    @JsonIgnore
    private List<String> disabilities = new ArrayList<>();


    @OneToMany(
            cascade = CascadeType.ALL, orphanRemoval = false)
    @JoinColumn(name="report_medicin_id")
    private List<Medicin> medicins = new ArrayList<>();


    @OneToMany(
            cascade = CascadeType.ALL, orphanRemoval = false)
    @JoinColumn(name="report_diet_id")
    private List<Diet> diets = new ArrayList<>();

    private String patienthistory;


   /* @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "report_followupdoctor_id")
    private Doctor report_followupdoctor;*/
    @Column(name="report_followupdoctor_id")
    private Integer report_followupdoctor;
    //private String followupdoctorid;

    public Report( String bloodpressure, Double pulserate, Double weight, List<String> allergies, List<String> disabilities, String patienthistory) {
        //this.createddate = createddate;
        this.bloodpressure = bloodpressure;
        this.pulserate = pulserate;
        this.weight = weight;
        this.allergies = allergies;
        this.disabilities = disabilities;
        this.patienthistory = patienthistory;


    }

    public void addAllergy(String allergy) {
        this.allergies.add(allergy);
    }

    public void addDisabilities(String disabilitie) {
        this.disabilities.add(disabilitie);
    }

    public void addDiet( Diet diet) {
        this.diets.add(diet);
    }

    public void addMedicin(Medicin medicin) {
        this.medicins.add(medicin);
    }
}