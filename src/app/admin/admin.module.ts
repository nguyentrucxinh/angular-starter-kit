import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './pages/home/admin-home.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent
  ],
  exports: [AdminComponent]
})
export class AdminModule {
}
