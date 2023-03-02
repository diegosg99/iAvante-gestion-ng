import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { CourseDto } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  public courses:any;

  constructor(private route:ActivatedRoute){
    this.courses = this.getCourses();
  }
  course$ = this.route.paramMap
  .pipe(
    map((params: ParamMap) => params.get('course'))
  );

  getCourses() {
    return fetch('http://127.0.0.1:3003/courses',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'no-cors'
    }).then(res=>res.json());
  }

  ngOnInit() {
    this.courses = fetch('')
    return 
  }
}
