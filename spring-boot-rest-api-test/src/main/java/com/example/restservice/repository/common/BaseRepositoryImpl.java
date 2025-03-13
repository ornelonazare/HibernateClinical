package com.example.restservice.repository.common;

import com.example.restservice.models.diet.QDiet;
import com.example.restservice.models.doctor.QDoctor;
import com.example.restservice.models.medicin.QMedicin;
import com.example.restservice.models.patient.QPatient;
import com.example.restservice.models.reports.QReport;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

public abstract class BaseRepositoryImpl<T,ID> extends SimpleJpaRepository<T,ID> implements BaseRepository<T,ID> {

    protected EntityManager em;
    protected JPAQueryFactory queryFactory;

    protected  QPatient patient = QPatient.patient;
    protected QReport report = QReport.report;
    protected QDoctor doctor = QDoctor.doctor;
    protected QDiet diet = QDiet.diet;
    protected QMedicin medicin = QMedicin.medicin;

    public BaseRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
        this.em = em;
        queryFactory = new JPAQueryFactory(em);
    }
}
