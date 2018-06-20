import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  LoginComponent,
  LandingComponent,
  PageNotFoundComponent,
  DashboardComponent,
  PageAccessDeniedComponent
} from './pages/pages';
import { USER_ROLE, ADMIN_ROLE } from './constants/constants';
import { RoleGuard, AnonymousGuard, AuthGuard } from './guards/guards';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '403', component: PageAccessDeniedComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '',
    canActivateChild: [AnonymousGuard],
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '',
    canActivateChild: [RoleGuard],
    data: { expectedRole: USER_ROLE },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Another route here
      // { path: '**', component: PageNotFoundComponent }
    ]
  },
  {
    path: '',
    canActivateChild: [RoleGuard],
    data: { expectedRole: ADMIN_ROLE },
    children: []
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
