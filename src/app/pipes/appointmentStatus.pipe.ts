import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {

  transform(value: any): unknown {
   
    var status = value;

    if(status == "pending") {
      status = "Pendiente";
    }

    if(status == "canceled") {
      status = "Cancelado";
    }

    if(status == "rejected") {
      status = "Rechazado";
    }

    if(status == "accepted") {
      status = "Aceptado";
    }

    if(status == "closed") {
      status = "Finalizado";
    }
    
    return status;
  }

}
