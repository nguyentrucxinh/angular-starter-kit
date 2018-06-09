import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageHelper } from '../../helpers/helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    LocalStorageHelper.removeAuthorization();
    this.router.navigate(['landing']);
  }

}
