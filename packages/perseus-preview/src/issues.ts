export type IssueImpact = "low" | "medium" | "high";

/**
 * A problem to show the author, from the editor-side linter or the preview's
 * axe-core scanner.
 */
export interface Issue {
    /**
     * The problem identifier (name). This `id` is _not_ guaranteed to be
     * unique and is often the name of the rule that generated this issue (for
     * example, this may be the axe-core rule id or a linter rule name). Shown
     * to the author and used when a fix is offered, so several issues can
     * share one — nine images missing alt text are nine `image-alt`s.
     */
    id: string;

    /**
     * The unique issue identifier. Distinguishes this issue from every other
     * issue in the same list. Optional because some issue sources may not have
     * one naturally; prefer `getIssueKey` over reading it directly.
     */
    instanceId?: string;

    /**
     * Where this issue came from. Usually unset — used only when the origin
     * (source) tells you the issue can do something the others can't. See
     * {@link A11yIssue}.
     */
    source?: "a11y";

    description: string;
    helpUrl: string;
    help: string;
    impact: IssueImpact;
    message: string;
}

/**
 * An issue the preview's axe-core scanner found, and can therefore highlight —
 * it always has the `instanceId` the element map is keyed by.
 */
export type A11yIssue = Issue & {source: "a11y"; instanceId: string};

/**
 * A unique identifier for an issue, suitable for use as a React key or a
 * Record key. Falls back to `id`, which names the rule rather than the
 * occurrence, for issues that arrive without an `instanceId`.
 */
export function getIssueKey(issue: Issue): string {
    return issue.instanceId ?? issue.id;
}
