// @flow
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
import type {Item, ContentNode, HintNode} from "./item-types.js";
import type {Shape, ArrayShape} from "./shape-types.js";
import type {Tree} from "./tree-types.js";
import type {
    TreeMapper, ContentMapper, HintMapper, ArrayMapper, Path
} from "./trees.js";

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


type ReactElement = any;  // TODO(mdr)
type FindWidgetsFilterCriterion = any;  // TODO(mdr)
type Hint = any;  // TODO(mdr)
type Score = any;  // TODO(mdr)
type SerializedState = any;  // TODO(mdr)
type WidgetRef = any;  // TODO(mdr)

type RendererElement = ReactElement;
type ContentRendererData = {
    renderer: RendererElement,
    ref: ?Renderer,
};
type HintRendererData = {
    renderer: RendererElement,
    ref: null,
    hint: Hint,
};
type RendererData = ContentRendererData | HintRendererData;
type RendererDataTree = Tree<ContentRendererData, HintRendererData>;
type RendererTree = Tree<RendererElement, RendererElement>;

type Props = {
    content: Item,  // TODO(mdr): Rename to item
    shape: Shape,
    children: (tree: RendererTree) => ReactElement,
};
type State = {
    rendererDataTree: ?RendererDataTree,
    renderError: ?Error,
};


class MultiRenderer extends React.Component {
    props: Props
    state: State

    constructor(props: Props) {
        super(props);

        this.state = this._tryMakeRendererState(this.props);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.content !== this.props.content) {
            this.setState(this._tryMakeRendererState(nextProps));
        }
    }

    _tryMakeRendererState(props: Props): State {
        try {
            return {
                rendererDataTree: this._makeRendererDataTree(
                    props.content, props.shape),
                renderError: null,
            };
        } catch (e) {
            console.error(e);
            return {
                rendererDataTree: null,
                renderError: e,
            };
        }
    }

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
    }

    _makeContentRendererData(content: ContentNode): ContentRendererData {
        // NOTE(emily): The `findExternalWidgets` function here is computed
        //     inline and thus changes each time we run this function. If it
        //     were to change every render, it would cause the Renderer to
        //     re-render a lot more than is necessary. Don't re-compute this
        //     element unless it is necessary!
        const data: any = {renderer: null, ref: null};
        data.renderer = <Renderer
            {...this._getRendererProps()}
            {...content}
            ref={e => data.ref = e}
            findExternalWidgets={
                criterion => this._findWidgets(data, criterion)}
        />;
        return data;
    }

    _makeHintRendererData(hint: HintNode): HintRendererData {
        // TODO(mdr): Once HintsRenderer supports inter-widget communication,
        //     give it a ref. Until then, leave the ref null forever, to avoid
        //     confusing the findWidgets functions.
        const data: any = {renderer: null, ref: null, hint: hint};
        data.renderer = <HintsRenderer
            {...this._getRendererProps()}
            hints={[hint]}
        />;
        return data;
    }

    _makeRendererDataTree(item: Item, shape: Shape): RendererDataTree {
        const itemTree = itemToTree(item);
        const mapper: TreeMapper<
            ContentNode, ContentRendererData, HintNode, HintRendererData
        > = 
            buildMapper()
            .setContentMapper(c => this._makeContentRendererData(c))
            .setHintMapper(h => this._makeHintRendererData(h));
        return mapper.mapTree(itemTree, shape);
    }

    _findWidgets(
        callingData: RendererData,
        filterCriterion: FindWidgetsFilterCriterion
    ): Array<WidgetRef> {
        const results = [];

        this._traverseRenderers(data => {
            if (callingData !== data && data.ref) {
                results.push(...data.ref.findInternalWidgets(filterCriterion));
            }
        });

        return results;
    }

    _traverseRenderers<O>(
        leafMapper:
            ContentMapper<RendererData, O> & HintMapper<RendererData, O>,
        arrayMapper: ?ArrayMapper<RendererData, O, RendererData, O>
    ): ?Tree<O, O> {
        const {rendererDataTree} = this.state;

        if (!rendererDataTree) {
            return null;
        }

        let mapper = buildMapper()
            .setContentMapper(leafMapper)
            .setHintMapper(leafMapper);
        if (arrayMapper) {
            mapper = mapper.setArrayMapper(arrayMapper);
        }
        return mapper.mapTree(rendererDataTree, this.props.shape);
    }

    _scoreFromRef(ref: Renderer): Score {
        if (!ref) {
            return null;
        }

        const [guess, score] = ref.guessAndScore();
        return Util.keScoreFromPerseusScore(score, guess);
    }

    // Return a structure in the shape of the content, with scores at each of
    // the leaf nodes.
    getScores(): Tree<Score, null> {
        return this._traverseRenderers(data => this._scoreFromRef(data.ref));
    }

    // Return a single score for all parts of the multi renderer. The guess is
    // an object in the shape of the content, with the individual guess at the
    // leaf node.
    score(): Score {
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
    }

    getSerializedState(): Tree<SerializedState, null> {
        return this._traverseRenderers(data => {
            if (!data.ref) {
                return null;
            }

            return data.ref.getSerializedState();
        });
    }

    restoreSerializedState(
        serializedState: SerializedState,
        callback: () => any,
    ) {
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
    }

    _annotateRendererArray(
        renderers: Array<Renderer>,
        rendererDatas: Array<RendererData>,
        shape: ArrayShape,
        path: Path
    ): Array<Renderer> {
        // Attach a `firstN` method to arrays of hints, which allows the layout
        // to render the hints together in one HintsRenderer.
        if (shape.elementShape.type === "hint") {
            // HACK(mdr): I know by the shape that these are HintRendererDatas,
            //     even though Flow can't prove it.
            const hintRendererDatas: Array<HintRendererData> =
                (rendererDatas: any);

            renderers = [...renderers];
            (renderers: any).firstN = (n) => <HintsRenderer
                {...this._getRendererProps()}
                hints={hintRendererDatas.map(d => d.hint)}
                hintsVisible={n}
            />;
        }
        return renderers;
    }

    _getRenderers(): Tree<Renderer, Renderer> {
        return this._traverseRenderers(
            data => data.renderer,
            (rs, rds, s, p) => this._annotateRendererArray(rs, rds, s, p)
        );
    }

    render() {
        if (this.state.renderError) {
            return <div className={css(styles.error)}>
                Error rendering: {String(this.state.renderError)}
            </div>;
        }

        return this.props.children({
            renderers: this._getRenderers(),
        });
    }
}


const styles = StyleSheet.create({
    error: {
        color: "red",
    },
});


module.exports = MultiRenderer;
