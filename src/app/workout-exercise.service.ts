import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {MessageService} from "./message.service";
import {catchError, tap} from "rxjs/operators";
import {WorkoutExercise} from "./workout-exercise";
import {of} from "rxjs/observable/of";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WorkoutExerciseService {

  private exersizeUrl = 'http://localhost:8080/FIT/rest/workoutexercises';  // URL to web api

  constructor(private http: HttpClient,private messageService: MessageService) { }

  getWorkoutExercise(id: number): Observable<WorkoutExercise> {
    const url = `${this.exersizeUrl}/${id}`;
    return this.http.get<WorkoutExercise>(url).pipe(
      tap(_ => this.log(`fetched exercise id=${id}`)),
      catchError(this.handleError<WorkoutExercise>(`getExercise id=${id}`))
    );
  }

  getWorkoutExercisesFromWorkout(id: number): Observable<WorkoutExercise[]> {
    const url = `${this.exersizeUrl}/fromWorkout/${id}`;
    return this.http.get<WorkoutExercise[]>(url)
      .pipe(
        tap(exercises => this.log(`fetched Exercises from Workout`)),
        catchError(this.handleError('getWorkoutExercisesFromWorkout', []))
      );
  }

  updateWorkoutExercise (exercise: WorkoutExercise): Observable<WorkoutExercise> {
    return this.http.put(this.exersizeUrl, exercise, httpOptions).pipe(
      tap(_ => this.log(`updated exercise id=${exercise.id}`)),
      catchError(this.handleError<any>('updateWorkoutExercise'))
    );
  }

  deleteWorkoutExercise (exercise: WorkoutExercise | number): Observable<WorkoutExercise> {
    const id = typeof exercise === 'number' ? exercise : exercise.id;
    const url = `${this.exersizeUrl}/${id}`;

    return this.http.delete<WorkoutExercise>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted exercise id=${id}`)),
      catchError(this.handleError<WorkoutExercise>('deleteWorkoutExercise'))
    );
  }

  addWorkoutExercise (exercise: WorkoutExercise): Observable<WorkoutExercise> {
    return this.http.post<WorkoutExercise>(this.exersizeUrl, exercise, httpOptions).pipe(
      tap((hero: WorkoutExercise) => this.log(`added exercise w/ id=${exercise.id}`)),
      catchError(this.handleError<WorkoutExercise>('addWorkoutExercise'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('WorkoutService: ' + message);
  }
}
