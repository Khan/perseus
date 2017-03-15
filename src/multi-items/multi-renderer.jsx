// @flow
/**
 * Main entry point to the MultiRenderer render portion.
 *
 * This file exposes the `MultiRenderer` component which performs
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
 */
import type {Item, ContentNode, HintNode, TagsNode} from "./item-types.js";
import type {Shape, ArrayShape} from "./shape-types.js";
import type {Tree} from "./tree-types.js";
import type {
    TreeMapper, ContentMapper, HintMapper,
} from "./trees.js";

const {StyleSheet, css} = require("aphrodite");
const lens = require("../../hubble/index.js");
const React = require("react");

const {itemToTree} = require("./items.js");
const HintsRenderer = require("../hints-renderer.jsx");
const Renderer = require("../renderer.jsx");
const {buildMapper} = require("./trees.js");
const Util = require("../util.js");

type ReactElement = any;  // TODO(mdr)
type FindWidgetsFilterCriterion = any;  // TODO(mdr)
type Hint = any;  // TODO(mdr)
type Score = any;  // TODO(mdr)
type SerializedState = any;  // TODO(mdr)
type WidgetRef = any;  // TODO(mdr)

type RendererProps = {};

type ContentRendererElement = ReactElement;
type HintRendererElement = ReactElement;
type ContentRendererData = {
    makeRenderer: (rendererProps: RendererProps) => ContentRendererElement,
    ref: ?Renderer,
};
type HintRendererData = {
    makeRenderer: (rendererProps: RendererProps) => HintRendererElement,
    ref: null,
    hint: Hint,
};
type RendererData = ContentRendererData | HintRendererData;
type RendererDataTree = Tree<ContentRendererData, HintRendererData, null>;
type RendererTree = Tree<ContentRendererElement, HintRendererElement, null>;
type ScoreTree = Tree<Score, null, null>;
type SerializedStateTree = Tree<SerializedState, null, null>;

type Props = {
    item: Item,
    shape: Shape,
    children: (tree: RendererTree) => ReactElement,
};
type State = {
    // We cache functions to generate renderers and refs in `rendererDataTree`,
    // and change them every time content changes. This isn't just a performance
    // optimization; see `_makeContentRendererData` for more discussion.
    rendererDataTree: ?RendererDataTree,
    // But, if traversing the tree fails, we store the Error in `renderError`.
    renderError: ?Error,
};



class MultiRenderer extends React.Component {
    /* eslint-disable react/sort-comp */
    // TODO(mdr): Update the linter to allow property type declarations here.
    props: Props;
    state: State;

    rendererDataTreeMapper: TreeMapper<ContentNode, ContentRendererData,
                                   HintNode, HintRendererData,
                                   TagsNode, null>;
    getRenderersMapper: TreeMapper<ContentRendererData, ContentRendererElement,
                                   HintRendererData, HintRendererElement,
                                   null, null>;

    constructor(props: Props) {
        super(props);

        this.rendererDataTreeMapper = buildMapper()
            .setContentMapper(c => this._makeContentRendererData(c))
            .setHintMapper(h => this._makeHintRendererData(h))
            .setTagsMapper(t => null);

        this.getRenderersMapper = buildMapper()
            .setContentMapper(c => this._getContentRenderer(c))
            .setHintMapper(h => this._getHintRenderer(h))
            .setArrayMapper(this._annotateRendererArray.bind(this));

        // Keep state in sync with props.
        this.state = this._tryMakeRendererState(this.props);
    }
    /* eslint-enable react/sort-comp */

    componentWillReceiveProps(nextProps: Props) {
        // Keep state in sync with props.
        if (nextProps.item !== this.props.item) {
            this.setState(this._tryMakeRendererState(nextProps));
        }
    }

