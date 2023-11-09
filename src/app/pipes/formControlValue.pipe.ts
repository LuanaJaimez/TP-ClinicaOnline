import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'formControlValue'
})
export class FormControlValuePipe implements PipeTransform {
  transform(value: AbstractControl): FormControl<typeof value['value']> {
      return value as FormControl<typeof value['value']>;
  }
}
