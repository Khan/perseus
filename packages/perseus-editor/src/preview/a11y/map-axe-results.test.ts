import {
    assistanceNeededMessage,
    convertAxeImpactToIssueImpact,
    getIssueMessage,
    mapAxeResults,
} from "./map-axe-results";

import type axe from "axe-core";

// Build a minimal object that looks mostly like an axe.NodeResult.
function axeNodeResult(fields: {
    all?: string[];
    any?: string[];
    none?: string[];
    element?: HTMLElement;
}): axe.NodeResult {
    const result = {
        all: (fields.all ?? []).map((message) => ({message})),
        any: (fields.any ?? []).map((message) => ({message})),
        none: (fields.none ?? []).map((message) => ({message})),
        element: fields.element,
    };
    // eslint-disable-next-line no-restricted-syntax -- minimal NodeResult fixture contains only the bits we care about
    return result as unknown as axe.NodeResult;
}

// Build a minimal object that looks mostly like an axe.Result.
function axeResult(fields: {
    id: string;
    helpUrl?: string;
    help?: string;
    impact?: axe.ImpactValue;
    nodes: axe.NodeResult[];
}): axe.Result {
    const result = {
        helpUrl: "https://example.com/help",
        help: "Learn more",
        impact: "moderate",
        ...fields,
    };
    // eslint-disable-next-line no-restricted-syntax -- minimal Result fixture contains only the bits we care about
    return result as unknown as axe.Result;
}

describe("mapAxeResults", () => {
    it("maps a result to an A11yIssue with previewId, impact, and message", () => {
        const {issues} = mapAxeResults(
            [
                axeResult({
                    id: "color-contrast",
                    helpUrl: "https://help/contrast",
                    help: "Contrast help",
                    impact: "serious",
                    nodes: [axeNodeResult({all: ["contrast too low"]})],
                }),
            ],
            "Warning",
        );

        expect(issues).toEqual([
            {
                id: "color-contrast",
                description: assistanceNeededMessage,
                helpUrl: "https://help/contrast",
                help: "Contrast help",
                impact: "high",
                message: "contrast too low",
                previewId: expect.any(String),
            },
        ]);
    });

    it("uses an empty description for user-fixable Alert issues", () => {
        const {issues} = mapAxeResults(
            [
                axeResult({
                    id: "image-alt",
                    nodes: [axeNodeResult({all: ["needs alt"]})],
                }),
            ],
            "Alert",
        );

        expect(issues[0].description).toBe("");
    });

    it("uses the assistance-needed description for non-user-fixable Alert issues", () => {
        const {issues} = mapAxeResults(
            [
                axeResult({
                    id: "color-contrast",
                    nodes: [axeNodeResult({all: ["low"]})],
                }),
            ],
            "Alert",
        );

        expect(issues[0].description).toBe(assistanceNeededMessage);
    });

    it("gives each issue a distinct previewId", () => {
        const {issues} = mapAxeResults(
            [
                axeResult({id: "color-contrast", nodes: [axeNodeResult({})]}),
                axeResult({id: "image-alt", nodes: [axeNodeResult({})]}),
            ],
            "Alert",
        );

        const ids = issues.map((issue) => issue.previewId);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("maps each issue's previewId to the elements axe reported", () => {
        // Arrange
        const button = document.createElement("button");

        // Act
        const {issues, elementMap} = mapAxeResults(
            [
                axeResult({
                    id: "image-alt",
                    nodes: [axeNodeResult({element: button})],
                }),
            ],
            "Alert",
        );

        // Assert
        expect(elementMap.get(issues[0].previewId)).toEqual([button]);
    });
});

describe("getIssueMessage", () => {
    it("joins all/any/none messages across nodes, deduped, separated by '. '", () => {
        const nodes = [
            axeNodeResult({all: ["contrast too low"], any: ["needs label"]}),
            axeNodeResult({all: ["missing alt"], none: ["needs label"]}),
        ];

        expect(getIssueMessage(nodes)).toBe(
            "contrast too low. needs label. missing alt",
        );
    });
});

describe("convertAxeImpactToIssueImpact", () => {
    it("maps critical to high", () => {
        expect(convertAxeImpactToIssueImpact("critical")).toBe("high");
    });

    it("maps serious to high", () => {
        expect(convertAxeImpactToIssueImpact("serious")).toBe("high");
    });

    it("maps moderate to medium", () => {
        expect(convertAxeImpactToIssueImpact("moderate")).toBe("medium");
    });

    it("maps minor to low", () => {
        expect(convertAxeImpactToIssueImpact("minor")).toBe("low");
    });

    it("maps null and undefined (no impact) to low", () => {
        expect(convertAxeImpactToIssueImpact(null)).toBe("low");
        expect(convertAxeImpactToIssueImpact(undefined)).toBe("low");
    });
});
