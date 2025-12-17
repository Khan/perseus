import {Dependencies} from "@khanacademy/perseus";
import {
    generateExpressionOptions,
    generateExpressionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {render} from "@testing-library/react";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../testing/test-dependencies";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import ArticleDiff from "../article-diff";

import type {PerseusArticle} from "@khanacademy/perseus-core";

describe("ArticleDiff", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("renders an image widget in the diff view", () => {
        // Arrange

        const beforeItem: PerseusArticle = [
            generateTestPerseusRenderer({
                content:
                    "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 1]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
                widgets: {
                    "expression 1": generateExpressionWidget({
                        options: generateExpressionOptions({
                            answerForms: [
                                {
                                    considered: "correct",
                                    form: true,
                                    simplify: false,
                                    value: "16+88i",
                                },
                            ],
                        }),
                    }),
                },
            }),
            generateTestPerseusRenderer({
                content:
                    "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 2]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
                widgets: {
                    "expression 2": generateExpressionWidget({
                        options: generateExpressionOptions({
                            answerForms: [
                                {
                                    considered: "correct",
                                    form: true,
                                    simplify: false,
                                    value: "16+88i",
                                },
                            ],
                        }),
                    }),
                },
            }),
            generateTestPerseusRenderer({
                content:
                    "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 3]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
                widgets: {
                    "expression 3": generateExpressionWidget({
                        options: generateExpressionOptions({
                            answerForms: [
                                {
                                    considered: "correct",
                                    form: true,
                                    simplify: false,
                                    value: "16+88i",
                                },
                            ],
                        }),
                    }),
                },
            }),
        ];

        const afterItem: PerseusArticle = [
            generateTestPerseusRenderer({
                content:
                    "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 1]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
                widgets: {
                    "expression 1": generateExpressionWidget({
                        options: generateExpressionOptions({
                            answerForms: [
                                {
                                    considered: "wrong",
                                    form: true,
                                    simplify: false,
                                    value: "16+88i",
                                },
                            ],
                        }),
                    }),
                },
            }),
            generateTestPerseusRenderer({
                content:
                    "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 2]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
                widgets: {
                    "expression 2": generateExpressionWidget({
                        options: generateExpressionOptions({
                            answerForms: [
                                {
                                    considered: "correct",
                                    form: false,
                                    simplify: false,
                                    value: "16+88i",
                                },
                            ],
                        }),
                    }),
                },
            }),
            generateTestPerseusRenderer({
                content:
                    "### Practice Problem\n\n$8\\cdot(11i+2)=$ [[☃ expression 3]]  \n*Your answer should be a complex number in the form $a+bi$ where $a$ and $b$ are real numbers.*",
                widgets: {
                    "expression 3": generateExpressionWidget({
                        options: generateExpressionOptions({
                            answerForms: [
                                {
                                    considered: "correct",
                                    form: true,
                                    simplify: false,
                                    value: "16+89i",
                                },
                            ],
                        }),
                    }),
                },
            }),
        ];

        // Act
        const {container} = render(
            <ArticleDiff
                before={beforeItem}
                after={afterItem}
                dependencies={testDependenciesV2}
            />,
        );

        // Assert
        expect(container).toMatchSnapshot();
    });
});
