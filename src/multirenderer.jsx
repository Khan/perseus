const {
    buildEmptyItemTreeForShape, buildEmptyItemForShape,
    findContentNodesInItem, findHintNodesInItem, inferItemShape, treeToItem,
} =
    require("./multi-items/items.js");
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
    traverseShape(shape, tree, callback) {
        // TODO(mdr): The one webapp call site *just* wants to find content
        //     nodes. This isn't what traverseShape used to mean, but that's
        //     the only use case for it today, sooo, yeah.
        // TODO(mdr): Also, why isn't the item wrapped in `_multi` at that call
        //     site? (It's item-controls.jsx.)
        findContentNodesInItem(treeToItem(tree), shape, callback);
    },
    // TODO(mdr): Have the call site use inference and the find functions.
    findLeafNodes(item, leafCallback) {
        const shape = inferItemShape(item);

        // Use the mapper functions for iteration. Throw away the return value.
        findContentNodesInItem(
            item, shape, content => leafCallback(content, "item"));
        findHintNodesInItem(
            item, shape, hint => leafCallback(hint, "hint"));
    },

    // TODO(mdr): rename call sites
    emptyValueForShape: buildEmptyItemTreeForShape,
    shapePropType,
};
