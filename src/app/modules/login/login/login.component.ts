import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectListItem } from '../../../models/base/utilities';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl = '';
  jobPositions: SelectListItem[];
  selectedJobPosition: number;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute
    , ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['return'] || '/');
  }

  login() {
    this .doLogin();
  }

  doLogin() {
    const val = this.form.value;
    if (val.username && val.password) {
      this.authService.signIn(val.username, val.password, this.returnUrl);
    }
  }
}