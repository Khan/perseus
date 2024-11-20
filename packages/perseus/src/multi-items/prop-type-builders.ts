/**
 * Utility functions to build React PropTypes for multi-items and shapes.
 *
 * If you're writing new components, though, consider using the Item and Shape
 * types instead.
 */
/* instanbul ignore file */

import {Errors, PerseusError} from "@khanacademy/perseus-core";
import PropTypes from "prop-types";

import type {Shape} from "./shape-types";

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
