import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiEndpointsService} from "../shared/services/api-endpoints.service";
import {ApiHttpService} from "../shared/services/api-http.service";
import {SessionService} from "../shared/services/session.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private apiHttpService: ApiHttpService,
              private apiEndpointsService: ApiEndpointsService,
              private sessionService: SessionService) {
  }


  hasError = (controlName: string, errorName: string) => {

    return this.loginForm.controls[controlName].hasError(errorName);


  }

  login(): void {
    this.loginError = false;
    this.apiHttpService.post(this.apiEndpointsService.getLoginEndpoint(),
      {user: this.loginForm.get('user').value, password: this.loginForm.get('password').value}).subscribe(
      result => {
        this.sessionService.setSessionActive(true, (result as any).token);

      },
      error => {
        if (error && error.status && error.status === 401) this.loginError = true;


      }
    )
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)

    });
  }

}
