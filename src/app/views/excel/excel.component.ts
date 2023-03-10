import { Component, OnInit } from '@angular/core';
import { CourseDto,Course } from 'src/app/shared/models/course.model';
import  * as Excel from 'exceljs'
import { ArrayType } from '@angular/compiler';
import { CourseService } from 'src/app/shared/services/course.service';
import { UserService } from 'src/app/shared/services/user.service';


declare var window:any;

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})

//------------------------------------------- CLASS ------------------------------------------

export class ExcelComponent implements OnInit {

  formModal:any;
  file:any;
  e:Event | any;
  data: any;

  courseservice: CourseService;
  userService: UserService;

  docType:string="";

  tableCourse: boolean = false;
  tableStudents: boolean = false;
  tableDocents: boolean = false;

  constructor(courseService:CourseService,userService:UserService){
    this.courseservice = courseService;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      this.file = document.getElementById("importExcel")
    )
  }

  setDocType(docType:string) {
    this.docType = docType;
    this.tableCourse = (this.docType === 'cursos') ? true : false;
    this.tableStudents = (this.docType === 'alumnos') ? true : false;
    this.tableDocents = (this.docType === 'docentes') ? true : false;
  }

//------------------------------------------- DOM ------------------------------------------

  openModal() {
    this.formModal.show();
  }
  closeModal() {
    this.formModal.hide();
  }

//------------------------------------------- EXCEL ------------------------------------------

  loadFile(e:Event|any) {
    this.file = e.target.files[0];
  }
  convert = async () => {
    let reader = new FileReader();
    let rows:Array<any> = [];

    reader.readAsArrayBuffer(this.file);
    reader.onload = () => {

      const buffer:any = reader.result;
      const wb = new Excel.Workbook();

      wb.xlsx.load(buffer)
      .then(workbook => {

        let sheet = workbook.worksheets[0];
        sheet.eachRow((row,i) => { rows[i] = (row.values) })

        return rows;})
        .then(
          rows => {
            this.data = this.processData(rows,this.docType);
            console.log(this.data);
          })
    }
  }
  processData = (rows:any,docType:string) => {
    if (this.tableCourse) {
      try {
      return this.data = rows.map((row:Excel.Row | any,index:number): Course | undefined => {
                  if (index === 1){
                      return;
                  }
          return new Course({
            code: row[1]?row[1]:null,
            name: row[2]?row[2]:null,
            tutor: row[3]?row[3]:null,
            room: row[4]?row[4]:null,
            day: row[5]?row[5].toString():null,
            documentation: row[6]?row[6]:null
          })
        }).filter(this.isUndefined);
      } catch (error) {
        console.log(error);
        return
      };
    }

    if (this.tableDocents) {
    }
    if (this.tableStudents) {
    }
    return this.data;
  }
  isUndefined = (item: Course | undefined): item is Course => { return !!item }

  async importar(){

    const manager: {[key in string]: () => void} = {
      cursos: (): void => { this.courseservice.uploadCoursesFromExcel(this.data) },
      alumnos: (): void => { this.userService.uploadStudentsFromExcel() },
      docentes: (): void => { this.userService.uploadDocentsFromExcel() },
    };

    await manager[this.docType]();
  }
}
