import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
  favorites: Partial<iFavorites[]> = [];
  movieArr: iMovie[] = [];
  userArr: iUser[] = [];
  user!: iUser;
  isAdded: boolean = false;

  @ViewChild('aggiunto') aggiunto!: ElementRef;

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
    setTimeout(() => console.log(this.movieArr[0]?.img), 2000);
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
      userId: this.user.id,
    };

    this.movieServ.addFavorite(favorite).subscribe((fav) => {
      const alreadyExists = this.favorites.some((favo) => favo?.id === fav.id);

      if (!alreadyExists) {
        this.favorites = this.favorites.filter(
          (favo) => favo && favo.id !== fav.id
        );
        this.favorites.push(fav);
      } else {
        console.log('Il film è già nei preferiti!');
      }
    });

    this.isAdded = true;
    setTimeout(() => (this.isAdded = false), 5000);
  }

  deleteFav(id: number) {
    this.movieServ.deleteFavorites(id).subscribe();
  }
}
