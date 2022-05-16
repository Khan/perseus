// @flow

import JiptParagraphs from "../jipt-paragraphs.js";

const {parseToArray} = JiptParagraphs;

describe("jipt-paragraphs", () => {
    it("should split paragraphs using custom JIPT SimpleMarkdown rules", () => {
        expect(parseToArray("  \n\nhello\n\n")).toMatchInlineSnapshot(`
            Array [
              "  ",
              "hello",
            ]
        `);
    });

    it("should recognize code fences using custom JIPT SimpleMarkdown rules", () => {
        expect(
            parseToArray(
                "Let's write the canonical Hello World in Javascript\n\n" +
                    '```js\nconst x = "hello world";\nconsole.log(x);```\n\n' +
                    "**Congratulations, you are on your way to becoming a " +
                    "computer programmer!",
            ),
        ).toMatchInlineSnapshot(`
            Array [
              "Let's write the canonical Hello World in Javascript",
              "const x = \\"hello world\\";
            console.log(x);",
              "**Congratulations, you are on your way to becoming a computer programmer!",
            ]
        `);
    });
});
