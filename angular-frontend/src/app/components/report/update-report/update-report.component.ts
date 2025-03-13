import { Component, OnInit } from '@angular/core';
import {Report} from "../../../classes/report";
import {Observable} from "rxjs";
import {Patient} from "../../../classes/patient";
import {Doctor} from "../../../classes/doctor";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../../services/patient.service";
import {DoctorService} from "../../../services/doctor.service";
import {ReportService} from "../../../services/report.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Medicin} from "../../../classes/medicin";
import {MedicinService} from "../../../services/medicin.service";
import {Diet} from "../../../classes/diet";
import {DietService} from "../../../services/diet.service";

declare module 'rxjs';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.css']
})
export class UpdateReportComponent implements OnInit {

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
  reportID: number = 0;
  patientID: number = 0;
  patients: Observable<Patient[]> | undefined;
  doctors: Observable<Doctor[]> | undefined;
  medicines: Observable<Medicin[]> | undefined;
  dietes: Observable<Diet[]> | undefined;

  reportForm = this.fb.group({
    report_patient_id: 0,
    report_doctor_id: 0,
    bloodpressure: '',
    pulserate:0,
    weight: 0,
    medicins: this.fb.array([ this.buildMedicin() ]),
    allergies: this.fb.array([
      this.fb.control('')
    ]),
    disabilities: this.fb.array([
      this.fb.control('')
    ]),
    diets: this.fb.array([ this.buildDiet() ]),

    patienthistory: '',
    report_followupdoctor_id: 0,
  });

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private reportService: ReportService,
              private medicinService: MedicinService,
              private dietService: DietService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.dietes = this.dietService.getAll();
    this.medicines = this.medicinService.getAll();
    this.doctors = this.doctorService.getAll();
    this.patients = this.patientService.getAll();
    this.reportID = this.route.snapshot.params['id'];
    this.reportService.get(this.reportID).subscribe(
      (reportData: any) => {
        this.report = reportData;
        this.reportForm.patchValue({
          report_patient_id: this.report.report_patient,
          report_doctor_id: this.report.report_doctor,
          bloodpressure: this.report.bloodpressure,
          pulserate: this.report.pulserate,
          weight: this.report.weight,
          patienthistory: this.report.patienthistory,
          report_followupdoctor_id: this.report.report_followupdoctor,
          medicins: this.report.medicins,
          diets: this.report.diets
        });
      }
    );
  }

  update() {
    this.report.report_patient = this.reportForm.value.report_patient_id;
    this.report.report_doctor = this.reportForm.value.report_doctor_id;
    this.report.bloodpressure = this.reportForm.value.bloodpressure;
    this.report.pulserate = this.reportForm.value.pulserate;
    this.report.weight = this.reportForm.value.weight;
    this.report.patienthistory = this.reportForm.value.patienthistory;
    this.report.report_followupdoctor = this.reportForm.value.report_followupdoctor_id;

    this.reportService
      .update(this.reportID, this.report).subscribe((reportData: any) => {
        this.report = reportData;
        console.log(this.report);
        this.gotoList();
      },
      (error: any) => console.log(error));
  }

  onSubmit() {
    this.update();
  }

  gotoList() {
    this.router.navigate([ 'reports' ]);
  }

  cancelAdd() {
    this.router.navigate([ 'reports' ]);
  }

  get medicins(): FormArray {
    return this.reportForm.get('medicins') as FormArray;
  }

  addMedicins() {
    this.medicins.push(this.buildMedicin());
  }

  removeMedicins(i: number) {
    this.medicins.removeAt(i);
  }

  private buildMedicin(): FormGroup {
    return this.fb.group({
      drugname: '',
      unit: '',
      dosage: '',
    });
  }

  get diets(): FormArray {
    return this.reportForm.get('diets') as FormArray;
  }

  addDiets() {
    this.diets.push(this.buildDiet());
  }

  removeDiets(i: number) {
    this.diets.removeAt(i);
  }

  private buildDiet(): FormGroup {
    return this.fb.group({
      dietname: [ '' ],
      description: [ '' ],
    });
  }
}
