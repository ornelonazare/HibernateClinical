import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Patient } from "../../../classes/patient";
import { PatientService } from "../../../services/patient.service";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
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
  id: number = 0;

  constructor(private route: ActivatedRoute, private router: Router,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.patientService.get(this.id)
      .subscribe((data: any) => {
        console.log(data);
        this.patient = data;
      }, (error: any) => console.log(error));
  }

  list() {
    this.router.navigate(['patients']);
  }

  updateLink() {
    this.router.navigate(['updatePatient/' + this.patient.id]);
  }
}
