export class DraftNotFoundError extends Error {
    readonly itemId: string;

    constructor(itemId: string) {
        super(`No draft with itemId "${itemId}".`);
        this.name = "DraftNotFoundError";
        this.itemId = itemId;
    }
}

export class RevisionNotFoundError extends Error {
    readonly itemId: string;
    readonly revision: number;

    constructor(itemId: string, revision: number, kept: ReadonlyArray<number>) {
        super(
            `Draft "${itemId}" has no revision ${revision}. Kept revisions: ` +
                `${kept.join(", ")}.`,
        );
        this.name = "RevisionNotFoundError";
        this.itemId = itemId;
        this.revision = revision;
    }
}

export class ExerciseNotFoundError extends Error {
    readonly exerciseId: string;

    constructor(exerciseId: string) {
        super(`No exercise with exerciseId "${exerciseId}".`);
        this.name = "ExerciseNotFoundError";
        this.exerciseId = exerciseId;
    }
}

export class InvalidImportError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidImportError";
    }
}

export class ExportExistsError extends Error {
    readonly path: string;

    constructor(path: string) {
        super(
            `${path} already exists. Pass overwrite: true to replace it, or ` +
                `another path.`,
        );
        this.name = "ExportExistsError";
        this.path = path;
    }
}

export class UnknownWidgetTypeError extends Error {
    readonly type: string;

    constructor(type: string, knownTypes: ReadonlyArray<string>) {
        super(
            `"${type}" isn't a Perseus widget type. Known types: ` +
                `${knownTypes.join(", ")}.`,
        );
        this.name = "UnknownWidgetTypeError";
        this.type = type;
    }
}

export class InvalidItemError extends Error {
    /** Why the item was rejected, e.g. the parser's message. */
    readonly reason: string;

    constructor(reason: string) {
        super(`That isn't a valid PerseusItem: ${reason}`);
        this.name = "InvalidItemError";
        this.reason = reason;
    }
}

export class PreviewUnavailableError extends Error {
    constructor() {
        super(
            "Previews aren't available: perseus-mcp couldn't start its " +
                "HTTP server. Its log (stderr) says why.",
        );
        this.name = "PreviewUnavailableError";
    }
}

export class GraffitiNotFoundError extends Error {
    readonly graffitiId: string;

    constructor(graffitiId: string, revision?: number) {
        super(
            revision == null
                ? `No Graffiti diagram with graffitiId "${graffitiId}".`
                : `Graffiti diagram "${graffitiId}" has no revision ${revision}.`,
        );
        this.name = "GraffitiNotFoundError";
        this.graffitiId = graffitiId;
    }
}

export class GraffitiRenderError extends Error {
    constructor(reason: string) {
        super(`The Graffiti script didn't draw a diagram: ${reason}`);
        this.name = "GraffitiRenderError";
    }
}

/** Content search can't be used now: its message says why and what to do. */
export class SearchUnavailableError extends Error {
    constructor(reason: string) {
        super(`Content search isn't available: ${reason}`);
        this.name = "SearchUnavailableError";
    }
}
