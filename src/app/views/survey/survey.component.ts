import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {

  dni:string|null = "";
  course:string|null = "";

  constructor(private route: ActivatedRoute){
  }
  
  ngOnInit(){
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.course = this.route.snapshot.paramMap.get('course');  }
  showData(range:HTMLInputElement) {
    return range.value;
  }
}
