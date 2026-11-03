export class DraftNotFoundError extends Error {
    readonly itemId: string;

    constructor(itemId: string) {
        super(`No draft with itemId "${itemId}".`);
        this.name = "DraftNotFoundError";
        this.itemId = itemId;
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
