import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {

  dni:string|null;

  constructor(private route: ActivatedRoute){
    this.dni = "";
  }
  
  ngOnInit(){
    this.dni = this.route.snapshot.paramMap.get('dni');
  }
  showData(range:HTMLInputElement) {
    return range.value;
  }
}
