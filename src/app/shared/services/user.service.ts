import { Injectable } from "@angular/core";
import { User,UserDto } from "../models/user.model";
import { HttpClient,HttpResponse } from "@angular/common/http";
import { from } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

    public users:any;
    //public httpService:HttpClient;

    constructor (private httpService:HttpClient) {
        this.users = [];
    }

    ngOnInit() {
        this.users = this.getUsers();
        console.log(this.users);
    }

    getUsers() {

        return fetch('127.0.0.1:3003/students',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors'
        }).then(res=>console.log(res));
        //return this.httpService.get('/api/user').then(res=>map((res: Response) => res.json()));
      }

    // createListUsers = async (dni:string) => {
    //     const users: UserDto[] = JSON.parse(await this.getStudentData(dni)) || [];
    //     this.users = users;
    //     return this.users;
    // }

    // getStudentData = (dni:string) => {
    //     return this.httpService.get('http://127.0.0.1:3003/students'+dni,null).then(JSON.parse);
    // }

    // postUser = (data:any) => {
    //     return this.httpService.post('http://127.0.0.1:3003/student/update/'+data.dni,data).then(JSON.parse);
    // }
} 