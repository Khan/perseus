import {describe, it} from "@jest/globals";
import * as PerseusLinter from "@khanacademy/perseus-linter";

import PerseusMarkdown from "../perseus-markdown";

const {parse, basicOutput, characterCount} = PerseusMarkdown;

describe("perseus markdown", () => {
    describe("parser", () => {
        it.each([
            {
                content: "math $y = x + 1$",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "text", content: "math "},
                            {type: "math", content: "y = x + 1"},
                        ],
                    },
                ],
            },
            {
                content: "hi $y = x + 1$ there",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "text", content: "hi "},
                            {type: "math", content: "y = x + 1"},
                            {type: "text", content: " there"},
                        ],
                    },
                ],
            },
        ])("should parse math", ({content, expected}) => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);

            // Assert
            expect(parsed).toEqual(expected);
        });

        it.each([
            {
                content: "math $y = \\text{$x + 1$}$",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "text", content: "math "},
                            {type: "math", content: "y = \\text{$x + 1$}"},
                        ],
                    },
                ],
            },
            {
                content:
                    "math $ x^2 \\text{blah $math \\text{some $more math$} $ } $",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "text", content: "math "},
                            {
                                type: "math",
                                content:
                                    " x^2 \\text{blah $math " +
                                    "\\text{some $more math$} $ } ",
                            },
                        ],
                    },
                ],
            },
        ])("should parse nested math", ({content, expected}) => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);

            // Assert
            expect(parsed).toEqual(expected);
        });

        it.each([
            {
                content: "math $\\\\$",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "text", content: "math "},
                            {type: "math", content: "\\\\"},
                        ],
                    },
                ],
            },
            {
                content: "math $\\$$",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "text", content: "math "},
                            {type: "math", content: "\\$"},
                        ],
                    },
                ],
            },
            {
                content: "${$",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "unescapedDollar"},
                            {type: "text", content: "{"},
                            {type: "unescapedDollar"},
                        ],
                    },
                ],
            },
            {
                content: "math $\\{$",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "text", content: "math "},
                            {type: "math", content: "\\{"},
                        ],
                    },
                ],
            },
            {
                content: "hello $ escaped dollar \\$ $ not math",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "text", content: "hello "},
                            {type: "math", content: " escaped dollar \\$ "},
                            {type: "text", content: " not math"},
                        ],
                    },
                ],
            },
            {
                content: "$math$ not math $ oops extra dollar",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {content: "math", type: "math"},
                            {content: " not math ", type: "text"},
                            {type: "unescapedDollar"},
                            {content: " oops extra dollar", type: "text"},
                        ],
                    },
                ],
            },
        ])("should allow escaping in math", ({content, expected}) => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);

            // Assert
            expect(parsed).toEqual(expected);
        });

        it.each([
            {
                content: "$x + y = 7$",
                expected: [
                    {
                        type: "blockMath",
                        content: "x + y = 7",
                    },
                ],
            },
            {
                content: "$x + y = 7$\nnot math",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "math", content: "x + y = 7"},
                            {type: "text", content: "\nnot math"},
                        ],
                    },
                ],
            },
            {
                content: "  $x + y = 7$  \n\n    \n$3 + 5 = 7$",
                expected: [
                    {
                        type: "blockMath",
                        content: "x + y = 7",
                    },
                    {
                        type: "blockMath",
                        content: "3 + 5 = 7",
                    },
                ],
            },
            {
                content: "    $x + y = 7$",
                expected: [
                    {
                        type: "codeBlock",
                        content: "$x + y = 7$",
                        lang: undefined,
                    },
                ],
            },
            {
                content: "> $x + y = 7$",
                expected: [
                    {
                        type: "blockQuote",
                        content: [
                            {
                                type: "blockMath",
                                content: "x + y = 7",
                            },
                        ],
                    },
                ],
            },
        ])("should parse block math", ({content, expected}) => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);

            // Assert
            expect(parsed).toEqual(expected);
        });

        it.each([
            {
                content: "hello $ single dollar paragraph\n\n not math $",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {content: "hello ", type: "text"},
                            {type: "unescapedDollar"},
                            {content: " single dollar paragraph", type: "text"},
                        ],
                    },
                    {
                        type: "paragraph",
                        content: [
                            {content: " not math ", type: "text"},
                            {type: "unescapedDollar"},
                        ],
                    },
                ],
            },
            {
                content: "hello $ bad { math $",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {content: "hello ", type: "text"},
                            {type: "unescapedDollar"},
                            {content: " bad ", type: "text"},
                            {content: "{ math ", type: "text"},
                            {type: "unescapedDollar"},
                        ],
                    },
                ],
            },
        ])("should break on paragraphs", ({content, expected}) => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);

            // Assert
            expect(parsed).toEqual(expected);
        });

        it.each([
            {
                content: "[[☃ test 1]]",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "widget",
                                widgetType: "test",
                                id: "test 1",
                            },
                        ],
                    },
                ],
            },
            {
                content: "[[☃ test 1]]+[[☃ mock-widget 2]]",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "widget",
                                widgetType: "test",
                                id: "test 1",
                            },
                            {
                                type: "text",
                                content: "+",
                            },
                            {
                                type: "widget",
                                widgetType: "mock-widget",
                                id: "mock-widget 2",
                            },
                        ],
                    },
                ],
            },
            {
                content: "*[[☃ test 2]]* [[☃ mock-widget 1]]",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "em",
                                content: [
                                    {
                                        type: "widget",
                                        widgetType: "test",
                                        id: "test 2",
                                    },
                                ],
                            },
                            {
                                type: "text",
                                content: " ",
                            },
                            {
                                type: "widget",
                                widgetType: "mock-widget",
                                id: "mock-widget 1",
                            },
                        ],
                    },
                ],
            },
        ])("should parse widget types and ids", ({content, expected}) => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);

            // Assert
            expect(parsed).toEqual(expected);
        });

        it("should allow escaping widget identifiers", () => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse("\\[[☃ test 1]]");

            // Assert
            expect(parsed).toEqual([
                {
                    type: "paragraph",
                    content: [
                        {content: "[", type: "text"},
                        {content: "[☃ test 1", type: "text"},
                        {content: "]", type: "text"},
                        {content: "]", type: "text"},
                    ],
                },
            ]);
        });

        it.each([
            {
                content: "[[☃ test 1]][[☃ test 2]]",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "widget", widgetType: "test", id: "test 1"},
                            {type: "widget", widgetType: "test", id: "test 2"},
                        ],
                    },
                ],
            },
            {
                content: "[[☃ test 1]] [[☃ test 2]]",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {type: "widget", widgetType: "test", id: "test 1"},
                            {type: "text", content: " "},
                            {type: "widget", widgetType: "test", id: "test 2"},
                        ],
                    },
                ],
            },
        ])(
            "should parse widgets next to each other as widgets",
            ({content, expected}) => {
                // Arrange, Act
                // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
                const parsed = parse(content);

                // Assert
                expect(parsed).toEqual(expected);
            },
        );

        it("should parse multiple columns", () => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse("hi\n\n" + "=====\n\n" + "there\n\n");

            // Assert
            expect(parsed).toEqual([
                {
                    type: "columns",
                    col1: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    content: "hi",
                                },
                            ],
                        },
                    ],
                    col2: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    content: "there",
                                },
                            ],
                        },
                    ],
                },
            ]);
        });

        it.each([
            {
                content: "$",
                expected: [
                    {
                        type: "paragraph",
                        content: [{type: "unescapedDollar"}],
                    },
                ],
            },
            {
                content: "hello $ single dollar",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {content: "hello ", type: "text"},
                            {type: "unescapedDollar"},
                            {content: " single dollar", type: "text"},
                        ],
                    },
                ],
            },
        ])("should detect unescaped dollars", ({content, expected}) => {
            // Arrange, Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);

            // Assert
            expect(parsed).toEqual(expected);
        });

        it("should parse titled table with unescaped dollars", () => {
            // Arrange
            const content =
                "|| **Table title** ||\n" +
                "header 1 | header 2 | header 3\n" +
                "- | - | -\n" +
                "data 1 | data 2 | data 3\n" +
                "data 4 | $data 5 | data 6\n" +
                "data 7 | data 8 | data 9";

            // Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);

            // Assert
            expect(parsed).toMatchSnapshot();
        });
    });

    describe("parser with linter", () => {
        it("should lint unescaped dollars in titled table", () => {
            // Arrange
            const content =
                "|| **Table title** ||\n" +
                "header 1 | header 2 | header 3\n" +
                "- | - | -\n" +
                "data 1 | data 2 | data 3\n" +
                "data 4 | $data 5 | data 6\n" +
                "data 7 | data 8 | data 9";
            const context = {
                ...PerseusLinter.linterContextDefault,
                content,
                widgets: {},
            } as const;

            // Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsedWithLint = parse(content);
            PerseusLinter.runLinter(parsedWithLint, context, true);

            // Assert
            expect(parsedWithLint).toMatchSnapshot();
        });
    });

    describe("output", () => {
        it("should output paragraphs", () => {
            // Arrange
            const content = "para!";

            // Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);
            const output = basicOutput(parsed);

            // Assert
            expect(output).toMatchSnapshot();
        });

        it("should output columns", () => {
            // Arrange
            const content = "col1\n\n" + "=====\n\n" + "col2";

            // Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);
            const output = basicOutput(parsed);

            // Assert
            expect(output).toMatchSnapshot();
        });

        it("should render ```alt screenreader blocks", () => {
            // Arrange
            const content = "```alt\n" + "screenreader-only text!\n" + "```";

            // Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);
            const output = basicOutput(parsed);

            // Assert
            expect(output).toMatchSnapshot();
        });

        it("should output titled table with unescaped dollars", () => {
            // Arrange
            const content =
                "|| **Table title** ||\n" +
                "header 1 | header 2 | header 3\n" +
                "- | - | -\n" +
                "data 1 | data 2 | data 3\n" +
                "data 4 | $data 5 | data 6\n" +
                "data 7 | data 8 | data 9";

            // Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parse(content);
            const output = basicOutput(parsed);

            // Assert
            expect(output).toMatchSnapshot();
        });
    });

    describe("output with linter", () => {
        it("should output titled table with unescaped dollars in lint", () => {
            // Arrange
            const content =
                "|| **Table title** ||\n" +
                "header 1 | header 2 | header 3\n" +
                "- | - | -\n" +
                "data 1 | data 2 | data 3\n" +
                "data 4 | $data 5 | data 6\n" +
                "data 7 | data 8 | data 9";
            const context = {
                ...PerseusLinter.linterContextDefault,
                content,
                widgets: {},
            } as const;

            // Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsedWithLint = parse(content);
            PerseusLinter.runLinter(parsedWithLint, context, true);

            const output = PerseusMarkdown.basicOutput(parsedWithLint);

            // Assert
            expect(output).toMatchSnapshot();
        });
    });

    describe("characterCount", () => {
        it.each([
            ["", 0],
            ["-------", 0],
            ["  foo bar baz", 11],
            ["- foo bar baz", 11],
            ["# foo bar baz", 11],
            [
                "header 1 | header 2\n" +
                    "- | -\n" +
                    "data 1 | data 2\n" +
                    "data 3 | data 4",
                40,
            ],
            ["  ☃ test 1  ", 8],
            ["[[☃ test 1]]", 0],
            [" 1234 ", 4],
            ["$1234$", 4],
        ])(
            "should ignore Markdown and widgets but count TeX",
            (content, expected) => {
                // Arrange, Act
                const count = characterCount(content);

                // Assert
                expect(count).toEqual(expected);
            },
        );

        it.each([
            ["a s  d   f    ", 7],
            ["    " + "a s  d   f    ", 14],
            [" 1  2  3 ", 5],
            ["`1  2  3`", 7],
            ["123   4 5  6 7   890", 15],
            ["123  `4 5  6 7`  890", 16],
        ])(
            "should only count multiple sequential spaces within code",
            (content, expected) => {
                // Arrange, Act
                const count = characterCount(content);

                // Assert
                expect(count).toEqual(expected);
            },
        );

        it.each([
            ["foo to the bar", 14],
            ["foo *to the* bar", 14],
            ["foo $to the$ bar", 14],
        ])(
            "should count spaces between inline elements",
            (content, expected) => {
                // Arrange, Act
                const count = characterCount(content);

                // Assert
                expect(count).toEqual(expected);
            },
        );

        it.each([
            ["foo\n\nbar", 6],
            [" foo \n\n bar ", 6],
            ["foo\n\n[[☃ test 1]]\n\nbar", 6],
            [" foo \n\n [[☃ test 1]] \n\n bar ", 6],
        ])(
            "should not count spaces between block elements",
            (content, expected) => {
                // Arrange, Act
                const count = characterCount(content);

                // Assert
                expect(count).toEqual(expected);
            },
        );
    });
});
