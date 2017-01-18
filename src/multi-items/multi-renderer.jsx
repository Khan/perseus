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
const lens = require("../../hubble/index.js");
const React = require("react");

const {buildEmptyItemTreeForShape, buildEmptyItemForShape, itemToTree} =
    require("./items.js");
const HintsRenderer = require("../hints-renderer.jsx");
const {shapePropType, buildPropTypeForShape} =
    require("./prop-type-builders.js");
const Renderer = require("../renderer.jsx");
const shapes = require("./shapes.js");
const {buildMapper, mapContentNodes, mapHintNodes} =
    require("./trees.js");
const Util = require("../util.js");

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
            console.error(e);
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
        const itemTree = itemToTree(content);
        return buildMapper()
            .setContentMapper(this._makeRendererData)
            .setHintMapper(this._makeRendererData)
            .mapTree(itemTree, shape);
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

    _traverseRenderers(leafMapper, arrayMapper) {
        let mapper = buildMapper()
            .setContentMapper(leafMapper)
            .setHintMapper(leafMapper);
        if (arrayMapper) {
            mapper = mapper.setArrayMapper(arrayMapper);
        }
        return mapper.mapTree(this.state.rendererData, this.props.shape);
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

    _annotateRendererArray(renderers, data, shape, path) {
        // Attach a `firstN` method to arrays of hints, which allows the layout
        // to render the hints together in one HintsRenderer.
        if (shape.elementShape.type === "hint") {
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
            data => data.renderer, this._annotateRendererArray);
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

module.exports = MultiRenderer;
