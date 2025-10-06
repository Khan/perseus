import type {PerseusItem} from "@khanacademy/perseus-core";

export interface ContentRepository {
    getExercises(): Promise<Exercise[]>
    getAssessmentItems(exerciseId: string): Promise<AssessmentItem[]>
}

export interface Exercise {
    exerciseLength: number,
    id: string,
    problemTypes: ProblemType[]
    translatedPerseusContentSha: string
}

export interface AssessmentItem {
    isContextInaccessible: boolean;
    perseusItem: PerseusItem;
}

export interface ProblemType {
    items: Item[]
}

export interface Item {
    id: string
    isContextInaccessible: boolean
}
