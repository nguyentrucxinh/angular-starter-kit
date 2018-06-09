import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, LoginComponent, LandingComponent, PageNotFoundComponent } from './pages/pages';
import { RoleGuard } from './guards/role.guard';
import { USER_ROLE } from './constants/constants';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [RoleGuard], data: { expectedRole: USER_ROLE } },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
