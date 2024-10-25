import { Component, inject } from '@angular/core';
import { iMovie } from '../../interfaces/i-movie';
import { MovieService } from '../../services/movie.service';
import { iUser } from '../../interfaces/i-user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbdOffcanvasContentComponent } from '../../main-components/ngbd-offcanvas-content/ngbd-offcanvas-content.component';
import { iFavorites } from '../../interfaces/favorites';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private favorites: Partial<iFavorites[]> = [];
  movieArr: iMovie[] = [];
  userArr: iUser[] = [];
  user!: iUser;
  private offcanvasService = inject(NgbOffcanvas);

  constructor(
    private movieServ: MovieService,
    private userServ: UserService,
    private authServ: AuthService
  ) {}

  ngOnInit() {
    this.getAllMovie();
    this.getAllUser();
    this.getThisUser();
  }

  getAllMovie() {
    this.movieServ.getAll().subscribe((m) => (this.movieArr = m));
  }

  getAllUser() {
    this.userServ.getAll().subscribe((u) => (this.userArr = u));
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

  openOffcanvas() {
    const offcanvasRef = this.offcanvasService.open(
      NgbdOffcanvasContentComponent
    );
    offcanvasRef.componentInstance.name = this.user?.username || 'Utente';
  }

  addFavorite(movie: iMovie) {
    const favorite: iFavorites = {
      titolo: movie.titolo,
      anno: movie.anno,
      regista: movie.regista,
      img: movie.img,
      id: this.user.id,
    };

    this.movieServ.addFavorite(favorite).subscribe(
      (fav) => {
        console.log('Aggiunto ai preferiti:', fav);
        this.favorites.push(fav);
      },
      (error) => console.error("Errore durante l'aggiunta ai preferiti:", error)
    );
  }
}
