// @flow
/**
 * This library provides support for Perseus multi-items: structured Perseus
 * content that content creators can easily create, and that applications can
 * easily render into different parts of the layout.
 *
 * For more details about application and motivation, see:
 * https://sites.google.com/a/khanacademy.org/forge/for-developers/perseus-items-and-multi-items
 *
 * This file primarily exposes the `MultiRenderer` component, which performs
 * multi-rendering. To multi-render a question, pass in the content of the item
 * to the `MultiRenderer` component as a props. Then, pass in a function which
 * takes an object of renderers (in the same structure as the content), and
 * return a render tree. The `MultiRenderer` component will allow you to
 * combine scores, serialized state, etc. without having to manually call on
 * each of the functions. It also handles inter-widgets requests between the
 * different renderers.
 * For more details, see `multi-items/multi-renderer.jsx`.
 *
 * Example:
 *
 *   item = {_multi: {
 *       left: <content data>,
 *       right: [<content data>, <content data>],
 *   }}
 *   shape = shapes.shape({
 *       left: shapes.content,
 *       right: shapes.arrayOf(shapes.content),
 *   })
 *
 *   <MultiRenderer item={item} shape={shape}>
 *       {({renderers}) =>
 *           <div>
 *               <div id="left">{renderers.left}</div>
 *               <ul id="right">
 *                   {renderers.right.map(r => <li>{r}</li>)}
 *               </ul>
 *           </div>
 *       }
 *   </MultiRenderer>
 *
 * This file also exposes `shapes`, which helps you construct a runtime type
 * declaration for your particular class of multi-item. This can then be used
 * to create a MultirendererEditor for your multi-item shape, and to validate
 * that a multi-item conforms to the shape via `buildPropTypeForShape`.
 * For more details, see `multi-items/shapes.js`.
 *
 * This file also exposes some utility functions for working with generic
 * multi-items, like `findContentNodesInItem`, `findHintNodesInItem`,
 * `inferItemShape`, and `buildEmptyItemForShape`.
 * For more details, see `multi-items/items.js`.
 */
const {
    buildEmptyItemForShape, findContentNodesInItem, findHintNodesInItem,
    inferItemShape,
} = require("./multi-items/items.js");
const MultiRenderer = require("./multi-items/multi-renderer.jsx");
const {buildPropTypeForShape} = require("./multi-items/prop-type-builders.js");
const shapes = require("./multi-items/shapes.js");

module.exports = {
    // Tools for rendering your multi-items
    MultiRenderer,

    // Tools for declaring your multi-item shapes
    shapes,
    buildPropTypeForShape,

    // Tools for generically manipulating multi-items
    buildEmptyItemForShape,
    findContentNodesInItem,
    findHintNodesInItem,
    inferItemShape,
};
