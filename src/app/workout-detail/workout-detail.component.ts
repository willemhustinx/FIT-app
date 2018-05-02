import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {WorkoutExerciseSet} from "../workout-exercise-set";
import { Workout }         from '../workout';
import {WorkoutExercise} from "../workout-exercise";

import { WorkoutService }  from '../workout.service';
import { WorkoutExerciseService }  from '../workout-exercise.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit {

  workout: Workout;
  workoutExercises: WorkoutExercise[];
  editable: number[];
  workoutExerciseSets: WorkoutExerciseSet[];

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private workoutExerciseService: WorkoutExerciseService
  ) {}

  ngOnInit() {
    this.editable = new Array();
    this.workoutExerciseSets = new Array();
    this.getWorkout();
  }

  getWorkout(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workoutService.getWorkout(id)
      .subscribe(workout => this.workout = workout);
    this.workoutExerciseService.getWorkoutExercisesFromWorkout(id).subscribe(exercises => this.initWorkoutExercises(exercises));
  }

  initWorkoutExercises(exercises: WorkoutExercise[]){
    exercises.forEach(exercise =>{
      this.workoutExerciseSets[exercise.id] = new WorkoutExerciseSet();
    })
    this.workoutExercises = exercises;
  }

  toggleEditable(id: number): void{
    if(this.editable.includes(id)){
      this.editable = this.editable.filter(h => h !== id);
    } else {
      this.editable.push(id);
      this.editable = this.editable.slice();
    }
  }

  addWorkoutExerciseSet(id:number): void{
    var we;
    we = this.workoutExercises.find(x => x.id == id);
    we.workoutExerciseSets.push(this.workoutExerciseSets[id]);
    this.workoutExerciseSets[id] = new WorkoutExerciseSet();
    this.workoutExerciseService.updateWorkoutExercise(we).subscribe(ex => {
      var index = this.workoutExercises.findIndex(x => x.id == id);
      this.workoutExercises[index] = ex;
    });
    console.log(this.workoutExercises);
  }

  deleteWorkoutExerciseSet(id:number, row:number): void{
    var we;
    we = this.workoutExercises.find(x => x.id == id);
    we.workoutExerciseSets = we.workoutExerciseSets.filter(x => x.id !== row);
  }

  updateWorkoutExercise(id:number): void{
    var we;
    we = this.workoutExercises.find(x => x.id == id);
    this.workoutExerciseService.updateWorkoutExercise(we).subscribe();
    this.toggleEditable(id);
  }

  deleteWorkoutExercise(id:number): void {
    var we;
    we = this.workoutExercises.find(x => x.id == id);
    this.workoutExercises = this.workoutExercises.filter(h => h.id !== id);
    this.workoutExerciseService.deleteWorkoutExercise(we).subscribe();
    this.toggleEditable(id);
  }

  addWorkoutExercise(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.workoutExerciseService.addWorkoutExercise({ name } as WorkoutExercise)
      .subscribe(we => {
        this.workoutExercises.push(we);
      });
  }

}
