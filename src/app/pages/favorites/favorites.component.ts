import { Component } from '@angular/core';
import { iFavorites } from '../../interfaces/favorites';
import { MovieService } from '../../services/movie.service';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favArr: iFavorites[] = [];
  user!: iUser;

  constructor(private movieServ: MovieService, private authServ: AuthService) {}

  ngOnInit() {
    this.getThisUser();
    if (this.movieServ.user) {
      this.getAllFavorites();
      console;
    } else {
      console.error('Utente non definito in MovieService');
    }
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
      window.location.reload();
    } else {
      console.log('film non trovato tra i preferiti');
    }
  }
}
