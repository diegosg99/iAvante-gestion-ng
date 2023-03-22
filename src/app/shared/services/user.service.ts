import { Injectable } from "@angular/core";
import { User,UserDto } from "../models/user.model";
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http";
import { Observable,throwError,from } from "rxjs";
import { map,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    
    public users:any;
    private apiURL:string = 'http://127.0.0.1:3003/';
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    constructor (private httpService:HttpClient) {}

    ngOnInit() {
        this.users = this.getUsers();
        this.users.subscribe((user:any) => {});    
    }

    getUsers(): Observable < User[] > {
      return this.httpService.get < User[] > (this.apiURL + 'students/');
    }
    getUser(dni:any): Observable < User[] > {
      return this.httpService.get < User[] > (this.apiURL + 'student/data/'+dni);
    }
    addUser(user: User): Observable < User > {
        return this.httpService.post < User > (this.apiURL + 'student/', JSON.stringify(user), this.httpOptions)
    }
    updateUser(user: any) {
      return this.httpService.put < any > (this.apiURL + 'student/update',user);
    }
    getCourseDocumentation(courseCode:any|null) {
      return this.httpService.get < any > (this.apiURL + 'course/documentation/'+courseCode)
    }
    getCourseRoom(courseCode:any|null) {
      return this.httpService.get < any > (this.apiURL + 'course/room/'+courseCode)
    }

    errorHandler(error: {
      error: {
          message: string;
      };status: any;message: any;
    }) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
      } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
  }
  uploadStudentsFromExcel() {

  }
  uploadDocentsFromExcel() {
    
  }
} 