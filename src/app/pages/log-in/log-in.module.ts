import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { LogInRoutingModule } from './log-in.routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogInComponent],
  imports: [CommonModule, LogInRoutingModule, ReactiveFormsModule],
})
export class LogInModule {}
