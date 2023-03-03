import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { CourseDto } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  public courses:any;

  constructor(private route:ActivatedRoute,private courseService:CourseService){
    this.courseService = courseService;
    this.courses = this.courseService.getCourses();
  }

//-----------Ruta--------------------

  course$ = this.route.paramMap
  .pipe(
    map((params: ParamMap) => params.get('course'))
  );

  ngOnInit() {
    this.courses.subscribe((data: any)=> {

      this.courses = data.rows;
    }); 
  }

  showCourseUsers(e:Event|any) {
    this.courseService.getCourseUsers(e.target.value).subscribe((data: any)=> {

      //UserComponent. = data.rows;
    });
  }
}