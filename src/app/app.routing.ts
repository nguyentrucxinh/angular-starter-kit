import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoleGuard } from './guards/role.guard';
import { USER_ROLE } from './constants/constants';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'user-home',
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { expectedRole: USER_ROLE }
      },
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
