import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {boldFirstLine, describeChange, replaceText} from "./fixes";

function itemWith(question: string, hints: string[] = []) {
    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({content: question}),
        hints: hints.map((content) => generateTestPerseusRenderer({content})),
    });
}

describe("boldFirstLine", () => {
    it("wraps the first non-blank line in **", () => {
        // Arrange
        const item = itemWith("\nWhat is $2+2$?\n\n[[☃ radio 1]]");

        // Act
        const result = boldFirstLine(item);

        // Assert
        expect(result.changes).toEqual([
            {
                path: "/question/content",
                before: "\nWhat is $2+2$?\n\n[[☃ radio 1]]",
                after: "\n**What is $2+2$?**\n\n[[☃ radio 1]]",
            },
        ]);
    });

    it("removes bold inside the line, which would end it early", () => {
        // Arrange
        const item = itemWith("Find **all** the answers.");

        // Act
        const result = boldFirstLine(item);

        // Assert
        expect(result.changes[0]?.after).toBe("**Find all the answers.**");
    });

    it.each([
        ["already bold", "**Already bold.**"],
        ["a widget", "[[☃ radio 1]]"],
        ["an image", "![A graph](https://example.com/a.png)"],
        ["a heading", "## Part A"],
        ["a list", "- first"],
    ])("leaves a first line that's %s alone", (_kind, content) => {
        // Arrange
        const item = itemWith(content);

        // Act
        const result = boldFirstLine(item);

        // Assert
        expect(result).toEqual({changes: [], skipped: expect.any(String)});
    });
});

describe("replaceText", () => {
    it("replaces plain text everywhere in scope, literally", () => {
        // Arrange
        const item = itemWith("The x-axis (x-axis)", ["On the x-axis"]);

        // Act
        const result = replaceText(item, {
            find: "x-axis",
            replace: "x axis $1",
            regex: false,
            scope: "all",
        });

        // Assert
        expect(result.changes.map((c) => c.after)).toEqual([
            "The x axis $1 (x axis $1)",
            "On the x axis $1",
        ]);
    });

    it("uses a regular expression's groups", () => {
        // Arrange
        const item = itemWith("Round to 2 places.");

        // Act
        const result = replaceText(item, {
            find: "(\\d+) places",
            replace: "$1 decimal places",
            regex: true,
            scope: "question",
        });

        // Assert
        expect(result.changes[0]?.after).toBe("Round to 2 decimal places.");
    });

    it("looks only at hints when the scope is hints", () => {
        // Arrange
        const item = itemWith("cat", ["cat"]);

        // Act
        const result = replaceText(item, {
            find: "cat",
            replace: "dog",
            regex: false,
            scope: "hints",
        });

        // Assert
        expect(result.changes.map((c) => c.path)).toEqual(["/hints/0/content"]);
    });

    it("says when nothing matched", () => {
        // Arrange
        const item = itemWith("cat");

        // Act
        const result = replaceText(item, {
            find: "dog",
            replace: "cat",
            regex: false,
            scope: "all",
        });

        // Assert
        expect(result).toEqual({changes: [], skipped: "no match"});
    });
});

describe("describeChange", () => {
    it("shows only the lines that differ", () => {
        // Arrange, Act
        const view = describeChange({
            path: "/question/content",
            before: "a\nb\nc",
            after: "a\nB\nc",
        });

        // Assert
        expect(view).toEqual({
            path: "/question/content",
            before: ["b"],
            after: ["B"],
        });
    });
});
