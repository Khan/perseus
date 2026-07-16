import {getIssueKey} from "./issues-panel";

import type {A11yIssue, LinterIssue} from "./issues-panel";

const a11yIssue: A11yIssue = {
    id: "color-contrast",
    description: "description",
    helpUrl: "https://help",
    help: "help",
    impact: "high",
    message: "message",
    previewId: "violation-1",
};

const linterIssue: LinterIssue = {
    id: "categorizer 1 inaccessible",
    description: "description",
    helpUrl: "https://help",
    help: "help",
    impact: "medium",
    message: "message",
};

describe("getIssueKey", () => {
    it("returns the previewId for an A11yIssue", () => {
        expect(getIssueKey(a11yIssue)).toBe("violation-1");
    });

    it("returns the id for a LinterIssue", () => {
        expect(getIssueKey(linterIssue)).toBe("categorizer 1 inaccessible");
    });
});
