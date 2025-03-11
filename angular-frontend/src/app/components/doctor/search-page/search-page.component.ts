import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../classes/patient';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { Router } from '@angular/router';

declare module 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  patient: Patient =
{
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
  patient_doctor: {id :0 }, // Use camelCase
};

  searchForm: any;

  constructor(private patientService: PatientService, private router: Router,
              private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      patient_name: '',
      patient_dob: null,
    });
  }

  ngOnInit(): void {
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

  OnSubmit(searchName: any): void {
    console.log('Search Patient name and Dob:');
    console.log(searchName.patient_name);
    console.log(searchName.patient_dob);

    const data1 : {"name":string, "dob": Date } = {"name" : searchName.patient_name, "dob" : searchName.patient_dob};

    this.patientService.findByPatientNameDob(searchName.patient_name,searchName.patient_dob ).subscribe(
      (data: any) => {
        console.log(data);
        this.patient = data;
        console.log(data);
      },
      (error: any) => console.log(error)
    );
    //console.log(this.patientService.findByPatientNameDob(data1));
  }

  patientDetails(id: number): void {
    this.router.navigate(['patientDetails', id]);
  }
}
''
