import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from '../../../classes/doctor';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {

  id: number = 0;
  doctor: Doctor = {
    id: 0,
    doctorname: '',
    speciality: '',
    doctor_address: '',
    hospital_name :'',
    about: '',
    profile_picture: null
  };

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.doctorService.get(this.id)
      .subscribe((data: any) => {
        console.log(data);
        this.doctor = data;
      }, (error: any) => console.log(error));
  }

  updateDoctor() {
    this.doctorService.update(this.id, this.doctor).subscribe(
      (data: any) => {
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
        this.list();
      }, (error: any) => console.log(error)
    );
  }

  onSubmit() {
    this.updateDoctor();
  }

  list() {
    this.router.navigate(['doctors']);
  }
}