    /**
     * Attempt to build a State that includes a renderer tree corresponding to
     * the item provided in props. On error, return a state with `renderError`
     * set instead.
     */
    _tryMakeRendererState(props: Props): State {
        try {
            return {
                rendererDataTree: this._makeRendererDataTree(
                    props.item, props.shape),
                renderError: null,
            };
        } catch (e) {
            // NOTE(mdr): It's appropriate to log an error traceback in a
            //     caught error condition, and console.error is supported in
            //     all target browsers. Just do it, linter.
            // eslint-disable-next-line no-console
            console.error(e);
            return {
                rendererDataTree: null,
                renderError: e,
            };
        }
    }

    /**
     * Props that aren't directly used by the MultiRenderer are delegated to
     * the underlying Renderers.
     */
    _getRendererProps(): RendererProps {
        /* eslint-disable no-unused-vars */
        // eslint is complaining that `item` and `children` are unused. I'm
        // explicitly pulling them out of `this.props` so I don't pass them to
        // `<Renderer>`. I'm not sure how else to do this.
        const {
            item,
            children,
            shape,
            ...otherProps, // @Nolint(trailing comma): I'm so confused why it's
                           // complaining about this, we want trailing commas..
        } = this.props;
        /* eslint-enable no-unused-vars */

        return otherProps;
    }

    /**
     * Construct a Renderer and a ref placeholder for the given ContentNode.
     */
    _makeContentRendererData(content: ContentNode): ContentRendererData {
        // NOTE(emily): The `findExternalWidgets` function here is computed
        //     inline and thus changes each time we run this function. If it
        //     were to change every render, it would cause the Renderer to
        //     re-render a lot more than is necessary. Don't re-compute this
        //     element unless it is necessary!
        // HACK(mdr): Flow can't prove that this is a ContentRendererData,
        //     because of how we awkwardly construct it in order to obtain a
        //     circular reference. But it is, I promise.
        const data: any = {ref: null, makeRenderer: null};
        data.makeRenderer = (rendererProps) => <Renderer
            {...rendererProps}
            {...content}
            ref={e => data.ref = e}
            findExternalWidgets={
                criterion => this._findWidgets(data, criterion)}
        />;
        return data;
    }

    /**
     * Construct a Renderer for the given HintNode, and keep track of the hint
     * itself for future use, too.
     */
    _makeHintRendererData(hint: HintNode): HintRendererData {
        // TODO(mdr): Once HintsRenderer supports inter-widget communication,
        //     give it a ref. Until then, leave the ref null forever, to avoid
        //     confusing the findWidgets functions.
        return {
            hint,
            ref: null,
            makeRenderer: (rendererProps) => <HintsRenderer
                {...rendererProps}
                hints={[hint]}
            />,
        };
    }

    /**
     * Construct a tree of interconnected RendererDatas, corresponding to the
     * given item. Called in `_tryMakeRendererState`, in order to store this
     * tree in the component state.
     */
    _makeRendererDataTree(item: Item, shape: Shape): RendererDataTree {
        const itemTree = itemToTree(item);
        return this.rendererDataTreeMapper.mapTree(itemTree, shape);
    }

    /**
     * Return all widgets that meet the given criterion, from all Renderers
     * except the Renderer that triggered this call.
     *
     * This function is provided to each Renderer's `findExternalWidgets` prop,
     * which enables widgets in different Renderers to discover each other and
     * communicate.
     */
    _findWidgets(
        callingData: RendererData,
        filterCriterion: FindWidgetsFilterCriterion
    ): Array<WidgetRef> {
        const results = [];

        this._mapRenderers(data => {
            if (callingData !== data && data.ref) {
                results.push(...data.ref.findInternalWidgets(filterCriterion));
            }
        });

        return results;
    }

