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
    this.users.subscribe((data: any)=> {

      //let users:Array<UserDto>;
      //users = data.rows;
      this.users = data.rows;
      console.log(this.users);
    });
  }
  addUser (user:UserDto) {

  }

  showUser(e: any) {
    if (!e.target.value){return};
    let dni:string|null = e.target.value? e.target.value:null;
    console.log(dni);
  }
}
