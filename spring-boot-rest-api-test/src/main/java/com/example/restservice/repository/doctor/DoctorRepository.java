package com.example.restservice.repository.doctor;

import java.util.List;

import com.example.restservice.models.doctor.Doctor;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    List<Doctor> findByDoctornameContaining(String doctorname);
}
