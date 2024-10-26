import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { iFavorites } from '../../interfaces/favorites';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  user!: iUser;
  favArr: iFavorites[] = [];

  constructor(private movieServ: MovieService, private authServ: AuthService) {}

  ngOnInit() {
    this.getThisUser();
    if (this.movieServ.user) {
      this.getAllFavorites();
    } else {
      console.error('Utente non definito in MovieService');
    }
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
}
