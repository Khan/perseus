// These tests exercise the Selector.match() method and also test that we
// can integrate ../../perseus-markdown.js with ../tree-transform.js and
// ../selector.js
import assert from "assert";
import PerseusMarkdown from "../../perseus-markdown.jsx";
import TreeTransformer from "../tree-transformer.js";
import Selector from "../selector.js";

describe("Gorgon selector matching:", () => {
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
        return PerseusMarkdown.parse(markdown);
    }

    it("wildcards match every node", () => {
        const tree = parseTree();
        const selector = Selector.parse("*");
        const tt = new TreeTransformer(tree);
        tt.traverse((n, state, content) => {
            // The wildcard selector should match at every node
            assert.equal(selector.match(state)[0], n);
        });
    });

    it("type-based matching works", () => {
        const tree = parseTree();
        const selectors = {};
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
            types.forEach(type => {
                const selector = selectors[type];
                const match = selector.match(state);
                if (n.type === type) {
                    assert.equal(match[0], n);
                } else {
                    assert.equal(match, null);
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
            if (n.type === "text" && parent.type === "paragraph") {
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 2);
                assert.equal(match[0], parent);
                assert.equal(match[1], n);
                matchedText += content;
                numMatches++;
            } else {
                assert.equal(match, null);
            }
        });

        assert.equal(numMatches, 3);
        assert.equal(matchedText, "BCH");
    });

    it("double parent combinator", () => {
        const selector = Selector.parse("paragraph > em > text");
        const tree = parseTree();
        const tt = new TreeTransformer(tree);
        let numMatches = 0;
        let matchedText = "";

        tt.traverse((n, state, content) => {
            const match = selector.match(state);
            const ancestors = state.ancestors();
            const parent = ancestors.pop();
            const grandparent = ancestors.pop();
            if (
                n.type === "text" &&
                parent.type === "em" &&
                grandparent.type === "paragraph"
            ) {
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 3);
                assert.equal(match[0], grandparent);
                assert.equal(match[1], parent);
                assert.equal(match[2], n);
                matchedText += content;
                numMatches++;
            } else {
                assert.equal(match, null);
            }
        });

        assert.equal(numMatches, 1);
        assert.equal(matchedText, "G");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 2);
                assert.equal(match[0].type, "paragraph");
                assert.equal(match[1].type, "text");
                assert.equal(match[1], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 4);
        assert.equal(matchedText, "BCGH");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 3);
                assert.equal(match[0].type, "paragraph");
                assert.equal(match[1].type, "em");
                assert.equal(match[2].type, "text");
                assert.equal(match[2], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 1);
        assert.equal(matchedText, "G");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 2);
                assert.equal(match[0].type, "heading");
                assert.equal(match[0], state.previousSibling());
                assert.equal(match[1].type, "paragraph");
                assert.equal(match[1], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 1);
        assert.equal(matchedText, "B");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 3);
                assert.equal(match[0].type, "heading");
                assert.equal(match[1].type, "paragraph");
                assert.equal(match[1], state.previousSibling());
                assert.equal(match[2].type, "paragraph");
                assert.equal(match[2], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 1);
        assert.equal(matchedText, "C");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 2);
                assert.equal(match[0].type, "heading");
                assert.equal(match[1].type, "paragraph");
                assert.equal(match[1], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 3);
        assert.equal(matchedText, "BCGH");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 3);
                assert.equal(match[0].type, "heading");
                assert.equal(match[1].type, "paragraph");
                assert.equal(match[2].type, "paragraph");
                assert.equal(match[2], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 2);
        assert.equal(matchedText, "CGH");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 3);
                assert.equal(match[0].type, "list");
                assert.equal(match[1].type, "paragraph");
                assert.equal(match[1], state.parent());
                assert.equal(match[2].type, "em");
                assert.equal(match[2], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 1);
        assert.equal(matchedText, "G");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 3);
                assert.equal(match[0].type, "list");
                assert.equal(match[1].type, "paragraph");
                assert.equal(match[1], state.parent());
                assert.equal(match[2].type, "em");
                assert.equal(match[2], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 1);
        assert.equal(matchedText, "G");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 3);
                assert.equal(match[0].type, "paragraph");
                assert.equal(match[0], state.parent());
                assert.equal(match[1].type, "em");
                assert.equal(match[1], state.previousSibling());
                assert.equal(match[2].type, "text");
                assert.equal(match[2], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 1);
        assert.equal(matchedText, "H");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 3);
                assert.equal(match[0].type, "paragraph");
                assert.equal(match[0], state.parent());
                assert.equal(match[1].type, "em");
                assert.equal(match[1], state.previousSibling());
                assert.equal(match[2].type, "text");
                assert.equal(match[2], n);
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 1);
        assert.equal(matchedText, "H");
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
                assert.ok(Array.isArray(match));
                assert.equal(match.length, 1);
                assert.equal(match[0], n);
                assert.ok(n.type === "paragraph" || n.type === "list");
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 4);
        assert.equal(matchedText, "BCDEFGH");
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
                assert.ok(Array.isArray(match));
                if (n.type === "heading") {
                    assert.equal(match.length, 1);
                    assert.equal(match[0], n);
                } else {
                    assert.equal(match.length, 2);
                    assert.equal(match[1], n);
                    assert.equal(n.type, "text");
                }
                matchedText += content;
                numMatches++;
            }
        });

        assert.equal(numMatches, 8);
        assert.equal(matchedText, "ABCDEFGH");
    });
});
