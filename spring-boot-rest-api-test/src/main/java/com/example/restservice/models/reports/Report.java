package com.example.restservice.models.reports;

import com.example.restservice.models.diet.Diet;
import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.item.Item;
import com.example.restservice.models.medicin.Medicin;

import com.example.restservice.models.patient.Patient;
import com.fasterxml.jackson.annotation.JsonFormat;
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


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "report_patient_id")
    private Patient report_patient;
    //private Integer patientid;
    //private int patientid;



    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "report_doctor_id")
    private Doctor report_doctor;
    //private Integer doctorid;
    //private int doctorid;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate createddate = LocalDate.from(DateTimeFormatter.ISO_LOCAL_DATE.parse("2018-03-09"));
    private String bloodpressure;
    private Double pulserate;
    private Double weight;

    @ElementCollection
    private List<String> allergies = new ArrayList<>();

    @ElementCollection
    private List<String> disabilities = new ArrayList<>();


    @OneToMany(mappedBy = "report_medicin",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH})
    private List<Medicin> medicins = new ArrayList<>();


    @OneToMany(mappedBy = "report_diet",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH})
    private List<Diet> diets = new ArrayList<>();

    private String patienthistory;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "report_followupdoctor_id")
    private Doctor report_followupdoctor;
    //private Integer followupdoctorid;
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

    public List<Medicin> getMedicins() {
        return medicins;
    }

    public void setMedicins(List<Medicin> medicins) {
        this.medicins = medicins;
    }

    // add convenience methods for bi-directional relationship

    public void add(Medicin tempMedicin) {

        if (medicins == null) {
            medicins = new ArrayList<>();
        }

        medicins.add(tempMedicin);

        tempMedicin.setReport_medicin(this);
    }

    public List<Diet> getDiets() {
        return diets;
    }

    public void setDiets(List<Diet> diets) {
        this.diets = diets;
    }

    // add convenience methods for bi-directional relationship

    public void add(Diet tempDiet) {

        if (diets == null) {
            diets = new ArrayList<>();
        }

        diets.add(tempDiet);

        tempDiet.setReport_diet(this);
    }
}