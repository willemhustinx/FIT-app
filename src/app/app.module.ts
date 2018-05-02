import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule }    from '@angular/common/http';

/* material design */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutService } from './workout.service';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { WorkoutExerciseService } from './workout-exercise.service';



@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    WorkoutsComponent,
    WorkoutDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule],
  providers: [MessageService, WorkoutService, WorkoutExerciseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
