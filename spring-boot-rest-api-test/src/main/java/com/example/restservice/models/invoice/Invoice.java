package com.example.restservice.models.invoice;

import com.example.restservice.models.item.Item;
import com.example.restservice.models.patient.Patient;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="invoice")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Invoice implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "patient_invoice_id")
    private Patient patient_invoice;
   // private Integer patient_invoice_id;
    //@Column(name = "patientid")
    //private int patientid;

    @OneToMany(mappedBy = "invoice",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH})
    private List<Item> items = new ArrayList<>();

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "salesprice")
    private Integer salesprice;

    public Invoice(Integer quantity, Integer salesprice) {
        this.quantity = quantity;
        this.salesprice = salesprice;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    // add convenience methods for bi-directional relationship

    public void add(Item tempItem) {

        if (items == null) {
            items = new ArrayList<>();
        }

        items.add(tempItem);

        tempItem.setInvoice(this);
    }

}