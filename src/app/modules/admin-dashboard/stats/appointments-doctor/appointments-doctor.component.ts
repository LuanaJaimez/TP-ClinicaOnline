import { Component, OnInit } from '@angular/core';
import { BarChart, PieChart, PieChartOptions, ResponsiveOptions } from 'chartist';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StorageService } from 'src/app/services/storage.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-appointments-doctor',
  templateUrl: './appointments-doctor.component.html',
  styleUrls: ['./appointments-doctor.component.css']
})
export class AppointmentsDoctorComponent implements OnInit {
  
  appointments: any = [];
  doctors: any = [];
  myChartAux:any; 

  data = {
    labels: [''],
    series: []
  };

  options = {
    stackBars: true,
  }

  constructor(public auth: AuthService,
              public firestore: FirestoreService,
              public storage: StorageService,) { }

  ngOnInit(): void {
    this.firestore.getAppointments().subscribe((appointments: any) => {
      this.appointments = appointments;
      this.appointments.forEach((appointment: any) => {
        this.doctors.push(appointment.doctor);        
      });
      const result =  this.doctors.reduce((json: any, val: any)=>({...json, [val]:(json[val] | 0) + 1}),{});
      console.log(result);
      console.log(Object.keys(result));
      console.log(Object.values(result));
      this.data.labels = Object.keys(result);
      this.data.series = Object.values(result);
      new BarChart('#chart3', this.data, this.options).on('draw', data => {
        if (data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 300px'
          });
        }
      });
    });
  }

  downloadData() {
    var imgData;
    html2canvas(document.getElementById('chart3')!).then(function(canvas) {
      imgData = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      doc.text(`Cantidad de turnos solicitados por especialidad`, 10,10);
      doc.addImage(imgData, 'PNG', 10, 20, 100, 30);
      doc.save('turnos-solicitados.pdf');
    });
  }

}
