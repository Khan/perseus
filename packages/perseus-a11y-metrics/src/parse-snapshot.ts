import {array, boolean, number, object, string, type Infer} from "zod";

export type Snapshot = Infer<typeof SnapshotSchema>;

export type ExerciseData = Infer<typeof ExerciseSchema>;

export function parseSnapshot(rawData: unknown): Snapshot {
    return SnapshotSchema.parse(
        typeof rawData === "string" ? JSON.parse(rawData) : rawData,
    );
}

const ItemSchema = object({
    id: string(),
    isContextInaccessible: boolean(),
});

const ProblemTypeSchema = object({
    items: array(ItemSchema),
});

const ExerciseSchema = object({
    // NOTE: there are more fields in the exercise object. This schema just
    // lists the fields we currently care about.
    exerciseLength: number(),
    id: string(),
    problemTypes: array(ProblemTypeSchema),
    translatedPerseusContentSha: string(),
});

const SnapshotSchema = object({
    exercises: array(ExerciseSchema),
});
