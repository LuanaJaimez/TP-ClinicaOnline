import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appCaptcha2]'
})
export class Captcha2Directive {

  @Output() captchaResult = new EventEmitter<string>();

  constructor() { }

  createCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let q = 0; q < 6; q++) {
      if (q % 2 == 0) {
        captcha += characters.charAt(Math.floor(Math.random() * 26));
      } else {
        captcha += Math.floor(Math.random() * 10);
      }
    }
    return captcha;
  }
}
