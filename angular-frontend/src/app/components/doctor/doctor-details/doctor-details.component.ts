import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../../classes/doctor';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  id: number = 0;
  doctor: Doctor =
{
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.doctorService.get(this.id)
      .subscribe((data: any) => {
        console.log(data);
        this.doctor = data;
      }, (error: any) => console.log(error));
  }

  list() {
    this.router.navigate(['doctors']);
  }

  updateLink() {
    this.router.navigate(['updateDoctor/' + this.doctor.id]);
  }
}
