import {
    buildEmptyItemTreeForShape,
    buildEmptyItemForShape,
    findContentNodesInItem,
    findHintNodesInItem,
    inferItemShape,
    itemToTree,
    treeToItem,
} from "../items";
import shapes from "../shapes";

import type {
    Item,
    ItemTree,
    ContentNode,
    HintNode,
    TagsNode,
    ItemArrayNode,
} from "../item-types";
import type {
    ContentShape,
    HintShape,
    TagsShape,
    ArrayShape,
    ObjectShape,
} from "../shape-types";

describe("treeToItem", () => {
    it("wraps an item tree in the `_multi` key", () => {
        const tree = {__type: "hint"} as const;
        expect({_multi: tree}).toEqual(treeToItem(tree));
    });
});

describe("itemToTree", () => {
    it("unwraps an item tree from the `_multi` key", () => {
        const tree = {__type: "hint"} as const;
        expect(tree).toEqual(itemToTree({_multi: tree}));
    });
});

describe("buildEmptyItemTreeForShape and buildEmptyItemForShape", () => {
    const expectedEmptyContentNode = {
        content: "",
        images: {},
        widgets: {},
        __type: "content",
    } as const;

    const expectedEmptyHintNode = {
        replace: false,
        content: "",
        images: {},
        widgets: {},
        __type: "hint",
    } as const;

    function assertEmptyItemTreeForShape(
        expectedEmptyTree: ItemTree,
        shape: ContentShape | HintShape | TagsShape | ArrayShape | ObjectShape,
    ) {
        const emptyTree = buildEmptyItemTreeForShape(shape);
        expect(emptyTree).toEqual(expectedEmptyTree);

        const expectedEmptyItem = treeToItem(expectedEmptyTree);
        const emptyItem = buildEmptyItemForShape(shape);
        expect(emptyItem).toEqual(expectedEmptyItem);
    }

    it("creates an empty item", () => {
        assertEmptyItemTreeForShape(expectedEmptyContentNode, shapes.content);
    });

    it("creates an empty hint", () => {
        assertEmptyItemTreeForShape(expectedEmptyHintNode, shapes.hint);
    });

    it("creates empty tags", () => {
        assertEmptyItemTreeForShape([] as TagsNode, shapes.tags);
    });

    it("creates an empty array", () => {
        assertEmptyItemTreeForShape(
            [] as ItemArrayNode,
            shapes.arrayOf(shapes.content),
        );
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
            questions: [] as ItemArrayNode,
            context: {
                prompt: expectedEmptyContentNode,
                footnotes: expectedEmptyContentNode,
            },
        } as const;
        assertEmptyItemTreeForShape(expectedEmptyTree, shape);
    });
});

describe("inferItemShape", () => {
    it("infers a content node's shape", () => {
        const item = buildEmptyItemForShape(shapes.content);
        expect(shapes.content).toEqual(inferItemShape(item));
    });

    // TODO(mdr): Remove #LegacyContentNode support.
    it("infers a legacy content node's shape", () => {
        const item = {
            _multi: {
                __type: "item",
                content: "",
                images: {},
                widgets: {},
            },
        } as const;
        expect(shapes.content).toEqual(inferItemShape(item));
    });

    it("infers a hint node's shape", () => {
        const item = buildEmptyItemForShape(shapes.hint);
        expect(shapes.hint).toEqual(inferItemShape(item));
    });

    it("infers a tags node's shape", () => {
        const item = treeToItem(["foo", "bar"] as TagsNode);
        expect(shapes.tags).toEqual(inferItemShape(item));
    });

    it("infers an object node's shape", () => {
        const shape = shapes.shape({
            content: shapes.content,
            hint: shapes.hint,
        });
        const item = buildEmptyItemForShape(shape);
        expect(shape).toEqual(inferItemShape(item));
    });

    it("poorly infers an empty array node's shape", () => {
        const item = treeToItem([] as ItemArrayNode);
        expect(shapes.arrayOf(shapes.content)).toEqual(inferItemShape(item));
    });

    it("correctly infers an nonempty single-typed array node's shape", () => {
        const item = treeToItem([
            /**
             * TODO(somewhatabstract, JIRA-XXXX):
             * The Tree types are really hard to work with properly.
             */ buildEmptyItemTreeForShape(shapes.hint),
            buildEmptyItemTreeForShape(shapes.hint),
            buildEmptyItemTreeForShape(shapes.hint),
        ] as ItemArrayNode);
        expect(shapes.arrayOf(shapes.hint)).toEqual(inferItemShape(item));
    });

    it("poorly infers an invalid multi-type array node's shape", () => {
        const item = treeToItem([
            /**
             * TODO(somewhatabstract, JIRA-XXXX):
             * The Tree types are really hard to work with properly.
             */ buildEmptyItemTreeForShape(shapes.hint),
            buildEmptyItemTreeForShape(shapes.content),
            buildEmptyItemTreeForShape(shapes.hint),
        ] as ItemArrayNode);
        expect(shapes.arrayOf(shapes.hint)).toEqual(inferItemShape(item));
    });
});

function content(n: number): ContentNode {
    return {
        __type: "content",
        content: `content ${n}`,
    };
}

function hint(n: number): HintNode {
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
    /**
     * TODO(somewhatabstract, JIRA-XXXX):
     * The Tree types are really hard to work with properly.
     */ b: [content(2), content(3), content(4)] as ItemArrayNode,
    c: {
        d: content(5),
        e: hint(6),
    },
    f: hint(7),
});

describe("findContentNodesInItem", () => {
    it("calls the callback for each content node in the item", () => {
        const contents = [];
        // @ts-expect-error - TS2345 - Argument of type 'ContentNode' is not assignable to parameter of type 'never'.
        findContentNodesInItem(item, shape, (c) => contents.push(c));
        contents.sort();
        expect([
            content(1),
            content(2),
            content(3),
            content(4),
            content(5),
        ]).toEqual(contents);
    });
});

describe("findHintNodesInItem", () => {
    it("calls the callback for each hint node in the item", () => {
        const hints: Array<HintNode | any> = [];
        findHintNodesInItem(item, shape, (c) => hints.push(c));
        hints.sort();
        expect([hint(6), hint(7)]).toEqual(hints);
    });
});
