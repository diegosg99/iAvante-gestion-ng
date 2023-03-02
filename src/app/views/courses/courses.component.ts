import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { CourseDto } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  public courses:any;

  constructor(private route:ActivatedRoute,private courseService:CourseService){
    this.courseService = courseService;
    this.courses = this.getCourses();
  }

//-----------Ruta--------------------

  course$ = this.route.paramMap
  .pipe(
    map((params: ParamMap) => params.get('course'))
  );

  getCourses() {
    this.courseService.getCourses();
  }

  ngOnInit() {
    this.courses = fetch('')
    return 
  }
}