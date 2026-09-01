import type {Alignment} from "@khanacademy/perseus-core";

/**
 * Map of alignment values to their corresponding human-readable descriptions.
 * Only includes alignments that show up in the widget select (i.e. occur
 * within a widget's `supportedAlignments` when there are multiple alignments
 * supported), in the Article editor only.
 *
 * Note that `default` is always replaced by another alignment.
 * `inline-block` and `inline` are not used in articles or displayed
 * in the alignment select, they're only used as default alignments
 * within the Exercise editor.
 */
export const alignmentInfoMap: Record<
    Exclude<Alignment, "default" | "inline-block" | "inline">,
    string
> = {
    block: "Block - widget is constrained to the width of the article content container.",
    "wrap-left":
        "Wrap left - widget is 50% width of the article content container, and is left aligned with text wrapping on the right of the widget.",
    "wrap-right":
        "Wrap right - widget is 50% width of the article content container, and is right aligned with text wrapping on the left of the widget.",
    "full-width":
        "Full width - widget extends beyond the width of the article content container.",
};
