import fs from "node:fs";
import path from "node:path";

import {z} from "zod";

import {parseItem} from "../../domain/items/parse";

import type {Draft} from "../../domain/draft";
import type {
    DraftRepository,
    RevisionSummary,
    SkippedDraft,
} from "../../ports/draft-repository";

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
 * so drafts survive restarts, and every revision as
 * `<dataDir>/history/<itemId>/<revision>.json`, read only when asked for. It
 * only ever writes inside `dataDir`.
 */
export class FileDraftRepository implements DraftRepository {
    private readonly draftsDir: string;
    private readonly historyDir: string;
    private readonly drafts = new Map<string, Draft>();
    private readonly skippedDrafts: SkippedDraft[] = [];

    constructor(dataDir: string) {
        this.draftsDir = path.join(path.resolve(dataDir), "drafts");
        this.historyDir = path.join(path.resolve(dataDir), "history");
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
            fs.mkdirSync(this.historyDir, {recursive: true});
            fs.accessSync(this.historyDir, fs.constants.W_OK);
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
        const json = JSON.stringify(draft, null, 4);
        // The revision first: a crash between the two writes leaves a kept
        // revision that isn't the draft yet, never a draft without its
        // revision.
        const revisionsDir = this.revisionsDirOf(draft.itemId);
        fs.mkdirSync(revisionsDir, {recursive: true});
        writeAtomically(
            path.join(revisionsDir, `${draft.revision}.json`),
            json,
        );
        writeAtomically(this.locationOf(draft.itemId), json);
        this.drafts.set(draft.itemId, draft);
    }

    getRevision(itemId: string, revision: number): Draft | undefined {
        // Only known drafts: an unknown itemId could name a path outside
        // the history directory.
        const current = this.drafts.get(itemId);
        if (current == null) {
            return undefined;
        }
        if (current.revision === revision) {
            return current;
        }
        const file = path.join(this.revisionsDirOf(itemId), `${revision}.json`);
        if (!Number.isInteger(revision) || !fs.existsSync(file)) {
            return undefined;
        }
        const read = readDraft(file);
        return read.ok ? read.draft : undefined;
    }

    revisions(itemId: string): RevisionSummary[] {
        const current = this.drafts.get(itemId);
        if (current == null) {
            return [];
        }
        const dir = this.revisionsDirOf(itemId);
        const kept = fs.existsSync(dir)
            ? fs
                  .readdirSync(dir)
                  .map((file) => /^(\d+)\.json$/.exec(file)?.[1])
                  .filter((n): n is string => n != null)
                  .map(Number)
            : [];
        // A draft saved before revisions were kept has only its current one.
        const numbers = [...new Set([...kept, current.revision])].sort(
            (a, b) => a - b,
        );
        return numbers.flatMap((revision) => {
            const draft = this.getRevision(itemId, revision);
            return draft == null
                ? []
                : [
                      {
                          revision,
                          updatedAt: draft.updatedAt,
                          change: draft.change,
                      },
                  ];
        });
    }

    locationOf(itemId: string): string {
        return path.join(this.draftsDir, `${itemId}.json`);
    }

    private revisionsDirOf(itemId: string): string {
        return path.join(this.historyDir, itemId);
    }

    skipped(): SkippedDraft[] {
        return [...this.skippedDrafts];
    }

    private load(file: string): void {
        const read = readDraft(file);
        if (read.ok) {
            this.drafts.set(read.draft.itemId, read.draft);
        } else {
            this.skippedDrafts.push({location: file, reason: read.reason});
        }
    }
}

/** Writes then renames, so a crash mid-write never leaves half a file. */
function writeAtomically(file: string, contents: string): void {
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, contents);
    fs.renameSync(tmp, file);
}

/** Reads a saved draft, parsing and migrating its item. */
function readDraft(
    file: string,
): {ok: true; draft: Draft} | {ok: false; reason: string} {
    let saved: unknown;
    try {
        saved = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (e) {
        return {ok: false, reason: `Not valid JSON: ${String(e)}`};
    }
    const draft = SavedDraft.safeParse(saved);
    if (!draft.success) {
        return {
            ok: false,
            reason: `Not a draft: ${z.prettifyError(draft.error)}`,
        };
    }
    const parsed = parseItem(draft.data.item);
    if (!parsed.ok) {
        return {
            ok: false,
            reason: `Its item isn't a valid PerseusItem: ${parsed.error}`,
        };
    }
    return {ok: true, draft: {...draft.data, item: parsed.item}};
}

// Everything but the item, which parseItem checks (and migrates).
const SavedDraft = z.object({
    itemId: z.string(),
    revision: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    notes: z.string().optional(),
    change: z.string().optional(),
    item: z.unknown(),
});
