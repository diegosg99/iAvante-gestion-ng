import { Injectable } from "@angular/core";
import { User,UserDto } from "../models/user.model";
import { httpService } from "./httpService";

@Injectable()
export class UserService {

    public users: UserDto[];
    public httpService:httpService;

    constructor (httpService:httpService,dni:string) {
        this.httpService = httpService;
        this.users = [];
        //this.createListUsers(dni);
    }

    createListUsers = async (dni:string) => {
        const users: UserDto[] = JSON.parse(await this.getStudentData(dni)) || [];
        this.users = users;
        return this.users;
    }

    getStudentData = (dni:string) => {
        return this.httpService.get('http://127.0.0.1:3003/student/data/'+dni,null).then(JSON.parse);
    }

    postUser = (data:any) => {
        return this.httpService.post('http://127.0.0.1:3003/student/update/'+data.dni,data).then(JSON.parse);
    }
} 