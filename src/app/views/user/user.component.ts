import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

    constructor(view,service){
        this.view = view;
        this.service = service;
        this.init();
    }

    init = () => {
        this.view.bindSelectStudent(this.handlerPrintStudents);
        this.view.bindSubmitForm(this.handlerForm);
    }

    handlerPrintStudents = async (dni) => {
        return await this.service.getStudentData(dni);
    }

    handlerForm = async (user) => {
        this.service.postUser(user);
    }

}
