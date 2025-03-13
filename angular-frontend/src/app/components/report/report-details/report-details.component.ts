import { Component, OnInit } from '@angular/core';
import {Doctor} from "../../../classes/doctor";
import {Patient} from "../../../classes/patient";
import {Report} from "../../../classes/report";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DoctorService} from "../../../services/doctor.service";
import {PatientService} from "../../../services/patient.service";
import {ReportService} from "../../../services/report.service";
import {Medicin} from "../../../classes/medicin";
import {MedicinService} from "../../../services/medicin.service";
import {Diet} from "../../../classes/diet";

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {

  reportId: string = '';
  doctor: Doctor = {
    id: 0,
    doctorname: '',
    speciality: '',
    doctor_address: '',
    hospital_name :'',
    about: '',
    profile_picture: null
  };;
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
    patient_doctor: 0,
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

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private reportService: ReportService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.reportId = params['id'];
        this.reportService.get(this.reportId)
          .subscribe((data: any) => {
            // get report data
            this.report = data;
            // get doctor data
            this.doctorService.get(this.report.report_doctor).subscribe(
              (doctorData: any) => {
                this.doctor = doctorData;
              }
            );
            // get follow up doctor data
            this.doctorService.get(this.report.report_followupdoctor).subscribe(
              (followUpDoctorData: any) => {
                this.followUpDoctor = followUpDoctorData;
              }
            );
            // get patient data
            this.patientService.get(this.report.report_patient).subscribe(
              (patientData: any) => {
                this.patient = patientData;
              }
            );
          }, (error: any) => console.log(error));
      }
    );
  }

  deleteReport(id: number) {
    this.reportService.delete(id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.reportService.sendListUpdateAlert('Deleted');
        },
        (error: any) => console.log(error));
    this.router.navigate([ 'reports' ]);
  }

  updateReport(id: number) {
    this.router.navigate([ 'updateReport', id ]);
  }
  generatePrescription(id: number) {
    this.router.navigate([ 'prescriptions', id ]);
  }

}
