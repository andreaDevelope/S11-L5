import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieDetailRoutingModule } from './movie-detail.routing.module';

@NgModule({
  declarations: [MovieDetailComponent],
  imports: [CommonModule, MovieDetailRoutingModule],
})
export class MovieDetailModule {}
