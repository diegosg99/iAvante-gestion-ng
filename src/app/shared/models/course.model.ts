export interface CourseDto {
    code: string;
    name: string;
    tutor: string;
    room:number;
    day:string;
    documentation: string;

}
  
export class Course {
public code: string;
public name: string;
public tutor: string;
public room: number;
public day: string;
public documentation: string;


    constructor({ code,name,tutor,room,day,documentation }: CourseDto = {
        code:"",
        name: "",
        tutor: "",
        room: 0,
        day: "",
        documentation: "",
        }
    ) {
        this.code = code;
        this.name = name;
        this.tutor = tutor;
        this.room = room;
        this.day = day;
        this.documentation = documentation;
    }
}
  