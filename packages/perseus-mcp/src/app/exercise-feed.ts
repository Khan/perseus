import type {ExerciseFeed, ExerciseListener} from "../ports/exercise-feed";
import type {ExerciseRepository} from "../ports/exercise-repository";

/**
 * Wraps a repository so every save is announced on a feed, as
 * `withDraftFeed` does for drafts.
 */
export function withExerciseFeed(repository: ExerciseRepository): {
    exercises: ExerciseRepository;
    feed: ExerciseFeed;
} {
    const listeners = new Map<string, Set<ExerciseListener>>();

    const exercises: ExerciseRepository = {
        get: (exerciseId) => repository.get(exerciseId),
        list: () => repository.list(),
        save(exercise) {
            repository.save(exercise);
            for (const listener of listeners.get(exercise.exerciseId) ?? []) {
                listener(exercise);
            }
        },
    };

    const feed: ExerciseFeed = {
        subscribe(exerciseId, listener) {
            const forExercise = listeners.get(exerciseId) ?? new Set();
            forExercise.add(listener);
            listeners.set(exerciseId, forExercise);
            return () => {
                forExercise.delete(listener);
                if (forExercise.size === 0) {
                    listeners.delete(exerciseId);
                }
            };
        },
    };

    return {exercises, feed};
}
