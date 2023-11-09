import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModuleComponent } from './common.component';

const routes: Routes = [{ path: '', component: CommonModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonModules { }
