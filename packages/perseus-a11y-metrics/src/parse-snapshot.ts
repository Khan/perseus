import {
    array,
    boolean,
    number,
    object,
    string,
    unknown,
    type Infer,
} from "zod";

const Item = object({
    // NOTE: there are more fields in the Item object. This schema just
    // lists the fields we currently care about.
    id: string(),
});

const ProblemType = object({
    // NOTE: there are more fields in the ProblemType object. This schema just
    // lists the fields we currently care about.
    items: array(Item),
});

const Exercise = object({
    // NOTE: there are more fields in the Exercise object. This schema just
    // lists the fields we currently care about.
    contentId: string(),
    exerciseLength: number(),
    id: string(),
    listed: boolean(),
    problemTypes: array(ProblemType),
});

const Snapshot = object({
    exercises: array(Exercise),
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

export function parseSnapshot(rawData: unknown): Infer<typeof Snapshot> {
    return Snapshot.parse(typeof rawData === "string" ? JSON.parse(rawData) : rawData);
}
