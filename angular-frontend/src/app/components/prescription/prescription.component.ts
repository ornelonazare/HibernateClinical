import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { ReportService } from '../../services/report.service';
import { Doctor } from '../../classes/doctor';
import { Patient } from '../../classes/patient';
import { Report } from '../../classes/report';
import {Medicine} from "../../classes/medicine";
import {Diet} from "../../classes/diet";

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: [ './prescription.component.css' ]
})
export class PrescriptionComponent implements OnInit {

  reportId: number = 0;
  doctor: Doctor = {
    id: 0,
    doctorname: '',
    speciality: '',
    doctor_address: '',
    hospital_name :'',
    about: '',
    profile_picture: null
  };
  followUpDoctor: Doctor = {
    id: 0,
    doctorname: '',
    speciality: '',
    doctor_address: '',
    hospital_name :'',
    about: '',
    profile_picture: null
  };
  patient: Patient = {
    id: 0,
    name: '',
    entrydate: new Date, // Use camelCase for properties
    dob: new Date, // Date of Birth
    age: 0,
    gender: '',
    occupation: '',
    healthinsuranceno: '', // Use camelCase for consistency
    healthcareprovider: '', // Use camelCase
    patientaddress: '', // Use camelCase
    contact: 0,
    patient_doctor: {id :0 },
    // Use camelCase
  };
  report: Report = {
    id: 0,
    report_patient: {id :0 },
    report_doctor: {id :0 },
    bloodpressure: '',
    pulserate: 0,
    weight: 0,
    allergies: [] as string[],
    disabilities: [] as string[],
    medicines: [] as Medicine[],
    diets: [] as Diet[],
    patienthistory: '',
    report_followupdoctor: {id :0 }
  };
  currentDate = new Date();

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.doctor = {
      id: 0,
      doctorname: '',
      speciality: '',
      doctor_address: '',
      hospital_name :'',
      about: '',
      profile_picture: null
    };
    this.followUpDoctor = {
      id: 0,
      doctorname: '',
      speciality: '',
      doctor_address: '',
      hospital_name :'',
      about: '',
      profile_picture: null
    };
    this.patient = {
      id: 0,
      name: '',
      entrydate: new Date, // Use camelCase for properties
      dob: new Date, // Date of Birth
      age: 0,
      gender: '',
      occupation: '',
      healthinsuranceno: '', // Use camelCase for consistency
      healthcareprovider: '', // Use camelCase
      patientaddress: '', // Use camelCase
      contact: 0,
      patient_doctor: {id :0 },
      // Use camelCase
    };
    this.report =
    {
      id: 0,
      report_patient: {id :0 },
      report_doctor: {id :0 },
      bloodpressure: '',
      pulserate: 0,
      weight: 0,
      allergies: [] as string[],
      disabilities: [] as string[],
      medicines: [] as Medicine[],
      diets: [] as Diet[],
      patienthistory: '',
      report_followupdoctor: {id :0 }
    }
    this.currentDate = new Date();

    this.reportId = this.route.snapshot.params['id'];
    this.reportService.get(this.reportId).subscribe(
      (reportData: Report) => {
        this.report = reportData;
        this.patientService.get(this.report.report_patient.id).subscribe(
          (patientData: Patient) => {
            this.patient = patientData;
          }
        );
        this.doctorService.get(this.report.report_doctor.id).subscribe(
          (doctorData: Doctor) => {
            this.doctor = doctorData;
          }
        );
        this.doctorService.get(this.report.report_followupdoctor.id).subscribe(
          (followUpDoctorData: Doctor) => {
            this.followUpDoctor = followUpDoctorData;
          }
        );
      }
    );
  }

  cancel() {
    this.router.navigate([ 'reportDetails', this.reportId ]);
  }
}
