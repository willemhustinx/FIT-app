import {WorkoutExercise} from "./workout-exercise";

export class WorkoutExerciseSet {
  id: number;
  amount: number;
  weight: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

