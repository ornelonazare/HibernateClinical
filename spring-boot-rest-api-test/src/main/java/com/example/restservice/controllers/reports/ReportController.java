package com.example.restservice.controllers.reports;

import com.example.restservice.dto.ReportDTO;
import com.example.restservice.models.doctor.Doctor;
import com.example.restservice.models.patient.Patient;
import com.example.restservice.models.reports.Report;
import com.example.restservice.repository.diet.DietRepository;
import com.example.restservice.repository.doctor.DoctorRepository;
import com.example.restservice.repository.medicin.MedicinRepository;
import com.example.restservice.repository.patient.PatientRepository;
import com.example.restservice.repository.report.AllergyDisabilityReportRepository;
import com.example.restservice.repository.report.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

    @Autowired
    AllergyDisabilityReportRepository allergyDisabilityReportRepository;

    @Autowired
    DietRepository dietRepository;

    @Autowired
    MedicinRepository medicinRepository;

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

    @GetMapping("/reports/allergies/{id}")
    public ResponseEntity<List<String>> getAllergiesByReportId(@PathVariable("id") int id) {
        List<String> allergies = allergyDisabilityReportRepository.getAllergiesByReportID(id);

        if (allergies != null) {
            return new ResponseEntity<>(allergies, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/reports/disabilities/{id}")
    public ResponseEntity<List<String>> getDisabilitiesByReportId(@PathVariable("id") int id) {
        List<String> disability = allergyDisabilityReportRepository.getDisabiliyByReportID(id);

        if (disability != null) {
            return new ResponseEntity<>(disability, HttpStatus.OK);
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
    public ResponseEntity<Report> createReport(@RequestBody ReportDTO data) {
        System.out.println("Printing raw report data: " + data);
        if(data.getMedicins() != null)
        data.getMedicins().forEach(System.out::println);
        if(data.getDiets() != null)
        data.getDiets().forEach(System.out::println);
        try {
            Report _report = new Report(
                    data.getReport().getBloodpressure(),
                    data.getReport().getPulserate(),
                    data.getReport().getWeight(),
                    data.getReport().getAllergies(),
                    data.getReport().getDisabilities(),
                    data.getReport().getPatienthistory()
            );

            Report _report1 = Report.builder().bloodpressure(data.getReport().getBloodpressure())
                    .createddate(LocalDate.of(2021, 10, 10))
                    .pulserate(data.getReport().getPulserate())
                    .weight(data.getReport().getWeight())
                    .allergies(data.getReport().getAllergies())
                    .disabilities(data.getReport().getDisabilities())
                    .patienthistory(data.getReport().getPatienthistory())
                    .build();

            Patient patient_report = patientRepository.findById(data.getReport().getReport_patient()).get();

            Doctor doctor_report = doctorRepository.findById(data.getReport().getReport_doctor()).get();

            Doctor followupdoctor_report = doctorRepository.findById(data.getReport().getReport_followupdoctor()).get();


            if(data.getAllergies()!=null)
                data.getAllergies().forEach(allergy -> {
                  _report1.addAllergy(allergy);
                }
                );

            if(data.getDisabilities() != null)
            data.getDisabilities().forEach(disability -> {
                _report1.addDisabilities(disability);  }
            );

           /* if(data.getMedicins() != null)
            data.getReport().getMedicins().forEach(medicin -> {
                _report1.addMedicin(medicin);  });

            if(data.getDiets() != null)
            data.getReport().getDiets().forEach(diet -> {
                _report1.addDiet(diet);
            });*/


            /*_report1.getAllergies().forEach(allergy -> {
                _report1.addAllergy(allergy);  });
*/
            Report _report2 = reportRepository.save(_report1);
            patient_report.addReport_patients(_report2);
            doctor_report.addReport_doctors(_report2);
            followupdoctor_report.addReport_followupdoctors(_report2);
            patientRepository.save(patient_report);
            doctorRepository.save(doctor_report);
            doctorRepository.save(followupdoctor_report);

            if(data.getMedicins() != null)
            data.getMedicins().forEach(medicin -> {
                medicin.setReport_medicin(_report2.getId());
                medicinRepository.save(medicin);

               // _report1.addMedicin(medicin);
            });

            if(data.getDiets() != null)
            data.getDiets().forEach(diet -> {
                diet.setReport_diet(_report2.getId());
                dietRepository.save(diet);
                //_report1.addDiet(diet);
            });


            //reportRepository.save(_report1);
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

           /* if (report.getReport_patient() != null) {
                _report.setReport_patient(report.getReport_patient());
            }

            if (report.getReport_doctor() != null) {
                _report.setReport_doctor(report.getReport_doctor());
            }*/

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

           /* if (report.getReport_followupdoctor() != null) {
                _report.setReport_followupdoctor(report.getReport_followupdoctor());
            }*/

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