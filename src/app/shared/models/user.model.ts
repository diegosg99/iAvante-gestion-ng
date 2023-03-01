export interface UserDto {
    id:string;
    dni: string;
    name: string;
    surname: string;
    phone:number;
    email:string
}
  
export class User {
public id: string;
public dni: string;
public name: string;
public surname: string;
public phone: number;
public email: string;


    constructor({ dni,name,surname,phone,email }: UserDto = {
        id: "",
        dni:"",
        name: "",
        surname: "",
        phone: 0,
        email: "",
        }
    ) {
        this.id = this.uuidv4();
        this.dni = dni;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.email = email;
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
  