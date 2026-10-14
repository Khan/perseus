import {traverse} from "./traversal";
import {generateBlankWidget} from "./utils/generators/blank-widget-generator";
import {
    generateAnswerTile,
    generateFillInTheBlankOptions,
    generateFillInTheBlankWidget,
} from "./utils/generators/fill-in-the-blank-widget-generator";
import {registerCoreWidgets} from "./widgets/core-widget-registry";

import type {PerseusRenderer} from "./data-schema";

const missingOptions = {
    content: "[[☃ radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
            type: "radio",
            graded: true,
            static: false,
            options: {
                numCorrect: 1,
                choices: [
                    {
                        content: "A",
                        correct: true,
                    },
                    {
                        correct: false,
                        content: "B",
                    },
                ],
            },
            version: {
                major: 0,
                minor: 0,
            },
            alignment: "default",
        },
    },
};

const clonedMissingOptions = JSON.parse(JSON.stringify(missingOptions));

const sampleOptions: PerseusRenderer = {
    content: "[[☃ mock-widget 1]]",
    images: {},
    widgets: {
        "mock-widget 1": {
            type: "mock-widget",
            graded: true,
            static: false,
            options: {
                value: "0",
            },
            version: {
                major: 0,
                minor: 0,
            },
            alignment: "default",
        },
    },
};

const clonedSampleOptions = JSON.parse(JSON.stringify(sampleOptions));

const sampleOptions2: PerseusRenderer = {
    content: "[[☃ radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
            type: "radio",
            graded: true,
            static: false,
            options: {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "A",
                        correct: true,
                    },
                    {
                        id: "1-1-1-1-1",
                        correct: false,
                        content: "B",
                    },
                ],
                randomize: false,
                multipleSelect: false,
                deselectEnabled: false,
                countChoices: false,
                numCorrect: 1,
            },
            version: {
                major: 0,
                minor: 0,
            },
            alignment: "default",
        },
    },
};

const clonedSampleOptions2 = JSON.parse(JSON.stringify(sampleOptions2));

const sampleGroup: PerseusRenderer = {
    content: "[[☃ group 1]]\n\n",
    images: {},
    widgets: {
        "group 1": {
            type: "group",
            graded: true,
            static: false,
            options: {
                content: sampleOptions2.content,
                images: {},
                widgets: sampleOptions2.widgets,
            },
            version: {
                major: 0,
                minor: 0,
            },
            alignment: "default",
        },
    },
};

const clonedSampleGroup = JSON.parse(JSON.stringify(sampleGroup));

const sampleFillInTheBlank: PerseusRenderer = {
    content: "[[☃ fill-in-the-blank 1]]\n\n",
    images: {},
    widgets: {
        "fill-in-the-blank 1": generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                content: "The [[☃ blank 1]] drum is a tall drum.",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: {displayType: "normal", correctId: "tile-1"},
                    }),
                },
                tiles: [
                    generateAnswerTile({
                        id: "tile-1",
                        content: "djembe",
                        label: "djembe",
                    }),
                ],
                maxUsesPerTile: 3,
                randomize: true,
            }),
        }),
    },
};

const clonedSampleFillInTheBlank = JSON.parse(
    JSON.stringify(sampleFillInTheBlank),
);

const assertNonMutative = () => {
    expect(missingOptions).toEqual(clonedMissingOptions);
    expect(sampleOptions).toEqual(clonedSampleOptions);
    expect(sampleOptions2).toEqual(clonedSampleOptions2);
    expect(sampleGroup).toEqual(clonedSampleGroup);
    expect(sampleFillInTheBlank).toEqual(clonedSampleFillInTheBlank);
};

describe("Traversal", () => {
    beforeAll(() => {
        registerCoreWidgets();
    });

    it("should call a root level content field", () => {
        let readContent = null;
        traverse(sampleOptions, (content) => {
            expect(readContent === null).toBeTruthy();
            readContent = content;
        });

        expect(readContent).toBe("[[☃ mock-widget 1]]");
        assertNonMutative();
    });

    it("should be able to modify root level content", () => {
        const newOptions = traverse(sampleOptions, (content) => {
            return "new content text";
        });
        expect(newOptions).toEqual({
            ...sampleOptions,
            content: "new content text",
        });
        assertNonMutative();
    });

    it("should have access to widgets", () => {
        const widgetMap: Record<string, any> = {};
        traverse(sampleOptions, null, (widgetInfo) => {
            widgetMap[widgetInfo.type] = (widgetMap[widgetInfo.type] || 0) + 1;
        });
        expect(widgetMap).toEqual({
            "mock-widget": 1,
        });
        assertNonMutative();
    });

    it("should be able to modify widgetInfo", () => {
        const newOptions = traverse(sampleOptions, null, (widgetInfo) => {
            return {
                ...widgetInfo,
                graded: false,
            };
        });
        expect(newOptions).toEqual({
            ...sampleOptions,
            widgets: {
                "mock-widget 1": {
                    ...sampleOptions.widgets["mock-widget 1"],
                    graded: false,
                },
            },
        });
        assertNonMutative();
    });

    it("should have access to modify full renderer options", () => {
        const newOptions = traverse(sampleOptions, null, null, (options) => {
            return {
                ...options,
                content: `${options.content}\n\nnew content!`,
            };
        });
        expect(newOptions.content).toBe("[[☃ mock-widget 1]]\n\nnew content!");
        expect(newOptions.widgets).toEqual(sampleOptions.widgets);
        assertNonMutative();
    });

    it("should be able to see group widgets", () => {
        const widgetMap: Record<string, any> = {};
        traverse(sampleGroup, null, (widgetInfo) => {
            widgetMap[widgetInfo.type] = (widgetMap[widgetInfo.type] || 0) + 1;
        });
        expect(widgetMap).toEqual({
            group: 1,
            radio: 1,
        });
        assertNonMutative();
    });

    it("visits the blank widgets nested inside a fill-in-the-blank", () => {
        const widgetMap: Record<string, any> = {};

        traverse(sampleFillInTheBlank, null, (widgetInfo) => {
            widgetMap[widgetInfo.type] = (widgetMap[widgetInfo.type] || 0) + 1;
        });

        expect(widgetMap).toEqual({
            "fill-in-the-blank": 1,
            blank: 1,
        });
        assertNonMutative();
    });

    it("modifies the content inside a fill-in-the-blank", () => {
        const newOptions = traverse(sampleFillInTheBlank, (content) =>
            content.replace("tall", "short"),
        );

        expect(newOptions.widgets["fill-in-the-blank 1"].options.content).toBe(
            "The [[☃ blank 1]] drum is a short drum.",
        );
        assertNonMutative();
    });

    it("preserves a fill-in-the-blank's non-renderer options", () => {
        const newOptions = traverse(sampleFillInTheBlank, (content) => content);

        expect(newOptions.widgets["fill-in-the-blank 1"].options).toMatchObject(
            {
                tiles: [{id: "tile-1", content: "djembe", label: "djembe"}],
                maxUsesPerTile: 3,
                randomize: true,
            },
        );
        assertNonMutative();
    });

    it("should ignore widgets without a type", () => {
        const optionsWithEmptyWidget = {
            content: "[[☃ no-type-widget 1]]",
            images: {},
            widgets: {
                "no-type-widget 1": {},
            },
        };

        const newOptions = traverse(
            optionsWithEmptyWidget,
            (content) => content,
        );
        expect(newOptions).toEqual(optionsWithEmptyWidget);
    });
});
