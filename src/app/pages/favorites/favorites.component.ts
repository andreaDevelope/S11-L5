import { Component } from '@angular/core';
import { iFavorites } from '../../interfaces/favorites';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  favArr: iFavorites[] = [];
  user!: iUser;

  constructor(private movieServ: MovieService, private userServ: UserService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.movieServ
      .getAllFavorites()
      .subscribe((fav) => console.log(this.favArr));
  }
}
