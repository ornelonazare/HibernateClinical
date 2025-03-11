import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../classes/patient';
import { Doctor } from '../../../classes/doctor';
import { DoctorService } from '../../../services/doctor.service';
import {Observable} from "rxjs";
import {FormBuilder, NgForm} from "@angular/forms";

declare module 'rxjs';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  patient:Patient = {
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
  submitted = false;
  doctors: Observable<Doctor[]> | undefined;

  @ViewChild("formData") form = NgForm;

  patientForm = this.fb.group({
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
    patient_doctor_id: 0,
  });
  constructor(private patientService: PatientService, private doctorService: DoctorService,
              private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.doctors = this.doctorService.getAll();
  }

  newPatient(): void {
    this.submitted = false;
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
      patient_doctor:{id :0 },
      // Use camelCase
    };
  }

  save() {

    this.patient.name = this.patientForm.value.name;
    this.patient.entrydate = this.patientForm.value.entrydate;
    this.patient.dob = this.patientForm.value.dob;
    this.patient.age = this.patientForm.value.age;
    this.patient.gender = this.patientForm.value.gender;
    this.patient.occupation = this.patientForm.value.occupation;
    this.patient.healthinsuranceno = this.patientForm.value.healthinsuranceno;
    this.patient.healthcareprovider = this.patientForm.value.healthcareprovider;
    this.patient.patientaddress = this.patientForm.value.patientaddress;
    this.patient.contact = this.patientForm.value.contact;
    this.patient.patient_doctor.id = this.patientForm.value.patient_doctor_id;

    console.log(this.patient);
    this.patientService
      .create(this.patient).subscribe((data: any) => {
        console.log(data);
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
        console.log(this.patient);
        //this.gotoList();
      },
      (error: any) => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
  gotoList() {
    this.router.navigate(['patients']);
  }

}
