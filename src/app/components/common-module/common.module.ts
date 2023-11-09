import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModules } from './common-routing.module';
import { CommonModuleComponent } from './common.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { UserTypePipe } from 'src/app/pipes/userType.pipe';
import { CaptchaComponent } from './captcha/captcha.component';
import { UserNamePipe } from 'src/app/pipes/userrName.pipe';
import { CaptchaDirective } from 'src/app/directives/captcha.directive';
import { ChartistModule } from "ng-chartist";

@NgModule({
  declarations: [
    CommonModuleComponent, 
    NavbarComponent,
    ProfileComponent,
    UserTypePipe,
    UserNamePipe,
    CaptchaDirective, 
    CaptchaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModules,
    ChartistModule
  ],
  exports: [
    CommonModuleComponent,
    NavbarComponent,
    ProfileComponent,
    CaptchaComponent,
    UserNamePipe,
    UserTypePipe,
    CaptchaDirective,
    ChartistModule   
  ],
  providers: [
  ]
})
export class SharedModule { }
