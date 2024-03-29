import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public selectedCourse:string = "";
  
  public userForm: FormGroup;

    constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router,
      private courseService:CourseService
    ){
      this.dni = "";
      this.courses = this.courseService.getCourses();
      this.userForm = new FormGroup({
        dni: new FormControl("",Validators.compose(
          [ Validators.maxLength(9), Validators.minLength(9),Validators.pattern('[0-9]{8}[A-Z]{1}|[A-Z]{1}[0-9]{8}')]
       )),
        name: new FormControl("",Validators.compose(
          [ Validators.maxLength(30), Validators.minLength(1)]
       )),
        surname: new FormControl("",Validators.compose(
          [ Validators.maxLength(100), Validators.minLength(1)]
       )),
        email: new FormControl("",Validators.compose(
          [ Validators.maxLength(200), Validators.minLength(1),Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
       )),
        phone: new FormControl("",Validators.compose(
          [ Validators.maxLength(9), Validators.minLength(9),Validators.pattern('[0-9]{9}')]
       )),
        details: new FormControl(),
        rights: new FormControl(true,Validators.requiredTrue),
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
    this.router.navigateByUrl('documentation/'+this.userForm.value.dni+"/"+this.selectedCourse)
    
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
    this.selectedCourse = e.target.value;
    console.log(this.selectedCourse);
    this.courseService.getCourseUsers(e.target.value).subscribe((data: any)=> {
      console.log(data);
        this.users = data.rows;
    });
  }
}
