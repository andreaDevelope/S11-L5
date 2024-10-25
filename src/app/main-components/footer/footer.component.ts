import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: '.app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
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
