import { Injectable } from "@angular/core";
import { Course,CourseDto } from "../models/course.model";
import { User,UserDto } from "../models/user.model";
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http";
import { Observable,throwError,from } from "rxjs";
import { map,catchError } from 'rxjs/operators';
import {parse, stringify} from 'flatted';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    public courses:any;
    private apiURL:string = 'http://127.0.0.1:3003/api/v1/';
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    constructor (private httpService:HttpClient) {}

    errorHandler(error: {
            error: {
                message: string;
            };
            status: any;
            message: any;
        }) {
      let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      return throwError(errorMessage);
  }

    ngOnInit() {
        this.courses = this.getCourses();
        this.courses.subscribe((curso: any) =>  {});
    }

    getCourses(): Observable < Course[] > {
      return this.httpService.get < Course[] > (this.apiURL + 'courses/').pipe(catchError(this.errorHandler));
    }

    getCourseUsers(code:string): Observable < User[] > {
      return this.httpService.get < User[] > (this.apiURL + 'students/course/'+code).pipe(catchError(this.errorHandler));
    }

    uploadCoursesFromExcel (courses: Array<Course>): Observable < Course[] > | any {
        return this.httpService.post < Course[] >  (this.apiURL + 'courses/uploadExcel', courses).subscribe()//, this.httpOptions).pipe(catchError(this.errorHandler))
    }
} 