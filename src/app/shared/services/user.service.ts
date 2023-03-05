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
        this.users.subscribe((user:any) => console.log(user));    
    }

    getUsers(): Observable < User[] > {
      return this.httpService.get < User[] > (this.apiURL + 'students/').pipe(catchError(this.errorHandler));
    }
    getUser(dni:any): Observable < User[] > {
      return this.httpService.get < User[] > (this.apiURL + 'student/data/'+dni).pipe(catchError(this.errorHandler));
    }
    addUser(user: User): Observable < User > {
        return this.httpService.post < User > (this.apiURL + 'student/', JSON.stringify(user), this.httpOptions).pipe(catchError(this.errorHandler))
    }
    updateUser(user: any) {
      return this.httpService.put < any > (this.apiURL + 'student/update',user).pipe(catchError(this.errorHandler))
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
} 