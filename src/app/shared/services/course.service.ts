import { Injectable } from "@angular/core";
import { Course,CourseDto } from "../models/course.model";
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http";
import { Observable,throwError,from } from "rxjs";
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

    public courses:any;
    private apiURL:string = 'http://127.0.0.1:3003/';
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
        this.courses.subscribe((curso: any) => console.log(curso));
    }

    getCourses(): Observable < Course[] > {
      return this.httpService.get < Course[] > ('http://127.0.0.1:3003/courses/').pipe(catchError(this.errorHandler));
    }
    addCourse(course: Course): Observable < Course > {
        return this.httpService.post < Course > (this.apiURL + 'course/', JSON.stringify(course), this.httpOptions).pipe(catchError(this.errorHandler))
    }
} 