// @flow
const React = require("react");

import type {Shape} from "./shapes.js";


// Recursive prop type to check that the shape prop is structured correctly.
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


// A propType that matches multi-items of the given shape.
function buildPropTypeForShape(shape: Shape) {
    return React.PropTypes.oneOfType([
        React.PropTypes.shape({
            _multi: buildPropTypeForShapeRec(shape),
        }),
        React.PropTypes.oneOf([null, undefined]),
    ]);
}


function buildPropTypeForShapeRec(shape: Shape) {
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
        const elementPropType = buildPropTypeForShapeRec(shape.elementShape);
        return React.PropTypes.arrayOf(elementPropType.isRequired);
    } else if (shape.type === "object") {
        const valueShapes = shape.shape;
        const propTypeShape = {};
        Object.keys(valueShapes).forEach(key => {
            propTypeShape[key] =
                buildPropTypeForShapeRec(valueShapes[key]).isRequired;
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
