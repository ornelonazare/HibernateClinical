package com.example.restservice.models.medicin;

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


@Entity
@Table(name="medicin")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Medicin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicinid;

    private String drugname;
    private String unit;
    private String dosage;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="report_medicin_id")
    @JsonIgnore
    private Report report_medicin;

    public Medicin(String drugname, String unit, String dosage) {
        this.drugname = drugname;
        this.unit = unit;
        this.dosage = dosage;
    }

}

