import { Component, OnInit } from '@angular/core';
import { CourseDto,Course } from 'src/app/shared/models/course.model';
import  * as Excel from 'exceljs'
import { ArrayType } from '@angular/compiler';

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

  docType:string="";

  tableCourse: boolean = false;
  tableStudents: boolean = false;
  tableDocents: boolean = false;

  constructor(){
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

    console.log(this.docType);

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
//            console.log(this.data);
          })
    }
  }
  processData = (rows:any,docType:string) => {
    if (this.tableCourse) {
      try {
      return this.data = rows.map((row:Excel.Row | any,index:number): Course | undefined => {
                  if (index === 1 || index === 3){
                      return;
                  }
          return new Course({
            code: row[1],
            name: row[2],
            start: row[3],
            end: row[4],
            preStart: row[5],
            preEnd: row[6],
            endDate: row[7],
            place: row[8],
            province: row[9],
            solicitudes: row[10],
            enrollments: row[11],
            realized: row[12],
            passed: row[13],
            acreditation: row[14],
            expedientNum: row[15],
            creditNum: row[16],
            daysToClose: row[17],
            closeState: row[18]
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
  isUndefined = (item: Course | undefined): item is Course => {  return !!item}

  importar(){}
}
