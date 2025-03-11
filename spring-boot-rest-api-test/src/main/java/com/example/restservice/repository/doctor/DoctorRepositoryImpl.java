package com.example.restservice.repository.doctor;

import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.patient.Patient;
import com.example.restservice.repository.common.BaseRepositoryImpl;
import com.example.restservice.repository.patient.PatientRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

public class DoctorRepositoryImpl extends BaseRepositoryImpl<Doctor, Integer> implements DoctorRepository {
    public DoctorRepositoryImpl(EntityManager em) {
        super(Doctor.class,em);
    }

    @Override
    public List<Doctor> findByDoctornameContaining(String doctorname) {
        return queryFactory.select(doctor)
                .from(doctor)
                .where(doctor.doctorname.eq(doctorname))
                .fetch();
    }
}
