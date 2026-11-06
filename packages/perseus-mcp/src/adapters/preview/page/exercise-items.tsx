// What the exercise page shows of an exercise and its items, and an item's
// status line (its change since import, revision and validation issues) and
// its issues, shared by the tree and the grid.
import Banner from "@khanacademy/wonder-blocks-banner";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkCircleIcon from "@phosphor-icons/core/regular/check-circle.svg";
import pencilSimpleIcon from "@phosphor-icons/core/regular/pencil-simple.svg";
import sparkleIcon from "@phosphor-icons/core/regular/sparkle.svg";
import warningCircleIcon from "@phosphor-icons/core/regular/warning-circle.svg";
import * as React from "react";

import styles from "./exercise-pages.module.css";

export type Issue = {
    severity: "error" | "warning" | "info";
    code: string;
    path: string;
    message: string;
};

export type ItemView = {
    itemId: string;
    /** The item's id on the site, as the exercise editor shows it. */
    contentId?: string;
    revision?: number;
    summary?: string;
    change?: "new" | "edited" | "unchanged";
    issues?: Issue[];
    missing?: true;
};

export type ExerciseView = {
    exerciseId: string;
    name: string;
    notes?: string;
    editorUrl?: string;
    problemTypes: Array<{name: string | null; items: ItemView[]}>;
};

const CHANGES = {
    new: {text: "New", icon: sparkleIcon, className: styles.new},
    edited: {text: "Edited", icon: pencilSimpleIcon, className: styles.edited},
    unchanged: {
        text: "Unchanged",
        icon: checkCircleIcon,
        className: styles.unchanged,
    },
} as const;

export function countIssues(issues: Issue[] = []): string | null {
    const errors = issues.filter((i) => i.severity === "error").length;
    const warnings = issues.filter((i) => i.severity === "warning").length;
    const parts = [
        errors > 0 ? `${errors} ${errors === 1 ? "error" : "errors"}` : null,
        warnings > 0
            ? `${warnings} ${warnings === 1 ? "warning" : "warnings"}`
            : null,
    ].filter((part) => part != null);
    return parts.length === 0 ? null : parts.join(", ");
}

export function ItemStatus({item}: {item: ItemView}) {
    if (item.missing) {
        return (
            <span className={`${styles.status} ${styles.problem}`}>
                <PhosphorIcon
                    icon={warningCircleIcon}
                    className={styles.icon}
                    aria-hidden={true}
                />
                Draft missing
            </span>
        );
    }
    const change = item.change != null ? CHANGES[item.change] : null;
    const issues = countIssues(item.issues);
    const hasErrors = item.issues?.some((i) => i.severity === "error");
    return (
        <span className={styles.status}>
            {change != null && (
                <span className={styles.status}>
                    <PhosphorIcon
                        icon={change.icon}
                        className={`${styles.icon} ${change.className}`}
                        aria-hidden={true}
                    />
                    {change.text}
                </span>
            )}
            {` · revision ${item.revision}`}
            {issues != null && (
                <span
                    className={`${styles.status} ${hasErrors ? styles.problem : ""}`}
                >
                    {" · "}
                    <PhosphorIcon
                        icon={warningCircleIcon}
                        className={styles.icon}
                        aria-hidden={true}
                    />
                    {issues}
                </span>
            )}
        </span>
    );
}

/** What an issue says: an error says so, as the banner's color shows warnings. */
function describe(issue: Issue, message: string): string {
    return issue.severity === "error" ? `Error: ${message}` : message;
}

/**
 * The issues as a card has room for: each message's first line, without its
 * path, and an issue repeated in several places once, with how many times.
 */
function briefly(issues: Issue[]): string[] {
    const counts = new Map<string, number>();
    for (const issue of issues) {
        const text = describe(
            issue,
            issue.message.split("\n")[0].replace(/:$/, ""),
        );
        counts.set(text, (counts.get(text) ?? 0) + 1);
    }
    return [...counts].map(([text, count]) =>
        count > 1 ? `${text} (${count} places)` : text,
    );
}

/**
 * An item's validation issues, in a banner: red with errors, yellow with
 * only warnings. In full, with where each is, or `brief`, as a grid card
 * lists them.
 */
export function IssueList({
    issues,
    brief = false,
}: {
    issues: Issue[];
    brief?: boolean;
}) {
    if (issues.length === 0) {
        return null;
    }
    const lines = brief
        ? briefly(issues)
        : issues.map((issue) =>
              describe(issue, `${issue.message} (${issue.path})`),
          );
    const kind = issues.some((i) => i.severity === "error")
        ? "critical"
        : issues.some((i) => i.severity === "warning")
          ? "warning"
          : "info";
    return (
        <div className={brief ? styles.briefIssues : undefined}>
            <Banner
                kind={kind}
                aria-label={countIssues(issues) ?? "Notes"}
                text={
                    <ul className={styles.issues}>
                        {lines.map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>
                }
            />
        </div>
    );
}
