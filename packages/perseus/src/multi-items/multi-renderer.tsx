/* eslint-disable @khanacademy/ts-no-error-suppressions */
/* eslint-disable react/no-unsafe */
// TODO(mdr): There are some TypeScript errors in this file, and they're tricky, so
//     I'm skipping TypeScript errors for now.
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
import {Errors} from "@khanacademy/perseus-core";
import {StyleSheet, css} from "aphrodite";
// eslint-disable-next-line import/no-extraneous-dependencies
import lens from "hubble";
import * as React from "react";

import {PerseusI18nContext} from "../components/i18n-context";
import {DependenciesContext} from "../dependencies";
import HintsRenderer from "../hints-renderer";
import {Log} from "../logging/log";
import Renderer from "../renderer";
import Util from "../util";

import {itemToTree} from "./items";
import {buildMapper} from "./trees";

import type {Item, ContentNode, HintNode, TagsNode} from "./item-types";
import type {Shape, ArrayShape} from "./shape-types";
import type {Tree} from "./tree-types";
import type {TreeMapper, ContentMapper, HintMapper, Path} from "./trees";
import type {
    APIOptions,
    FilterCriterion,
    PerseusDependenciesV2,
    PerseusScore,
    Widget,
} from "../types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type Hint = any; // TODO(mdr)
type Score = any; // TODO(mdr)
type SerializedState = any; // TODO(mdr)

type RendererProps = PropsFor<typeof Renderer>;

type ContentRendererElement = React.ReactElement<any>;
type HintRendererElement = React.ReactElement<any>;
type ContentRendererData = {
    makeRenderer: () => ContentRendererElement;
    ref: Renderer | null | undefined;
};
type FindWidgetsFunc = (
    criterion: FilterCriterion,
) => ReadonlyArray<Widget | null | undefined>;
type HintRendererData = {
    makeRenderer: () => HintRendererElement;
    findExternalWidgets: FindWidgetsFunc | null | undefined;
    ref: null;
    hint: Hint;
};
type RendererData = ContentRendererData | HintRendererData;
// @ts-expect-error - TS2315 - Type 'Tree' is not generic.
type RendererDataTree = Tree<ContentRendererData, HintRendererData, null>;

/**
 * TODO(somewhatabstract, JIRA-XXXX):
 * Some usage of this type somewhere is causing TypeScript to believe that these
 * elements should be components. Don't know where that is, to fix it up
 * properly. In reality, these types are just too hard to use and aren't
 * really helping us out as I now have to suppress this rather than
 * get value from the type. :(
 */
// @ts-expect-error - TS2315 - Type 'Tree' is not generic.
type RendererTree = Tree<ContentRendererElement, HintRendererElement, null>;
// @ts-expect-error - TS2315 - Type 'Tree' is not generic.
type ScoreTree = Tree<Score, null, null>;
// @ts-expect-error - TS2315 - Type 'Tree' is not generic.
type SerializedStateTree = Tree<SerializedState, null, null>;

type Props = {
    item: Item;
    shape: Shape;
    children: (tree: {renderers: RendererTree}) => React.ReactElement<any>;
    serializedState?: SerializedStateTree | null | undefined;
    onSerializedStateUpdated?: (state: SerializedStateTree) => void;
    onInteractWithWidget?: (id: string) => void;
    apiOptions?: APIOptions;
    reviewMode?: boolean | null | undefined;

    dependencies: PerseusDependenciesV2;
};
type State = {
    // We cache functions to generate renderers and refs in `rendererDataTree`,
    // and change them every time content changes. This isn't just a performance
    // optimization; see `_makeContentRendererData` for more discussion.
    rendererDataTree: RendererDataTree | null | undefined;
    // But, if traversing the tree fails, we store the Error in `renderError`.
    renderError: Error | null | undefined;
};

