import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User,UserDto } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  public users:any;
  
   public userForm: FormGroup;

    constructor(
      private userService: UserService,
      private formBuilder:FormBuilder
    ){

      this.userForm = new FormGroup({
        dni: new FormControl(),
        name: new FormControl(),
        surname: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        details: new FormControl(),
        rights: new FormControl(),
      });
      
      this.users = this.userService.getUsers();
    }
  ngOnInit(): void {
    this.users.subscribe((data: any)=> {

      this.users = data.rows;
    });
  }
  updateUser () {
    this.userService.updateUser(this.userForm.value);
  }

  showUser(e: any) {
    if (!e.target.value){return};
    let dni:any = e.target.value? e.target.value:null;

    let user = this.userService.getUser(dni);

    user.subscribe((data:any) => {

      let formUser = data.rows[0];
      this.userForm.setValue({
        'dni':dni,
        'name':formUser.name,
        'surname': formUser.surname,
        'email': formUser.email,
        'phone': formUser.phone,
        'details': formUser.details,
        'rights': formUser.rights
      
      }) ;
    })
  }
}
