import { Component,OnInit } from '@angular/core';
// import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder } from '@angular/forms';
import { User,UserDto } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{

  public users: UserDto[];
  public userForm;

    constructor(
      private userService: UserService,
      private formBuilder:FormBuilder
    ){
        this.userService = userService;
        this.users = userService.getStudentData(dni);
        this.userForm = this.formBuilder.group({
          
        })
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    // handlerPrintStudents = async (dni) => {
    //     return await this.service.getStudentData(dni);
    // }

    // handlerForm = async (user) => {
    //     this.service.postUser(user);
    // }

}
