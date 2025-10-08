import {array, boolean, number, object, string, type Infer} from "zod";

export type Snapshot = Infer<typeof SnapshotSchema>;

export type ExerciseData = Infer<typeof ExerciseSchema>;

export type DomainData = Infer<typeof DomainSchema>;

export type IntermediateCurationNodeData = Infer<
    typeof IntermediateCurationNodeSchema
>;

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

const stringArrayDefaultEmpty = array(string())
    .nullable()
    .transform((value) => value ?? []);

const ExerciseSchema = object({
    // NOTE: there are more fields in the exercise object. This schema just
    // lists the fields we currently care about.
    exerciseLength: number(),
    id: string(),
    slug: string(),
    problemTypes: array(ProblemTypeSchema),
    translatedPerseusContentSha: string(),
    listedAncestorIds: stringArrayDefaultEmpty,
});

const DomainSchema = object({
    id: string(),
    slug: string(),
});

const IntermediateCurationNodeSchema = object({
    id: string(),
    slug: string(),
    listedAncestorIds: stringArrayDefaultEmpty,
});

const SnapshotSchema = object({
    exercises: array(ExerciseSchema),
    domains: array(DomainSchema),
    courses: array(IntermediateCurationNodeSchema),
    units: array(IntermediateCurationNodeSchema),
    lessons: array(IntermediateCurationNodeSchema),
});
