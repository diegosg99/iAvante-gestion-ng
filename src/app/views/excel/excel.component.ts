import { Component, OnInit } from '@angular/core';
import { CourseDto,Course } from 'src/app/shared/models/course.model';
import  * as Excel from 'exceljs'

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
    reader.readAsArrayBuffer(this.file);
    reader.onload = () => {
    const buffer:any = reader.result;
    const wb = new Excel.Workbook();

//------------------------------------------- Crear array de rows ------------------------------------------

    let rows:any|CourseDto = [];      

    wb.xlsx.load(buffer).then(workbook => {

    let sheet = workbook.worksheets[0];
      sheet.eachRow((row) => {
        rows.push(row.values);
      })
    })
    
    //-------------------------- INTENTO DE QUITAR LOS FILAS DE ARRIBA -----------------------------
    // for (let i = 0; i < invalidRows; i++) {
    //   let el = rows.shift();
    // }
    //let newData:any = []; ----------------TODO

    if (docType =='cursos') {
      
      console.log(rows);

      this.data = rows.forEach((row:Excel.Row): Course | undefined => {
        console.log('ola');
        try {
          let course =  new Course({
            code: this.getCellValue(row,1),
            name: this.getCellValue(row, 2),
            start: this.getCellValue(row, 3),
            end: this.getCellValue(row, 4),
            preStart: this.getCellValue(row, 5),
            preEnd: this.getCellValue(row, 6),
            endDate: this.getCellValue(row, 7),
            place: this.getCellValue(row, 8),
            province: this.getCellValue(row, 9),
            solicitudes: this.getCellValue(row, 10),
            enrollments: this.getCellValue(row, 11),
            realized: this.getCellValue(row, 12),
            passed: this.getCellValue(row, 13),
            acreditation: this.getCellValue(row, 14),
            expedientNum: this.getCellValue(row, 15),
            creditNum: this.getCellValue(row, 16),
            daysToClose: this.getCellValue(row,17),
            closeState: this.getCellValue(row,18)
          });
          
          console.log(course);
  
          //newData.push(course);
  
          return new Course({
            code: this.getCellValue(row,1),
            name: this.getCellValue(row, 2),
            start: this.getCellValue(row, 3),
            end: this.getCellValue(row, 4),
            preStart: this.getCellValue(row, 5),
            preEnd: this.getCellValue(row, 6),
            endDate: this.getCellValue(row, 7),
            place: this.getCellValue(row, 8),
            province: this.getCellValue(row, 9),
            solicitudes: this.getCellValue(row, 10),
            enrollments: this.getCellValue(row, 11),
            realized: this.getCellValue(row, 12),
            passed: this.getCellValue(row, 13),
            acreditation: this.getCellValue(row, 14),
            expedientNum: this.getCellValue(row, 15),
            creditNum: this.getCellValue(row, 16),
            daysToClose: this.getCellValue(row,17),
            closeState: this.getCellValue(row,18)
          })
        } catch (error) {
          console.log(error);
          return
        }
        
      });
    }

    if (docType==='docentes') {
    }
    if (docType==='alumnos') {
    }
    return this.data;
    };
  }
  getCellValue = (row:  Excel.Row, cellIndex: number) => {
    const cell = row.getCell(cellIndex);
    
    return cell.value ? cell.value.toString() : '';
  };
  importar(){}

}
