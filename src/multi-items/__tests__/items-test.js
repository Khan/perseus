// @flow
const assert = require("assert");
declare function describe(s: string, f: () => any): any;
declare function it(s: string, f: () => any): any;

import type {
    Item, ItemTree, ContentNode, HintNode, TagsNode, ItemArrayNode,
} from "../item-types.js";
const {
    buildEmptyItemTreeForShape, buildEmptyItemForShape,
    findContentNodesInItem, findHintNodesInItem, inferItemShape, itemToTree,
    treeToItem,
} = require("../items.js");
const shapes = require("../shapes.js");

describe("treeToItem", () => {
    it("wraps an item tree in the `_multi` key", () => {
        const tree = {__type: "hint"};
        assert.deepEqual({_multi: tree}, treeToItem(tree));
    });
});

describe("itemToTree", () => {
    it("unwraps an item tree from the `_multi` key", () => {
        const tree = {__type: "hint"};
        assert.deepEqual(tree, itemToTree({_multi: tree}));
    });
});

describe("buildEmptyItemTreeForShape and buildEmptyItemForShape", () => {
    const expectedEmptyContentNode = {
        "content": "",
        "images": {},
        "widgets": {},
        "__type": "content",
    };

    const expectedEmptyHintNode = {
        "replace": false,
        "content": "",
        "images": {},
        "widgets": {},
        "__type": "hint",
    };

    function assertEmptyItemTreeForShape(expectedEmptyTree: ItemTree, shape) {
        const emptyTree = buildEmptyItemTreeForShape(shape);
        assert.deepEqual(expectedEmptyTree, emptyTree);

        const expectedEmptyItem = treeToItem(expectedEmptyTree);
        const emptyItem = buildEmptyItemForShape(shape);
        assert.deepEqual(expectedEmptyItem, emptyItem);
    }

    it("creates an empty item", () => {
        assertEmptyItemTreeForShape(expectedEmptyContentNode, shapes.content);
    });

    it("creates an empty hint", () => {
        assertEmptyItemTreeForShape(expectedEmptyHintNode, shapes.hint);
    });

    it("creates empty tags", () => {
        assertEmptyItemTreeForShape(([]: TagsNode), shapes.tags);
    });

    it("creates an empty array", () => {
        assertEmptyItemTreeForShape(
            ([]: ItemArrayNode), shapes.arrayOf(shapes.content));
    });

    it("creates an empty object containing all node types", () => {
        const shape = shapes.shape({
            instructions: shapes.content,
            hint: shapes.hint,
            questions: shapes.arrayOf(shapes.content),
            context: shapes.shape({
                prompt: shapes.content,
                footnotes: shapes.content,
            }),
        });
        const expectedEmptyTree = {
            instructions: expectedEmptyContentNode,
            hint: expectedEmptyHintNode,
            questions: ([]: ItemArrayNode),
            context: {
                prompt: expectedEmptyContentNode,
                footnotes: expectedEmptyContentNode,
            },
        };
        assertEmptyItemTreeForShape(expectedEmptyTree, shape);
    });
});

describe("inferItemShape", () => {
    it("infers a content node's shape", () => {
        const item = buildEmptyItemForShape(shapes.content);
        assert.equal(shapes.content, inferItemShape(item));
    });

    it("infers a hint node's shape", () => {
        const item = buildEmptyItemForShape(shapes.hint);
        assert.equal(shapes.hint, inferItemShape(item));
    });

    it("infers a tags node's shape", () => {
        const item = treeToItem((["foo", "bar"]: TagsNode));
        assert.equal(shapes.tags, inferItemShape(item));
    });

    it("infers an object node's shape", () => {
        const shape = shapes.shape({
            content: shapes.content,
            hint: shapes.hint,
        });
        const item = buildEmptyItemForShape(shape);
        assert.deepEqual(shape, inferItemShape(item));
    });

    it("poorly infers an empty array node's shape", () => {
        const item = treeToItem(([]: ItemArrayNode));
        assert.deepEqual(shapes.arrayOf(shapes.content), inferItemShape(item));
    });

    it("correctly infers an nonempty single-typed array node's shape", () => {
        const item = treeToItem(([
            buildEmptyItemTreeForShape(shapes.hint),
            buildEmptyItemTreeForShape(shapes.hint),
            buildEmptyItemTreeForShape(shapes.hint),
        ]: ItemArrayNode));
        assert.deepEqual(shapes.arrayOf(shapes.hint), inferItemShape(item));
    });

    it("poorly infers an invalid multi-type array node's shape", () => {
        const item = treeToItem(([
            buildEmptyItemTreeForShape(shapes.hint),
            buildEmptyItemTreeForShape(shapes.content),
            buildEmptyItemTreeForShape(shapes.hint),
        ]: ItemArrayNode));
        assert.deepEqual(shapes.arrayOf(shapes.hint), inferItemShape(item));
    });
});

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

const shape = shapes.shape({
    a: shapes.content,
    b: shapes.arrayOf(shapes.content),
    c: shapes.shape({
        d: shapes.content,
        e: shapes.hint,
    }),
    f: shapes.hint,
});

const item: Item = treeToItem({
    a: content(1),
    b: ([content(2), content(3), content(4)]: ItemArrayNode),
    c: {
        d: content(5),
        e: hint(6),
    },
    f: hint(7),
});

describe("findContentNodesInItem", () => {
    it("calls the callback for each content node in the item", () => {
        const contents = [];
        findContentNodesInItem(item, shape, c => contents.push(c));
        contents.sort();
        assert.deepEqual(
            [content(1), content(2), content(3), content(4), content(5)],
            contents
        );
    });
});

describe("findHintNodesInItem", () => {
    it("calls the callback for each hint node in the item", () => {
        const hints = [];
        findHintNodesInItem(item, shape, c => hints.push(c));
        hints.sort();
        assert.deepEqual([hint(6), hint(7)], hints);
    });
});
