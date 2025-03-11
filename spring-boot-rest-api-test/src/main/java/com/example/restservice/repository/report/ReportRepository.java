package com.example.restservice.repository.report;
import com.example.restservice.models.patient.Patient;
import com.example.restservice.models.reports.Report;

import com.example.restservice.repository.common.BaseRepository;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.util.Optional;

public interface ReportRepository extends BaseRepository<Report, Integer> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Report findByPatientID(Integer patientid);
}