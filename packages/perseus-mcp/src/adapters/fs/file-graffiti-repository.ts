import fs from "node:fs";
import path from "node:path";

import {z} from "zod";

import {isDiagramId} from "../../domain/graffiti/diagram";

import type {Diagram} from "../../domain/graffiti/diagram";
import type {GraffitiRepository} from "../../ports/graffiti-repository";

const SavedDiagram = z.object({
    graffitiId: z.string(),
    revision: z.number().int().positive(),
    source: z.string(),
    notes: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    change: z.string().optional(),
});

/**
 * Saves every revision of a diagram as
 * `<dataDir>/graffiti/<graffitiId>/<revision>.json`, and keeps each
 * diagram's latest in memory. Call `init()` after the draft repository's,
 * which checks the data directory can be written.
 */
export class FileGraffitiRepository implements GraffitiRepository {
    private readonly dir: string;
    private readonly latest = new Map<string, Diagram>();

    constructor(dataDir: string) {
        this.dir = path.join(path.resolve(dataDir), "graffiti");
    }

    init(): void {
        fs.mkdirSync(this.dir, {recursive: true});
        for (const graffitiId of fs.readdirSync(this.dir)) {
            if (!isDiagramId(graffitiId)) {
                continue;
            }
            const revisions = this.revisionNumbers(graffitiId);
            const newest = revisions.at(-1);
            const diagram =
                newest == null ? undefined : this.read(graffitiId, newest);
            if (diagram != null) {
                this.latest.set(graffitiId, diagram);
            }
        }
    }

    get(graffitiId: string): Diagram | undefined {
        return this.latest.get(graffitiId);
    }

    getRevision(graffitiId: string, revision: number): Diagram | undefined {
        // Only diagrams it knows, so an id can't name a path outside it.
        return this.latest.has(graffitiId)
            ? this.read(graffitiId, revision)
            : undefined;
    }

    list(): Diagram[] {
        return [...this.latest.values()].sort((a, b) =>
            b.updatedAt.localeCompare(a.updatedAt),
        );
    }

    save(diagram: Diagram): void {
        const dir = path.join(this.dir, diagram.graffitiId);
        fs.mkdirSync(dir, {recursive: true});
        // Write then rename, so a crash mid-write never leaves half a file.
        const file = path.join(dir, `${diagram.revision}.json`);
        fs.writeFileSync(`${file}.tmp`, JSON.stringify(diagram, null, 4));
        fs.renameSync(`${file}.tmp`, file);
        this.latest.set(diagram.graffitiId, diagram);
    }

    private revisionNumbers(graffitiId: string): number[] {
        return fs
            .readdirSync(path.join(this.dir, graffitiId))
            .map((file) => /^(\d+)\.json$/.exec(file)?.[1])
            .filter((n) => n != null)
            .map(Number)
            .sort((a, b) => a - b);
    }

    private read(graffitiId: string, revision: number): Diagram | undefined {
        if (!Number.isInteger(revision) || revision < 1) {
            return undefined;
        }
        const file = path.join(this.dir, graffitiId, `${revision}.json`);
        try {
            const saved = SavedDiagram.safeParse(
                JSON.parse(fs.readFileSync(file, "utf8")),
            );
            return saved.success ? saved.data : undefined;
        } catch {
            return undefined;
        }
    }
}
