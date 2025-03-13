package com.example.restservice.repository.patient;

import com.example.restservice.models.patient.Patient;

import com.example.restservice.repository.common.BaseRepositoryImpl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.LockModeType;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public class PatientRepositoryImpl extends BaseRepositoryImpl<Patient, Integer> implements PatientRepository {
    public PatientRepositoryImpl(EntityManager em) {
        super(Patient.class,em);
    }

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Override
    public List<Patient> findAll() {
        return super.findAll();
    }

    @Override
    public List<Patient> findByNameContaining(String name) {
        return queryFactory.select(patient)
                .from(patient)
                .where(patient.name.contains(name))
                .fetch();
    }

    @Override
    public List<Patient> findByDob(LocalDate dob) {
        return findByDob(dob);
    }

    @Override
    public Optional<Patient> findByNameContainingAndDob(String name, LocalDate dob) {
        return findByNameContainingAndDob(name, dob);
    }

    public List<Patient> findByNameContainingAndDobDSL(String name, LocalDate dob) {
        return queryFactory.select(patient)
                .from(patient)
                .where(patient.name.contains(name).and(patient.dob.eq(dob)))
                .fetch();
    }


}
