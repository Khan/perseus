import {parseAssessmentItemList} from "./parsers/parse-assessment-item-list";
import {parseSnapshot} from "./parsers/parse-snapshot";

import type {AssessmentItem, ContentProvider} from "./domain/content-types";
import type {
    Snapshot,
    ExerciseData,
    CurationNodeData,
    DomainData,
} from "./parsers/parse-snapshot";

export interface ContentRepositoryOptions {
    /**
     * Provides access to the raw JSON for content items. Passed as an option
     * for ease of mocking.
     */
    contentJsonRepository: ContentJsonRepository;
}

/**
 * The ContentRepository uses this to get the raw JSON data.
 */
export interface ContentJsonRepository {
    getSnapshotJson(): Promise<string>;
    getAssessmentItemJson(
        exerciseId: string,
        contentSha: string,
    ): Promise<string>;
}

/**
 * The ContentRepository provides content data to the rest of the program.
 * It reads and parses JSON data from an underlying ContentJsonRepository.
 */
export class ContentRepository implements ContentProvider {
    private snapshotCache?: Snapshot;
    private mapOfIdsToDomainsCache?: Record<string, DomainData>;
    private mapOfIdsToCoursesCache?: Record<string, CurationNodeData>;
    private mapOfIdsToUnitsCache?: Record<string, CurationNodeData>;
    private mapOfIdsToLessonsCache?: Record<string, CurationNodeData>;
    private mapOfIdsToExercisesCache?: Record<string, ExerciseData>;

    constructor(private options: ContentRepositoryOptions) {}

    async getDomainById(id: string): Promise<DomainData | undefined> {
        const map = await this.getMapOfIdsToDomains();
        return map[id];
    }

    async getCourseById(id: string): Promise<CurationNodeData | undefined> {
        const map = await this.getMapOfIdsToCourses();
        return map[id];
    }

    async getUnitById(id: string): Promise<CurationNodeData | undefined> {
        const map = await this.getMapOfIdsToUnits();
        return map[id];
    }

    async getLessonById(id: string): Promise<CurationNodeData | undefined> {
        const map = await this.getMapOfIdsToLessons();
        return map[id];
    }

    async getExercises(): Promise<ExerciseData[]> {
        const snapshot = await this.getSnapshot();
        return snapshot.exercises;
    }

    async getAssessmentItems(exerciseId: string): Promise<AssessmentItem[]> {
        const exercise = await this.getExerciseById(exerciseId);
        if (exercise == null) {
            throw Error(`Exercise not found for ID: ${exerciseId}`);
        }

        const json = await this.getAssessmentItemJson(exerciseId);
        return parseAssessmentItemList(json).map((item) => {
            const itemMetadata = exercise.problemTypes
                .flatMap((problemType) => problemType.items)
                .find((itemMetadata) => itemMetadata.id === item.id);

            if (itemMetadata == null) {
                throw Error(
                    `Item metadata not found for exercise ID ${exerciseId} and item ID ${item.id}`,
                );
            }

            return {
                perseusItem: item.item_data,
                isContextInaccessible: itemMetadata.isContextInaccessible,
            };
        });
    }

    private async getExerciseById(
        id: string,
    ): Promise<ExerciseData | undefined> {
        const map = await this.getMapOfIdsToExercises();
        return map[id];
    }

    private async getSnapshot(): Promise<Snapshot> {
        this.snapshotCache ??= parseSnapshot(await this.getSnapshotJson());
        return this.snapshotCache;
    }

    private async getMapOfIdsToDomains(): Promise<Record<string, DomainData>> {
        if (this.mapOfIdsToDomainsCache == null) {
            this.mapOfIdsToDomainsCache = {};
            for (const domain of await this.getDomains()) {
                this.mapOfIdsToDomainsCache[domain.id] = domain;
            }
        }
        return this.mapOfIdsToDomainsCache;
    }

    private async getMapOfIdsToCourses(): Promise<
        Record<string, CurationNodeData>
    > {
        if (this.mapOfIdsToCoursesCache == null) {
            this.mapOfIdsToCoursesCache = {};
            for (const course of await this.getCourses()) {
                this.mapOfIdsToCoursesCache[course.id] = course;
            }
        }
        return this.mapOfIdsToCoursesCache;
    }

    private async getMapOfIdsToUnits(): Promise<
        Record<string, CurationNodeData>
    > {
        if (this.mapOfIdsToUnitsCache == null) {
            this.mapOfIdsToUnitsCache = {};
            for (const unit of await this.getUnits()) {
                this.mapOfIdsToUnitsCache[unit.id] = unit;
            }
        }
        return this.mapOfIdsToUnitsCache;
    }

    private async getMapOfIdsToLessons(): Promise<
        Record<string, CurationNodeData>
    > {
        if (this.mapOfIdsToLessonsCache == null) {
            this.mapOfIdsToLessonsCache = {};
            for (const lesson of await this.getLessons()) {
                this.mapOfIdsToLessonsCache[lesson.id] = lesson;
            }
        }
        return this.mapOfIdsToLessonsCache;
    }

    private async getMapOfIdsToExercises(): Promise<
        Record<string, ExerciseData>
    > {
        if (this.mapOfIdsToExercisesCache == null) {
            this.mapOfIdsToExercisesCache = {};
            for (const exercise of await this.getExercises()) {
                this.mapOfIdsToExercisesCache[exercise.id] = exercise;
            }
        }
        return this.mapOfIdsToExercisesCache;
    }

    private async getDomains(): Promise<DomainData[]> {
        const snapshot = await this.getSnapshot();
        return snapshot.domains;
    }

    private async getCourses(): Promise<CurationNodeData[]> {
        const snapshot = await this.getSnapshot();
        return snapshot.courses;
    }

    private async getUnits(): Promise<CurationNodeData[]> {
        const snapshot = await this.getSnapshot();
        return snapshot.units;
    }

    private async getLessons(): Promise<CurationNodeData[]> {
        const snapshot = await this.getSnapshot();
        return snapshot.lessons;
    }

    private async getSnapshotJson(): Promise<string> {
        return this.getJsonRepository().getSnapshotJson();
    }

    private async getAssessmentItemJson(exerciseId: string): Promise<string> {
        const exercise = await this.getExerciseById(exerciseId);
        if (exercise == null) {
            throw new Error(`Exercise not found for ID: ${exerciseId}`);
        }
        // To support non-English locales, we download the "translated"
        // version of the content. For English, that's just a copy of the
        // original content. However, the shas of the "translated" content
        // are different (TODO: why?) so we have to be sure to use the
        // translatedPerseusContentSha here.
        const contentSha = exercise.translatedPerseusContentSha;
        return this.getJsonRepository().getAssessmentItemJson(
            exerciseId,
            contentSha,
        );
    }

    private getJsonRepository(): ContentJsonRepository {
        return this.options.contentJsonRepository;
    }
}
