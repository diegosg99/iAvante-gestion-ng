// export interface CourseDto {
//     code: string;
//     name: string;
//     tutor: string;
//     room:number;
//     day:string;
//     documentation: string;

// }

type CloseState = 'No Finalizado' | '[0-15]' | '[15-30]' | 'Más de 30';
type Confirmation = 'SI' | 'NO';

export interface CourseDto {
    code: String;
    name: String;
    start: string | number | null;
    end: string | number | null;
    preStart: string | number | null;
    preEnd: string | number | null;
    endDate: string | number | null;
    place: string | null;
    province: string | null;
    solicitudes: number | string;
    enrollments: number | string;
    realized: number | null | string;
    passed: number | null | string;
    acreditation: Confirmation | string;
    expedientNum: String | null;
    creditNum: String | null;
    daysToClose: number | null | string;
    closeState: CloseState | string;
  };
  
export class Course {
    private code: String;
    private name: String;
    private start: string | number | null;
    private end: string | number | null;
    private preStart: string | number | null;
    private preEnd: string | number | null;
    private endDate: string | number | null;
    private place: string | null;
    private province: string | null;
    private solicitudes: number | string;
    private enrollments: number | string;
    private realized: number | null | string;
    private passed: number | null | string;
    private acreditation: Confirmation | string;
    private expedientNum: String | null;
    private creditNum: String | null;
    private daysToClose: number | null | string;
    private closeState: CloseState | string;


    constructor({ code,name,start,end,preStart,preEnd,endDate,place,province,solicitudes,enrollments,realized,passed,acreditation,expedientNum,creditNum,daysToClose,closeState }: CourseDto
    ) {
       this.code = code;
       this.name = name;
       this.start = start;
       this.end = end;
       this.preStart = preStart;
       this.preEnd = preEnd;
       this.endDate = endDate;
       this.place = place;
       this.province = province;
       this.solicitudes = solicitudes;
       this.enrollments = enrollments;
       this.realized = realized;
       this.passed = passed;
       this.acreditation = acreditation;
       this.expedientNum = expedientNum;
       this.creditNum = creditNum;
       this.daysToClose = daysToClose;
       this.closeState = closeState;
    }
}
  