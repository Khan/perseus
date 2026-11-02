export class DraftNotFoundError extends Error {
    readonly itemId: string;

    constructor(itemId: string) {
        super(`No draft with itemId "${itemId}".`);
        this.name = "DraftNotFoundError";
        this.itemId = itemId;
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
