import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../classes/doctor';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

declare module 'rxjs';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors: Observable<Doctor[]> | undefined;
  searchForm: any;

  constructor(private doctorService: DoctorService, private router: Router,
              private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      doctor_name: '',
    });
  }

  ngOnInit(): void {
    console.log('Doctor list');
    this.reloadData();
  }

  reloadData() {
    this.doctors = this.doctorService.getAll();
    console.log(this.doctors);
  }

  deleteDoctor(id: number) {
    this.doctorService.delete(id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.reloadData();
        },
        (error: any) => console.log(error));
  }

  doctorDetails(id: number) {
    this.router.navigate(['doctorDetails', id]);
  }

  updateDoctor(id: number) {
    this.router.navigate(['updateDoctor', id]);
  }

  OnSubmit(searchName: any) {
    console.log('Search Doctor name:');
    console.log(searchName.doctor_name);
    this.doctors = this.doctorService.findByDoctorName(searchName.doctor_name);
  }
}
