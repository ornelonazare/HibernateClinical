package com.example.restservice.models.diet;


import com.example.restservice.models.invoice.Invoice;
import com.example.restservice.models.reports.Report;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="diet")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Diet implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dietid;

    private String name;
    private String description;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="report_diet_id")
    @JsonIgnore
    private Report report_diet;


    public Diet(String name, String description) {
        this.name = name;
        this.description = description;
    }

}
