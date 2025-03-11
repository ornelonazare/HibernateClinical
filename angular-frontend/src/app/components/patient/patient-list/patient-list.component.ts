import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PatientService} from "../../../services/patient.service";
import {Router} from "@angular/router";
import {Patient} from "../../../classes/patient";
import { FormBuilder, FormGroup } from '@angular/forms';

declare module 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Observable<Patient[]> | undefined;
  searchForm: FormGroup;

  constructor(private patientService: PatientService, private router: Router,
              private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      name: '',
    });
  }

  ngOnInit(): void {
    console.log('Patient list');
    this.reloadData();
  }

  reloadData(){
    this.patients = this.patientService.getAll();
    console.log(this.patients);
  }

  deletePatient(id: number) {
    this.patientService.delete(id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.reloadData();
        },
        (error: any) => console.log(error));
  }

  patientDetails(id: number){
    this.router.navigate(['patientDetails', id]);
  }

  updatePatient(id: number){
    this.router.navigate(['updatePatient', id]);
  }

  OnSubmit(searchName: any){
    console.log('Search name:');
    console.log(searchName.name);
    this.patients = this.patientService.findByPatientName(searchName.name);
  }

}
