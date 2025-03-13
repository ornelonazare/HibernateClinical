package com.example.restservice.repository.report;

import com.example.restservice.models.reports.Report;
import com.example.restservice.repository.common.BaseRepository;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AllergyDisabilityReportRepository extends JpaRepository<Report, Integer> {


    @Query(value = "SELECT a.allergies FROM report_allergies a WHERE a.report_id = ?1", nativeQuery = true)
    public List<String> getAllergiesByReportID(Integer reportid);

    @Query(value = "SELECT d.disabilities FROM report_disabilities d WHERE d.report_id = ?1", nativeQuery = true)
    public List<String> getDisabiliyByReportID(Integer reportid);
}