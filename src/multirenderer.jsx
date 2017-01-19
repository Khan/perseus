const {buildEmptyItemTreeForShape, buildEmptyItemForShape, itemToTree} =
    require("./multi-items/items.js");
const {buildMapper, mapContentNodes, mapHintNodes} =
    require("./multi-items/trees.js");
const MultiRenderer = require("./multi-items/multi-renderer.jsx");
const {shapePropType, buildPropTypeForShape} =
    require("./multi-items/prop-type-builders.js");
const shapes = require("./multi-items/shapes.js");

module.exports = {
    MultiRenderer,
    // TODO(mdr): Expose this as the `content` shape and not the `item` shape.
    shapes: {...shapes, item: shapes.content},
    // TODO(mdr): rename call sites
    emptyContentForShape: buildEmptyItemForShape,
    // TODO(mdr): rename call sites
    shapeToPropType: buildPropTypeForShape,
    traverseShape(shape, tree, leafMapper) {
        // TODO(mdr): I dropped the collection callback, because I don't think
        //     any external call sites use it.
        return buildMapper()
            .setContentMapper(leafMapper)
            .setHintMapper(leafMapper)
            .mapTree(tree, shape);
    },
    // TODO(mdr): Let's just have the call site do the unwrap and the inference
    //     and the other things.
    findLeafNodes(item, leafCallback) {
        const tree = itemToTree(item);
        const shape = shapes.inferTreeShape(tree);

        // Use the mapper functions for iteration. Throw away the return value.
        mapContentNodes(tree, shape, content => leafCallback(content, "item"));
        mapHintNodes(tree, shape, hint => leafCallback(hint, "hint"));
    },

    // TODO(mdr): rename call sites
    emptyValueForShape: buildEmptyItemTreeForShape,
    shapePropType,
};
