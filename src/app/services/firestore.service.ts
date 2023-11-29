import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import firebase from 'firebase/compat/app';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  public role: any;

  constructor(private afs: AngularFirestore) {}

  async addUser(user: User) {
    let newUser: User = {
      email: user.email,
      password: user.password,
      displayName: user.name + ' ' + user.lastName,
      name: user.name,
      lastName: user.lastName,
      age: user.age,
      dni: user.dni,
      insurance: user.insurance,
      specialties: user.specialties,
      role: user.role,
      uid: user.uid,
      approved: user.approved,
      photoURL: user.photoURL,
      imageUrl: user.imageUrl,
    };

    return await this.afs.collection('users').add(newUser);
  }

  async logUser(user: User) {
    var auxDate = new Date().toLocaleString();
    var date = auxDate.split(',')[0];
    var time = auxDate.split(',')[1];
    let newLog: any = {
      displayName: user.name + ' ' + user.lastName,
      date: date,
      time: time,
    };
    var uid = (date + ' - ' + time + ' - ' + user.name + ' ' + user.lastName).replace(/\//g, "-")
    await this.afs.collection('logs').doc(uid).set(newLog, {merge: false});
  }

  getLogs() {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('logs')
      .orderBy('date', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getUserData(uid: any) {
    var data: firebase.firestore.DocumentData;
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });    
  }

  getAllUsers() {
    return this.afs.collection('users').valueChanges();
  }

  enableUser(uid: any) {
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            approved: true,
          });
          console.log(doc.data()['approved']);
        });
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      });
  }

  disableUser(uid: any) {
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            approved: false,
          });
          console.log(doc.data()['approved']);
        });
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      });
  }

  userStatus(uid: any, status:boolean){
    return firebase
    .firestore()
    .collection('users')
    .where('uid', '==', uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          approved: status,
        });
        console.log(doc.data()['approved']);
      });
    })
    .catch((error) => {
      console.log('Error updating document: ', error);
    });
  }

  getUserRole(uid: any) {
    var data: any;
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data()['role'];
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getUserDisplayName(uid: any) {
    var data: any;
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data()['displayName'];
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getUserApproved(uid: any) {
    var data: any;
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data()['approved'];
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAllPatients() {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('users')
      .where('role', '==', 'Patient')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAllSpecialists() {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('users')
      .where('role', '==', 'Doctor')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAllEnabledSpecialists() {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('users')
      .where('role', '==', 'Doctor')
      .where('approved', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getSpecialties() {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('specialties')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getDoctorsBySpecialtyAndEnabled(specialty: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('users')
      .where('specialties', 'array-contains', specialty)
      .where('approved', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getSpecialtiesByDoctor(uid: any) {
    var data: any;
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid || '')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data()['specialties'];
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  updateSpecialties(specialties: any) {
    return firebase
      .firestore()
      .collection('specialties')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            specialties: specialties,
          });
        });
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      });
  }

  updateServiceHours(uid: any, hours: any) {
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            serviceHours: hours,
          });
          console.log(doc.data()['approved']);
        });
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      });
  }

  //Appointments

  getAppointmentData(uid: any) {
    return this.afs
      .collection('appointments', (ref) => ref.where('uid', '==', uid || ''))
      .valueChanges();
  }

  getAppointments() {
    return this.afs
      .collection('appointments', (ref) => ref.orderBy('date', 'asc')).valueChanges();
  }

  getFinishedAppointments() {
    return this.afs
      .collection('appointments', (ref) => ref.where('status', '==', 'closed' || '').orderBy('date', 'asc')).valueChanges();
  }

  async addAppointment(date: string, doctor: string, patient: string, specialty: string) {
    let newAppointment: any = {
      date: date,
      doctor: doctor,
      patient: patient,
      specialty: specialty,
      status: 'pending',
      uid: date + '-' + doctor + '-' + patient + '-' + specialty,
      rating: 0,
    };

    return await this.afs.collection('appointments').add(newAppointment);
  }
   

  getDoctorAvailableHours(uid: any) {
    var data: any;
    return firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data()['serviceHours'];
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  searchDoctorAvailability(displayName: any) {
    var data: firebase.firestore.DocumentData;
    return firebase
      .firestore()
      .collection('appointments')
      .where('doctor', '==', displayName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  searchPatientAvailability(displayName: any) {
    var data: firebase.firestore.DocumentData;
    return firebase
      .firestore()
      .collection('appointments')
      .where('patient', '==', displayName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAppointmentsBySpecialtyForPatient(specialty: any, patient: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('appointments')
      .where('specialty', '==', specialty)
      .where('patient', '==', patient)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAppointmentsBySpecialty(specialty: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('appointments')
      .where('specialty', '==', specialty)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAppointmentsBySpecialist(specialist: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('appointments')
      .where('doctor', '==', specialist)
      .orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAppointmentsByPatient(patient: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('appointments')
      .where('patient', '==', patient)
      .orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAppointmentsBySpecialtyForDoctor(specialty: any, doctor: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('appointments')
      .where('specialty', '==', specialty)
      .where('doctor', '==', doctor)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getAppointmentsBySpecialistAndPatient(specialist: any, patient: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('appointments')
      .where('doctor', '==', specialist)
      .where('patient', '==', patient)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }  

  changeAppointmentStatus(
    uid: any,
    reason: any,
    status: any,
    diagnosis: any,
    observations: any
  ) {
    return firebase
      .firestore()
      .collection('appointments')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            status: status,
            appointmentInfo: reason,
            diagnosis: diagnosis,
            observations: observations,
          });
          console.log(doc.data()['approved']);
        });
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      });
  }

  rateAppointment(uid: any, rate: any) {
    return firebase
      .firestore()
      .collection('appointments')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            rating: rate,
          });
          console.log(doc.data()['approved']);
        });
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      });
  }

  surveyAppointment(uid: any, survey: any) {
    return firebase
      .firestore()
      .collection('appointments')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            survey: survey,
          });
          console.log(doc.data()['approved']);
        });
      })
      .catch((error) => {
        console.log('Error updating document: ', error);
      });
  }

  async addMedicalHistory(
    patient: any,
    height: any,
    weight: any,
    temp: any,
    pressure: any
  ) {
    let newAppointment: any = {
      patient: patient,
      height: height,
      weight: weight,
      temp: temp,
      pressure: pressure,      
    };
    return await this.afs.collection('medical-history').doc(patient).set(newAppointment, {merge: true});
  }  

  getMedicalHistoryByPatient(patient: any) {
    var data: any;
    return firebase
      .firestore()
      .collection('medical-history')
      .where('patient', '==', patient)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getMedicalHistoryBySpecialistAndPatient(specialist: any, patient: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('appointments')
      .where('doctor', '==', specialist)
      .where('patient', '==', patient)
      .where('status', '==', 'closed')
      .orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  getMedicalHistoryBySpecialtyAndPatient(specialty: any, patient: any, status: any) {
    const data: any[] = [];
    return firebase
      .firestore()
      .collection('appointments')
      .where('specialty', '==', specialty)
      .where('patient', '==', patient)
      .where('status', '==', status)
      .orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  
  traer(db:string){
    const col =  this.afs.collection(db);
    return col.valueChanges();
  }

  traerFiltrado(db:string, campo:string, valor:any){
    const col =  this.afs.collection(db, ref=>ref.where(campo,'==',valor));
    return firstValueFrom(col.valueChanges());
  }

}
  
 
  

