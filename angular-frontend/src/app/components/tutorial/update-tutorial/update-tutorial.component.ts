import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TutorialService } from '../../../services/tutorial.service';
import { Tutorial } from '../../../classes/tutorial';

@Component({
  selector: 'app-update-tutorial',
  templateUrl: './update-tutorial.component.html',
  styleUrls: ['./update-tutorial.component.css']
})
export class UpdateTutorialComponent implements OnInit {

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

  updateTutorial(){
    this.tutorialService.update(this.id, this.tutorial).subscribe(
      (data: any) => {
        console.log(data);
        this.tutorial = {id: 0,
          title: '',
          description: '',
          published: false};
        this.list();
      }, (error: any) => console.log(error)
    );
  }

  onSubmit(){
    this.updateTutorial();
  }

  list(){
    this.router.navigate(['tutorials']);
  }

}
