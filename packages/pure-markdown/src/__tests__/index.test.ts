import {describe, it} from "@jest/globals";

import {parse} from "../index";

describe("pure markdown", () => {
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
                content: "[[☃ test 1]]+[[☃ input-number 2]]",
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
                                widgetType: "input-number",
                                id: "input-number 2",
                            },
                        ],
                    },
                ],
            },
            {
                content: "*[[☃ test 2]]* [[☃ input-number 1]]",
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
                                widgetType: "input-number",
                                id: "input-number 1",
                            },
                        ],
                    },
                ],
            },
        ])("should parse widget types and ids", ({content, expected}) => {
            // Arrange, Act
            const parsed = parse(content);

            // Assert
            expect(parsed).toEqual(expected);
        });

        it("should allow escaping widget identifiers", () => {
            // Arrange, Act
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
                const parsed = parse(content);

                // Assert
                expect(parsed).toEqual(expected);
            },
        );

        it("should parse multiple columns", () => {
            // Arrange, Act
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
                content: "1. test\n\n" + "2. boo\n\n",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                content: "1",
                            },
                            {
                                type: "text",
                                content: ". test",
                            },
                        ],
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                content: "2",
                            },
                            {
                                type: "text",
                                content: ". boo",
                            },
                        ],
                    },
                ],
            },
            {
                content: "* test\n\n" + "* boo\n\n",
                expected: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                content: "* test",
                            },
                        ],
                    },
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                content: "* boo",
                            },
                        ],
                    },
                ],
            },
        ])("should ignore lists in jipt mode", ({content, expected}) => {
            // Arrange, Act
            const parsed = parse(content, {isJipt: true});

            // Assert
            expect(parsed).toEqual(expected);
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
            const parsed = parse(content);

            // Assert
            expect(parsed).toMatchSnapshot();
        });
    });
});
