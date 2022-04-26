// @flow
import shapes from "../shapes.js";
import {buildMapper} from "../trees.js";

import type {
    ItemTree,
    ContentNode,
    HintNode,
    TagsNode,
    ItemArrayNode,
} from "../item-types.js";
import type {TreeMapper} from "../trees.js";

describe("buildMapper", () => {
    function content(n): ContentNode {
        return {
            __type: "content",
            content: `content ${n}`,
        };
    }

    function hint(n): HintNode {
        return {
            __type: "hint",
            content: `hint ${n}`,
        };
    }

    function tags(...elements): TagsNode {
        // This function mostly exists as a shorthand way to clarify to Flow
        // that this is a TagsNode, not a confused ItemArrayNode.
        return elements;
    }

    function array(...elements): ItemArrayNode {
        // This function mostly exists as a shorthand way to clarify to Flow
        // that this is an ItemArrayNode, not a confused TagsNode.
        /**
         * TODO(somewhatabstract, JIRA-XXXX):
         * The Tree types are really hard to work with properly.
         */
        // $FlowFixMe[incompatible-return]
        return elements;
    }

    const shape = shapes.shape({
        a: shapes.content,
        b: shapes.arrayOf(shapes.content),
        c: shapes.shape({
            d: shapes.content,
            e: shapes.hint,
        }),
        f: shapes.hint,
        g: shapes.tags,
    });

    const tree: ItemTree = {
        a: content(1),
        b: array(content(2), content(3), content(4)),
        c: {
            d: content(5),
            e: hint(6),
        },
        f: hint(7),
        g: tags("foo", "bar"),
    };

    it("calls the content mapper for each of the content nodes", () => {
        const calledWith = [];
        buildMapper()
            .setContentMapper((c) => calledWith.push(c))
            .mapTree(tree, shape);
        calledWith.sort();

        expect([
            content(1),
            content(2),
            content(3),
            content(4),
            content(5),
        ]).toEqual(calledWith);
    });

    it("calls the hint mapper for each of the hint nodes", () => {
        const calledWith = [];
        buildMapper()
            .setHintMapper((h) => calledWith.push(h))
            .mapTree(tree, shape);
        calledWith.sort();

        expect([hint(6), hint(7)]).toEqual(calledWith);
    });

    it("calls the tags mapper for each of the tags nodes", () => {
        const calledWith = [];
        buildMapper()
            .setTagsMapper((t) => calledWith.push(t))
            .mapTree(tree, shape);
        calledWith.sort();

        expect([["foo", "bar"]]).toEqual(calledWith);
    });

    it("returns a mapped tree with the correct shape", () => {
        const mapper: TreeMapper<
            ContentNode,
            string,
            HintNode,
            string,
            TagsNode,
            string,
        > = buildMapper()
            .setContentMapper((c) => `mapped content: ${c.content || "<none>"}`)
            .setHintMapper((h) => `mapped hint: ${h.content || "<none>"}`)
            .setTagsMapper((t) => `mapped tags: ${t.join(", ")}`);
        const result = mapper.mapTree(tree, shape);

        expect({
            a: "mapped content: content 1",
            b: [
                "mapped content: content 2",
                "mapped content: content 3",
                "mapped content: content 4",
            ],
            c: {
                d: "mapped content: content 5",
                e: "mapped hint: hint 6",
            },
            f: "mapped hint: hint 7",
            g: "mapped tags: foo, bar",
        }).toEqual(result);
    });

    it("provides each node shape to the leaf mappers", () => {
        // Return the type of the shape of the node in place of each node.
        const result = buildMapper()
            .setContentMapper((_, s) => s.type)
            .setHintMapper((_, s) => s.type)
            .setTagsMapper((_, s) => s.type)
            .mapTree(tree, shape);

        expect({
            a: "content",
            b: ["content", "content", "content"],
            c: {
                d: "content",
                e: "hint",
            },
            f: "hint",
            g: "tags",
        }).toEqual(result);
    });

    it("provides each node path to the leaf mappers", () => {
        // Return the path to the node in place of each node.
        const result = buildMapper()
            .setContentMapper((_, __, p) => p)
            .setHintMapper((_, __, p) => p)
            .setTagsMapper((_, __, p) => p)
            .mapTree(tree, shape);

        expect({
            a: ["a"],
            b: [
                ["b", 0],
                ["b", 1],
                ["b", 2],
            ],
            c: {
                d: ["c", "d"],
                e: ["c", "e"],
            },
            f: ["f"],
            g: ["g"],
        }).toEqual(result);
    });

    it("handles recursive objects", () => {
        const shape = shapes.shape({
            a: shapes.shape({
                b: shapes.shape({
                    c: shapes.content,
                }),
            }),
        });

        const tree = {a: {b: {c: content(1)}}};

        const mapper: TreeMapper<
            ContentNode,
            ?string,
            HintNode,
            HintNode,
            TagsNode,
            TagsNode,
        > = buildMapper().setContentMapper((c) => c.content);
        const result = mapper.mapTree(tree, shape);

        expect({a: {b: {c: "content 1"}}}).toEqual(result);
    });

    it("handles recursive arrays", () => {
        const shape = shapes.arrayOf(
            shapes.arrayOf(shapes.arrayOf(shapes.content)),
        );

        const tree = array(
            array(array(content(0)), array(content(1))),
            array(array(content(2)), array(content(3), content(4))),
        );

        const mapper: TreeMapper<
            ContentNode,
            ?string,
            HintNode,
            HintNode,
            TagsNode,
            TagsNode,
        > = buildMapper().setContentMapper((c) => c.content);
        const result = mapper.mapTree(tree, shape);

        expect([
            [["content 0"], ["content 1"]],
            [["content 2"], ["content 3", "content 4"]],
        ]).toEqual(result);
    });

    it("handles empty arrays", () => {
        const shape = shapes.arrayOf(shapes.arrayOf(shapes.content));

        const tree = array(array(), array(content(1)), array());

        const mapper: TreeMapper<
            ContentNode,
            ?string,
            HintNode,
            HintNode,
            TagsNode,
            TagsNode,
        > = buildMapper().setContentMapper((c) => c.content);

        // Test the outer array being empty.
        expect([]).toEqual(mapper.mapTree(array(), shape));

        // Test inner arrays being empty.
        const result = mapper.mapTree(tree, shape);
        expect([[], ["content 1"], []]).toEqual(result);
    });

    it("calls the array mapper for arrays", () => {
        const shape = shapes.arrayOf(shapes.content);
        const tree = array(content(1), content(2), content(3));

        let wasCalled = false;
        let callArgs = {};
        const mapper: TreeMapper<
            ContentNode,
            ?string,
            HintNode,
            HintNode,
            TagsNode,
            TagsNode,
        > = buildMapper()
            .setContentMapper((c) => c.content)
            .setArrayMapper((mappedArray, originalArray, shape, path) => {
                wasCalled = true;
                callArgs = {mappedArray, originalArray, shape, path};
                return mappedArray;
            });
        mapper.mapTree(tree, shape);

        expect(wasCalled).toBeTruthy();

        expect(["content 1", "content 2", "content 3"]).toEqual(
            callArgs.mappedArray,
        );
        expect(tree).toEqual(callArgs.originalArray);
        expect(shape).toEqual(callArgs.shape);
        expect([]).toEqual(callArgs.path);
    });

    it("uses the array mapper return value to construct the new tree", () => {
        const mapper = buildMapper()
            // $FlowFixMe[not-a-function]
            // $FlowFixMe[prop-missing]
            // $FlowFixMe[incompatible-use]
            .setContentMapper((c) => c.content)
            // $FlowFixMe[not-a-function]
            // $FlowFixMe[prop-missing]
            // $FlowFixMe[incompatible-use]
            .setHintMapper((h) => h.content)
            // $FlowFixMe[not-a-function]
            // $FlowFixMe[prop-missing]
            .setTagsMapper((t) => t.join(", "))
            .setArrayMapper((mappedArray, originalArray, shape, path) => {
                // $FlowFixMe[prop-missing]
                return mappedArray.map((child) => `${String(child)} in array`);
            });
        const result = mapper.mapTree(tree, shape);

        expect({
            a: "content 1",
            b: [
                "content 2 in array",
                "content 3 in array",
                "content 4 in array",
            ],
            c: {
                d: "content 5",
                e: "hint 6",
            },
            f: "hint 7",
            g: "foo, bar",
        }).toEqual(result);
    });
});
