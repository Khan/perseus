import fs from "node:fs";
import path from "node:path";

import {z} from "zod";

import type {Exercise} from "../../domain/exercises/exercise";
import type {ExerciseRepository} from "../../ports/exercise-repository";

const SavedExercise = z.object({
    exerciseId: z.string(),
    name: z.string(),
    notes: z.string().optional(),
    editorUrl: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    problemTypes: z.array(
        z.object({
            name: z.string().nullable(),
            contentId: z.string().optional(),
            items: z.array(
                z.object({
                    itemId: z.string(),
                    contentId: z.string().optional(),
                    importedRevision: z.number().optional(),
                }),
            ),
        }),
    ),
});

/**
 * Keeps exercises in memory and saves each one as
 * `<dataDir>/exercises/<exerciseId>.json`. A file that isn't a valid
 * exercise is skipped when loading. Call `init()` after the draft
 * repository's, which checks the data directory can be written.
 *
 * Exercises were once called collections, saved in
 * `<dataDir>/collections/` with a `collectionId`: `init()` moves any it
 * finds there into `exercises/`.
 */
export class FileExerciseRepository implements ExerciseRepository {
    private readonly dir: string;
    private readonly legacyDir: string;
    private readonly exercises = new Map<string, Exercise>();

    constructor(dataDir: string) {
        this.dir = path.join(path.resolve(dataDir), "exercises");
        this.legacyDir = path.join(path.resolve(dataDir), "collections");
    }

    init(): void {
        fs.mkdirSync(this.dir, {recursive: true});
        this.moveLegacyCollections();
        for (const file of fs.readdirSync(this.dir)) {
            if (!file.endsWith(".json")) {
                continue;
            }
            try {
                const saved = SavedExercise.safeParse(
                    JSON.parse(
                        fs.readFileSync(path.join(this.dir, file), "utf8"),
                    ),
                );
                if (saved.success) {
                    this.exercises.set(saved.data.exerciseId, saved.data);
                }
            } catch {
                // Not JSON: skipped, like a draft file that isn't a draft.
            }
        }
    }

    private moveLegacyCollections(): void {
        if (!fs.existsSync(this.legacyDir)) {
            return;
        }
        for (const file of fs.readdirSync(this.legacyDir)) {
            const from = path.join(this.legacyDir, file);
            const to = path.join(this.dir, file);
            if (!file.endsWith(".json") || fs.existsSync(to)) {
                continue;
            }
            try {
                const {collectionId, ...rest} = JSON.parse(
                    fs.readFileSync(from, "utf8"),
                );
                fs.writeFileSync(
                    to,
                    JSON.stringify(
                        {exerciseId: collectionId, ...rest},
                        null,
                        4,
                    ),
                );
                fs.rmSync(from);
            } catch {
                // Not JSON: left where it is.
            }
        }
        if (fs.readdirSync(this.legacyDir).length === 0) {
            fs.rmdirSync(this.legacyDir);
        }
    }

    get(exerciseId: string): Exercise | undefined {
        return this.exercises.get(exerciseId);
    }

    list(): Exercise[] {
        return [...this.exercises.values()].sort((a, b) =>
            b.updatedAt.localeCompare(a.updatedAt),
        );
    }

    save(exercise: Exercise): void {
        // Write then rename, so a crash mid-write never leaves half a file.
        const file = path.join(this.dir, `${exercise.exerciseId}.json`);
        const tmp = `${file}.tmp`;
        fs.writeFileSync(tmp, JSON.stringify(exercise, null, 4));
        fs.renameSync(tmp, file);
        this.exercises.set(exercise.exerciseId, exercise);
    }
}
