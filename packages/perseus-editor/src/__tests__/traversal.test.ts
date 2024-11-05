import {traverse, Widgets} from "@khanacademy/perseus";
import _ from "underscore";

import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

const missingOptions = {
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
} as const;

const clonedMissingOptions = JSON.parse(JSON.stringify(missingOptions));

const sampleOptions = {
    content: "[[☃ numeric-input 1]]",
    images: {},
    widgets: {
        "numeric-input 1": {
            type: "numeric-input",
            graded: true,
            options: {
                answers: [
                    {
                        value: 0,
                        status: "correct",
                        message: "",
                        simplify: "required",
                        strict: true,
                        maxError: 0.1,
                    },
                ],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            },
            static: false,
            version: {
                major: 1,
                minor: 0,
            },
            alignment: "default",
        },
    },
} as const;

const clonedSampleOptions = JSON.parse(JSON.stringify(sampleOptions));

const sampleOptions2 = {
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
                        content: "A",
                        correct: true,
                    },
                    {
                        correct: false,
                        content: "B",
                    },
                ],
                randomize: false,
                multipleSelect: false,
                displayCount: null,
                noneOfTheAbove: false,
                deselectEnabled: false,
                countChoices: false,
            },
            version: {
                major: 0,
                minor: 0,
            },
            alignment: "default",
        },
    },
} as const;

const clonedSampleOptions2 = JSON.parse(JSON.stringify(sampleOptions2));

const sampleOptions2Upgraded = {
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
                        content: "A",
                        correct: true,
                    },
                    {
                        correct: false,
                        content: "B",
                    },
                ],
                randomize: false,
                multipleSelect: false,
                displayCount: null,
                hasNoneOfTheAbove: false,
                deselectEnabled: false,
                countChoices: false,
            },
            version: {
                major: 1,
                minor: 0,
            },
            alignment: "default",
        },
    },
} as const;

const sampleGroup = {
    content: "[[☃ group 1]]\n\n",
    images: {},
    widgets: {
        "group 1": {
            type: "group",
            graded: true,
            static: false,
            options: {
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
                                    content: "A",
                                    correct: true,
                                },
                                {
                                    correct: false,
                                    content: "B",
                                },
                            ],
                            randomize: false,
                            multipleSelect: false,
                            displayCount: null,
                            noneOfTheAbove: false,
                            deselectEnabled: false,
                            countChoices: false,
                        },
                        version: {
                            major: 0,
                            minor: 0,
                        },
                        alignment: "default",
                    },
                },
            },
            version: {
                major: 0,
                minor: 0,
            },
            alignment: "default",
        },
    },
} as const;

const sampleGroupUpgraded = {
    content: "[[☃ group 1]]\n\n",
    images: {},
    widgets: {
        "group 1": {
            type: "group",
            graded: true,
            static: false,
            options: {
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
                                    content: "A",
                                    correct: true,
                                },
                                {
                                    correct: false,
                                    content: "B",
                                },
                            ],
                            randomize: false,
                            multipleSelect: false,
                            displayCount: null,
                            hasNoneOfTheAbove: false,
                            deselectEnabled: false,
                            countChoices: false,
                        },
                        version: {
                            major: 1,
                            minor: 0,
                        },
                        alignment: "default",
                    },
                },
                metadata: undefined,
            },
            version: {
                major: 0,
                minor: 0,
            },
            alignment: "default",
        },
    },
} as const;

const clonedSampleGroup = JSON.parse(JSON.stringify(sampleGroup));

const assertNonMutative = () => {
    expect(missingOptions).toEqual(clonedMissingOptions);
    expect(sampleOptions).toEqual(clonedSampleOptions);
    expect(sampleOptions2).toEqual(clonedSampleOptions2);
    expect(sampleGroup).toEqual(clonedSampleGroup);
};

describe("Traversal", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    it("should call a root level content field", () => {
        let readContent = null;
        traverse(sampleOptions, (content) => {
            expect(readContent === null).toBeTruthy();
            readContent = content;
        });

        expect(readContent).toBe("[[☃ numeric-input 1]]");
        assertNonMutative();
    });

    it("should be able to modify root level content", () => {
        const newOptions = traverse(sampleOptions, (content) => {
            return "new content text";
        });
        expect(newOptions).toEqual(
            _.extend({}, sampleOptions, {
                content: "new content text",
            }),
        );
        assertNonMutative();
    });

    it("should have access to widgets", () => {
        const widgetMap: Record<string, any> = {};
        traverse(sampleOptions, null, (widgetInfo) => {
            widgetMap[widgetInfo.type] = (widgetMap[widgetInfo.type] || 0) + 1;
        });
        expect(widgetMap).toEqual({
            "numeric-input": 1,
        });
        assertNonMutative();
    });

    it("should be able to modify widgetInfo", () => {
        const newOptions = traverse(sampleOptions, null, (widgetInfo) => {
            return _.extend({}, widgetInfo, {
                graded: false,
            });
        });
        expect(newOptions).toEqual(
            _.extend({}, sampleOptions, {
                widgets: {
                    "numeric-input 1": _.extend(
                        {},
                        sampleOptions.widgets["numeric-input 1"],
                        {graded: false},
                    ),
                },
            }),
        );
        assertNonMutative();
    });

    it("should have access to modify full renderer options", () => {
        const newOptions = traverse(sampleOptions, null, null, (options) => {
            return _.extend({}, options, {
                content: `${options.content}\n\nnew content!`,
            });
        });
        expect(newOptions.content).toBe(
            "[[☃ numeric-input 1]]\n\nnew content!",
        );
        expect(newOptions.widgets).toEqual(sampleOptions.widgets);
        assertNonMutative();
    });

    it("should upgrade widgets automagickally", () => {
        const newOptions = traverse(sampleOptions2);
        expect(newOptions).toEqual(sampleOptions2Upgraded);
        assertNonMutative();
    });

    it("should use defaults for missing options when upgrading widgets", () => {
        const newOptions = traverse(missingOptions);
        expect(newOptions).toEqual(sampleOptions2Upgraded);
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

    it("should see upgraded widgets inside groups", () => {
        let sawRadio = false;
        traverse(sampleGroup, null, (widgetInfo) => {
            if (widgetInfo.type === "radio") {
                expect(widgetInfo.version).toEqual(Widgets.getVersion("radio"));
                sawRadio = true;
            }
        });
        expect(sawRadio).toBe(true);
        assertNonMutative();
    });

    it("should upgrade widgets in groups automagickally", () => {
        const newGroup = traverse(sampleGroup);
        expect(newGroup).toEqual(sampleGroupUpgraded);
        assertNonMutative();
    });

    it("should modify full renderer options inside of groups", () => {
        const newOptions = traverse(sampleGroup, null, null, (options) => {
            if (/radio/.test(options.content)) {
                return _.extend({}, options, {
                    content: "Extra instructions\n\n" + options.content,
                });
            }
            return undefined;
        });
        const newContent = newOptions.widgets["group 1"].options.content;
        expect(/^Extra instructions/.test(newContent)).toBeTruthy();
        expect(newOptions.widgets["group 1"].options.widgets).toEqual(
            sampleGroupUpgraded.widgets["group 1"].options.widgets,
        );
        assertNonMutative();
    });
});
