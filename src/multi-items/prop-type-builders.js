// @flow
/**
 * Utility functions to build React PropTypes for multi-items and shapes.
 *
 * If you're writing new components, though, consider using the Item and Shape
 * Flow types instead.
 */
const React = require("react");

import type {Shape} from "./shape-types.js";


/**
 * A recursive PropType that accepts Shape objects, and rejects other objects.
 *
 * Usage: `propTypes: {shape: shapePropType}`.
 */
function shapePropType(...args: Array<any>) {
    const itemShape = React.PropTypes.oneOfType([
        React.PropTypes.shape({
            type: React.PropTypes.oneOf(["item"]).isRequired,
        }).isRequired,
        React.PropTypes.shape({
            type: React.PropTypes.oneOf(["hint"]).isRequired,
        }).isRequired,
        React.PropTypes.shape({
            type: React.PropTypes.oneOf(["object"]).isRequired,
            shape: React.PropTypes.objectOf(shapePropType),
        }).isRequired,
        React.PropTypes.shape({
            type: React.PropTypes.oneOf(["array"]).isRequired,
            elementShape: shapePropType,
        }).isRequired,
    ]);

    return itemShape(...args);
}


/**
 * Return a PropType that accepts Items of the given shape, and rejects other
 * objects.
 *
 * Usage: `propTypes: {item: buildPropTypeForShape(myShape)}`
 */
function buildPropTypeForShape(shape: Shape) {
    return React.PropTypes.oneOfType([
        React.PropTypes.shape({
            _multi: buildTreePropTypeForShape(shape),
        }),
        React.PropTypes.oneOf([null, undefined]),
    ]);
}


/**
 * Return a PropType that accepts ItemTrees of the given shape, and rejects
 * other objects.
 */
function buildTreePropTypeForShape(shape: Shape) {
    if (shape.type === "item") {
        return React.PropTypes.shape({
            __type: React.PropTypes.oneOf(["item"]).isRequired,
            content: React.PropTypes.string,
            images: React.PropTypes.objectOf(React.PropTypes.any),
            widgets: React.PropTypes.objectOf(React.PropTypes.any),
        });
    } else if (shape.type === "hint") {
        return React.PropTypes.shape({
            __type: React.PropTypes.oneOf(["hint"]).isRequired,
            content: React.PropTypes.string,
            images: React.PropTypes.objectOf(React.PropTypes.any),
            widgets: React.PropTypes.objectOf(React.PropTypes.any),
            replace: React.PropTypes.bool,
        });
    } else if (shape.type === "array") {
        const elementPropType = buildTreePropTypeForShape(shape.elementShape);
        return React.PropTypes.arrayOf(elementPropType.isRequired);
    } else if (shape.type === "object") {
        const valueShapes = shape.shape;
        const propTypeShape = {};
        Object.keys(valueShapes).forEach(key => {
            propTypeShape[key] =
                buildTreePropTypeForShape(valueShapes[key]).isRequired;
        });
        return React.PropTypes.shape(propTypeShape);
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}


module.exports = {
    shapePropType,
    buildPropTypeForShape,
};
