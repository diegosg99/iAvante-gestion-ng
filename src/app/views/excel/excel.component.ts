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

  constructor(){
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      this.file = document.getElementById("importExcel")
    )
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
  convert = async (docType:string) => {
    let reader = new FileReader();
    let rows:Array<any> = [];

    reader.readAsArrayBuffer(this.file);
    reader.onload = () => {

      const buffer:any = reader.result;
      const wb = new Excel.Workbook();

      wb.xlsx.load(buffer).then(workbook => {

      let sheet = workbook.worksheets[0];

        sheet.eachRow((row,i) => {
            rows[i] = (row.values);
        })

        return rows;
        }).then(
          rows => {
            this.data = this.processData(rows,docType);
            console.log(this.data);
          })
    }
  }

  processData = (rows:any,docType:string) => {
    if (docType =='cursos') {
      try {
      return this.data = rows.map((row:Excel.Row,index:number): Course | undefined => {
                  if (index === 1 || index === 3){
                      return;
                  }
          return new Course({
            code: this.getCellValue(row,1,index),
            name: this.getCellValue(row, 2,index),
            start: this.getCellValue(row, 3,index),
            end: this.getCellValue(row, 4,index),
            preStart: this.getCellValue(row, 5,index),
            preEnd: this.getCellValue(row, 6,index),
            endDate: this.getCellValue(row, 7,index),
            place: this.getCellValue(row, 8,index),
            province: this.getCellValue(row, 9,index),
            solicitudes: this.getCellValue(row, 10,index),
            enrollments: this.getCellValue(row, 11,index),
            realized: this.getCellValue(row, 12,index),
            passed: this.getCellValue(row, 13,index),
            acreditation: this.getCellValue(row, 14,index),
            expedientNum: this.getCellValue(row, 15,index),
            creditNum: this.getCellValue(row, 16,index),
            daysToClose: this.getCellValue(row,17,index),
            closeState: this.getCellValue(row,18,index)
          })
        }).filter(this.isUndefined);
      } catch (error) {
        console.log(error);
        return
      };
    }

    if (docType==='docentes') {
    }
    if (docType==='alumnos') {
    }
    return this.data;
  }

  getCellValue = (row:Excel.Row | any, cellIndex:number,index:number) => {
    try {
      const cell = row[cellIndex];
      return cell;
    } catch (error) {
      return;
    }
  };

  isUndefined = (item: Course | undefined): item is Course => {  return !!item}

  importar(){}
}
