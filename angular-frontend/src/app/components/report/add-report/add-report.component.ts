import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import { Report } from '../../../classes/report';
import { Patient } from '../../../classes/patient';
import { Doctor} from "../../../classes/doctor";
import { DoctorService} from "../../../services/doctor.service";
import { PatientService} from "../../../services/patient.service";
import { ReportService } from "../../../services/report.service";
import { Observable } from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Medicine} from "../../../classes/medicine";
import {MedicinService} from "../../../services/medicin.service";
import {Diet} from "../../../classes/diet";
import {DietService} from "../../../services/diet.service";

@Component({
  selector: 'app-add-report',
  templateUrl: `./add-report.component.html`,
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  report: Report =  {
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
  submitted = false;
  reportID: number;
  patientID: number;
  patients: Observable<Patient[]>;
  doctors: Observable<Doctor[]>;
  patient: Patient;
  medicins: Observable<Medicine[]>;
  dietes: Observable<Diet[]>

  @ViewChild("formData") form = NgForm;
  // Build Report Form
  reportForm = this.fb.group({
    report_patient_id: 0,
    report_doctor_id: 0,
    bloodpressure: '',
    pulserate:'',
    weight: '',
    medicines: this.fb.array([ this.buildMedicine() ]),
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
    console.log("This in add report add INIT ");
    this.medicins = this.medicinService.getAll();
    this.dietes = this.dietService.getAll();
    this.doctors = this.doctorService.getAll();
    this.patients = this.patientService.getAll();

  }

  save() {

    this.report.report_patient.id = this.reportForm.value.report_patient_id;
    console.log("print patient ID from form " +this.report.report_patient.id);
    this.report.report_doctor.id = this.reportForm.value.report_doctor_id;
    this.report.bloodpressure = this.reportForm.value.bloodpressure;
    // @ts-ignore
    this.report.pulserate = this.reportForm.value.pulserate;
    // @ts-ignore
    this.report.weight = this.reportForm.value.weight;
    this.report.allergies = this.reportForm.value.allergies;
    this.report.disabilities = this.reportForm.value.disabilities;
    this.report.medicines = this.reportForm.value.medicines;
    this.report.diets = this.reportForm.value.diets;

    this.report.patienthistory = this.reportForm.value.patienthistory;
    this.report.report_followupdoctor.id = this.reportForm.value.report_followupdoctor_id;


    console.log("print report before saving")
    console.log(this.report);
    this.reportService
      .create(this.report).subscribe(data => {
        this.report = data;
        console.log("print report after saving")
        console.log(data);
        this.report = {
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
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.reportForm);
    this.save();
  }

  gotoList() {
    this.router.navigate([ 'reports']);
  }

  cancelAdd() {
    this.router.navigate([ 'reports' ]);
  }

  get medicines() {
    return ["aa","gg"];// this.reportForm.get('medicines') as FormArray;
  }


  addMedicins() {
    this.medicines.push("");

  }

  /*removeMedicins(i: number) {
    this.medicines.removeAt(i);
  }*/

  // Build Medicine form
  private buildMedicine(): FormGroup {
    return this.fb.group({
      drugname: [ ''],
      unit: [ '' ],
      dosage: [ '' ],
    });
  }

  get diets() {
    return ["xyz", "abc"]//this.reportForm.get('diets') as FormArray;
  }

  addDiets() {
    this.diets.push();
  }

  /*removeDiets(i: number) {
    this.diets.removeAt(i);
  }*/

  // Build Diet form
  private buildDiet(): FormGroup {
    return this.fb.group({
      dietname: [ ''],
      description: [ '' ],
    });
  }
}
