package com.example.restservice.repository.report;

import com.example.restservice.models.reports.Report;
import com.example.restservice.repository.common.BaseRepositoryImpl;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.Optional;

@Transactional
public class ReportRepositoryImpl extends BaseRepositoryImpl<Report, Integer> implements ReportRepository {
    public ReportRepositoryImpl(EntityManager em) {
        super(Report.class, em);
    }


    @Override
    public Report findByPatientID(Integer patientid) {
        return queryFactory.select(report)
                .from(report).innerJoin(report.report_patient, patient)
                .where(patient.id.eq(patientid))
                .fetchOne();
    }
}
