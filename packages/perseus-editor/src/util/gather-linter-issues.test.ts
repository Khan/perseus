import {generateCategorizerWidget} from "@khanacademy/perseus-core";

import {getIssueKey} from "../components/issues-panel";

import {gatherLinterIssues} from "./gather-linter-issues";

import type {Issue} from "../components/issues-panel";

const cleanQuestion = {content: "What is $2 + 2$?", images: {}, widgets: {}};
const cleanHint = {content: "The answer is $4$.", images: {}, widgets: {}};

// Reports through `detectTexErrors` rather than any linter rule.
const badTexRenderer = {content: "$\\invalid{x}$", images: {}, widgets: {}};

const twoImageRenderer = {
    content: "![](https://example.com/a.png)\n\n![](https://example.com/b.png)",
    images: {},
    widgets: {},
};

function hostIssue(overrides?: Partial<Issue>): Issue {
    return {
        id: "host-issue",
        description: "A host issue",
        help: "Help text",
        helpUrl: "https://example.com",
        impact: "high",
        message: "Something is wrong",
        ...overrides,
    };
}

describe("gatherLinterIssues", () => {
    it("returns empty array for clean question and no hints", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(cleanQuestion, []);

        // Assert
        expect(issues).toEqual([]);
    });

    it("returns TeX errors found in the question", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(badTexRenderer, []);

        // Assert
        expect(issues.length).toBeGreaterThan(0);
        issues.forEach((issue) => {
            expect(issue.id).toMatch(/^tex-debug-info-/);
        });
    });

    it("returns empty array when question is undefined", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(undefined, []);

        // Assert
        expect(issues).toEqual([]);
    });

    it("returns hint issues prefixed with 'Hint N:' in the message", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(cleanQuestion, [badTexRenderer]);

        // Assert
        expect(issues.length).toBeGreaterThan(0);
        issues.forEach((issue) => {
            expect(issue.message).toMatch(/^Hint 1:/);
        });
    });

    it("numbers hint issues by position", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(cleanQuestion, [
            cleanHint,
            badTexRenderer,
        ]);

        // Assert
        expect(issues.length).toBeGreaterThan(0);
        issues.forEach((issue) => {
            expect(issue.message).toMatch(/^Hint 2:/);
        });
    });

    it("prefixes hint issue IDs with 'hint-N-'", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(cleanQuestion, [badTexRenderer]);

        // Assert
        expect(issues.length).toBeGreaterThan(0);
        issues.forEach((issue) => {
            expect(issue.id).toMatch(/^hint-1-/);
        });
    });

    it("gives each issue a unique key when one rule fires more than once in the question", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(twoImageRenderer, []);

        // Assert
        const keys = issues.map(getIssueKey);
        expect(keys.length).toBeGreaterThan(1);
        expect(new Set(keys).size).toBe(keys.length);
    });

    it("gives each issue a unique key when one rule fires more than once in a hint", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(cleanQuestion, [twoImageRenderer]);

        // Assert
        const keys = issues.map(getIssueKey);
        expect(keys.length).toBeGreaterThan(1);
        expect(new Set(keys).size).toBe(keys.length);
    });

    it("gives each issue a unique key across the question and its hints", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(twoImageRenderer, [
            twoImageRenderer,
            twoImageRenderer,
        ]);

        // Assert
        const keys = issues.map(getIssueKey);
        expect(new Set(keys).size).toBe(keys.length);
    });

    it("numbers each rule's occurrences from zero, independently per rule", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(twoImageRenderer, []);

        // Assert
        const instanceIdsByRule = new Map<string, Array<string | undefined>>();
        issues.forEach((issue) => {
            const forRule = instanceIdsByRule.get(issue.id) ?? [];
            forRule.push(issue.instanceId);
            instanceIdsByRule.set(issue.id, forRule);
        });

        // The invariant only says something when more than one rule repeats:
        // a counter shared across rules would number the second rule's
        // occurrences 2 and 3 rather than restarting at 0.
        const repeatedRules = [...instanceIdsByRule.values()].filter(
            (instanceIds) => instanceIds.length > 1,
        );
        expect(repeatedRules.length).toBeGreaterThan(1);

        instanceIdsByRule.forEach((instanceIds, id) => {
            expect(instanceIds).toEqual(
                instanceIds.map((_, occurrence) => `${id}-${occurrence}`),
            );
        });
    });

    it("keeps an instanceId the warning already provides", () => {
        // Arrange
        const widgetRenderer = {
            content: "[[☃ categorizer 1]]",
            images: {},
            widgets: {"categorizer 1": generateCategorizerWidget()},
        };

        // Act
        const issues = gatherLinterIssues(widgetRenderer, []);

        // Assert
        expect(issues).toContainEqual(
            expect.objectContaining({
                instanceId: "inaccessible-widget-categorizer 1",
            }),
        );
    });

    it("includes host-provided issues first", () => {
        // Arrange
        const issue = hostIssue();

        // Act
        const issues = gatherLinterIssues(twoImageRenderer, [], [issue]);

        // Assert
        expect(issues[0]).toEqual(issue);
    });

    it("returns host issues even when content is clean", () => {
        // Arrange
        const issue = hostIssue();

        // Act
        const issues = gatherLinterIssues(cleanQuestion, [], [issue]);

        // Assert
        expect(issues).toContainEqual(issue);
    });

    it("orders issues: host issues, then question issues, then hint issues", () => {
        // Arrange
        const issue = hostIssue();

        // Act
        const issues = gatherLinterIssues(
            badTexRenderer,
            [badTexRenderer],
            [issue],
        );

        // Assert
        const hostIndex = issues.findIndex((i) => i.id === "host-issue");
        const questionIndex = issues.findIndex(
            (i) => !i.id.startsWith("hint-") && i.id !== "host-issue",
        );
        const hintIndex = issues.findIndex((i) => i.id.startsWith("hint-"));

        expect(hostIndex).toBeLessThan(questionIndex);
        expect(questionIndex).toBeLessThan(hintIndex);
    });
});
