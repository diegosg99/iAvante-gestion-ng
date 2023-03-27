import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/shared/models/survey.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {

  dni:string|null = "";
  course:string|null = "";
  surveyForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
    ){
  this.surveyForm = new FormGroup({
    question1: new FormControl(90),
    question2: new FormControl(90),
    question3: new FormControl(90),
    question4: new FormControl(),
  
  })
  }

  @Output() formSent: EventEmitter<void> = new EventEmitter();

  sendForm () {
    // Send your form
    this.formSent.emit();
 }
  
  ngOnInit(){
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.course = this.route.snapshot.paramMap.get('course');  }
  showData(range:HTMLInputElement) {
    return range.value;
  }
  sendSurvey() {
    let survey = this.surveyForm.value;
    let fullSurvey = new Survey({
      course:this.course,
      student:this.dni,
      question1: survey.question1,
      question2: survey.question2,
      question3: survey.question3,
      question4: survey.question4
    });
    console.log(fullSurvey)
    this.userService.uploadSurvey(fullSurvey).subscribe();
    
  }
}
