import { Injectable } from '@angular/core';
import { createCanvas } from 'canvas';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Captcha2Directive } from '../directives/captcha2.directive';

export type icon = 'warning' | 'error' | 'success' | 'info' | 'question';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  captcha: any = [];

  constructor(private toastr: ToastrService) { }

  modalMessage(msg: string, icon: icon) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: msg,
      showConfirmButton: false,
      timer: 2000
    })
  }

  async modalCaptcha(): Promise<boolean> {
    const canvasWidth = 200;
    const canvasHeight = 100;
    const captchaFont = '24px Helvetica Neue';

    let captcha2 = new Captcha2Directive().createCaptcha();

    const canvas = createCanvas(canvasWidth, canvasHeight);

    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.font = captchaFont;
    context.fillStyle = 'black';

    context.fillText(captcha2, canvasWidth / 2 - 50, canvasHeight / 2 + 10);

    context.beginPath();
    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);
    context.strokeStyle = 'black';
    context.stroke();

    const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    context.putImageData(imageData, 0, 0);

    const imageBase64 = canvas.toDataURL();

    const { value: result } = await Swal.fire({
      title: 'Ingrese el codigo',
      html: `<img src="${imageBase64}" alt="Captcha" />`,
      input: 'text',
      text: 'No es humano',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#bbd0ee',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#8CD4F5',
      inputValidator: (value: string) => {
        if (!value || value !== captcha2) {
          return 'Captcha incorrecto.';
        } else {
          return null;
        }
      }
    });

    if (result) {
      return true;
    }

    return false;
  }
}

