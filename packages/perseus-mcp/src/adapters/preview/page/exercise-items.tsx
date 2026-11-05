// What the exercise page shows of an exercise and its items, and an item's
// status line (its change since import, revision and validation issues),
// shared by the tree and the grid.
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import checkCircleIcon from "@phosphor-icons/core/regular/check-circle.svg";
import pencilSimpleIcon from "@phosphor-icons/core/regular/pencil-simple.svg";
import plusCircleIcon from "@phosphor-icons/core/regular/plus-circle.svg";
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
    new: {text: "New", icon: plusCircleIcon, className: styles.new},
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
