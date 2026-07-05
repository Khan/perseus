import issuesList from "./a11y-issues-list";

import type {A11yIssue} from "../../components/issues-panel";
import type axe from "axe-core";

export const assistanceNeededMessage =
    "Developer assistance needed - Please send this exercise and warning info to the LEMS team for review.";

// A monotonic source of opaque, unique previewIds.
let nextPreviewId = 1;

/**
 * Maps a scan's axe results (one category at a time) to both an issues list
 * and a `previewId → elements` map, in a single pass.
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

        const previewId = `${prefix}-${nextPreviewId}`;
        nextPreviewId += 1;

        issues.push({
            id: result.id,
            description: isUserFixable ? "" : assistanceNeededMessage,
            previewId,
            helpUrl: result.helpUrl,
            help: result.help,
            impact: convertAxeImpactToIssueImpact(result.impact),
            message: getIssueMessage(result.nodes),
        });
        elementMap.set(
            previewId,
            result.nodes
                .map((node) => node.element)
                .filter((element): element is HTMLElement => element != null),
        );
    });

    return {issues, elementMap};
};

export const getIssueMessage = (nodes: axe.NodeResult[]): string => {
    return nodes
        .flatMap((node) => {
            return node.all
                .concat(node.any, node.none)
                .map((result) => result.message);
        })
        .filter(
            (message, index, allMessages) =>
                allMessages.indexOf(message) === index,
        )
        .join(". ");
};

export const convertAxeImpactToIssueImpact = (
    impact?: axe.ImpactValue,
): A11yIssue["impact"] => {
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
