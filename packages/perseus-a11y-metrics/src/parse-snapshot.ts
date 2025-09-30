import {array, boolean, number, object, string, unknown, type Infer} from "zod";

const ItemSchema = object({
    // NOTE: there are more fields in the ItemSchema object. This schema just
    // lists the fields we currently care about.
    id: string(),
});

const ProblemTypeSchema = object({
    // NOTE: there are more fields in the ProblemTypeSchema object. This schema just
    // lists the fields we currently care about.
    items: array(ItemSchema),
});

const ExerciseSchema = object({
    // NOTE: there are more fields in the ExerciseSchema object. This schema just
    // lists the fields we currently care about.
    // TODO: what is the difference between contentId and id?
    contentId: string(),
    exerciseLength: number(),
    id: string(),
    listed: boolean(),
    problemTypes: array(ProblemTypeSchema),
    translatedPerseusContentSha: string(),
});

const SnapshotSchema = object({
    exercises: array(ExerciseSchema),
    // TODO
    articles: unknown(),
    // TODO
    quizzes: unknown(),
    // TODO
    unitTests: unknown(),

    // We don't care about the fields below for now
    aiGuideActivities: unknown(),
    challenges: unknown(),
    courseMenus: unknown(),
    courses: unknown(),
    curationPages: unknown(),
    curriculums: unknown(),
    domains: unknown(),
    interactives: unknown(),
    lessons: unknown(),
    projects: unknown(),
    talkthroughs: unknown(),
    units: unknown(),
    version: unknown(),
    video: unknown(),
});

export type Exercise = Infer<typeof ExerciseSchema>;

export type Snapshot = Infer<typeof SnapshotSchema>;

export function parseSnapshot(rawData: unknown): Snapshot {
    return SnapshotSchema.parse(
        typeof rawData === "string" ? JSON.parse(rawData) : rawData,
    );
}
