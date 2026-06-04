// Helpers shared by every interactive-graph type that supports the opt-in
// `showLabels` field. The same per-index label string drives both the
// visible on-canvas <TextLabel> and the screen-reader aria-label, so the
// two never disagree (WCAG 2.5.3 "Label in Name").
//
// `showLabels: true` requires the author to provide `pointLabels`. We do
// NOT auto-generate fallback letters (A, B, C, …) here. Auto-fill would
// leak Latin characters into non-Latin-alphabet locales. Authoring-time
// enforcement lives in the `interactive-graph-widget-error` lint rule.

// Returns the author-provided label for the point at `index`, or
// `undefined` when no label was provided (or the entry is the empty
// string). Callers should skip rendering a visible label when this
// returns `undefined`.
export function resolveVisibleLabel(
    pointLabels: string[] | undefined,
    index: number,
): string | undefined {
    const provided = pointLabels?.[index];
    if (provided != null && provided !== "") {
        return provided;
    }
    return undefined;
}

// Returns the per-point label array that should drive BOTH the visible
// on-canvas text AND the aria-label / SR description, so the two stay in
// sync. When `showLabels` is off, returns `pointLabels` unchanged (legacy
// behaviour). When on, returns `pointLabels` as-is — missing or empty
// entries stay missing so we never invent Latin letters that conflict
// with the learner's locale.
export function getEffectivePointLabels(
    showLabels: boolean | undefined,
    pointLabels: string[] | undefined,
    count: number,
): string[] | undefined {
    if (!showLabels) {
        return pointLabels;
    }
    return Array.from(
        {length: count},
        (_, i) => resolveVisibleLabel(pointLabels, i) ?? "",
    );
}
