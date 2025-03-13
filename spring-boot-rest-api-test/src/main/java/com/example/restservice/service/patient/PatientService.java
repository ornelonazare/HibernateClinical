package com.example.restservice.service.patient;

import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.patient.Patient;
import com.example.restservice.repository.doctor.DoctorRepository;
import com.example.restservice.repository.patient.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;
    public void createPatient(Patient patient) {
        /*System.out.println("Patients ID " + patient.getPatient_doctor().getId());*/
       /* Doctor doctor = doctorRepository.findById(patient.getPatient_doctor().getId()).orElse(null);*/
       /* if (doctor != null) {
            doctor.addPatients(patient);
            doctorRepository.save(doctor);
        }*/

    }
}
