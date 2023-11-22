import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { SpecialtiesPipe } from 'src/app/pipes/specialties.pipe';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersData: any[] = [];
  patientMedicalHistory: any;
  userData: any;
  patientAppointments: any;
  appointmentsBySpecialist: any;
  patientsBySpecialist: any = [];
  patients: any;

  constructor(private firestoreService: FirestoreService,
              private spinnerService: SpinnerService,
              private toastr: ToastrService,
              public firestore: FirestoreService) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.spinnerService.show();
    this.firestoreService.getAllUsers().subscribe((users: any) => {
      this.usersData = users;
      this.spinnerService.hide();
    })
  }

  userStatus(uid: any, status:boolean){
    this.spinnerService.show();
    this.firestoreService.userStatus(uid, status).then(() => {
      this.spinnerService.hide();
      if(status == true){
      this.toastr.success('Usuario habilitado correctamente');}
      else if(status == false){
      this.toastr.success('Usuario deshabilitado correctamente');
      }
    });
  }

  downloadAppointments(user: any, role: any) {
    console.log(user);
    console.log(role);
    if(role == 'Doctor') {
      this.firestoreService.getAppointmentsBySpecialist(user)
      .then((data: any) => {
        console.log(data);
        this.generatePDF(data, user, role);
      });
    }

    if(role == 'Patient') {
      this.firestoreService.getMedicalHistoryByPatient(user)
      .then((data) => {
        this.patientMedicalHistory = data; 
        console.log(this.patientMedicalHistory);   
      })
      .then(() => {
        this.firestoreService.getAppointmentsByPatient(user)
        .then((data) => {
          this.patientAppointments = data; 
          this.generatePDF(data, user, role);
        })
        .then(() => {
        })      
      })       
    }
  }

  generatePDF(data: any, name: any, role: any) {

    if(role == 'Doctor') {
      var today  = new Date();
      var line = 20;
      today.toLocaleDateString("es-ES")
      let PDF = new jsPDF('p', 'mm', 'a4');
      let pageHeight= (PDF.internal.pageSize.height)-10;

      PDF.text(`Historial de citas del doctor ${name}`, 10,10);
      PDF.addImage('../../../assets/common/logo.png', 'PNG', 150, 20,50,50);
      PDF.text(`Fecha de emision: ${today.toLocaleDateString("es-ES")}`, 10,line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      data.forEach((element: { specialty: any; date: any; patient: any; }) => {
        PDF.text(`-----------------------------------------------------`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Fecha: ${element.date}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Especialidad: ${element.specialty}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Paciente: ${element.patient}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;       
      });
      PDF.save('historial-atenciones'+ '-' + name + '.pdf'); 
    }
    
    if(role == 'Patient') {
      var today  = new Date();
      var line = 20;
      today.toLocaleDateString("es-ES")
      let PDF = new jsPDF('p', 'mm', 'a4');
      let pageHeight= (PDF.internal.pageSize.height)-10;

      PDF.text(`Historial de citas del paciente ${name}`, 10,10);
      PDF.addImage('../../../assets/common/logo.png', 'PNG', 150, 20,50,50);
      PDF.text(`Fecha de creacion: ${today.toLocaleDateString("es-ES")}`, 10,line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      PDF.text(`-Datos ultimo control:`,10,line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      PDF.text(`* Altura: ${this.patientMedicalHistory.height} cm`,15,line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      PDF.text(`* Peso: ${this.patientMedicalHistory.weight} kgs`,15,line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      PDF.text(`* Temperatura: ${this.patientMedicalHistory.temp} ºC`,15,line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      PDF.text(`* Presión: ${this.patientMedicalHistory.pressure} (media)`,15,line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      PDF.text(`- Historial de atencion con el especialista: ${this.patientAppointments[0].doctor}`,10,line);
      (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      this.patientAppointments.forEach((element: { specialty: any; date: any; diagnosis: any; observations: { [x: string]: any; }; appointmentInfo: any; }) => {
        PDF.text(`----------------------------------------------------------------------`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Fecha: ${element.date}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Especialidad: ${element.specialty}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Diagnostico: ${element.diagnosis}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Observaciones:`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        for (var key in element.observations) {
          PDF.text(`* ${key}: ${element.observations[key]}`,20,line);
          (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        }
        PDF.text(`* Comentario de ${element.appointmentInfo}`,15,line, {maxWidth: 160 });
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
      });
      PDF.save('historial-atenciones'+ '-' + name + '.pdf'); 
    }
  }

  downloadData() {
    var table_elt = document.getElementById("users-table");
    var workbook = XLSX.utils.table_to_book(table_elt);
    var ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});
    XLSX.writeFile(workbook, "reporte-usuarios.xlsx");
  }
}
