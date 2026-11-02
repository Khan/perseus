import fs from "node:fs";
import path from "node:path";

import {z} from "zod";

import {parseItem} from "../../domain/items/parse";

import type {Draft} from "../../domain/draft";
import type {DraftRepository, SkippedDraft} from "../../ports/draft-repository";

export class DataDirNotWritableError extends Error {
    readonly dir: string;
    /** Why it can't be written to: the file system's error. */
    readonly reason: unknown;

    constructor(dir: string, reason: unknown) {
        super(`Can't write to ${dir}: ${String(reason)}`);
        this.name = "DataDirNotWritableError";
        this.dir = dir;
        this.reason = reason;
    }
}

/**
 * Keeps drafts in memory and saves each one as `<dataDir>/drafts/<itemId>.json`,
 * so drafts survive restarts. It only ever writes inside `dataDir`.
 */
export class FileDraftRepository implements DraftRepository {
    private readonly draftsDir: string;
    private readonly drafts = new Map<string, Draft>();
    private readonly skippedDrafts: SkippedDraft[] = [];

    constructor(dataDir: string) {
        this.draftsDir = path.join(path.resolve(dataDir), "drafts");
    }

    /**
     * Creates the drafts directory if needed and loads the saved drafts. Each
     * item is parsed and migrated as it loads; a file that isn't a valid
     * draft is skipped (see `skipped()`) rather than stopping the server.
     *
     * @throws DataDirNotWritableError if the directory can't be created or
     * written to. Failing here beats silently losing drafts later.
     */
    init(): void {
        try {
            fs.mkdirSync(this.draftsDir, {recursive: true});
            fs.accessSync(this.draftsDir, fs.constants.W_OK);
        } catch (e) {
            throw new DataDirNotWritableError(this.draftsDir, e);
        }

        for (const file of fs.readdirSync(this.draftsDir)) {
            if (file.endsWith(".json")) {
                this.load(path.join(this.draftsDir, file));
            }
        }
    }

    get(itemId: string): Draft | undefined {
        return this.drafts.get(itemId);
    }

    list(): Draft[] {
        return [...this.drafts.values()].sort((a, b) =>
            b.updatedAt.localeCompare(a.updatedAt),
        );
    }

    save(draft: Draft): void {
        // Write then rename, so a crash mid-write never leaves a half-written
        // draft behind.
        const file = this.locationOf(draft.itemId);
        const tmp = `${file}.tmp`;
        fs.writeFileSync(tmp, JSON.stringify(draft, null, 4));
        fs.renameSync(tmp, file);
        this.drafts.set(draft.itemId, draft);
    }

    locationOf(itemId: string): string {
        return path.join(this.draftsDir, `${itemId}.json`);
    }

    skipped(): SkippedDraft[] {
        return [...this.skippedDrafts];
    }

    private load(file: string): void {
        const skip = (reason: string) =>
            this.skippedDrafts.push({location: file, reason});

        let saved: unknown;
        try {
            saved = JSON.parse(fs.readFileSync(file, "utf8"));
        } catch (e) {
            skip(`Not valid JSON: ${String(e)}`);
            return;
        }
        const draft = SavedDraft.safeParse(saved);
        if (!draft.success) {
            skip(`Not a draft: ${z.prettifyError(draft.error)}`);
            return;
        }
        const parsed = parseItem(draft.data.item);
        if (!parsed.ok) {
            skip(`Its item isn't a valid PerseusItem: ${parsed.error}`);
            return;
        }
        this.drafts.set(draft.data.itemId, {...draft.data, item: parsed.item});
    }
}

// Everything but the item, which parseItem checks (and migrates).
const SavedDraft = z.object({
    itemId: z.string(),
    revision: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    notes: z.string().optional(),
    item: z.unknown(),
});