class MultiRenderer extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    rendererDataTreeMapper: TreeMapper<
        ContentNode,
        ContentRendererData,
        HintNode,
        HintRendererData,
        TagsNode,
        null
    >;
    getRenderersMapper: TreeMapper<
        ContentRendererData,
        ContentRendererElement,
        HintRendererData,
        HintRendererElement,
        null,
        null
    >;

    constructor(props: Props) {
        super(props);

        this.rendererDataTreeMapper = buildMapper()
            // @ts-expect-error - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'ContentNode'.
            .setContentMapper((c, _, p) => this._makeContentRendererData(c, p))
            // @ts-expect-error - TS2345 - Argument of type 'unknown' is not assignable to parameter of type 'HintNode'.
            .setHintMapper((h) => this._makeHintRendererData(h))
            .setTagsMapper((t) => null);

        // @ts-expect-error - TS2322 - Type 'TreeMapperForLeavesAndCollections<unknown, any, unknown, any, unknown, unknown>' is not assignable to type 'TreeMapper<ContentRendererData, ContentRendererElement, HintRendererData, HintRendererElement, null, null>'.
        this.getRenderersMapper = buildMapper()
            // @ts-expect-error - TS2571 - Object is of type 'unknown'.
            .setContentMapper((c) => c.makeRenderer())
            // @ts-expect-error - TS2571 - Object is of type 'unknown'.
            .setHintMapper((h) => h.makeRenderer())
            .setArrayMapper((renderers, data, shape) =>
                this._annotateRendererArray(
                    renderers as any,
                    data as any,
                    shape,
                ),
            );

        // Keep state in sync with props.
        this.state = this._tryMakeRendererState(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
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
                    props.item,
                    props.shape,
                ),
                renderError: null,
            };
        } catch (e: any) {
            Log.error("Error building tree state", Errors.Internal, {
                cause: e,
            });
            return {
                rendererDataTree: null,
                renderError: e,
            };
        }
    }

    _handleSerializedStateUpdated: (path: Path, newState?: any) => void = (
        path,
        newState,
    ) => {
        const {onSerializedStateUpdated} = this.props;

        if (onSerializedStateUpdated) {
            const oldState = this._getSerializedState(
                this.props.serializedState,
            );
            onSerializedStateUpdated(
                lens(oldState).set(path, newState).freeze(),
            );
        }
    };

    /**
     * Props that aren't directly used by the MultiRenderer are delegated to
     * the underlying Renderers.
     */
    _getRendererProps(): RendererProps {
        // `item`, `children`, and others are unused. I'm
        // explicitly pulling them out of `this.props` so I don't pass them to
        // `<Renderer>`. I'm not sure how else to do this.
        const {
            item: _,
            children: __,
            shape: ___,
            serializedState: ____,
            onSerializedStateUpdated: _____,
            ...otherProps
        } = this.props;
        return {
            ...otherProps,
            strings: this.context.strings,
        };
    }

    /**
     * Construct a Renderer and a ref placeholder for the given ContentNode.
     */
    _makeContentRendererData(
        content: ContentNode,
        path: Path,
    ): ContentRendererData {
        // NOTE(emily): The `findExternalWidgets` function here is computed
        //     inline and thus changes each time we run this function. If it
        //     were to change every render, it would cause the Renderer to
        //     re-render a lot more than is necessary. Don't re-compute this
        //     element unless it is necessary!
        // HACK(mdr): TypeScript can't prove that this is a ContentRendererData,
        //     because of how we awkwardly construct it in order to obtain a
        //     circular reference. But it is, I promise.
        const data: any = {ref: null, makeRenderer: null};

        const refFunc = (e: any) => (data.ref = e);
        const findExternalWidgets = (criterion: any) =>
            this._findWidgets(data, criterion);
        const handleSerializedState = (state: any) =>
            this._handleSerializedStateUpdated(path, state);

        data.makeRenderer = () => (
            /**
             * TODO(somewhatabstract, JIRA-XXXX):
             * `content` contains props that Renderer doesn't have. However,
             * since the type for `content` is not exact, it's hard to know
             * if this spread is including undocumented props so mapping
             * one to one could introduce a bug. Need to work out the exact
             * type for ContentNode and then fix this.
             */ // @ts-expect-error - TS2322 - Type '{ ref: (e: any) => any; findExternalWidgets: (criterion: any) => readonly (Widget | null | undefined)[]; serializedState: any; onSerializedStateUpdated: (state: any) => void; __type: "content" | "item"; ... 9 more ...; reviewMode?: boolean | ... 1 more ... | undefined; }' is not assignable to type 'InexactPartial<Pick<Readonly<Props> & Readonly<{ children?: ReactNode; }>, "content" | "images" | "onRender" | "linterContext" | "widgets" | "alwaysUpdate" | ... 6 more ... | "serializedState">>'.
            <Renderer
                {...this._getRendererProps()}
                {...content}
                ref={refFunc}
                findExternalWidgets={findExternalWidgets}
                serializedState={
                    this.props.serializedState
                        ? lens(this.props.serializedState).get(path)
                        : null
                }
                onSerializedStateUpdated={handleSerializedState}
            />
        );
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
        //
        // NOTE(davidflanagan): As a partial step toward inter-widget
        // communication we're going to pass a findExternalWidgets function
        // (using a dummy data object). This allows passage-ref widgets in
        // hints to use findWidget() to find the passage widgets they reference.
        // Note that this is one-way only, however. It does not allow
        // widgets in the question to find widgets in the hints, for example.
        const findExternalWidgets = (criterion) =>
            this._findWidgets({} as any, criterion);

        return {
            hint,
            findExternalWidgets, // _annotateRendererArray() needs this
            ref: null,
            makeRenderer: () => (
                <HintsRenderer
                    {...this._getRendererProps()}
                    findExternalWidgets={findExternalWidgets}
                    // Note(Jeremy): The MultiRenderer codebase types are
                    // slightly different from the rest of the codebase.
                    // Ideally `HintNode` would spread the `Hint` type into it,
                    // but there is a difference in optionality of `widgets`
                    // and `images` and that causes a huge cascade of type
                    // errors (they are truly optional, but most of our code
                    // assumes they're provided/set). Ignoring this for now.
                    // @ts-expect-error - TS2769 - Type 'HintNode' is not assignable to type 'Hint'.
                    hints={[hint]}
                />
            ),
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
        filterCriterion: FilterCriterion,
    ): ReadonlyArray<Widget | null | undefined> {
        const results: Array<Widget | null | undefined> = [];

        this._mapRenderers((data) => {
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
        // eslint-disable-next-line no-restricted-syntax
        leafMapper: ContentMapper<RendererData, O> &
            HintMapper<RendererData, O>,
        // @ts-expect-error - TS2315 - Type 'Tree' is not generic.
    ): Tree<O, O, null> | null | undefined {
        const {rendererDataTree} = this.state;

        if (!rendererDataTree) {
            return null;
        }

        const mapper = buildMapper()
            .setContentMapper(leafMapper)
            .setHintMapper(leafMapper);
        return mapper.mapTree(rendererDataTree, this.props.shape);
    }

    _scoreFromRef(ref?: Renderer | null): Score {
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
        return this._mapRenderers((data) => this._scoreFromRef(data.ref));
    }

    /**
     * Return a single composite score for all rendered content nodes.
     * The `guess` is a tree in the shape of the multi-item, with an individual
     * guess at each content node and `null` at the other leaf nodes.
     */
    score(): Score {
        const scores: Array<PerseusScore> = [];
        const state: Array<
            | any
            | {
                  [id: string]: any;
              }
        > = [];
        const guess = this._mapRenderers((data) => {
            if (!data.ref) {
                return null;
            }

            if (data.ref.getSerializedState) {
                state.push(data.ref.getSerializedState());
            }

            scores.push(data.ref.score());
            return data.ref?.getUserInput();
        });

        const combinedScore = scores.reduce(Util.combineScores);

        return Util.keScoreFromPerseusScore(combinedScore, guess, state);
    }

    /**
     * Return a tree in the shape of the multi-item, with serialized state at
     * each of the content nodes and `null` at the other leaf nodes.
     *
     * If the lastSerializedState argument is supplied, this function will fill
     * in the state of not-currently-rendered content and hint nodes with the
     * values from the previous serialized state. If no lastSerializedState is
     * supplied, `null` will be returned for not-currently-rendered content and
     * hint nodes.
     */
    _getSerializedState(
        lastSerializedState?: SerializedStateTree,
    ): SerializedStateTree {
        return this._mapRenderers((data, _, path) => {
            if (data.ref) {
                return data.ref.getSerializedState();
            }
            if (lastSerializedState) {
                return lens(lastSerializedState).get(path);
            }
            return null;
        });
    }

    /**
     * Given a tree in the shape of the multi-item, with serialized state at
     * each of the content nodes, restore each state to the corresponding
     * renderer if currently mounted.
     */
    restoreSerializedState(
        serializedState: SerializedState,
        callback?: () => any,
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
            data.ref?.restoreSerializedState(state, countCallback);
        });
    }

    /**
     * Given an array of renderers, if it happens to be an array of *hint*
     * renderers, then attach a `firstN` method to the array, which allows the
     * layout to render the hints together in one HintsRenderer.
     */
    _annotateRendererArray(
        renderers: ReadonlyArray<Renderer>,
        rendererDatas: ReadonlyArray<RendererData>,
        shape: ArrayShape,
    ): ReadonlyArray<Renderer> {
        if (shape.elementShape.type === "hint") {
            // The shape says that these are HintRendererDatas, even though
            // it's not provable at compile time, so perform a cast.
            const hintRendererDatas: ReadonlyArray<HintRendererData> =
                rendererDatas as any;

            renderers = [...renderers];
            (renderers as any).firstN = (n: any) => (
                <HintsRenderer
                    {...this._getRendererProps()}
                    findExternalWidgets={
                        hintRendererDatas[0]
                            ? hintRendererDatas[0].findExternalWidgets
                            : undefined
                    }
                    hints={hintRendererDatas.map((d) => d.hint)}
                    hintsVisible={n}
                />
            );
        }
        return renderers;
    }

    /**
     * Return a tree in the shape of the multi-item, with a Renderer at each
     * content node and a HintRenderer at each hint node.
     *
     * This is generated by running each of the `makeRenderer` functions at the
     * leaf nodes.
     */
    _getRenderers(): RendererTree {
        return this.getRenderersMapper.mapTree(
            this.state.rendererDataTree,
            this.props.shape,
        );
    }

    render(): React.ReactNode {
        if (this.state.renderError) {
            return (
                <div className={css(styles.error)}>
                    {this.context.strings.errorRendering({
                        error: String(this.state.renderError),
                    })}
                </div>
            );
        }

        // Pass the renderer tree to the `children` function, which will
        // determine the actual content of this component.
        return (
            <DependenciesContext.Provider value={this.props.dependencies}>
                {this.props.children({
                    renderers: this._getRenderers(),
                })}
            </DependenciesContext.Provider>
        );
    }
}

const styles = StyleSheet.create({
    error: {
        color: "red",
    },
});

export default MultiRenderer;
