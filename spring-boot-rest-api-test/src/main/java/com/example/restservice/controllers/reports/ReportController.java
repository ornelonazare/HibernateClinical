package com.example.restservice.controllers.reports;

import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.patient.Patient;
import com.example.restservice.models.reports.Report;
import com.example.restservice.repository.doctor.DoctorRepository;
import com.example.restservice.repository.patient.PatientRepository;
import com.example.restservice.repository.report.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class ReportController {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    PatientRepository patientRepository;

    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getAllReports() {
        try {
            List<Report> reports = new ArrayList<Report>();
            reportRepository.findAll().forEach(reports::add);

            if (reports.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reports, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reports/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable("id") int id) {
        Optional<Report> reportData = reportRepository.findById(id);

        if (reportData.isPresent()) {
            return new ResponseEntity<>(reportData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

   /* @GetMapping("/reports/patient/patientname")
    public ResponseEntity<Report> getReportByPatientId(@RequestBody Patient patient) {
        Optional<Report> reportData = reportRepository.findBy(patient.getName());

        if (reportData.isPresent()) {
            return new ResponseEntity<>(reportData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/



    @PostMapping("/reports/namedob")
    public ResponseEntity<Report> getReportByPatientNameandDob(@RequestBody Patient p) {

        Optional<Patient> patientData = patientRepository.findByNameContainingAndDob(p.getName(), p.getDob());
        if (patientData.isPresent()) {
            Patient patient = patientData.get();
            Report reportData = reportRepository.findByPatientID(patient.getId());
            if (reportData != null) {
                return new ResponseEntity<>(reportData, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }


    @PostMapping("/reports")
    //Report( String bloodpressure, Double pulserate, Double weight,
    // List<String> allergies, List<String> disabilities, String patienthistory,
    // Integer patientid, Integer doctorid, Integer followupdoctorid) {
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        System.out.println("Printing raw report data: " + report);
        try {
            Report _report = new Report(
                    report.getBloodpressure(),
                    report.getPulserate(),
                    report.getWeight(),
                    report.getAllergies(),
                    report.getDisabilities(),
                    report.getPatienthistory()
            );

            Report _report1 = Report.builder().bloodpressure(report.getBloodpressure())
                    .createddate(LocalDate.of(2021, 10, 10))
                    .pulserate(report.getPulserate())
                    .weight(report.getWeight())
                    .allergies(report.getAllergies())
                    .disabilities(report.getDisabilities())
                    .patienthistory(report.getPatienthistory())
                    .build();

            Patient patient_report = patientRepository.findById(report.getReport_patient().getId()).get();

            Doctor doctor_report = doctorRepository.findById(report.getReport_doctor().getId()).get();

            Doctor followupdoctor_report = doctorRepository.findById(report.getReport_followupdoctor().getId()).get();

            _report1.setReport_patient(patient_report);
            _report1.setReport_doctor(doctor_report);
            _report1.setReport_followupdoctor(followupdoctor_report);


            report.getMedicins().forEach(medicin -> {
                _report1.add(medicin);  });

            report.getDiets().forEach(diet -> {
                _report1.add(diet);  });


            reportRepository.save(_report1);
            return new ResponseEntity<>(_report, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/reports/{id}")
    public ResponseEntity<Report> updatePatient(@PathVariable("id") int id, @RequestBody Report report) {
        Optional<Report> reportData = reportRepository.findById(id);

        if (reportData.isPresent()) {
            Report _report = reportData.get();

            if (report.getReport_patient() != null) {
                _report.setReport_patient(report.getReport_patient());
            }

            if (report.getReport_doctor() != null) {
                _report.setReport_doctor(report.getReport_doctor());
            }

            if (report.getBloodpressure() != null) {
                _report.setBloodpressure(report.getBloodpressure());
            }

            if (report.getPulserate() != null) {
                _report.setPulserate(report.getPulserate());
            }

            if (report.getWeight() != null) {
                _report.setWeight(report.getWeight());
            }

            if (report.getAllergies() != null) {
                _report.setAllergies(report.getAllergies());
            }

            if (report.getDisabilities() != null) {
                _report.setDisabilities(report.getDisabilities());
            }

            if (report.getMedicins() != null) {
                _report.setMedicins((report.getMedicins()));
            }

            if (report.getDiets() != null) {
                _report.setDiets(report.getDiets());
            }

            if (report.getPatienthistory() != null) {
                _report.setPatienthistory(report.getPatienthistory());
            }

            if (report.getReport_followupdoctor() != null) {
                _report.setReport_followupdoctor(report.getReport_followupdoctor());
            }

            return new ResponseEntity<>(reportRepository.save(_report), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/reports/{id}")
    public ResponseEntity<HttpStatus> deletePatient(@PathVariable("id") int id) {
        try {
            reportRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/reports")
    public ResponseEntity<HttpStatus> deleteAllPatients() {
        try {
            reportRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}