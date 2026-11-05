import {
    contentIdFilter,
    filterExpression,
    searchedFields,
    toHit,
    topValues,
} from "./content-query";

import type {HitFields} from "./content-query";

describe("filterExpression", () => {
    it("searches only listed content by default", () => {
        // Arrange, Act
        const filter = filterExpression({});

        // Assert
        expect(filter).toBe("listed = true");
    });

    it("joins every filter with AND, each list value on its own", () => {
        // Arrange, Act
        const filter = filterExpression({
            includeUnlisted: true,
            kind: "item",
            course: "algebra",
            widgetTypes: ["radio", "image"],
            widgetProps: ["radio.multipleSelect=true"],
            hasGraphie: false,
            filter: "hintCount >= 4",
        });

        // Assert
        expect(filter).toBe(
            'kind = "item" AND (course = "algebra" OR courseTitle = ' +
                '"algebra") AND widgetTypes = "radio" ' +
                'AND widgetTypes = "image" AND widgetProps = ' +
                '"radio.multipleSelect=true" AND hasGraphie = false AND ' +
                "(hintCount >= 4)",
        );
    });

    it("escapes quotes in values", () => {
        // Arrange, Act
        const filter = filterExpression({
            includeUnlisted: true,
            lesson: 'say "hi"',
        });

        // Assert
        expect(filter).toBe(
            '(lesson = "say \\"hi\\"" OR lessonTitle = "say \\"hi\\"")',
        );
    });
});

describe("contentIdFilter", () => {
    it("matches any of the ids", () => {
        // Arrange, Act
        const filter = contentIdFilter(["a", "b"]);

        // Assert
        expect(filter).toBe('contentId IN ["a", "b"]');
    });
});

describe("toHit", () => {
    const document: HitFields = {
        contentId: "i1",
        kind: "item",
        title: ["First", "Second"],
        exerciseId: ["e1", "e2"],
        problemType: ["Type 1", "Shared"],
        url: ["/a", "/b"],
        course: ["c1", "c2", "c3", "c4", "c5"],
        widgetTypes: ["radio"],
        hintCount: 3,
        listed: true,
        firstLine: "**Add $2+3$.**",
        text: "The whole text",
    };

    it("shows the first exercise, and how many more it's in", () => {
        // Arrange, Act
        const hit = toHit(document, "snippet");

        // Assert
        expect(hit).toEqual({
            contentId: "i1",
            kind: "item",
            title: "First",
            exerciseId: "e1",
            problemType: "Type 1",
            alsoIn: 1,
            url: "/a",
            courses: ["c1", "c2", "c3"],
            moreCourses: 2,
            widgetTypes: ["radio"],
            hintCount: 3,
            listed: true,
            firstLine: "**Add $2+3$.**",
            snippet: "snippet",
        });
    });

    it.each([
        ["empty", ""],
        ["the whole text", "The whole text"],
    ])("leaves out a snippet that's %s", (_case, snippet) => {
        // Arrange, Act
        const hit = toHit(document, snippet);

        // Assert
        expect(hit).not.toHaveProperty("snippet");
    });
});

describe("searchedFields", () => {
    it("names the document fields to search, each once", () => {
        // Arrange, Act
        const fields = searchedFields(["titles", "question", "titles"]);

        // Assert
        expect(fields).toEqual(["title", "problemType", "text"]);
    });

    it("searches every field when none are named", () => {
        // Arrange, Act
        const fields = searchedFields(undefined);

        // Assert
        expect(fields).toBeUndefined();
    });
});

describe("topValues", () => {
    it("lists the most common values first, up to top", () => {
        // Arrange, Act
        const result = topValues({a: 1, b: 5, c: 5, d: 2}, 3);

        // Assert
        expect(result).toEqual({
            values: [
                {value: "b", count: 5},
                {value: "c", count: 5},
                {value: "d", count: 2},
            ],
            distinctValues: 4,
        });
    });
});
