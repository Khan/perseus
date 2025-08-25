import {extractWidgetIds} from "./extract-widget-ids";

describe("extractWidgetIds", () => {
    it("extracts single widget ID", () => {
        const content = "Here's a radio widget: [[☃ radio 1]]";
        const result = extractWidgetIds(content);
        expect(result).toEqual(["radio 1"]);
    });

    it("extracts multiple widget IDs in order", () => {
        const content = `
First widget: [[☃ radio 1]]
Second widget: [[☃ numeric-input 2]]
Third widget: [[☃ interactive-graph 3]]
        `;
        const result = extractWidgetIds(content);
        expect(result).toEqual(["radio 1", "numeric-input 2", "interactive-graph 3"]);
    });

    it("handles duplicate widget IDs (deduplication)", () => {
        const content = `
First occurrence: [[☃ radio 1]]
Second occurrence: [[☃ radio 1]]
Different widget: [[☃ numeric-input 2]]
        `;
        const result = extractWidgetIds(content);
        expect(result).toEqual(["radio 1", "numeric-input 2"]);
    });

    it("handles content with no widgets", () => {
        const content = "This is just plain text with no widgets.";
        const result = extractWidgetIds(content);
        expect(result).toEqual([]);
    });

    it("handles empty content", () => {
        const content = "";
        const result = extractWidgetIds(content);
        expect(result).toEqual([]);
    });

    it("handles widgets mixed with other markdown", () => {
        const content = `
# Heading

Some text with **bold** and *italic*.

[[☃ radio 1]]

More text and a list:
- Item 1
- Item 2

[[☃ numeric-input 2]]

Some math: $x + y = z$

[[☃ interactive-graph 3]]
        `;
        const result = extractWidgetIds(content);
        expect(result).toEqual(["radio 1", "numeric-input 2", "interactive-graph 3"]);
    });

    it("handles inline parsing option", () => {
        const content = "Inline widget: [[☃ radio 1]]";
        const result = extractWidgetIds(content, { inline: true });
        expect(result).toEqual(["radio 1"]);
    });

    it("handles isJipt option", () => {
        const content = "Widget with jipt: [[☃ radio 1]]";
        const result = extractWidgetIds(content, { isJipt: true });
        expect(result).toEqual(["radio 1"]);
    });

    it("handles complex widget IDs with spaces and numbers", () => {
        const content = `
[[☃ interactive-graph 1]]
[[☃ multiple-choice-widget 2]]
[[☃ numeric-input 10]]
        `;
        const result = extractWidgetIds(content);
        expect(result).toEqual([
            "interactive-graph 1",
            "multiple-choice-widget 2", 
            "numeric-input 10"
        ]);
    });

    it("preserves order even with duplicates", () => {
        const content = `
[[☃ widget-a 1]]
[[☃ widget-b 2]]
[[☃ widget-a 1]]
[[☃ widget-c 3]]
[[☃ widget-b 2]]
        `;
        const result = extractWidgetIds(content);
        // Should maintain order of first occurrence
        expect(result).toEqual(["widget-a 1", "widget-b 2", "widget-c 3"]);
    });
});