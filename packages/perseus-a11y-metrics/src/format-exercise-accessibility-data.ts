import type {A11yStats} from "./domain/a11y-stats";

export function formatExerciseAccessibilityData(a11yStats: A11yStats): string {
    return a11yStats.exercisesWithDcul
        .map((entry) => JSON.stringify(entry))
        .map((json) => json + "\n")
        .join("");
}
