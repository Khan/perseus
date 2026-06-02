// Helpers shared by every interactive-graph type that supports the opt-in
// `showLabels` field. The same per-index label string drives both the
// visible on-canvas <TextLabel> and the screen-reader aria-label, so the
// two never disagree (WCAG 2.5.3 "Label in Name").

// Resolves the visible on-canvas label for the point at `index`. Uses the
// author-provided string when present and non-empty, otherwise falls back
// to the auto-generated letter A, B, C, … (Z, then wraps).
export function resolveVisibleLabel(
    pointLabels: string[] | undefined,
    index: number,
): string {
    const provided = pointLabels?.[index];
    if (provided != null && provided !== "") {
        return provided;
    }
    return String.fromCharCode(65 + (index % 26));
}

// Returns the per-point label array that should drive BOTH the visible
// on-canvas text AND the aria-label / SR description, so the two stay in
// sync. When `showLabels` is off, returns `pointLabels` unchanged (legacy
// behaviour). When on, fills any gaps with the auto A/B/C fallback so a
// learner using a screen reader hears the same letter a sighted learner
// sees.
export function getEffectivePointLabels(
    showLabels: boolean | undefined,
    pointLabels: string[] | undefined,
    count: number,
): string[] | undefined {
    if (!showLabels) {
        return pointLabels;
    }
    return Array.from({length: count}, (_, i) =>
        resolveVisibleLabel(pointLabels, i),
    );
}
