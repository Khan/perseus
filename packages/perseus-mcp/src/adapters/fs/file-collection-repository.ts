import fs from "node:fs";
import path from "node:path";

import {z} from "zod";

import type {Collection} from "../../domain/collections/collection";
import type {CollectionRepository} from "../../ports/collection-repository";

const SavedCollection = z.object({
    collectionId: z.string(),
    name: z.string(),
    notes: z.string().optional(),
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
 * Keeps collections in memory and saves each one as
 * `<dataDir>/collections/<collectionId>.json`. A file that isn't a valid
 * collection is skipped when loading. Call `init()` after the draft
 * repository's, which checks the data directory can be written.
 */
export class FileCollectionRepository implements CollectionRepository {
    private readonly dir: string;
    private readonly collections = new Map<string, Collection>();

    constructor(dataDir: string) {
        this.dir = path.join(path.resolve(dataDir), "collections");
    }

    init(): void {
        fs.mkdirSync(this.dir, {recursive: true});
        for (const file of fs.readdirSync(this.dir)) {
            if (!file.endsWith(".json")) {
                continue;
            }
            try {
                const saved = SavedCollection.safeParse(
                    JSON.parse(
                        fs.readFileSync(path.join(this.dir, file), "utf8"),
                    ),
                );
                if (saved.success) {
                    this.collections.set(saved.data.collectionId, saved.data);
                }
            } catch {
                // Not JSON: skipped, like a draft file that isn't a draft.
            }
        }
    }

    get(collectionId: string): Collection | undefined {
        return this.collections.get(collectionId);
    }

    list(): Collection[] {
        return [...this.collections.values()].sort((a, b) =>
            b.updatedAt.localeCompare(a.updatedAt),
        );
    }

    save(collection: Collection): void {
        // Write then rename, so a crash mid-write never leaves half a file.
        const file = path.join(this.dir, `${collection.collectionId}.json`);
        const tmp = `${file}.tmp`;
        fs.writeFileSync(tmp, JSON.stringify(collection, null, 4));
        fs.renameSync(tmp, file);
        this.collections.set(collection.collectionId, collection);
    }
}
