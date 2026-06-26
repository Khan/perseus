import {gatherLinterIssues} from "./gather-linter-issues";

import type {Issue} from "../components/issues-panel";

const cleanQuestion = {content: "What is $2 + 2$?", images: {}, widgets: {}};
const lintyQuestion = {content: "$\\invalid{x}$", images: {}, widgets: {}};
const cleanHint = {content: "The answer is $4$.", images: {}, widgets: {}};
const lintyHint = {content: "$\\invalid{x}$", images: {}, widgets: {}};

describe("gatherLinterIssues", () => {
    it("returns empty array for clean question and no hints", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(cleanQuestion, []);

        // Assert
        expect(issues).toEqual([]);
    });

    it("returns issues for a question with linting problems", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(lintyQuestion, []);

        // Assert
        expect(issues.length).toBeGreaterThan(0);
    });

    it("returns empty array when question is undefined", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(undefined, []);

        // Assert
        expect(issues).toEqual([]);
    });

    it("returns hint issues prefixed with 'Hint N:' in the message", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(cleanQuestion, [lintyHint]);

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
            lintyHint,
        ]);

        // Assert
        expect(issues.length).toBeGreaterThan(0);
        issues.forEach((issue) => {
            expect(issue.message).toMatch(/^Hint 2:/);
        });
    });

    it("prefixes hint issue IDs with 'hint-N-'", () => {
        // Arrange, Act
        const issues = gatherLinterIssues(cleanQuestion, [lintyHint]);

        // Assert
        issues.forEach((issue) => {
            expect(issue.id).toMatch(/^hint-1-/);
        });
    });

    it("includes host-provided issues first", () => {
        // Arrange
        const hostIssue: Issue = {
            id: "host-issue",
            description: "A host issue",
            help: "Help text",
            helpUrl: "https://example.com",
            impact: "high",
            message: "Something is wrong",
        };

        // Act
        const issues = gatherLinterIssues(cleanQuestion, [], [hostIssue]);

        // Assert
        expect(issues[0]).toEqual(hostIssue);
    });

    it("returns host issues even when content is clean", () => {
        // Arrange
        const hostIssue: Issue = {
            id: "host-issue",
            description: "A host issue",
            help: "Help text",
            helpUrl: "https://example.com",
            impact: "medium",
            message: "Something is wrong",
        };

        // Act
        const issues = gatherLinterIssues(cleanQuestion, [], [hostIssue]);

        // Assert
        expect(issues).toContainEqual(hostIssue);
    });

    it("orders issues: host issues, then question issues, then hint issues", () => {
        // Arrange
        const hostIssue: Issue = {
            id: "host-issue",
            description: "A host issue",
            help: "Help text",
            helpUrl: "https://example.com",
            impact: "high",
            message: "Host problem",
        };

        // Act
        const issues = gatherLinterIssues(lintyQuestion, [lintyHint], [
            hostIssue,
        ]);

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
