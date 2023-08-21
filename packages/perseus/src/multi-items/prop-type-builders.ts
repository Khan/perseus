/**
 * Utility functions to build React PropTypes for multi-items and shapes.
 *
 * If you're writing new components, though, consider using the Item and Shape
 * types instead.
 */
/* instanbul ignore file */

import PropTypes from "prop-types";

import {Errors} from "../logging/log";
import {PerseusError} from "../perseus-error";

import type {Shape} from "./shape-types";

/**
 * A recursive PropType that accepts Shape objects, and rejects other objects.
 *
 * Usage: `propTypes: {shape: shapePropType}`.
 */
export function shapePropType(...args: ReadonlyArray<any>): any {
    const itemShape = PropTypes.oneOfType([
        PropTypes.shape({
            type: PropTypes.oneOf(["content"]).isRequired,
        }).isRequired,
        PropTypes.shape({
            type: PropTypes.oneOf(["hint"]).isRequired,
        }).isRequired,
        PropTypes.shape({
            type: PropTypes.oneOf(["tags"]).isRequired,
        }).isRequired,
        PropTypes.shape({
            type: PropTypes.oneOf(["object"]).isRequired,
            shape: PropTypes.objectOf(shapePropType),
        }).isRequired,
        PropTypes.shape({
            type: PropTypes.oneOf(["array"]).isRequired,
            elementShape: shapePropType,
        }).isRequired,
    ]);

    // @ts-expect-error - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
    return itemShape(...args);
}

/**
 * Return a PropType that accepts Items of the given shape, and rejects other
 * objects.
 *
 * Usage: `propTypes: {item: buildPropTypeForShape(myShape)}`
 */
export function buildPropTypeForShape(shape: Shape): any {
    return PropTypes.oneOfType([
        PropTypes.shape({
            _multi: buildTreePropTypeForShape(shape),
        }),
        PropTypes.oneOf([null, undefined]),
    ]);
}

/**
 * Return a PropType that accepts ItemTrees of the given shape, and rejects
 * other objects.
 */
function buildTreePropTypeForShape(shape: Shape): any {
    if (shape.type === "content") {
        return PropTypes.shape({
            // TODO(mdr): Remove #LegacyContentNode support.
            __type: PropTypes.oneOf(["content", "item"]).isRequired,
            content: PropTypes.string,
            images: PropTypes.objectOf(PropTypes.any),
            widgets: PropTypes.objectOf(PropTypes.any),
        });
    }
    if (shape.type === "hint") {
        return PropTypes.shape({
            __type: PropTypes.oneOf(["hint"]).isRequired,
            content: PropTypes.string,
            images: PropTypes.objectOf(PropTypes.any),
            widgets: PropTypes.objectOf(PropTypes.any),
            replace: PropTypes.bool,
        });
    }
    if (shape.type === "tags") {
        return PropTypes.arrayOf(PropTypes.string.isRequired);
    }
    if (shape.type === "array") {
        const elementPropType = buildTreePropTypeForShape(shape.elementShape);
        return PropTypes.arrayOf(elementPropType.isRequired);
    }
    if (shape.type === "object") {
        const valueShapes = shape.shape;
        const propTypeShape: Record<string, any> = {};
        Object.keys(valueShapes).forEach((key) => {
            propTypeShape[key] = buildTreePropTypeForShape(
                valueShapes[key],
            ).isRequired;
        });
        return PropTypes.shape(propTypeShape);
    }
    throw new PerseusError(
        // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'never'.
        `unexpected shape type ${shape.type}`,
        Errors.InvalidInput,
    );
}
