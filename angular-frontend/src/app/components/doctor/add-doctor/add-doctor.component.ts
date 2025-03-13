import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../classes/doctor';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  doctor: Doctor = {
    id: 0,
    doctorname: '',
    speciality: '',
    doctor_address: '',
    hospital_name :'',
    about: '',
    profile_picture: null
  };
  submitted = false;

  constructor(private doctorService: DoctorService,
              private router: Router) { }

  ngOnInit(): void {
  }

  newDoctor(): void {
    this.submitted = false;
    this.doctor = {
      id: 0,
      doctorname: '',
      speciality: '',
      doctor_address: '',
      hospital_name :'',
      about: '',
      profile_picture: null
    };
  }

  save() {
    this.doctorService
      .create(this.doctor).subscribe((data: any) => {
        console.log(data);
        this.doctor = {
          id: 0,
          doctorname: '',
          speciality: '',
          doctor_address: '',
          hospital_name :'',
          about: '',
          profile_picture: null
        };
        console.log(this.doctor);
        this.gotoList();
      },
      (error: any) => {
        console.log(error)});
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/doctors']);
  }
}
