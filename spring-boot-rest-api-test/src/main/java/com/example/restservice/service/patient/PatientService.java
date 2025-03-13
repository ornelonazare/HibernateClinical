package com.example.restservice.service.patient;

import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.patient.Patient;
import com.example.restservice.repository.doctor.DoctorRepository;
import com.example.restservice.repository.patient.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;
    public Patient createPatient(Patient patient,  int doctorid) {

        Patient patient1 = null;
        System.out.println("Patient is " + patient);
            Patient _patient = new Patient(
                    patient.getName(),
                    patient.getEntrydate(),
                    patient.getDob(),
                    patient.getAge(),
                    patient.getGender(),
                    patient.getOccupation(),
                    patient.getHealthinsuranceno(),
                    patient.getHealthcareprovider(),
                    patient.getPatientaddress(),
                    patient.getContact()
            );

            /*_patient.builder().name(patient.getName())
                 //   dob(patient.getDob())
                    .age(patient.getAge()).
                   // entrydate(patient.getEntrydate()).
                    gender(patient.getGender()).
                    occupation(patient.getOccupation())
                    .healthinsuranceno(patient.getHealthinsuranceno())
                    .healthcareprovider(patient.getHealthcareprovider())
                    .patientaddress(patient.getPatientaddress())
                    .contact(patient.getContact()).build();*/

            Doctor doctor = doctorRepository.findById(doctorid).orElse(null);
            if (doctor != null) {
                doctor.addPatients(_patient);
                // _patient.setPatient_doctor(doctor);
                patient1 =  patientRepository.save(_patient);
                doctor.addPatients(_patient);
                doctorRepository.save(doctor);
            }
            System.out.println("Patient is after " + _patient);
            return patient1;
    }
}
