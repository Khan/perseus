import type {PerseusItem} from "@khanacademy/perseus-core";

export interface ContentRepository {
    getDomainById(id: string): Promise<Domain | undefined>;
    getCourseById(id: string): Promise<Course | undefined>;
    getUnitById(id: string): Promise<Unit | undefined>;
    getLessonById(id: string): Promise<Lesson | undefined>;
    getExercises(): Promise<Exercise[]>;
    getAssessmentItems(exerciseId: string): Promise<AssessmentItem[]>;
}

export interface Domain {
    id: string;
    slug: string;
}

export interface Course {
    id: string;
    slug: string;
    listedAncestorIds: string[];
}

export interface Unit {
    id: string;
    slug: string;
    listedAncestorIds: string[];
}

export interface Lesson {
    id: string;
    slug: string;
    listedAncestorIds: string[];
}

export interface Exercise {
    exerciseLength: number;
    id: string;
    listedAncestorIds: string[];
}

export interface AssessmentItem {
    isContextInaccessible: boolean;
    perseusItem: PerseusItem;
}
