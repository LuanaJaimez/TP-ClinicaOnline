import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import firebase from 'firebase/compat/app';

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
      .where('uid', '==', uid)
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
}
  
 
  

