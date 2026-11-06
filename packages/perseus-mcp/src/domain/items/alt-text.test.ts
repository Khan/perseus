import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {altTextIssues} from "./alt-text";

function withImage(alt: string, longDescription = "", decorative = false) {
    return generateTestPerseusRenderer({
        content: "[[☃ image 1]]",
        widgets: {
            "image 1": generateImageWidget({
                options: generateImageOptions({
                    alt,
                    longDescription,
                    decorative,
                }),
            }),
        },
    });
}

function codes(renderer: ReturnType<typeof withImage>) {
    return altTextIssues(renderer, "question").map((issue) => issue.code);
}

describe("altTextIssues", () => {
    it.each([
        ["an em dash", "A line — rising to the right"],
        ["an en dash", "Points 1–3 on a line"],
        ["a spaced hyphen", "A line - rising to the right"],
        ["two hyphens", "A line -- rising"],
    ])("flags alt text with %s", (_kind, alt) => {
        // Arrange, Act
        const found = codes(withImage(alt));

        // Assert
        expect(found).toEqual(["alt-text-dash"]);
    });

    it("leaves hyphens inside words alone", () => {
        // Arrange, Act
        const found = codes(withImage("A two-digit number line from 0 to 99"));

        // Assert
        expect(found).toEqual([]);
    });

    it("flags x-axis in alt text and in long descriptions", () => {
        // Arrange, Act
        const issues = altTextIssues(
            withImage(
                "A line crossing the x-axis",
                "It meets the y-axis at 2.",
            ),
            "question",
        );

        // Assert
        expect(issues.map((i) => [i.code, i.path])).toEqual([
            ["alt-text-axis-hyphen", 'question.widgets["image 1"].options.alt'],
            [
                "alt-text-axis-hyphen",
                'question.widgets["image 1"].options.longDescription',
            ],
        ]);
    });

    it.each([
        "The diagram shows a right triangle",
        "An image of 5 red marbles and 4 green marbles",
    ])("flags an opening that says it's an image: %s", (alt) => {
        // Arrange, Act
        const found = codes(withImage(alt));

        // Assert
        expect(found).toEqual(["alt-text-opening"]);
    });

    it("doesn't check dashes in long descriptions, which use - for lists", () => {
        // Arrange, Act
        const found = codes(
            withImage("A bar chart", "Bars:\n- red - 3\n- blue - 5"),
        );

        // Assert
        expect(found).toEqual([]);
    });

    it("skips decorative images", () => {
        // Arrange, Act
        const found = codes(withImage("The image shows — a sun", "", true));

        // Assert
        expect(found).toEqual([]);
    });

    it("checks the alt text of Markdown images", () => {
        // Arrange
        const renderer = generateTestPerseusRenderer({
            content: "![The picture shows a cat](https://example.com/cat.png)",
        });

        // Act
        const found = altTextIssues(renderer, "hints[0]");

        // Assert
        expect(found).toEqual([
            expect.objectContaining({
                code: "alt-text-opening",
                path: "hints[0].content",
            }),
        ]);
    });
});
