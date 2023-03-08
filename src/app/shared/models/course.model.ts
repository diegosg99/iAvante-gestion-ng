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
    code: String | undefined;
    name: String | undefined;
    start: string | number | null | undefined;
    end: string | number | null | undefined;
    preStart: string | number | null | undefined;
    preEnd: string | number | null | undefined;
    endDate: string | number | null | undefined;
    place: string | null | undefined;
    province: string | null | undefined;
    solicitudes: number | string | undefined;
    enrollments: number | string | undefined;
    realized: number | null | string | undefined;
    passed: number | null | string | undefined;
    acreditation: Confirmation | string | undefined;
    expedientNum: String | null | undefined;
    creditNum: String | null | undefined;
    daysToClose: number | null | string | undefined;
    closeState: CloseState | string | undefined;
  };
  
export class Course {
    private code: String | undefined;
    private name: String | undefined;
    private start: string | number | null | undefined;
    private end: string | number | null | undefined;
    private preStart: string | number | null | undefined;
    private preEnd: string | number | null | undefined;
    private endDate: string | number | null | undefined;
    private place: string | null | undefined;
    private province: string | null | undefined;
    private solicitudes: number | string | undefined;
    private enrollments: number | string | undefined;
    private realized: number | null | string | undefined;
    private passed: number | null | string | undefined;
    private acreditation: Confirmation | string | undefined;
    private expedientNum: String | null | undefined;
    private creditNum: String | null | undefined;
    private daysToClose: number | null | string | undefined;
    private closeState: CloseState | string | undefined;


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
  