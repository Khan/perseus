import {array, number, object, string, type Infer} from "zod";

const ItemSchema = object({
    // NOTE: there are more fields in the item object. This schema just
    // lists the fields we currently care about.
    id: string(),
});

const ProblemTypeSchema = object({
    // NOTE: there are more fields in the problem type object. This schema just
    // lists the fields we currently care about.
    items: array(ItemSchema),
});

const ExerciseSchema = object({
    // NOTE: there are more fields in the exercise object. This schema just
    // lists the fields we currently care about.
    exerciseLength: number(),
    id: string(),
    translatedPerseusContentSha: string(),
});

const SnapshotSchema = object({
    exercises: array(ExerciseSchema),
});

export type Exercise = Infer<typeof ExerciseSchema>;

export type Snapshot = Infer<typeof SnapshotSchema>;

export function parseSnapshot(rawData: unknown): Snapshot {
    return SnapshotSchema.parse(
        typeof rawData === "string" ? JSON.parse(rawData) : rawData,
    );
}
