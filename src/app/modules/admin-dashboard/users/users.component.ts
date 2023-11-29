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

  users: any[] = [];
  patientMedicalHistory: any;
  userData: any;
  patientAppointments: any;
  appointmentsBySpecialist: any;
  patientsBySpecialist: any = [];
  patients: any;
  isCard = true;

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
      this.users = users;
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
      this.firestoreService.getAppointmentsByPatient(user)
      .then((data: any) => {
        console.log(data);
        this.generatePDF(data, user, role);
      });
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
      data.forEach((element: { specialty: any; date: any; doctor: any; }) => {
        let specialtyFormated = new SpecialtiesPipe().transform(element.specialty);
        PDF.text(`-----------------------------------------------------`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Fecha: ${element.date}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Especialidad: ${specialtyFormated}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;
        PDF.text(`* Especialista: ${element.doctor}`,15,line);
        (line > pageHeight) ? (PDF.addPage(), line = 20) : line += 10;       
      });
      PDF.save('historial-atenciones'+ '-' + name + '.pdf'); 
    }
  }

  changeStyle() {
    this.isCard = !this.isCard;
  }

  downloadData() {
    var table_elt = document.getElementById("users-table");
    var workbook = XLSX.utils.table_to_book(table_elt);
    var ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Creacion "+new Date().toISOString()]], {origin:-1});
    XLSX.writeFile(workbook, "planilla-usuarios.xlsx");
  }
}
