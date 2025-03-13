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
import {Medicin} from "../../../classes/medicin";
import {MedicinService} from "../../../services/medicin.service";
import {Diet} from "../../../classes/diet";
import {DietService} from "../../../services/diet.service";
import {ReportDTO} from "../../../classes/reportDTO";

@Component({
  selector: 'app-add-report',
  templateUrl: `./add-report.component.html`,
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {

  report: Report =  {
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
  diet: Diet = {
    dietid: 0,
    name: '',
    description: ''
  }
  medicine: Medicin = {
    medicinid: 0,
    drugname: '',
    unit: '',
    dosage: ''
  }

  submitted = false;
  reportID: number;
  patientID: number;
  patients: Observable<Patient[]>;
  doctors: Observable<Doctor[]>;
  patient: Patient;
  medicins: Observable<Medicin[]>;
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
     this.buildAllergies()
    ]),
    disabilities: this.fb.array([this.buildDisabilities()]),
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

    this.report.report_patient = this.reportForm.value.report_patient_id;
    console.log("print patient ID from form " +this.report.report_patient);
    this.report.report_doctor = this.reportForm.value.report_doctor_id;
    this.report.bloodpressure = this.reportForm.value.bloodpressure;
    // @ts-ignore
    this.report.pulserate = this.reportForm.value.pulserate;
    // @ts-ignore
    this.report.weight = this.reportForm.value.weight;
    this.report.allergies = this.reportForm.value.allergies.map((allergie: { name: string; }) => allergie.name);
    this.report.disabilities = this.reportForm.value.disabilities;
    this.report.medicins = this.reportForm.value.medicines;
    this.report.diets = this.reportForm.value.diets;

    this.report.patienthistory = this.reportForm.value.patienthistory;
    this.report.report_followupdoctor = this.reportForm.value.report_followupdoctor_id;


    console.log("print report before saving")
    console.log(this.report);
    const diet1 : Diet = {
      dietid: 0,
      name: 'test1',
      description: 'test2'
    }
    const medicin1 : Medicin = {
      medicinid: 0,
      drugname: 'test1',
      unit: 'test2',
      dosage: 'test3'
    }

    const reportdata : ReportDTO = {

      allergies: this.reportForm.value.allergies.map((allergie: { name: string; }) => allergie.name),
      disabilities: this.reportForm.value.disabilities.map((disabilitie: { name: string; }) => disabilitie.name),
      /*diets:
        [new Diet("test1", "test2"), new Diet("test9", "test9")],
      medicins: [new Medicin("test1", "test2", "test3")],*/
      diets: this.reportForm.value.diets.map((diet: { name: string; description: string; }):any => new Diet(diet.name, diet.description)),
      medicins: this.reportForm.value.medicines.map(
        (medicine: { drugname: string; unit: string; dosage: string; }):any => new Medicin(medicine.drugname, medicine.unit, medicine.dosage)),
      report : this.report

    }

    console.log("print report data diet:" + reportdata.diets.forEach((diet: { name: string; description: string; }) => console.log(diet.name)));
    console.log("print report data medicin :" + reportdata.medicins.forEach((medicine: { drugname: string; unit: string; dosage: string; }) => console.log(medicine.drugname)));
    this.reportService
      .create(reportdata).subscribe(data => {
        this.report = data;
        console.log("print report after saving")
        console.log(reportdata);
        this.report = {
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
    return  this.reportForm.get('medicines') as FormArray;
  }


  addMedicins() {
    this.medicines.push(this.buildMedicine());

  }

  removeMedicins(i: number) {
    this.medicines.removeAt(i);
  }

  // Build Medicine form
  private buildMedicine(): FormGroup {
    return this.fb.group({
      drugname:  '',
      unit:  '' ,
      dosage:  '' ,
    });
  }

 private buildAllergies(): FormGroup {
    return this.fb.group({
      name: ''
    });
  }

  get allergies() {
    return this.reportForm.get('allergies') as FormArray;
  }

  removeAllergie(i: number) {
    this.allergies.removeAt(i);
  }

  addAllergies(value?: string){
    this.allergies.push( this.buildAllergies());
  }

  private buildDisabilities(): FormGroup {
    return this.fb.group({
      name: ''
    });
  }

  get disabilities() {
    return this.reportForm.get('disabilities') as FormArray;
  }

  removedisabilitie(i: number) {
    this.disabilities.removeAt(i);
  }

  addDisabilitie(value?: string){
    this.disabilities.push( this.buildDisabilities());
  }
  get diets() {
    return this.reportForm.get('diets') as FormArray;
  }

  addDiets() {
    this.diets.push(this.buildDiet());
  }

  removeDiets(i: number) {
    this.diets.removeAt(i);
  }

  // Build Diet form
  private buildDiet(): FormGroup {
    return this.fb.group({
      name:  '',
      description: '' ,
    });
  }
}
