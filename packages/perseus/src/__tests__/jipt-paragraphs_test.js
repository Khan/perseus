// @flow

import JiptParagraphs from "../jipt-paragraphs.js";

const {parseToArray} = JiptParagraphs;

describe("jipt-paragraphs", () => {
    it("should split paragraphs using custom JIPT SimpleMarkdown rules", () => {
        expect(parseToArray("  \n\nhello\n\n")).toMatchInlineSnapshot(`
            Array [
              Object {
                "content": "  ",
                "type": "paragraph",
              },
              Object {
                "content": "hello",
                "type": "paragraph",
              },
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
              Object {
                "content": "Let's write the canonical Hello World in Javascript",
                "type": "paragraph",
              },
              Object {
                "content": "const x = \\"hello world\\";
            console.log(x);",
                "lang": "js",
                "type": "codeBlock",
              },
              Object {
                "content": "**Congratulations, you are on your way to becoming a computer programmer!",
                "type": "paragraph",
              },
            ]
        `);
    });
});
