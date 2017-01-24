// @flow
const assert = require("assert");
declare function describe(s: string, f: () => any): any;
declare function it(s: string, f: () => any): any;

import type {
    ItemTree, ContentNode, HintNode, TagsNode, ItemArrayNode,
} from "../item-types.js";
import type {TreeMapper} from "../trees.js";
const {buildMapper} = require("../trees.js");
const shapes = require("../shapes.js");

describe("buildMapper", () => {
    function content(n): ContentNode {
        return {
            __type: "item",
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
            .setContentMapper(c => calledWith.push(c))
            .mapTree(tree, shape);
        calledWith.sort();

        assert.deepEqual(
            [content(1), content(2), content(3), content(4), content(5)],
            calledWith);
    });

    it("calls the hint mapper for each of the hint nodes", () => {
        const calledWith = [];
        buildMapper()
            .setHintMapper(h => calledWith.push(h))
            .mapTree(tree, shape);
        calledWith.sort();

        assert.deepEqual([hint(6), hint(7)], calledWith);
    });

    it("calls the tags mapper for each of the tags nodes", () => {
        const calledWith = [];
        buildMapper()
            .setTagsMapper(t => calledWith.push(t))
            .mapTree(tree, shape);
        calledWith.sort();

        assert.deepEqual([["foo", "bar"]], calledWith);
    });

    it("returns a mapped tree with the correct shape", () => {
        const mapper: TreeMapper<ContentNode, string, HintNode, string,
            TagsNode, string>
        =
            buildMapper()
            .setContentMapper(c => `mapped content: ${c.content || "<none>"}`)
            .setHintMapper(h => `mapped hint: ${h.content || "<none>"}`)
            .setTagsMapper(t => `mapped tags: ${t.join(", ")}`);
        const result = mapper.mapTree(tree, shape);

        assert.deepEqual({
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
        }, result);
    });

    it("provides each node shape to the leaf mappers", () => {
        // Return the type of the shape of the item in place of each item.
        const result = buildMapper()
            .setContentMapper((_, s) => s.type)
            .setHintMapper((_, s) => s.type)
            .setTagsMapper((_, s) => s.type)
            .mapTree(tree, shape);

        assert.deepEqual({
            a: "item",
            b: ["item", "item", "item"],
            c: {
                d: "item",
                e: "hint",
            },
            f: "hint",
            g: "tags",
        }, result);
    });

    it("provides each node path to the leaf mappers", () => {
        // Return the path of the item in place of each item.
        const result = buildMapper()
            .setContentMapper((_, __, p) => p)
            .setHintMapper((_, __, p) => p)
            .setTagsMapper((_, __, p) => p)
            .mapTree(tree, shape);

        assert.deepEqual({
            a: ["a"],
            b: [["b", 0], ["b", 1], ["b", 2]],
            c: {
                d: ["c", "d"],
                e: ["c", "e"],
            },
            f: ["f"],
            g: ["g"],
        }, result);
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

        const mapper: TreeMapper<ContentNode, ?string, HintNode, HintNode,
            TagsNode, TagsNode>
        =
            buildMapper()
            .setContentMapper(c => c.content);
        const result = mapper.mapTree(tree, shape);

        assert.deepEqual({a: {b: {c: "content 1"}}}, result);
    });

    it("handles recursive arrays", () => {
        const shape = shapes.arrayOf(
            shapes.arrayOf(shapes.arrayOf(shapes.content)));

        const tree = array(
            array(array(content(0)), array(content(1))),
            array(array(content(2)), array(content(3), content(4))),
        );

        const mapper: TreeMapper<ContentNode, ?string, HintNode, HintNode,
            TagsNode, TagsNode>
        =
            buildMapper()
            .setContentMapper(c => c.content);
        const result = mapper.mapTree(tree, shape);

        assert.deepEqual([
            [["content 0"], ["content 1"]],
            [["content 2"], ["content 3", "content 4"]],
        ], result);
    });

    it("handles empty arrays", () => {
        const shape = shapes.arrayOf(shapes.arrayOf(shapes.content));

        const tree = array(array(), array(content(1)), array());

        const mapper: TreeMapper<ContentNode, ?string, HintNode, HintNode,
            TagsNode, TagsNode>
        =
            buildMapper()
            .setContentMapper(c => c.content);

        // Test the outer array being empty.
        assert.deepEqual([], mapper.mapTree(array(), shape));

        // Test inner arrays being empty.
        const result = mapper.mapTree(tree, shape);
        assert.deepEqual([[], ["content 1"], []], result);
    });

    it("calls the array mapper for arrays", () => {
        const shape = shapes.arrayOf(shapes.content);
        const tree = array(content(1), content(2), content(3));

        let wasCalled = false;
        let callArgs = {};
        const mapper: TreeMapper<ContentNode, ?string, HintNode, HintNode,
            TagsNode, TagsNode>
        =
            buildMapper()
            .setContentMapper(c => c.content)
            .setArrayMapper((mappedArray, originalArray, shape, path) => {
                wasCalled = true;
                callArgs = {mappedArray, originalArray, shape, path};
                return mappedArray;
            });
        mapper.mapTree(tree, shape);

        assert(wasCalled, "array mapper not called");

        assert.deepEqual(
            ["content 1", "content 2", "content 3"], callArgs.mappedArray);
        assert.equal(tree, callArgs.originalArray);
        assert.deepEqual(shape, callArgs.shape);
        assert.deepEqual([], callArgs.path);
    });

    it("uses the array mapper return value to construct the new tree", () => {
        const mapper: TreeMapper<ContentNode, ?string, HintNode, ?string,
            TagsNode, ?string>
        =
            buildMapper()
            .setContentMapper(c => c.content)
            .setHintMapper(h => h.content)
            .setTagsMapper(t => t.join(", "))
            .setArrayMapper((mappedArray, originalArray, shape, path) => {
                return mappedArray.map(child => `${String(child)} in array`);
            });
        const result = mapper.mapTree(tree, shape);

        assert.deepEqual({
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
        }, result);
    });
});
