import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './pages/pages';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  providers: [
  ],
  exports: [AdminComponent]
})
export class AdminModule {
}
