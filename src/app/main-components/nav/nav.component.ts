import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: '.app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  isLogIn: boolean = false;
  constructor(private authServ: AuthService) {
    this.register();
  }

  ngOnInit() {}
  register() {
    this.authServ.isLoggedIn$
      .pipe(
        map((isLoggedIn: boolean) => {
          this.isLogIn = isLoggedIn;
          console.log(this.isLogIn);
        })
      )
      .subscribe();
  }
}
