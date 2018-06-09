import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, LoginComponent, LandingComponent, PageNotFoundComponent } from './pages/pages';
import { USER_ROLE } from './constants/constants';
import { RoleGuard, AnonymousGuard } from './guards/guards';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
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
