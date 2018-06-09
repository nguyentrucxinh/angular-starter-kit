import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './pages/pages';
import { RoleGuard } from '../guards/role.guard';

@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    AdminRoutingModule
  ],
  providers: [RoleGuard],
  exports: [AdminComponent]
})
export class AdminModule {
}
