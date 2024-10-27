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
  isShure: boolean = false;
  isShowMenu: boolean = true;
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

  logout() {
    this.authServ.logout();
  }

  isShow() {
    this.isShure = true;
    setTimeout(() => {
      this.isShure = false;
    }, 2500);
  }

  ShowMenu() {
    this.isShowMenu = !this.isShowMenu;
  }
}
