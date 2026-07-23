import Util from "./util";

describe("firstNumericalParse", () => {
    it("regression LEMS-2962: handles fractions properly", () => {
        expect(Util.firstNumericalParse("6/8")).toBe(0.75);
    });
});

describe("stringArrayOfSize", () => {
    it("makes an array of strings", () => {
        expect(Util.stringArrayOfSize(2)).toEqual(["", ""]);
    });
});

describe("stringArrayOfSize2D", () => {
    it("makes a 2D array of strings", () => {
        expect(Util.stringArrayOfSize2D({rows: 2, columns: 4})).toEqual([
            ["", "", "", ""],
            ["", "", "", ""],
        ]);
    });
});

describe("splitBlockWidgetsFromParagraphs", () => {
    const text = (content: string) => ({type: "text", content});
    const strong = (content: string) => ({
        type: "strong",
        content: [text(content)],
    });
    const widget = (widgetType: string, id: string) => ({
        type: "widget",
        widgetType,
        id,
    });
    const paragraph = (content: ReadonlyArray<any>) => ({
        type: "paragraph",
        content,
    });

    it("returns non-array input unchanged", () => {
        // Arrange - show that splitting is based upon parameter (is array), not AST "type"
        const node = paragraph([widget("radio", "radio 1")]);

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(node);

        // Assert
        expect(result).toBe(node);
    });

    it("leaves an inline widget within a paragraph untouched", () => {
        // Arrange
        const ast = [
            paragraph([
                strong("Question"),
                text(" "),
                widget("input-number", "input-number 2"),
            ]),
        ];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual(ast);
    });

    it("does not treat inline widgets as block-level", () => {
        // Arrange
        const inlineWidgets = [
            "definition",
            "expression",
            "input-number",
            "numeric-input",
        ];
        const ast = inlineWidgets.map((widgetName, index) =>
            paragraph([widget(widgetName, `${widgetName} ${index}`)]),
        );

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual(ast);
    });

    it("returns non-paragraph top-level nodes unchanged", () => {
        // Arrange
        const ast = [
            {type: "blockMath", content: "x^2"},
            widget("radio", "radio 1"),
        ];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual(ast);
    });

    it("splits a paragraph with a block widget in the middle into separate siblings", () => {
        // Arrange
        const ast = [
            paragraph([
                strong("Which picture?"),
                text(" \n"),
                widget("radio", "radio 1"),
                text("\n"),
                strong("The pink square is"),
                widget("input-number", "input-number 2"),
            ]),
        ];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual([
            paragraph([strong("Which picture?")]),
            widget("radio", "radio 1"),
            paragraph([
                strong("The pink square is"),
                widget("input-number", "input-number 2"),
            ]),
        ]);
    });

    it("emits no leading paragraph when a block widget is first", () => {
        // Arrange
        const ast = [
            paragraph([widget("radio", "radio 1"), text(" "), strong("after")]),
        ];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual([
            widget("radio", "radio 1"),
            paragraph([strong("after")]),
        ]);
    });

    it("emits no trailing paragraph when a block widget is last", () => {
        // Arrange
        const ast = [
            paragraph([
                strong("before"),
                text(" \n"),
                widget("radio", "radio 1"),
            ]),
        ];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual([
            paragraph([strong("before")]),
            widget("radio", "radio 1"),
        ]);
    });

    it("does not insert an empty paragraph between consecutive block widgets", () => {
        // Arrange
        const ast = [
            paragraph([
                widget("radio", "radio 1"),
                text("\n"),
                widget("radio", "radio 2"),
            ]),
        ];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual([
            widget("radio", "radio 1"),
            widget("radio", "radio 2"),
        ]);
    });

    it("unwraps a paragraph that contains only a block widget", () => {
        // Arrange
        const ast = [paragraph([widget("radio", "radio 1")])];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual([widget("radio", "radio 1")]);
    });

    it("removes whitespace between inline nodes and block nodes", () => {
        // Arrange
        const ast = [
            paragraph([
                text("Foo"),
                text("\n"),
                text(" "),
                widget("radio", "radio 1"),
                text(" "),
                text("\n"),
                text("Bar"),
            ]),
        ];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual([
            paragraph([text("Foo")]),
            widget("radio", "radio 1"),
            paragraph([text("Bar")]),
        ]);
    });

    it("preserves whitespace between inline nodes", () => {
        // Arrange
        const ast = [
            paragraph([
                text("a"),
                text(" "),
                text("b"),
                widget("radio", "radio 1"),
            ]),
        ];

        // Act
        const result = Util.splitBlockWidgetsFromParagraphs(ast);

        // Assert
        expect(result).toEqual([
            paragraph([text("a"), text(" "), text("b")]),
            widget("radio", "radio 1"),
        ]);
    });
});
