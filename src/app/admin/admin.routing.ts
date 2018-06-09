import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './pages/pages';
import { RoleGuard } from '../guards/role.guard';
import { ADMIN_ROLE } from '../constants/constants';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AnonymousGuard],
    children: [
      {
        path: '',
        canActivateChild: [RoleGuard],
        data: { expectedRole: ADMIN_ROLE },
        children: [
          { path: '', component: AdminHomeComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
