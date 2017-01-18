const {buildEmptyItemTreeForShape, buildEmptyItemForShape, itemToTree} =
    require("./multi-items/items.js");
const {buildMapper} =
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
        // TODO(mdr): I dropped the collection callback, becuase I don't think
        //     we use it anywhere anymore?
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
        return buildMapper()
            .setContentMapper(content => leafCallback(content, "item"))
            .setHintMapper(hint => leafCallback(hint, "hint"))
            .mapTree(tree, shape);
    },

    // TODO(mdr): rename call sites
    emptyValueForShape: buildEmptyItemTreeForShape,
    shapePropType,
};
