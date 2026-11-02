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
