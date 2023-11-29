import { Component, OnInit } from '@angular/core';
import { LineChart, LineChartOptions, BarChart } from 'chartist';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import 'svg2pdf.js';

@Component({
  selector: 'app-appointments-day',
  templateUrl: './appointments-day.component.html',
  styleUrls: ['./appointments-day.component.css']
})
export class AppointmentsDayComponent implements OnInit {

  appointments: any = [];
  dates: any = [];
  
  data = {
    labels: [''],
    series: [[]]
  };

  options = {
    low: 0,
    showArea: true,
    showPoint: false,
    fullWidth: true
  };

  constructor(public auth: AuthService,
              public firestore: FirestoreService,
              public storage: StorageService,
              private spinnerService: SpinnerService) { }

  ngOnInit(): void {

    this.firestore.getAppointments().subscribe((appointments: any) => {
      this.appointments = appointments;
      this.appointments.forEach((appointment: any) => {
        var date = appointment.date.split('-');
        this.dates.push(date[0]);        
      });
      const result =  this.dates.reduce((json: any, val: any)=>({...json, [val]:(json[val] | 0) + 1}),{});
      this.data.labels = Object.keys(result);
      this.data.series.push(Object.values(result));
      new BarChart('#chart1', this.data, this.options);
    });
  }

  downloadData() {
    var imgData;
    html2canvas(document.getElementById('chart4')).then(function(canvas) {
      imgData = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      doc.text(`Cantidad de turnos por dia`, 10,10);
      doc.addImage(imgData, 'PNG', 10, 20, 100, 100);
      doc.save('turnos-dia.pdf');
    });
  }

}
