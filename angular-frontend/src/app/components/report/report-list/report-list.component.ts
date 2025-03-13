import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Patient } from '../../../classes/patient';
import { Report } from '../../../classes/report';
import { ReportService } from '../../../services/report.service';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Medicin} from "../../../classes/medicin";
import {Diet} from "../../../classes/diet";

declare module 'rxjs';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: [ './report-list.component.css' ]
})
export class ReportListComponent implements OnInit, OnDestroy {
  patients: Observable<Patient[]> | undefined;
  patientList: Patient[] = [];
  reports: Observable<Report[]> | undefined;
  reportList: Report[] = [];
  reportByNameDob: Report = {
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
  subscription: Subscription | undefined;

  constructor(private reportService: ReportService,
              private patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.subscription = this.reportService.getListUpdateAlert().subscribe(
      (reportMessage: any) => {
        if (reportMessage) {
          this.reloadData();
        }
      }
    );
  }

  ngOnDestroy() {
    this?.subscription.unsubscribe();
  }

  reloadData() {
    this.reports = this.reportService.getAll();
    this.patientService.getAll().subscribe(
      (data: Patient[]) => {
        this.patientList = data;
        console.log("Print test");
        console.log(data);
        console.log(this.patientList);
      }

    );
    console.log("Print report");
    console.log(this.reportList);
    this.reportService.getAll()
      .subscribe(
      (data: Report[]) => {
        this.reportList = data;
        console.log("Print report test");
        console.log(data);
        console.log(this.reportList);
      });
    console.log("Print reports");
    console.log(this.reports)
  }

  reportDetails(id: number) {
    this.router.navigate([ 'reportDetails', id ]);
  }

  addReport() {
    this.router.navigate([ 'createReport' ]);
  }

  getPatientName(patientID: number) {
    try {
      console.log("Patient ID : " + patientID);
      console.log(" this name " + this.patientList.find((p: Patient) => p.id === patientID)?.name)
      return this.patientList.find((p: Patient) => p.id === patientID)?.name;
    } catch (error: any) {
      return null;
    }
  }

  getPatientDob(patientID: number) {
    try {
      return this.patientList.find((p: Patient) => p.id === patientID)?.dob;
    } catch (error: any) {
      return null;
    }
  }

  getPatientContact(patientID: number) {
    try {
      return this.patientList.find((p: Patient) => p.id === patientID)?.contact;
    } catch (error: any) {
      return null;
    }
  }

  updateReport(id: number) {
    this.router.navigate([ 'updateReport', id ]);
  }
}
