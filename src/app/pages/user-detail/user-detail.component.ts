import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { iFavorites } from '../../interfaces/favorites';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { iAccessData } from '../../interfaces/i-access-data';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  user!: iUser;
  favArr: iFavorites[] = [];
  isFavVisible: boolean = false;
  isDetailVisible: boolean = false;
  isShure: boolean = false;

  constructor(
    private movieServ: MovieService,
    private authServ: AuthService,
    private userServ: UserService
  ) {}

  ngOnInit() {
    this.getThisUser();
    if (this.movieServ.user) {
      this.getAllFavorites();
    } else {
      console.error('Utente non definito in MovieService');
    }
    this.authServ.restoreUser();
    this.setupAutoLogout();
  }

  getThisUser() {
    this.authServ.user$
      .pipe(
        map((user) => {
          if (user) {
            this.user = user;
            console.log(this.user);
            this.movieServ.user = user;
          }
        })
      )
      .subscribe();
  }

  getAllFavorites() {
    this.movieServ.getAllFavorites().subscribe(
      (favo) =>
        (this.favArr = favo.filter((fav) => {
          if (fav.userId === this.user.id) {
            return true;
          } else {
            return false;
          }
        }))
    );
  }

  toggleFav() {
    this.isFavVisible = !this.isFavVisible;
  }

  toggleDetail() {
    this.isDetailVisible = !this.isDetailVisible;
  }

  isShureToggle() {
    this.isShure = !this.isShure;
  }

  remove(id: number | undefined) {
    if (id) {
      this.userServ.delete(id).subscribe();
      // this.authServ.logout();
    } else {
      console.log('errore nell eliminazione dell user');
    }
  }

  setupAutoLogout() {
    this.authServ.authSubject$.subscribe((accessData: iAccessData | null) => {
      if (accessData) {
        const expDate = this.authServ.jwt.getTokenExpirationDate(
          accessData.accessToken
        );
        if (expDate) {
          this.authServ.autoLogout(expDate);
        }
      }
    });
  }
}
