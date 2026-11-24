import SimpleMarkdown from "../index";

// Tests that the default rules parse pathological input in a bounded time.
// Each input below is one that used to make a regex backtrack
// catastrophically: exponential or polynomial in the input length. Each
// input is sized so that a regression takes seconds on a typical machine,
// while the current parser takes a few milliseconds, so the limit can be
// generous enough not to flake on a slow CI runner.
//
// Size each input by timing the vulnerable regex after it has already run
// a few times. V8 compiles a regex to native code once it's warm, which
// backtracks many times faster than the cold bytecode interpreter, and
// earlier tests in this file warm up the shared rules. An input sized
// against a cold regex can pass against a regressed one. Keep the inputs
// small enough that a regression fails in seconds rather than hanging:
// Rstest's test timeout can't interrupt synchronous code.
const MAX_PARSE_MS = 500;

const inlineParse = SimpleMarkdown.defaultInlineParse;
const blockParse = SimpleMarkdown.defaultBlockParse;

function timeParse(parse: (source: string) => unknown, source: string) {
    const startTime = performance.now();
    parse(source);
    return performance.now() - startTime;
}

describe("simple-markdown parse performance", () => {
    beforeEach(() => {
        // The shared test setup installs fake timers before every test,
        // which freezes Date.now() and performance.now(). Timing anything
        // with fake timers always measures 0ms, so every test here would
        // pass no matter how slow the parser is.
        rs.useRealTimers();
    });

    it("measures time with a real clock", () => {
        // Arrange
        const startTime = performance.now();
        let iterations = 0;

        // Act
        // A real clock advances within a few hundred iterations; the cap
        // keeps a frozen fake clock from spinning forever.
        while (performance.now() === startTime && iterations < 1e6) {
            iterations++;
        }

        // Assert
        expect(performance.now()).toBeGreaterThan(startTime);
    });

    it("parses an unclosed inlineCode followed by spaces quickly", () => {
        // Arrange
        const source = "`" + " ".repeat(2000);

        // Act
        const duration = timeParse(inlineParse, source);

        // Assert
        expect(duration).toBeLessThan(MAX_PARSE_MS);
    });

    it("parses a long run of backticks with no closing run quickly", () => {
        // Arrange
        const source = "`".repeat(4000) + "a";

        // Act
        const duration = timeParse(inlineParse, source);

        // Assert
        expect(duration).toBeLessThan(MAX_PARSE_MS);
    });

    it("parses long headings quickly", () => {
        // Arrange
        const source = "### Hi " + " ".repeat(1200) + "there ### \n\n";

        // Act
        const duration = timeParse(blockParse, source);

        // Assert
        expect(duration).toBeLessThan(MAX_PARSE_MS);
    });

    it.each([30, 1000])(
        "parses an unclosed del followed by %s spaces quickly",
        (spaces) => {
            // Arrange
            const source = "~~~h" + " ".repeat(spaces) + "i";

            // Act
            const duration = timeParse(inlineParse, source);

            // Assert
            expect(duration).toBeLessThan(MAX_PARSE_MS);
        },
    );

    it.each([
        [1000, 1000],
        [2000, 10000],
    ])(
        "parses a code fence with %s spaces then %s spaces quickly",
        (fenceSpaces, bodySpaces) => {
            // Arrange
            const source =
                "~~~" +
                " ".repeat(fenceSpaces) +
                "\n" +
                " ".repeat(bodySpaces) +
                "\n";

            // Act
            const duration = timeParse(blockParse, source);

            // Assert
            expect(duration).toBeLessThan(MAX_PARSE_MS);
        },
    );

    it("parses del with many backslash-escaped braces quickly", () => {
        // Arrange
        const source =
            "~~\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}" +
            "\\}\\}\\}\\}\\}\\}\\}\\}\\\\}\\}\\}\\}\\}\\}\\}}\\}\\}\\}\\}\\}\\}}~";

        // Act
        const duration = timeParse(blockParse, source);

        // Assert
        expect(duration).toBeLessThan(MAX_PARSE_MS);
    });

    it("parses an indented line with many inner 4-space runs quickly", () => {
        // Arrange
        // Each "    a" could start a new codeBlock line, and the
        // non-blank line after it stops the block from matching.
        const source = "    a".repeat(27) + "\nb";

        // Act
        const duration = timeParse(blockParse, source);

        // Assert
        expect(duration).toBeLessThan(MAX_PARSE_MS);
    });

    it.each(["[x](", "![x]("])(
        "parses %s with nested parens and no closing paren quickly",
        (opener) => {
            // Arrange
            // "((" could be read as one paren group, or as "(" followed by
            // a group, and the space stops the link from closing early.
            const source = opener + "(( a)".repeat(26);

            // Act
            const duration = timeParse(inlineParse, source);

            // Assert
            expect(duration).toBeLessThan(MAX_PARSE_MS);
        },
    );

    it("parses many unclosed mailto openers quickly", () => {
        // Arrange
        const source = "<@".repeat(2000);

        // Act
        const duration = timeParse(inlineParse, source);

        // Assert
        expect(duration).toBeLessThan(MAX_PARSE_MS);
    });
});
