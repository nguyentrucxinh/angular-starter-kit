import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// import { AdminComponent } from './admin/admin.component';
// import { AdminHomeComponent } from './admin/pages/home/admin-home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
