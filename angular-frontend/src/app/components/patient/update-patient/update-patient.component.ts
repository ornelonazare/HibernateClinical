import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../../../classes/patient";
import {PatientService} from "../../../services/patient.service";
import {DoctorService} from "../../../services/doctor.service";
import {Observable} from "rxjs";
import {Doctor} from "../../../classes/doctor";

declare module 'rxjs';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  id: number = 0;
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
  doctors: Observable<Doctor[]> | undefined;

  constructor(private route: ActivatedRoute, private router: Router,
              private patientService: PatientService, private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctors = this.doctorService.getAll();
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

    this.id = this.route.snapshot.params['id'];

    this.patientService.get(this.id)
      .subscribe((data: any) => {
        console.log(data);
        this.patient = data;
      }, (error: any) => console.log(error));
  }

  updatePatient(){
    this.patientService.update(this.id, this.patient).subscribe(
      (data: any) => {
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
        this.list();
      }, (error: any) => console.log(error)
    );
  }

  onSubmit(){
    this.updatePatient();
  }

  list(){
    this.router.navigate(['patients']);
  }
}
