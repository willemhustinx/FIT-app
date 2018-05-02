import {Workout} from "./workout";
import {WorkoutExerciseSet} from "./workout-exercise-set";

export class WorkoutExercise {
  id: number;
  name: string;
  workout: Workout;
  workoutExerciseSets: WorkoutExerciseSet[];
}
