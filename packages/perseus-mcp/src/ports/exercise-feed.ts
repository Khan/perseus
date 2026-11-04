import type {Exercise} from "../domain/exercises/exercise";

export type ExerciseListener = (exercise: Exercise) => void;

/** Tells interested parties (such as open exercise pages) when an exercise changes. */
export interface ExerciseFeed {
    /**
     * Calls `listener` with the exercise each time it's saved, until the
     * returned function is called.
     */
    subscribe(exerciseId: string, listener: ExerciseListener): () => void;
}
