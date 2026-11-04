import type {Exercise} from "../domain/exercises/exercise";

/** Where exercises are kept between tool calls and restarts. */
export interface ExerciseRepository {
    get(exerciseId: string): Exercise | undefined;
    /** Every exercise, most recently changed first. */
    list(): Exercise[];
    /** Adds the exercise, or replaces the one with the same id. */
    save(exercise: Exercise): void;
}
