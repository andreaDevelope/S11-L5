import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iMovie } from '../../interfaces/i-movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieId!: number;
  movie!: iMovie;

  constructor(private route: ActivatedRoute, private movieServ: MovieService) {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getMovieById(this.movieId);
  }

  getMovieById(id: number) {
    this.movieServ.getMovieById(id).subscribe((movie) => (this.movie = movie));
  }
}
