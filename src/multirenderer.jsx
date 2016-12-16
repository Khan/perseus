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
 *   content = {_multi: {
 *       left: <item data>,
 *       right: [<item data>, <item data>],
 *   }}
 *   shape = shapes.shape({
 *       left: shapes.item,
 *       right: shapes.arrayOf(shapes.item),
 *   })
 *
 *   <MultiRenderer content={content} shape={shape}>
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
 *
 * We currently have a strange distinction between content that is wrapped in
 * the unique `_multi` key and content that is not. Currently, the `_multi` key
 * is required when the content is used from the top-level, but not everywhere
 * else.
 * TODO(emily): Figure out an infrastructure where this isn't as confusing.
 */
const {StyleSheet, css} = require("aphrodite");
const lens = require("../hubble/index.js");
const React = require("react");

const HintsRenderer = require("./hints-renderer.jsx");
const Renderer = require("./renderer.jsx");
const Util = require("./util.js");

// Shape constructors to generate multi-item shapes. These work exactly like
// React propTypes.
const shapes = {
    item: {
        type: "item",
    },
    hint: {
        type: "hint",
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
shapes.hints = shapes.arrayOf(shapes.hint);

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
 * @param {LeafCallback} leafCallback: A function called with the data at each
 *     of the leaf nodes, and the path of the current leaf. The path is an
 *     array of keys inside the object.
 * @param {CollectionCallback} [collectionCallback=identity]: A function called
 *     for each of the interior container nodes to munge the data after
 *     traversing the child nodes.
 * @returns {} An object in the shape described by the shape argument, with the
 *     result of the callback() function at the leaves. Or, if the collection
 *     callback is specified, the value of that callback called on the top
 *     level value.
 */
function traverseShape(shape, data, leafCallback,
                       collectionCallback = identity) {
    return traverseShapeRec(shape, data, [], leafCallback, collectionCallback);
}

function traverseContent(shape, data, leafCallback, collectionCallback) {
    return traverseShape(shape, data._multi, leafCallback, collectionCallback);
}

/**
 * This callback is called for each of the leaf nodes of a shape when
 * traversing. Its return value is substituted in place of the leaf when
 * building the resulting structure.
 * @callback LeafCallback
 * @param {} data: The object found at the leaf position of the data object
 *     passed into the traversal.
 * @param {} shape: The shape of the leaf. Most notable (only?) attribute is
 *     the type attribute.
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
 * @param {} result: The collection found at the current place in the shape,
 *     with its contents already traversed and mapped.
 * @param {} data: The collection in the original tree, before being traversed
 *     and mapped.
 * @param {} shape: The shape of the collection.
 * @param {Array.<(string|number)>} path: The path of the collection within the
 *     overall object. The path is an array of keys within the object.
 * @returns {} A value which is placed at the location of the current shape in
 *     the object that is built by the traversal.
 */

function identity(x) {
    return x;
}

function traverseShapeRec(shape, data, path, leafCallback, collectionCallback) {
    if (shape.type === "item" || shape.type === "hint") {
        if (data && typeof data !== "object") {
            throw new Error(
                `Invalid object of type "${typeof data}" found at path ` +
                `${["<root>"].concat(path).join(".")}. ` +
                `Expected ${shape.type}.`);
        }
        return leafCallback(data, shape, path);
    } else if (shape.type === "array") {
        if (!Array.isArray(data)) {
            throw new Error(
                `Invalid object of type "${typeof data}" found at path ` +
                `${["<root>"].concat(path).join(".")}. Expected array.`);
        }

        const results = data.map((inner, i) => traverseShapeRec(
            shape.elementShape, inner, path.concat(i), leafCallback,
            collectionCallback));
        return collectionCallback(results, data, shape, path);
    } else if (shape.type === "object") {
        if (data && typeof data !== "object") {
            throw new Error(
                `Invalid object of type "${typeof data}" found at path ` +
                `${["<root>"].concat(path).join(".")}. Expected "object" ` +
                `type.`);
        }

        const object = {};
        Object.keys(shape.shape).forEach(key => {
            if (!data[key]) {
                throw new Error(
                    `Key "${key}" is missing from shape at path ` +
                    `${["<root>"].concat(path).join(".")}.`);
            }

            object[key] = traverseShapeRec(
                shape.shape[key], data[key], path.concat(key),
                leafCallback, collectionCallback);
        });
        return collectionCallback(object, data, shape, path);
    } else {
        throw new Error(
            `Invalid shape type "${shape.type}" at path ` +
            `${["<root>"].concat(path).join(".")}.`);
    }
}

function emptyContentForShape(shape) {
    return {
        _multi: emptyValueForShape(shape),
    };
}

function emptyValueForShape(shape) {
    if (shape.type === "item") {
        return {
            "content": "",
            "images": {},
            "widgets": {},
        };
    } else if (shape.type === "hint") {
        return {
            "replace": false,
            "content": "",
            "images": {},
            "widgets": {},
        };
    } else if (shape.type === "array") {
        return [];
    } else if (shape.type === "object") {
        const object = {};
        Object.keys(shape.shape).forEach(key => {
            object[key] = emptyValueForShape(shape.shape[key]);
        });
        return object;
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}

// Recursive prop type to check that the shape prop is structured correctly.
function shapePropType(...args) {
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

function shapeToPropType(shape) {
    return React.PropTypes.oneOfType([
        React.PropTypes.shape({
            _multi: shapeToPropTypeRec(shape),
        }),
        React.PropTypes.oneOf([null, undefined]),
    ]);
}

function shapeToPropTypeRec(shape) {
    if (shape.type === "item") {
        return React.PropTypes.shape({
            content: React.PropTypes.string,
            images: React.PropTypes.objectOf(React.PropTypes.any),
            widgets: React.PropTypes.objectOf(React.PropTypes.any),
        });
    } else if (shape.type === "hint") {
        return React.PropTypes.shape({
            content: React.PropTypes.string,
            images: React.PropTypes.objectOf(React.PropTypes.any),
            widgets: React.PropTypes.objectOf(React.PropTypes.any),
            replace: React.PropTypes.bool,
        });
    } else if (shape.type === "array") {
        const elementPropType = shapeToPropTypeRec(shape.elementShape);
        return React.PropTypes.arrayOf(elementPropType.isRequired);
    } else if (shape.type === "object") {
        const propTypeShape = {};
        Object.keys(shape.shape).forEach(key => {
            propTypeShape[key] =
                shapeToPropTypeRec(shape.shape[key]).isRequired;
        });
        return React.PropTypes.shape(propTypeShape);
    } else {
        throw new Error(`unexpected shape type ${shape.type}`);
    }
}

const MultiRenderer = React.createClass({
    propTypes: {
        content: React.PropTypes.shape({
            _multi: React.PropTypes.any.isRequired,
        }).isRequired,
        shape: shapePropType,
        children: React.PropTypes.func.isRequired,
    },

    getInitialState() {
        return this._tryMakeRendererState(this.props);
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.content !== this.props.content) {
            this.setState(this._tryMakeRendererState(nextProps));
        }
    },

    _tryMakeRendererState(props) {
        try {
            return {
                rendererData: this._makeRenderers(
                    props.shape, props.content),
                renderError: null,
            };
        } catch (e) {
            return {
                rendererData: null,
                renderError: e,
            };
        }
    },

    _getRendererProps() {
        /* eslint-disable no-unused-vars */
        // eslint is complaining that `content` and `children` are unused. I'm
        // explicitly pulling them out of `this.props` so I don't pass them to
        // `<Renderer>`. I'm not sure how else to do this.
        const {
            content,
            children,
            shape,
            ...otherProps, // @Nolint(trailing comma): I'm so confused why it's
                           // complaining about this, we want trailing commas..
        } = this.props;
        /* eslint-enable no-unused-vars */

        return otherProps;
    },

    _makeRendererData(renderable, shape) {
        const rendererProps = this._getRendererProps();

        if (shape.type === "item") {
            // NOTE(emily): The `findExternalWidgets` function here is computed
            // inline and thus changes each time we run this function. If it
            // were to change every render, it would cause the Renderer to
            // re-render a lot more than is necessary. Don't re-compute this
            // element unless it is necessary!
            const data = {renderer: null, ref: null};
            data.renderer = <Renderer
                {...rendererProps}
                {...renderable}
                ref={e => data.ref = e}
                findExternalWidgets={
                    criterion => this._findWidgets(data, criterion)}
            />;
            return data;
        } else if (shape.type === "hint") {
            // TODO(mdr): Once HintsRenderer supports inter-widget
            //     communication, give it a ref. Until then, leave the ref null
            //     forever, to avoid confusing the findWidgets functions.
            const data = {renderer: null, ref: null, hint: renderable};
            data.renderer = <HintsRenderer
                {...rendererProps}
                hints={[renderable]}
            />;
            return data;
        } else {
            throw new Error(`can't create renderer for type ${shape.type}`);
        }
    },

    _makeRenderers(shape, content) {
        return traverseContent(shape, content, this._makeRendererData);
    },

    _findWidgets(callingData, filterCriterion) {
        const results = [];

        this._traverseRenderers(data => {
            if (callingData !== data && data.ref) {
                results.push(...data.ref.findInternalWidgets(filterCriterion));
            }
        });

        return results;
    },

    _traverseRenderers(...args) {
        return traverseShape(
            this.props.shape, this.state.rendererData, ...args);
    },

    _scoreFromRef(ref) {
        if (!ref) {
            return null;
        }

        const [guess, score] = ref.guessAndScore();
        return Util.keScoreFromPerseusScore(score, guess);
    },

    // Return a structure in the shape of the content, with scores at each of
    // the leaf nodes.
    getScores() {
        return this._traverseRenderers(data => this._scoreFromRef(data.ref));
    },

    // Return a single score for all parts of the multi renderer. The guess is
    // an object in the shape of the content, with the individual guess at the
    // leaf node.
    score() {
        const scores = [];
        const guess = this._traverseRenderers(data => {
            if (!data.ref) {
                return null;
            }

            scores.push(data.ref.score());
            return data.ref.getUserInput();
        });

        const combinedScore = scores.reduce(Util.combineScores);

        return Util.keScoreFromPerseusScore(combinedScore, guess);
    },

    getSerializedState() {
        return this._traverseRenderers(data => {
            if (!data.ref) {
                return null;
            }

            return data.ref.getSerializedState();
        });
    },

    restoreSerializedState(serializedState, callback) {
        // We want to call our async callback only once all of the childrens'
        // callbacks have run. We add one to this counter before we call out to
        // each renderer and decrement it when it runs our callback.
        let numCallbacks = 0;
        const countCallback = () => {
            numCallbacks--;
            if (callback && numCallbacks === 0) {
                callback();
            }
        };

        this._traverseRenderers((data, _, path) => {
            if (!data.ref) {
                return;
            }

            const state = lens(serializedState).get(path);
            if (!state) {
                return;
            }

            numCallbacks++;
            data.ref.restoreSerializedState(state, countCallback);
        });
    },

    _annotateRendererCollection(renderers, data, shape, path) {
        // Attach a `firstN` method to arrays of hints, which allows the layout
        // to render the hints together in one HintsRenderer.
        if (shape.type === "array" && shape.elementShape.type === "hint") {
            renderers = [...renderers];
            renderers.firstN = (n) => <HintsRenderer
                {...this._getRendererProps()}
                hints={data.map(d => d.hint)}
                hintsVisible={n}
            />;
        }
        return renderers;
    },

    _getRenderers() {
        return this._traverseRenderers(
            data => data.renderer, this._annotateRendererCollection);
    },

    render() {
        if (this.state.renderError) {
            return <div className={css(styles.error)}>
                Error rendering: {"" + this.state.renderError}
            </div>;
        }

        return this.props.children({
            renderers: this._getRenderers(),
        });
    },
});

const styles = StyleSheet.create({
    error: {
        color: "red",
    },
});

module.exports = {
    MultiRenderer,
    shapes,
    emptyContentForShape,
    shapeToPropType,
    traverseShape,
    traverseContent,

    emptyValueForShape,
    shapePropType,
};
