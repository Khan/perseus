import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * A Perseus item being worked on. Tools refer to drafts by `itemId`, so they
 * can send small changes instead of the whole item.
 */
export type Draft = {
    itemId: string;
    /** Bumped on every change. */
    revision: number;
    createdAt: string;
    updatedAt: string;
    /**
     * Context the agent keeps with the draft, such as where the item came
     * from, what it's for or what's left to do. Drafts outlive the agent's
     * own memory of them.
     */
    notes?: string;
    item: PerseusItem;
};

export function newDraft(args: {
    itemId: string;
    item: PerseusItem;
    notes?: string;
    now: Date;
}): Draft {
    const timestamp = args.now.toISOString();
    return {
        itemId: args.itemId,
        revision: 1,
        createdAt: timestamp,
        updatedAt: timestamp,
        notes: args.notes,
        item: args.item,
    };
}

/** The draft after a change: the new values, a new revision and timestamp. */
export function reviseDraft(
    draft: Draft,
    changes: {item?: PerseusItem; notes?: string; now: Date},
): Draft {
    return {
        ...draft,
        revision: draft.revision + 1,
        updatedAt: changes.now.toISOString(),
        item: changes.item ?? draft.item,
        notes: changes.notes ?? draft.notes,
    };
}
