import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {catchError, tap} from "rxjs/operators";
import {Workout} from "./workout";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WorkoutService {

  private workoutUrl = 'http://localhost:8080/FIT/rest/workouts';  // URL to web api

  constructor(private http: HttpClient,private messageService: MessageService) { }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.workoutUrl)
      .pipe(
        tap(workouts => this.log(`fetched workouts`)),
        catchError(this.handleError('getWorkouts', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getWorkout(id: number): Observable<Workout> {
    const url = `${this.workoutUrl}/${id}`;
    return this.http.get<Workout>(url).pipe(
      tap(_ => this.log(`fetched workout id=${id}`)),
      catchError(this.handleError<Workout>(`getWorkout id=${id}`))
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
