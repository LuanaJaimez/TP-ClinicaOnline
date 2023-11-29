import { Component, OnInit } from '@angular/core';
import { BarChart, PieChart, PieChartOptions } from 'chartist';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
import { SpecialtiesPipe } from 'src/app/pipes/specialties.pipe';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-appointments-specialty',
  templateUrl: './appointments-specialty.component.html',
  styleUrls: ['./appointments-specialty.component.css']
})
export class AppointmentsSpecialtyComponent implements OnInit {

  appointments: any = [];
  specialties: any = [];

  data = {
    labels: [''],
    series: []
  }

  options: PieChartOptions = {
    labelInterpolationFnc: value => String(value)[0]
  }
  
  constructor(public auth: AuthService,
              public firestore: FirestoreService,
              public storage: StorageService,) { }

  ngOnInit() {
    this.firestore.getAppointments().subscribe((appointments: any) => {
      this.appointments = appointments;
      this.appointments.forEach((appointment: any) => {
        var specialty = new SpecialtiesPipe().transform(appointment.specialty);
        this.specialties.push(specialty);        
      });
      const result =  this.specialties.reduce((json: any, val: any)=>({...json, [val]:(json[val] | 0) + 1}),{});
      this.data.labels = Object.keys(result);
      this.data.series = Object.values(result);
      new PieChart('#chart4', this.data, this.options);
    })      
  }

  downloadData() {
    var imgData;
    html2canvas(document.getElementById('chart4')!).then(function(canvas) {
      imgData = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      doc.text(`Cantidad de turnos solicitados por especialidad`, 10,10);
      doc.addImage(imgData, 'PNG', 20, 50, 200, 80);
      doc.save('turnos-solicitados.pdf');
    });
  }

  

}
