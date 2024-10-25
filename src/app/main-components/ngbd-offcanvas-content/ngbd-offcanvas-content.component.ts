import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'ngbd-offcanvas-content',
  template: `
    <div class="offcanvas-body text-white bg-dark">
      <h2 class="text-center my-5 text-danger">Ciao {{ name }}</h2>
      <h3 class="text-center my-5">comunity</h3>
      <ul *ngIf="userArr.length > 0">
        <li *ngFor="let user of userArr">{{ user.username }}</li>
      </ul>
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="activeOffcanvas.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class NgbdOffcanvasContentComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas);
  userArr: iUser[] = [];
  constructor(private userServ: UserService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    return this.userServ
      .getAll()
      .subscribe((iscritti) => (this.userArr = iscritti));
  }
  @Input() name: string = '';
}
