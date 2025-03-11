package com.example.restservice.repository.invoice;

import com.example.restservice.models.invoice.Invoice;
import com.example.restservice.models.patient.Patient;
import com.example.restservice.models.reports.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    //Optional<Invoice> findByPatientid(Integer patientid);
}
