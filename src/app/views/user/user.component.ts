import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User,UserDto } from 'src/app/shared/models/user.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { UserService } from 'src/app/shared/services/user.service';
import { __values } from 'tslib';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  public users:any;
  public courses:any;
  public dni:string;
  
  public userForm: FormGroup;

    constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private courseService:CourseService
    ){
      this.dni = "";
      this.courses = this.courseService.getCourses();
      this.userForm = new FormGroup({
        dni: new FormControl(),
        name: new FormControl(),
        surname: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        details: new FormControl(),
        rights: new FormControl(),
      });

  }

  @Output() formSent: EventEmitter<void> = new EventEmitter();

  sendForm () {
     // Send your form
     this.formSent.emit();
  }

  ngOnInit(): void {
    this.courses.subscribe((data: any)=> {
      this.courses = data.rows;
    });
  }
  updateUser () { // TODO
    let user = this.userForm.value;
    user.rights = true?1:0;
    this.userService.updateUser(user).subscribe();
    
  }
  showUser(e: any) {
    if (!e.target.value){return};
    let dni:any = e.target.value? e.target.value:null;

    let user = this.userService.getUser(dni);

    user.subscribe((data:any) => {

      let formUser = data.rows[0];
      this.dni = formUser.dni;
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
  showCourseUsers(e:Event|any) {
    
    this.courseService.getCourseUsers(e.target.value).subscribe((data: any)=> {
        this.users = data.rows;
    });
  }
}
