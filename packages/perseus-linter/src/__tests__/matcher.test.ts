/* These tests exercise the Selector.match() method and also test that we
 * can integrate ../../perseus-markdown.js with ../tree-transform.js and
 * ../selector.js
 */
import * as PureMarkdown from "@khanacademy/pure-markdown";

import Selector from "../selector";
import TreeTransformer from "../tree-transformer";

describe("PerseusLinter selector matching:", () => {
    const markdown = `
### A

B

C

- D
- E
- F

*G*H
`;

    function parseTree() {
        return PureMarkdown.parse(markdown);
    }

    it("wildcards match every node", () => {
        const tree = parseTree();
        const selector = Selector.parse("*");
        const tt = new TreeTransformer(tree);
        tt.traverse((n, state, content) => {
            // The wildcard selector should match at every node
            // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
            expect(selector.match(state)[0]).toEqual(n);
        });
    });

    it("type-based matching works", () => {
        const tree = parseTree();
        const selectors: Record<string, any> = {};
        const tt = new TreeTransformer(tree);

        // Traverse the tree once and create a selector for every type
        // of node we find
        tt.traverse((n, state, content) => {
            if (!selectors[n.type]) {
                selectors[n.type] = Selector.parse(n.type);
            }
        });

        const types = Object.keys(selectors);

        // Now traverse the tree again. At each node run all of the
        // selectors we've created. Only those with matching types
        // should match.
        tt.traverse((n, state, content) => {
            types.forEach((type) => {
                const selector = selectors[type];
                const match = selector.match(state);
                if (n.type === type) {
                    expect(match[0]).toEqual(n);
                } else {
                    expect(match).toEqual(null);
                }
            });

            if (!selectors[n.type]) {
                selectors[n.type] = Selector.parse(n.type);
            }
        });
    });

    it("parent combinator", () => {
        const selector = Selector.parse("paragraph > text");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            const parent = state.parent();
            // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
            if (n.type === "text" && parent.type === "paragraph") {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(2);
                // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
                expect(match[0]).toEqual(parent);
                // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
                expect(match[1]).toEqual(n);
                matchedText += content;
                numMatches++;
            } else {
                expect(match).toEqual(null);
            }
        });

        expect(numMatches).toEqual(3);
        expect(matchedText).toEqual("BCH");
    });

    it("double parent combinator", () => {
        const selector = Selector.parse("paragraph > em > text");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            // Make a mutable copy before popping.
            const ancestors = [...state.ancestors()];
            const parent = ancestors.pop();
            const grandparent = ancestors.pop();
            if (
                n.type === "text" &&
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                parent.type === "em" &&
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                grandparent.type === "paragraph"
            ) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(3);
                // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
                expect(match[0]).toEqual(grandparent);
                // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
                expect(match[1]).toEqual(parent);
                // @ts-expect-error - TS2533 - Object is possibly 'null' or 'undefined'.
                expect(match[2]).toEqual(n);
                matchedText += content;
                numMatches++;
            } else {
                expect(match).toEqual(null);
            }
        });

        expect(numMatches).toEqual(1);
        expect(matchedText).toEqual("G");
    });

    it("ancestor combinator", () => {
        const selector = Selector.parse("paragraph text");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(2);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("text");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(4);
        expect(matchedText).toEqual("BCGH");
    });

    it("double ancestor combinator", () => {
        const selector = Selector.parse("paragraph em text");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(3);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("em");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2].type).toEqual("text");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(1);
        expect(matchedText).toEqual("G");
    });

    it("previous combinator", () => {
        const selector = Selector.parse("heading + paragraph");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(2);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("heading");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0]).toEqual(state.previousSibling());
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(1);
        expect(matchedText).toEqual("B");
    });

    it("double previous combinator", () => {
        const selector = Selector.parse("heading + paragraph + paragraph");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(3);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("heading");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1]).toEqual(state.previousSibling());
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(1);
        expect(matchedText).toEqual("C");
    });

    it("sibling combinator", () => {
        const selector = Selector.parse("heading ~ paragraph");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(2);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("heading");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(3);
        expect(matchedText).toEqual("BCGH");
    });

    it("double sibling combinator", () => {
        const selector = Selector.parse("heading ~ paragraph ~ paragraph");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(3);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("heading");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(2);
        expect(matchedText).toEqual("CGH");
    });

    it("mixed combinators", () => {
        const selector = Selector.parse("list + paragraph > em");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(3);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("list");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1]).toEqual(state.parent());
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2].type).toEqual("em");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(1);
        expect(matchedText).toEqual("G");
    });

    it("mixed combinators 2", () => {
        const selector = Selector.parse("list ~ paragraph em");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(3);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("list");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1]).toEqual(state.parent());
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2].type).toEqual("em");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(1);
        expect(matchedText).toEqual("G");
    });

    it("mixed combinators 3", () => {
        const selector = Selector.parse("paragraph > em + text");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(3);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0]).toEqual(state.parent());
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("em");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1]).toEqual(state.previousSibling());
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2].type).toEqual("text");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(1);
        expect(matchedText).toEqual("H");
    });

    it("mixed combinators 4", () => {
        const selector = Selector.parse("paragraph em ~ text");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(3);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0].type).toEqual("paragraph");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0]).toEqual(state.parent());
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1].type).toEqual("em");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[1]).toEqual(state.previousSibling());
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2].type).toEqual("text");
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[2]).toEqual(n);
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(1);
        expect(matchedText).toEqual("H");
    });

    it("selector list", () => {
        const selector = Selector.parse("paragraph, list");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                expect(match).toHaveLength(1);
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                expect(match[0]).toEqual(n);
                expect(
                    n.type === "paragraph" || n.type === "list",
                ).toBeTruthy();
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(4);
        expect(matchedText).toEqual("BCDEFGH");
    });

    it("selector list 2", () => {
        const selector = Selector.parse("heading, paragraph text, list>text");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            if (match !== null) {
                expect(Array.isArray(match)).toBeTruthy();
                if (n.type === "heading") {
                    expect(match).toHaveLength(1);
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    expect(match[0]).toEqual(n);
                } else {
                    expect(match).toHaveLength(2);
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    expect(match[1]).toEqual(n);
                    expect(n.type).toEqual("text");
                }
                matchedText += content;
                numMatches++;
            }
        });

        expect(numMatches).toEqual(8);
        expect(matchedText).toEqual("ABCDEFGH");
    });
});