    /**
     * Copy the renderer tree, apply the given transformation to the leaf nodes
     * and the optional given transformation to the array nodes, and return the
     * result.
     *
     * Used to provide structured data to the call site (the Renderer tree on
     * `render`, the Score tree on `getScores`, etc.), and to traverse the
     * renderer tree even when we disregard the output (like in
     * `_findWidgets`).
     */
    _mapRenderers<O>(
        leafMapper: ContentMapper<RendererData, O> &
            HintMapper<RendererData, O>,
    ): ?Tree<O, O, null> {
        const {rendererDataTree} = this.state;

        if (!rendererDataTree) {
            return null;
        }

        const mapper = buildMapper()
            .setContentMapper(leafMapper)
            .setHintMapper(leafMapper);
        return mapper.mapTree(rendererDataTree, this.props.shape);
    }

    _scoreFromRef(ref: Renderer): Score {
        if (!ref) {
            return null;
        }

        const [guess, score] = ref.guessAndScore();
        let state;
        if (ref.getSerializedState) {
            state = ref.getSerializedState();
        }
        return Util.keScoreFromPerseusScore(score, guess, state);
    }

    /**
     * Return a tree in the shape of the multi-item, with scores at each of
     * the content nodes and `null` at the other leaf nodes.
     */
    getScores(): ScoreTree {
        return this._mapRenderers(data => this._scoreFromRef(data.ref));
    }

    /**
     * Return a single composite score for all rendered content nodes.
     * The `guess` is a tree in the shape of the multi-item, with an individual
     * guess at each content node and `null` at the other leaf nodes.
     */
    score(): Score {
        const scores = [];
        const state = [];
        const guess = this._mapRenderers(data => {
            if (!data.ref) {
                return null;
            }

            if (data.ref.getSerializedState) {
                state.push(data.ref.getSerializedState());
            }

            scores.push(data.ref.score());
            return data.ref.getUserInput();
        });

        const combinedScore = scores.reduce(Util.combineScores);

        return Util.keScoreFromPerseusScore(combinedScore, guess, state);
    }

    /**
     * Return a tree in the shape of the multi-item, with serialized state at
     * each of the content nodes and `null` at the other leaf nodes.
     */
    getSerializedState(): SerializedStateTree {
        return this._mapRenderers(data => {
            if (!data.ref) {
                return null;
            }

            return data.ref.getSerializedState();
        });
    }

    /**
     * Given a tree in the shape of the multi-item, with serialized state at
     * each of the content nodes, restore each state to the corresponding
     * renderer if currently mounted.
     */
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

        this._mapRenderers((data, _, path) => {
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

    /**
     * Given an array of renderers, if it happens to be an array of *hint*
     * renderers, then attach a `firstN` method to the array, which allows the
     * layout to render the hints together in one HintsRenderer.
     */
    _annotateRendererArray(
        renderers: Array<Renderer>,
        rendererDatas: Array<RendererData>,
        shape: ArrayShape
    ): Array<Renderer> {
        if (shape.elementShape.type === "hint") {
            // The shape says that these are HintRendererDatas, even though
            // it's not provable at compile time, so perform a cast.
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

    /**
     * Generates an actual Renderer from a content node in the tree, by running
     * the makeRenderer function with the current renderer props.
     */
    _getContentRenderer(
        contentData: ContentRendererData
    ): ContentRendererElement {
        return contentData.makeRenderer(this._getRendererProps());
    }

    /**
     * Generates an actual Renderer from a hint node in the tree, by running
     * the makeRenderer function with the current renderer props.
     */
    _getHintRenderer(hintData: HintRendererData): HintRendererElement {
        return hintData.makeRenderer(this._getRendererProps());
    }

    /**
     * Return a tree in the shape of the multi-item, with a Renderer at each
     * content node and a HintRenderer at each hint node.
     *
     * This is generated by running each of the `makeRenderer` functions at the
     * leaf nodes with the current value of the renderer props.
     */
    _getRenderers(): RendererTree {
        return this.getRenderersMapper.mapTree(
            this.state.rendererDataTree, this.props.shape);
    }

    render() {
        if (this.state.renderError) {
            return <div className={css(styles.error)}>
                Error rendering: {String(this.state.renderError)}
            </div>;
        }

        // Pass the renderer tree to the `children` function, which will
        // determine the actual content of this component.
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
