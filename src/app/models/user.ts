import { Roles } from "./role";

export class User {
    id?: string;
    uid?: string;
    email: string;
    password: string;
    displayName: string;
    name: string;
    lastName: string;
    age: number;
    dni: string;
    insurance?: string;
    specialties?: string[] = [];
    role: Roles;
    emailVerified?: boolean;
    approved?: boolean;
    photoURL: string;
    imageUrl: string[] = [];

    constructor(uid: string = '', email: string = '', password: string = '', displayName: string = '', name: string = '', lastName: string = '', age: number = 0,
                dni: string = '', insurance: string = '', specialties: string[] = [],  role: Roles = 'Admin', emailVerified: boolean = false, approved: boolean = false, 
                photoURL: string = '', imageUrl: string[] = []) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.dni = dni;
        this.insurance = insurance;
        this.specialties = specialties;
        this.role = role;
        this.emailVerified = emailVerified;
        this.approved = approved;
        this.uid = uid;
        this.photoURL = photoURL;
        this.imageUrl = imageUrl;
    }
}
