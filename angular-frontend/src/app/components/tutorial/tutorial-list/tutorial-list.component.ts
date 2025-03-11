import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TutorialService } from '../../../services/tutorial.service';
import { Tutorial } from '../../../classes/tutorial';

declare module 'rxjs';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {
  tutorials: Observable<Tutorial[]> | undefined;

  constructor(private tutorialService: TutorialService, private router: Router) { }

  ngOnInit(): void {
    console.log('Tutorial list');
    this.reloadData();
  }

  reloadData(){
    this.tutorials = this.tutorialService.getAll();
    console.log(this.tutorials);
  }

  deleteTutorial(id: number) {
    this.tutorialService.delete(id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.reloadData();
        },
        (error: any) => console.log(error));
  }

  tutorialDetails(id: number){
    this.router.navigate(['tutorialDetails', id]);
  }

  updateTutorial(id: number){
    this.router.navigate(['updateTutorial', id]);
  }
}
