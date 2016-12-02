/**
 * Main entry point to the MultiRenderer render portion.
 *
 * Mainly, this file exposes the `MultiRenderer` component which performs
 * multi-rendering. To multi-render a question, pass in the content of the item
 * to the `MultiRenderer` component as a props. Then, pass in a function which
 * takes an object of renderers (in the same structure as the content), and
 * return a render tree. The `MultiRenderer` component will allow you to
 * combine scores, serialized state, etc. without having to manually call on
 * each of the functions. It also handles inter-widgets requests between the
 * different renderers.
 *
 * Example:
 *
 *   content = { left: <item data>, right: [<item data>, <item data>] }
 *
 *   <MultiRenderer content={content}>
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
 * This also exposes the shape system for describing the shape of a piece of
 * multi-item content, and a `traverseShape` function for traversing a piece of
 * content using its shape.
 */
const React = require("react");

const Renderer = require("./renderer.jsx");

// Shape constructors to generate multi-item shapes. These work exactly like
// React propTypes.
const shapes = {
    item: {
        type: "item",
    },
    arrayOf: elementShape => ({
        type: "array",
        elementShape,
    }),
    shape: shape => ({
        type: "object",
        shape,
    }),
};

/**
 * Traverse a multirenderer item shape and piece of data at the same time, and
 * call the callback with the data at each of the leaf nodes of the shape (an
 * item) is reached. Returns data of the same structure as the shape, with the
 * leaf node data being whatever is returned from the callback.
 *
 * Example:
 *
 *   data = {
 *       x: 1,
 *       y: [2, 3, 4],
 *       z: {v: 5, w: 6},
 *   }
 *   shape = shapes.shape({
 *       x: shapes.item,
 *       y: shapes.arrayOf(shapes.item),
 *       z: shapes.shape({
 *           v: shapes.item,
 *           w: shapes.item,
 *       }),
 *   })
 *
 *   traverseShape(shape, data, x => x + 1)
 *
 * This would call the callback with the values 1, 2, 3, 4, 5, and 6, and would
 * return an object of the shape
 *
 *   {
 *     x: 2,
 *     y: [3, 4, 5],
 *     z: {v: 6, w: 7},
 *   }
 *
 * @function traverseShape
 * @param {} shape: A shape returned from one of the shapes constructors.
 * @param {} data: Some data in the shape that is described by the shape
 *     argument.
 * @param {ItemCallback} itemCallback: A function called with the data at each
 *     of the leaf nodes, and the path of the current item. The path is an
 *     array of keys inside the object.
 * @param {CollectionCallback} [collectionCallback=identity]: A function called
 *     for each of the interior container nodes to munge the data after
 *     traversing the child nodes.
 * @returns {} An object in the shape described by the shape argument, with the
 *     result of the callback() function at the leaves. Or, if the collection
 *     callback is specified, the value of that callback called on the top
 *     level value.
 */
function traverseShape(shape, data, itemCallback,
                       collectionCallback = identity) {
    return traverseShapeRec(shape, data, [], itemCallback, collectionCallback);
}

/**
 * This callback is called for each of the leaf nodes of a shape when
 * traversing. Its return value is substituted in place of the leaf when
 * building the resulting structure.
 * @callback ItemCallback
 * @param {} data: The object found at the leaf position of the data object
 *     passed into the traversal.
 * @param {Array.<(string|number)>} path: The path of the leaf node within the
 *     object. The path is an array of keys within the object.
 * @returns {} A value which is placed in the object that is built by the
 *     traversal.
 */

/**
 * This callback is called on each of the interior nodes of a shape (i.e.
 * arrays or objects). Its return value is used in place of that structure in
 * the resulting object.
 * @callback CollectionCallback
 * @param {} data: The collection found at the current place in the shape, with
 *     its contents already traversed and mapped.
 * @param {} shape: The shape of the collection.
 * @param {Array.<(string|number)>} path: The path of the collection within the
 *     overall object. The path is an array of keys within the object.
 * @returns {} A value which is placed at the location of the current shape in
 *     the object that is built by the traversal.
 */

function identity(x) {
    return x;
}

function traverseShapeRec(shape, data, path, itemCallback, collectionCallback) {
    if (shape.type === "item") {
        return itemCallback(data, path);
    } else if (shape.type === "array") {
        const results = data.map((inner, i) => traverseShapeRec(
            shape.elementShape, inner, path.concat(i), itemCallback,
            collectionCallback));
        return collectionCallback(results, shape, path);
    } else if (shape.type === "object") {
        const object = {};
        Object.keys(shape.shape).forEach(key => {
            object[key] = traverseShapeRec(
                shape.shape[key], data[key], path.concat(key),
                itemCallback, collectionCallback);
        });
        return collectionCallback(object, shape, path);
    } else {
        throw new Error(`Invalid shape type: ${shape.type}`);
    }
}

// Recursive prop type to check that the shape prop is structured correctly.
function shapePropType(...args) {
    const itemShape = React.PropTypes.oneOfType([
        React.PropTypes.shape({
            type: React.PropTypes.oneOf(["item"]).isRequired,
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

const MultiRenderer = React.createClass({
    propTypes: {
        content: React.PropTypes.any.isRequired,
        shape: shapePropType,
        children: React.PropTypes.func.isRequired,
    },

    componentWillMount() {
        this._rendererData = this._makeRenderers(
            this.props.shape, this.props.content);
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.content !== this.props.content) {
            this._rendererData = this._makeRenderers(
                nextProps.shape, nextProps.content);
        }
    },

    _makeRendererData(item) {
        const data = {
            renderer: null,
            ref: null,
        };

        /* eslint-disable no-unused-vars */
        // eslint is complaining that `content` and `children` are unused. I'm
        // explicitly pulling them out of `this.props` so I don't pass them to
        // `<Renderer>`. I'm not sure how else to do this.
        const {
            content,
            children,
            ...otherProps, // @Nolint(trailing comma): I'm so confused why it's
                           // complaining about this, we want trailing commas..
        } = this.props;
        /* eslint-enable no-unused-vars */

        // NOTE(emily): The `findExternalWidgets` function here is computed
        // inline and thus changes each time we run this function. If it were
        // to change every render, it would cause the Renderer to re-render a
        // lot more than is necessary. Don't re-compute this element unless it
        // is necessary!
        data.renderer = <Renderer
            {...otherProps}
            {...item}
            ref={e => data.ref = e}
            findExternalWidgets={
                criterion => this._findWidgets(data, criterion)}
        />;

        return data;
    },

    _makeRenderers(shape, content) {
        return traverseShape(shape, content, this._makeRendererData);
    },

    _findWidgets(callingData, filterCriterion) {
        const results = [];

        traverseShape(this.props.shape, this._rendererData, data => {
            if (callingData !== data && data.ref) {
                results.push(...data.ref.findInternalWidgets(filterCriterion));
            }
        });

        return results;
    },

    _getRenderers() {
        return traverseShape(
            this.props.shape, this._rendererData, data => data.renderer);
    },

    render() {
        return <div>
            {this.numRenderers}
            {this.props.children({
                renderers: this._getRenderers(),
            })}
        </div>;
    },
});

module.exports = {
    MultiRenderer,
    shapes,
    traverseShape,
};
