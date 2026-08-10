import issuesList from "./a11y-issues-list";

import type {A11yIssue, IssueImpact} from "../../components/issues-panel";
import type axe from "axe-core";

export const assistanceNeededMessage =
    "Developer assistance needed - Please send this exercise and warning info to the LEMS team for review.";

/**
 * Maps a scan's axe results (one category at a time) to both an issues list
 * and an `instanceId → elements` map, in a single pass.
 */
export const mapAxeResults = (
    results: axe.Result[],
    type: "Warning" | "Alert",
): {issues: A11yIssue[]; elementMap: Map<string, Element[]>} => {
    const prefix = type === "Alert" ? "violation" : "incomplete";
    const issues: A11yIssue[] = [];
    const elementMap = new Map<string, Element[]>();

    results.forEach((result) => {
        const isUserFixable =
            type === "Alert" &&
            issuesList["axe-core"]["user-fixable"].some(
                (testId) => testId === result.id,
            );

        // Derived rather than counter-generated so that re-scanning the same
        // problem yields the same instanceId. axe-core reports at most one
        // result per rule per category, so this is unique within the map.
        const instanceId = `${prefix}-${result.id}`;

        issues.push({
            source: "a11y",
            id: result.id,
            description: isUserFixable ? "" : assistanceNeededMessage,
            instanceId,
            helpUrl: result.helpUrl,
            help: result.help,
            impact: convertAxeImpactToIssueImpact(result.impact),
            message: getIssueMessage(result.nodes),
        });
        elementMap.set(
            instanceId,
            result.nodes
                .map((node) => node.element)
                .filter((element): element is HTMLElement => element != null),
        );
    });

    return {issues, elementMap};
};

export const getIssueMessage = (nodes: axe.NodeResult[]): string => {
    return [
        // Reduce everything down to the unique set of messages.
        ...new Set(
            nodes.flatMap((node) =>
                [...node.all, ...node.any, ...node.none].map(
                    (result) => result.message,
                ),
            ),
        ),
    ].join(". ");
};

export const convertAxeImpactToIssueImpact = (
    impact?: axe.ImpactValue,
): IssueImpact => {
    switch (impact) {
        case "critical":
            return "high";
        case "serious":
            return "high";
        case "moderate":
            return "medium";
        case "minor":
            return "low";
        default:
            return "low";
    }
};
