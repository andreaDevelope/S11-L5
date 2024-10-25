import { Injectable } from '@angular/core';
import { iMovie } from '../interfaces/i-movie';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { iFavorites } from '../interfaces/favorites';
import { iUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieArr: iMovie[] = [];

  user!: iUser;

  movieUrl: string = environment.movieUrl;
  favoritesUrl: string = environment.favoritesUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.getAll();
  }

  getAll() {
    return this.http
      .get<iMovie[]>(this.movieUrl)
      .pipe(map((movie) => (this.movieArr = movie)));
  }

  addFavorite(movie: iFavorites) {
    return this.http.post<iFavorites>(this.favoritesUrl, movie);
  }

  getAllFavorites() {
    return this.http.get<iFavorites[]>(this.favoritesUrl);
  }
}
