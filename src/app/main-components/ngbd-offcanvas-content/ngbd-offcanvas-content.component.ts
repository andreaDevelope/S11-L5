import { Component, inject, Input } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'ngbd-offcanvas-content',
  template: `
    <div
      class="offcanvas-body text-white bg-dark d-flex flex-column align-items-center"
    >
      <div class="d-flex flex-column align-items-center">
        <h3 class="bg-danger rounded-4 my-5 px-3 py-1 mx-auto">Community</h3>

        <table *ngIf="userArr.length > 0" class="user-table w-75 my-4">
          <thead>
            <tr>
              <th>Username</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of userArr">
              <td>{{ user.username }}</td>
              <td>{{ user.id }}</td>
            </tr>
          </tbody>
        </table>

        <button
          type="button"
          class="btn btn-danger"
          (click)="activeOffcanvas.close('Close click')"
        >
          Close
        </button>
      </div>
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
