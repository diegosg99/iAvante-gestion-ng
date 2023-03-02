import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User,UserDto } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{

  public users:any;
  public userForm;

    constructor(
      private userService: UserService,
      private formBuilder:FormBuilder
    ){
        this.users = userService.getUsers();
        this.userForm = this.formBuilder.group({
          
        })
    }
  ngOnInit(): void {
    console.log(this.users);
  }
  addUser (user:UserDto) {

  }
}
