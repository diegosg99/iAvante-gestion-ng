export interface SurveyDto {
    course: string | null;
    student: string | null;
    question1: number;
    question2: number;
    question3: number;
    question4: string;
}
  
export class Survey {
public id: string | null;
public course: string | null;
public student: string | null;
public question1: number;
public question2: number;
public question3: number;
public question4: string;
public global: number;

    constructor({ course,student,question1,question2,question3,question4 }: SurveyDto
    ) {
        this.id = this.uuidv4();
        this.course = course;
        this.student = student;
        this.question1 = question1;
        this.question2 = question2;
        this.question3 = question3;
        this.question4 = question4;
        this.global = this.getGlobal()
    }

getGlobal() {
    let global = (this.question1+this.question2+this.question2)/3;
    return global;
}

uuidv4(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c: number) =>
        (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}
}
  