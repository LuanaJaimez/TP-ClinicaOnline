export class Patient {
    id?: string;
    email: string;
    password: string;
    displayName: string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
    insurance: string;
    role: string = 'Patient';
    photoURL: string;
    imageUrl: string[] = [];

    constructor(email: string = '', password: string = '', displayName: string = '', name: string = '', lastName: string = '', age: number = 0, dni: string = '', 
                insurance: string = '', photoURL: string = '', imageUrl: string[] = []) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.dni = dni;
        this.insurance = insurance;
        this.role = 'Patient';
        this.photoURL = photoURL;
        this.imageUrl = imageUrl;
    }
}
