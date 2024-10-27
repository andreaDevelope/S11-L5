import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { iLoginRequest } from '../../interfaces/i-login-request';
import { iAccessData } from '../../interfaces/i-access-data';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  form!: FormGroup;
  message: string = '';
  jwtHelper: JwtHelperService;
  isSignup: boolean = false;
  err: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private router: Router
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      username: this.fb.control('', [Validators.required]),
      psw: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  isTouched(input: string): boolean {
    return this.form.get(input)?.touched || false;
  }

  isValid(input: string): boolean {
    return this.form.get(input)?.valid || false;
  }

  isInvalid(input: string): boolean {
    const control = this.form.get(input);
    return (control?.invalid && control?.touched) || false;
  }

  getErrorMessage(input: string): string {
    const control = this.form.get(input);
    if (control?.hasError('required')) {
      return `${input} è obbligatorio.`;
    }
    if (control?.hasError('email')) {
      return `Inserisci un indirizzo email valido.`;
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return `Il campo ${input} deve contenere almeno ${requiredLength} caratteri.`;
    }
    return '';
  }

  decodeToken(token: string): any {
    if (this.jwtHelper.isTokenExpired(token)) {
      this.message = 'Il token è scaduto.';
      return null;
    }
    return this.jwtHelper.decodeToken(token);
  }

  login() {
    if (this.form.valid) {
      const user: iLoginRequest = {
        email: this.form.get('email')?.value,
        username: this.form.get('username')?.value,
        password: this.form.get('psw')?.value,
      };

      this.authServ.login(user).subscribe(
        (res: iAccessData) => {
          if (res && res.accessToken) {
            this.isSignup = true;
            setTimeout(() => this.loginMess(), 3000);
          } else {
            this.err = true;
            setTimeout(() => window.location.reload(), 3000);
          }
        },
        (error) => {
          console.log(error);
          this.err = true;
          setTimeout(() => (this.err = false), 3000);
          setTimeout(() => this.form.reset(), 3000);
        }
      );
    } else {
      this.message = 'Per favore compila tutti i campi correttamente.';
    }
  }

  loginMess() {
    this.isSignup = false;
  }
}
