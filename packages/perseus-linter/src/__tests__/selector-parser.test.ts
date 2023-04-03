import Selector from "../selector";

describe("PerseusLinter selector parser", () => {
    const validExpressions = [
        "*",
        " * ",
        "para",
        "list para",
        "\tlist   para\n",
        "list > para",
        "list + para",
        "list ~ para",
        "list list para",
        "para~heading~para~heading",
        "list, para",
        "list > para, list text, heading *, heading+para",
    ];

    const invalidExpressions = [
        "", // Expected node type
        "", // Expected node type
        "<", // Expected node type
        "+", // Expected node type
        "~", // Expected node type
        "**", // Unexpected token
        "foo*", // Unexpected token
        "*/foo/", // Unexpected token
        "()", // Unexpected token
        ",",
        "list,",
        ",list",
    ];

    validExpressions.forEach((s) => {
        it("parses '" + s + "'", () => {
            const e = Selector.parse(s);
            expect(e instanceof Selector).toBeTruthy();
            expect(e.toString().replace(/\s/g, "")).toEqual(
                s.replace(/\s/g, ""),
            );
        });
    });

    invalidExpressions.forEach((s) => {
        it("rejects '" + s + "'", () => {
            expect(() => {
                Selector.parse(s);
            }).toThrow();
        });
    });
});
