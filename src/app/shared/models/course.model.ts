
export interface CourseDto {
    code: string;
    name: string;
    tutor: string;
    room:number;
    day:string;
    documentation: string;
}
  
export class Course {
    private id: string;
    private code: String | undefined;
    private name: String | undefined;
    private tutor: string | number | null | undefined;
    private room: string | number | null | undefined;
    private day: string | number | null | undefined;
    private documentation: string | number | null | undefined;

    constructor({ code,name,tutor,room,day,documentation }: CourseDto
    ) {
       this.id = this.uuidv4(4);
       this.code = code;
       this.name = name;
       this.tutor = tutor;
       this.room = room;
       this.day = day;
       this.documentation = documentation;
    }
    uuidv4 (parts: number): string {
        const stringArr = [];
        for(let i = 0; i< parts; i++){

            const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
          stringArr.push(S4);
        }
        return stringArr.join('-');
      }
}
  