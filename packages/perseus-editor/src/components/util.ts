import type {Alignment} from "@khanacademy/perseus-core";

export function focusWithChromeStickyFocusBugWorkaround(element: Element) {
    // NOTE(marksandstrom) Chrome sticky focus bug.
    //
    // There is a bug in Chrome related to sticky positioning and
    // focus: When a child of an element with sticky positioning is
    // focused with the focus() method, the scrollable area
    // containing that element will scroll to the top (even though
    // the element is already visble on the page). For a dropdown
    // this means that the area will be scrolled to the top when
    // the user interacts with the dropdown (since we actively
    // manage dropdown header and option focus for keyboard users).
    //
    // To work around this bug the `preventScroll` focus option is
    // used.
    //
    // Using `focusOptions` is an experimental browser feature
    // "that should not be used in production code". However, since
    // Chrome is the only browser we support that exhibits this
    // buggy behavior and using `focusOptions` works around the
    // bug, it is perfectly reasonable to use the feature in this
    // case. We are not relying on the effect of the
    // `preventScroll` option otherwise.
    //
    // focusOptions documentation:
    //
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
    //
    // Note that there could be cases where we want default focus() behavior.
    // One that comes to mind is a dropdown with a long list of options that
    // might be rendered off screen when opened. With this workaround the
    // selected option would not be scrolled into view if the option is near
    // the end of the list. We're not aware of any uses of the dropdown where
    // this is an issue, however, so there isn't currently a way to out of the
    // `preventScroll` behavior.

    // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'Element'.
    element.focus({preventScroll: true});
}

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
