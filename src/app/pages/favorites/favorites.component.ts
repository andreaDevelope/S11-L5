import { Component } from '@angular/core';
import { iFavorites } from '../../interfaces/favorites';
import { MovieService } from '../../services/movie.service';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
import { iAccessData } from '../../interfaces/i-access-data';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favArr: iFavorites[] = [];
  user!: iUser;
  isDelete: boolean = false;

  constructor(private movieServ: MovieService, private authServ: AuthService) {}

  ngOnInit() {
    this.getThisUser();
    if (this.movieServ.user) {
      this.getAllFavorites();
      console;
    } else {
      console.error('Utente non definito in MovieService');
    }
    this.authServ.restoreUser();
    this.setupAutoLogout();
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

  remove(id: number | undefined) {
    if (id) {
      this.movieServ.deleteFavorites(id).subscribe();
      this.isDelete = true;
      setTimeout(() => (this.isDelete = false), 3000);
      setTimeout(() => window.location.reload(), 3000);
    } else {
      console.log('film non trovato tra i preferiti');
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
