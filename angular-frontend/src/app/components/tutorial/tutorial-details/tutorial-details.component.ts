import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TutorialService } from '../../../services/tutorial.service';
import { Tutorial } from '../../../classes/tutorial';

declare module 'rxjs';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  id: number = 0;
  tutorial: Tutorial = {id: 0,
    title: '',
    description: '',
    published: false};

  constructor(private route: ActivatedRoute, private router: Router,
              private tutorialService: TutorialService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.tutorialService.get(this.id)
      .subscribe((data: any) => {
        console.log(data);
        this.tutorial = data;
      }, (error: any) => console.log(error));
  }

  list(){
    this.router.navigate(['tutorials']);
  }
  updateLink(){
    this.router.navigate(['updateTutorial/' + this.tutorial.id]);
  }

}
