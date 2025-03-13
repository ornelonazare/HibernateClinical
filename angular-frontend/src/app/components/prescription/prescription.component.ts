import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { ReportService } from '../../services/report.service';
import { Doctor } from '../../classes/doctor';
import { Patient } from '../../classes/patient';
import { Report } from '../../classes/report';
import {Medicin} from "../../classes/medicin";
import {Diet} from "../../classes/diet";
import {DietService} from "../../services/diet.service";
import {MedicinService} from "../../services/medicin.service";

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
    patient_doctor: 0 ,
    // Use camelCase
  };
  report: Report = {
    id: 0,
    report_patient: 0 ,
    report_doctor: 0 ,
    bloodpressure: '',
    pulserate: 0,
    weight: 0,
    allergies: [] as string[],
    disabilities: [] as string[],
    medicins: [] as Medicin[],
    diets: [] as Diet[],
    patienthistory: '',
    report_followupdoctor: 0
  };
  diet: Diet[] = [];

  medicin: Medicin[] = [];
  currentDate = new Date();

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private reportService: ReportService,
              private dietService: DietService,
              private medicinService: MedicinService) {
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
      patient_doctor: 0 ,
      // Use camelCase
    };
    this.report =
    {
      id: 0,
      report_patient: 0 ,
      report_doctor: 0 ,
      bloodpressure: '',
      pulserate: 0,
      weight: 0,
      allergies: [] as string[],
      disabilities: [] as string[],
      medicins: [] as Medicin[],
      diets: [] as Diet[],
      patienthistory: '',
      report_followupdoctor: 0
    }
    this.currentDate = new Date();

    this.reportId = this.route.snapshot.params['id'];
    this.reportService.get(this.reportId).subscribe(
      (reportData: Report) => {
        this.report = reportData;
        this.patientService.get(this.report.report_patient).subscribe(
          (patientData: Patient) => {
            this.patient = patientData;
          }
        );
        this.doctorService.get(this.report.report_doctor).subscribe(
          (doctorData: Doctor) => {
            this.doctor = doctorData;
          }
        );
        this.doctorService.get(this.report.report_followupdoctor).subscribe(
          (followUpDoctorData: Doctor) => {
            this.followUpDoctor = followUpDoctorData;
          }
        );
      /*  this.dietService.getDietsByReportId(this.reportId).subscribe(
          (diet: Diet[]) => {
            this.report.diets = diet;
          }
        );
        this.medicinService.getMedicinByReportId(this.reportId).subscribe(
          (medicin: Medicin[]) => {
            this.report.medicins = medicin;
          }
        );*/
        this.reportService.getAllergies(this.reportId).subscribe(
          (allergies: string[]) => {
            this.report.allergies = allergies;
          }
        );
        this.reportService.getDisabilities(this.reportId).subscribe(
          (disabilities: string[]) => {
            this.report.disabilities = disabilities;
          }
        );
      }
    );
  }

  cancel() {
    this.router.navigate([ 'reportDetails', this.reportId ]);
  }
}
