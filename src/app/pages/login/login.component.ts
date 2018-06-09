import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Global } from '../../services/global';
import { LocalStorageHelper } from '../../helpers/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean;

  redirectUrl = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private global: Global) {
    this.loginForm = this.fb.group({
      // email: [null, Validators.compose([Validators.required, Validators.email])],
      // password: [null, Validators.compose([Validators.required])]
      email: ['vgrant@example.org', Validators.compose([Validators.required, Validators.email])],
      password: ['secret', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.redirectUrl = params['redirectUrl'] || '/home');
  }

  async login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.isSubmitted = false;

    const res = await this.authService.token(this.loginForm.value);
    if (!res.status) {
      return;
    }
    const token = res.data;
    LocalStorageHelper.setAuthorization(token);

    const res2 = await this.authService.auth();
    if (!res2.status) {
      return;
    }
    this.global.user = res2.data;

    this.router.navigateByUrl(this.redirectUrl);
  }

  // FORM CONTROL

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  // ERROR MESSAGE

  getErrorEmail() {
    let msg: string;
    switch (true) {
      case this.email.hasError('required'):
        msg = 'Email is required';
        break;
      case this.email.hasError('email'):
        msg = 'Email invalid';
        break;
      default:
        msg = '';
        break;
    }
    return msg;
  }

  getErrorPassword() {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
  }

}
