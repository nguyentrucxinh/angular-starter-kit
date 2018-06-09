import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageHelper } from '../../helpers/localStorage.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    LocalStorageHelper.removeAuthorization();
    this.router.navigate(['landing']);
  }

}
