import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TutorialService } from '../../../services/tutorial.service';
import { Tutorial } from '../../../classes/tutorial';

declare module 'rxjs';

@Component({
  selector: 'app-create-tutorial',
  templateUrl: './create-tutorial.component.html',
  styleUrls: ['./create-tutorial.component.css']
})
export class CreateTutorialComponent implements OnInit {

  tutorial: Tutorial = {id: 0,
    title: '',
    description: '',
    published: false};
  submitted = false;

  constructor(private tutorialService: TutorialService,
              private router: Router) { }

  ngOnInit() {
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {id: 0,
      title: '',
      description: '',
      published: false};
  }

  save() {
    this.tutorialService
      .create(this.tutorial).subscribe((data: any) => {
        console.log(data);
        this.tutorial = {id: 0,
          title: '',
          description: '',
          published: false};
        console.log(this.tutorial);
        this.gotoList();
      },
      (error: any) => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    // this.tutorial.published = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/tutorials']);
  }

}
