import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialties'
})
export class SpecialtiesPipe implements PipeTransform {

  transform(value: any): unknown {
   
    var specialty = value;

    if(specialty == "cardiology") {
      specialty = "Cardiologia";
    }

    if(specialty == "dentist") {
      specialty = "Odontologia";
    }

    if(specialty == "pediatrics") {
      specialty = "Pediatria";
    }

    if(specialty == "gastroenterology") {
      specialty = "Gastroenterologia";
    }

    if(specialty == "neurology") {
      specialty = "Neurologia";
    }

    if(specialty == "obstetrics") {
      specialty = "Obstetricia";
    }

    if(specialty == "oftalmology") {
      specialty = "Oftalmologia";
    }

    if(specialty == "pulmonology") {
      specialty = "Neumonologia";
    }

    if(specialty == "radiology") {
      specialty = "Radiologia";
    }

    if(specialty == "surgery") {
      specialty = "Cirugia";
    }

    if(specialty == "urology") {
      specialty = "Urologia";
    }

    if(specialty == "traumatology") {
      specialty = "Traumatologia";
    }

    return specialty;
  }

}
