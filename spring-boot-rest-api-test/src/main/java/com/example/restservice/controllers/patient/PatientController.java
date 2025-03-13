package com.example.restservice.controllers.patient;

import java.time.LocalDate;
import java.text.ParseException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.patient.QPatient;
import com.example.restservice.repository.doctor.DoctorRepository;
import com.example.restservice.service.patient.PatientService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.restservice.models.patient.Patient;
import com.example.restservice.repository.patient.PatientRepository;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientService patientService;

    QPatient qPatient = QPatient.patient;


    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients(@RequestParam(required = false) String name) {
        try {
            List<Patient> patients = new ArrayList<Patient>();

            if (name == null) {
                    //patientRepository.findAll().forEach(patients::add);
                patients = patientRepository.findAll();
            }else {
                patientRepository.findByNameContaining(name).forEach(patients::add);
            }

            if (patients.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(patients, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/patients/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable("id") int id) {
        Optional<Patient> patientData = patientRepository.findById(id);

        if (patientData.isPresent()) {
            return new ResponseEntity<>(patientData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/patients/?name={name}")
    public ResponseEntity<List<Patient>>  getByPatientname(@PathVariable("name") String name) {
        List<Patient> patients = new ArrayList<Patient>();
        System.out.println(name);
        List <Patient> patientData = patientRepository.findByNameContaining(name);

        if (!patientData.isEmpty()) {
            patientRepository.findByNameContaining(name).forEach(patients::add);
            return new ResponseEntity<>(patients, HttpStatus.OK);

        } else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/patients/dob")
    public ResponseEntity<List<Patient>>  postByPatientDob( @RequestBody Patient patient ) throws ParseException {
        List<Patient> patients = new ArrayList<Patient>();

        List<Patient> patientData = patientRepository.findByDob(patient.getDob());

        if (!patientData.isEmpty()) {
            patientRepository.findByDob(patient.getDob()).forEach(patients::add);
            return new ResponseEntity<>(patients, HttpStatus.OK);

        } else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

   /* @GetMapping("/patients/namedob/{name}/{dob}")
    public ResponseEntity<Patient> postByPatientNameDobqDsl(@PathVariable("name") String name, @PathVariable("dob") String dob) {
        List<Patient> patientData = (List<Patient>) patientRepository.findAll(qPatient.name.eq(name).and(qPatient.dob.eq(LocalDate.parse(dob))));
        System.out.println("This is data" + patientData);
        if (patientData.size() >0 && patientData.get(0) != null) {
            return new ResponseEntity<Patient>(patientData.get(0), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/

    @GetMapping("/patients/namedob/{name}/{dob}")
    public ResponseEntity<Patient> postByPatientNameandDob(@PathVariable("name") String name, @PathVariable("dob") String dob) {
        List<Patient> patientData = patientRepository.findByNameContainingAndDobDSL(name, LocalDate.parse(dob));

        if (patientData != null) {
            return new ResponseEntity<Patient>(patientData.get(0), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/patients/{doctorid}")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient, @PathVariable("doctorid") int doctorid) {

      try {
          Patient _patient = patientService.createPatient(patient, doctorid);
          return new ResponseEntity<>(_patient, HttpStatus.CREATED);
      }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }

    }

    @PutMapping("/patients/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable("id") int id, @RequestBody Patient patient) {
        Optional<Patient> patientData = patientRepository.findById(id);
        if (patientData.isPresent()) {
            Patient _patient = patientData.get();
            _patient.setName(patient.getName());
          /*  _patient.setDob(patient.getDob());*/
            _patient.setAge(patient.getAge());
            _patient.setGender(patient.getGender());
            _patient.setOccupation(patient.getOccupation());
            _patient.setHealthinsuranceno(patient.getHealthinsuranceno());
            _patient.setHealthcareprovider(patient.getHealthcareprovider());
            _patient.setPatientaddress(patient.getPatientaddress());
            _patient.setContact(patient.getContact());
            return new ResponseEntity<>(patientRepository.save(_patient), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<HttpStatus> deletePatient(@PathVariable("id") int id) {
        try {
            patientRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/patients")
    public ResponseEntity<HttpStatus> deleteAllPatients() {
        try {
            patientRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
