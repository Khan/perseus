import {
    getMovedChoices,
    setMarkdownContentFromImageProxy,
    setImageProxyFromMarkdownContent,
    getOtherSideLengthWithPreservedAspectRatio,
} from "./utils";

const choices = [
    {id: "0-0-0-0-0", content: "Choice 1"},
    {id: "3-3-3-3-3", content: "Choice 2"},
    {id: "4-4-4-4-4", content: "Choice 3"},
    {id: "5-5-5-5-5", content: "Choice 4"},
];

const choicesWithNoneOfTheAbove = [
    {id: "0-0-0-0-0", content: "Choice 1"},
    {
        id: "3-3-3-3-3",
        content: "Choice 2",
    },
    {id: "4-4-4-4-4", content: "Choice 3"},
    {
        id: "5-5-5-5-5",
        content: "None of the above",
        isNoneOfTheAbove: true,
    },
];

describe("getMovedChoices", () => {
    it("should move the choice to the top", () => {
        // Move choice 4 to the top
        const result = getMovedChoices(choices, false, 3, "top");
        expect(result).toEqual([
            choices[3],
            choices[0],
            choices[1],
            choices[2],
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
            choices[0],
            choices[2],
            choices[1],
            choices[3],
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
            choices[0],
            choices[2],
            choices[1],
            choices[3],
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
            choices[1],
            choices[2],
            choices[3],
            choices[0],
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
            choicesWithNoneOfTheAbove[1],
            choicesWithNoneOfTheAbove[2],
            choicesWithNoneOfTheAbove[0],
            choicesWithNoneOfTheAbove[3],
        ]);
    });
});

describe("setproxiedContentAndImages", () => {
    it("should replace images with proxies", () => {
        const originalContent = "![moon and earth](earthmoon.jpg)";
        const proxiedContent = "![Image 1]";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "moon and earth",
            },
        ];

        const [result, resultImages] =
            setImageProxyFromMarkdownContent(originalContent);
        expect(result).toEqual(proxiedContent);
        expect(resultImages).toEqual(images);
    });

    it("should replace multiple images with proxies", () => {
        const originalContent =
            "foo ![earth and moon](earthmoon.jpg) bar ![catching a tennis ball](tennisball.png) baz";
        const proxiedContent = "foo ![Image 1] bar ![Image 2] baz";
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

        const [result, resultImages] =
            setImageProxyFromMarkdownContent(originalContent);
        expect(result).toEqual(proxiedContent);
        expect(resultImages).toEqual(images);
    });

    it("should not replace non-image links", () => {
        // Note the lack of `!` in front of the link syntax.
        const originalContent = "[ABCD](earthmoon.jpg)";
        const images = [];

        const [result, resultImages] =
            setImageProxyFromMarkdownContent(originalContent);
        expect(result).toEqual(originalContent);
        expect(resultImages).toEqual(images);
    });

    it("should not get messed up by nested brackets", () => {
        // Alt text contains brackets
        const originalContent = "![ABCD[]](earthmoon.jpg)";
        const proxiedContent = "![Image 1]";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "ABCD[]",
            },
        ];

        const [result, resultImages] =
            setImageProxyFromMarkdownContent(originalContent);
        expect(result).toEqual(proxiedContent);
        expect(resultImages).toEqual(images);
    });
});

describe("setContentFromproxiedContentAndImages", () => {
    it("should replace images with proxies", () => {
        const proxiedContent = "![Image 1]";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "moon and earth",
            },
        ];
        const expectedContent = "![moon and earth](earthmoon.jpg)";

        const result = setMarkdownContentFromImageProxy(proxiedContent, images);
        expect(result).toEqual(expectedContent);
    });

    it("should replace multiple images with proxies", () => {
        const proxiedContent = "foo ![Image 1] bar ![Image 2] baz";
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

        const result = setMarkdownContentFromImageProxy(proxiedContent, images);
        expect(result).toEqual(expectedContent);
    });

    it("should work with nested brackets", () => {
        const proxiedContent = "![Image 1]";
        const images = [
            {
                url: "earthmoon.jpg",
                altText: "ABCD[]",
            },
        ];
        const expectedContent = "![ABCD[]](earthmoon.jpg)";

        const result = setMarkdownContentFromImageProxy(proxiedContent, images);
        expect(result).toEqual(expectedContent);
    });
});

describe("getOtherSideLengthWithPreservedAspectRatio", () => {
    it.each`
        sideLength | otherSideLength | newSideLength | expectedResult
        ${100}     | ${200}          | ${300}        | ${600}
        ${200}     | ${100}          | ${300}        | ${150}
        ${200}     | ${100}          | ${400}        | ${200}
        ${-100}    | ${200}          | ${300}        | ${-600}
        ${-100}    | ${200}          | ${-300}       | ${600}
        ${-100}    | ${-200}         | ${-300}       | ${-600}
        ${1.5}     | ${3}            | ${300}        | ${600}
        ${1.5}     | ${3}            | ${4.5}        | ${9}
        ${0}       | ${0}            | ${0}          | ${NaN}
        ${0}       | ${200}          | ${300}        | ${NaN}
        ${200}     | ${0}            | ${300}        | ${NaN}
        ${100}     | ${200}          | ${0}          | ${NaN}
    `(
        "should return the other side length with preserved aspect ratio",
        ({sideLength, otherSideLength, newSideLength, expectedResult}) => {
            const result = getOtherSideLengthWithPreservedAspectRatio(
                sideLength,
                otherSideLength,
                newSideLength,
            );
            expect(result).toEqual(expectedResult);
        },
    );
});
