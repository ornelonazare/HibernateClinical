package com.example.restservice.models.item;

import com.example.restservice.models.invoice.Invoice;
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
@Table(name="item")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    private Integer itemno;
    private String itemname;
    private String testsortname;
    private String samname;
    private Integer unitprice;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="invoice_id")
    @JsonIgnore
    private Invoice invoice;


    public Item(Integer itemno, String itemname, String testsortname, String samname, Integer unitprice) {
        this.itemno = itemno;
        this.itemname = itemname;
        this.testsortname = testsortname;
        this.samname = samname;
        this.unitprice = unitprice;

    }
}
