import {
    getMovedChoices,
    setContentFromNiceContentAndImages,
    setNiceContentAndImages,
} from "./utils";

const choices = [
    {content: "Choice 1"},
    {content: "Choice 2"},
    {content: "Choice 3"},
    {content: "Choice 4"},
];

const choicesWithNoneOfTheAbove = [
    {content: "Choice 1"},
    {content: "Choice 2"},
    {content: "Choice 3"},
    {content: "Choice 4", isNoneOfTheAbove: true},
];

describe("getMovedChoices", () => {
    it("should move the choice to the top", () => {
        // Move choice 4 to the top
        const result = getMovedChoices(choices, false, 3, "top");
        expect(result).toEqual([
            {content: "Choice 4"},
            {content: "Choice 1"},
            {content: "Choice 2"},
            {content: "Choice 3"},
        ]);
    });

    it("should return original choices if the choice is already at the top", () => {
        // Move choice 1 to the top
        const result = getMovedChoices(choices, false, 0, "top");
        expect(result).toEqual(choices);
    });

    it("should move the choice up", () => {
        // Move choice 3 up
        const result = getMovedChoices(choices, false, 2, "up");
        expect(result).toEqual([
            {content: "Choice 1"},
            {content: "Choice 3"},
            {content: "Choice 2"},
            {content: "Choice 4"},
        ]);
    });

    it("should return original choices if the choice is already at the top", () => {
        // Move choice 1 up
        const result = getMovedChoices(choices, false, 0, "up");
        expect(result).toEqual(choices);
    });

    it("should move the choice down", () => {
        // Move choice 2 down
        const result = getMovedChoices(choices, false, 1, "down");
        expect(result).toEqual([
            {content: "Choice 1"},
            {content: "Choice 3"},
            {content: "Choice 2"},
            {content: "Choice 4"},
        ]);
    });

    it("should return original choices if the choice is already at the bottom", () => {
        // Move choice 4 down
        const result = getMovedChoices(choices, false, 3, "down");
        expect(result).toEqual(choices);
    });

    it("should return original choices if the choice is last before 'None of the above' choice", () => {
        // Move choice 3 down
        const result = getMovedChoices(
            choicesWithNoneOfTheAbove,
            true,
            2,
            "down",
        );
        expect(result).toEqual(choicesWithNoneOfTheAbove);
    });

    it("should move the choice to the bottom", () => {
        // Move choice 1 to the bottom
        const result = getMovedChoices(choices, false, 0, "bottom");
        expect(result).toEqual([
            {content: "Choice 2"},
            {content: "Choice 3"},
            {content: "Choice 4"},
            {content: "Choice 1"},
        ]);
    });

    it("should return original choices if the choice is already at the bottom", () => {
        // Move choice 4 to the bottom
        const result = getMovedChoices(choices, false, 3, "bottom");
        expect(result).toEqual(choices);
    });

    it("should move choice to last choice before 'None of the above'", () => {
        // Move choice 1 to bottom (last choice before 'None of the above')
        const result = getMovedChoices(
            choicesWithNoneOfTheAbove,
            true,
            0,
            "bottom",
        );
        expect(result).toEqual([
            {content: "Choice 2"},
            {content: "Choice 3"},
            {content: "Choice 1"},
            {content: "Choice 4", isNoneOfTheAbove: true},
        ]);
    });
});

describe("setNiceContentAndImages", () => {
    it("should replace images with nice placeholders", () => {
        const originalContent = "![moon and earth](earthmoon.jpg)";
        const niceContent = "![Image 1]";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "moon and earth",
            },
        ];

        const [result, resultImages] = setNiceContentAndImages(originalContent);
        expect(result).toEqual(niceContent);
        expect(resultImages).toEqual(images);
    });

    it("should replace multiple images with nice placeholders", () => {
        const originalContent =
            "foo ![earth and moon](earthmoon.jpg) bar ![catching a tennis ball](tennisball.png) baz";
        const niceContent = "foo ![Image 1] bar ![Image 2] baz";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "earth and moon",
            },
            {
                url: "tennisball.png",
                altText: "catching a tennis ball",
            },
        ];

        const [result, resultImages] = setNiceContentAndImages(originalContent);
        expect(result).toEqual(niceContent);
        expect(resultImages).toEqual(images);
    });

    it("should not replace non-image links", () => {
        // Note the lack of `!` in front of the link syntax.
        const originalContent = "[ABCD](earthmoon.jpg)";
        const images = [];

        const [result, resultImages] = setNiceContentAndImages(originalContent);
        expect(result).toEqual(originalContent);
        expect(resultImages).toEqual(images);
    });

    it("should not get messed up by nested brackets", () => {
        // Alt text contains brackets
        const originalContent = "![ABCD[]](earthmoon.jpg)";
        const niceContent = "![Image 1]";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "ABCD[]",
            },
        ];

        const [result, resultImages] = setNiceContentAndImages(originalContent);
        expect(result).toEqual(niceContent);
        expect(resultImages).toEqual(images);
    });
});

describe("setContentFromNiceContentAndImages", () => {
    it("should replace images with nice placeholders", () => {
        const niceContent = "![Image 1]";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "moon and earth",
            },
        ];
        const expectedContent = "![moon and earth](earthmoon.jpg)";

        const result = setContentFromNiceContentAndImages(niceContent, images);
        expect(result).toEqual(expectedContent);
    });

    it("should replace multiple images with nice placeholders", () => {
        const niceContent = "foo ![Image 1] bar ![Image 2] baz";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "moon and earth",
            },
            {
                url: "tennisball.png",
                altText: "catching a tennis ball",
            },
        ];
        const expectedContent =
            "foo ![moon and earth](earthmoon.jpg) bar ![catching a tennis ball](tennisball.png) baz";

        const result = setContentFromNiceContentAndImages(niceContent, images);
        expect(result).toEqual(expectedContent);
    });

    it("should work with nested brackets", () => {
        const niceContent = "![Image 1]";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "ABCD[]",
            },
        ];
        const expectedContent = "![ABCD[]](earthmoon.jpg)";

        const result = setContentFromNiceContentAndImages(niceContent, images);
        expect(result).toEqual(expectedContent);
    });
});
