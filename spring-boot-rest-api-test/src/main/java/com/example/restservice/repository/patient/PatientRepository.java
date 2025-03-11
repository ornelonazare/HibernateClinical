package com.example.restservice.repository.patient;


import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.example.restservice.models.patient.Patient;

import com.example.restservice.models.tutorial.Tutorial;
import com.example.restservice.repository.common.BaseRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface PatientRepository extends BaseRepository<Patient, Integer> {
//public interface PatientRepository extends JpaRepository<Patient, Integer> {
    List<Patient> findByNameContaining(String name);

    List<Patient> findByDob(LocalDate dob);

    Optional<Patient> findByNameContainingAndDob(String name, LocalDate dob);

    List<Patient> findByNameContainingAndDobDSL(String name, LocalDate dob);
}
