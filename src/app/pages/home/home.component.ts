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
import { iAccessData } from '../../interfaces/i-access-data';

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
  isPresentFav: boolean = false;

  @ViewChild('aggiunto') aggiunto!: ElementRef;

  private offcanvasService = inject(NgbOffcanvas);

  constructor(
    private movieServ: MovieService,
    private userServ: UserService,
    private authServ: AuthService
  ) {}

  ngOnInit() {
    this.getAllFavorites();
    this.getAllMovie();
    this.getAllUser();
    this.getThisUser();
    this.authServ.restoreUser();
    this.setupAutoLogout();
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

    const alreadyExists = this.favorites.some(
      (favo) => favo?.titolo === favorite.titolo
    );

    if (!alreadyExists) {
      this.movieServ.addFavorite(favorite).subscribe((fav) => {
        this.favorites.push(fav);
        console.log('Film aggiunto ai preferiti!');

        this.isAdded = true;
        setTimeout(() => (this.isAdded = false), 3000);
      });
    } else {
      this.isPresentFav = true;
      setInterval(() => (this.isPresentFav = false), 3000);
      console.log('Il film è già nei preferiti!');
    }
  }

  deleteFav(id: number) {
    this.movieServ.deleteFavorites(id).subscribe();
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

  getAllFavorites() {
    this.movieServ.getAllFavorites().subscribe((fav) => (this.favorites = fav));
  }
}
