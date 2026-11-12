import * as PerseusLinter from "@khanacademy/perseus-linter";
import {StyleSheet, css} from "aphrodite";
/**
 * The main item (aka Exercise) renderer in Perseus. This component renders its
 * question renderer and hints renderer using standard React practices (an
 * earlier ItemRenderer component used to use jQuery and ReactDOM.render()ing
 * to render into elements it didn't own.
 *
 * This component is compatible with server-rendering of a perseus exercise.
 */
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import AssetContext from "./asset-context";
import {PerseusI18nContext} from "./components/i18n-context";
import {DependenciesContext} from "./dependencies";
import HintsRenderer from "./hints-renderer";
import LoadingContext from "./loading-context";
import {ApiOptions} from "./perseus-api";
import Renderer from "./renderer";
import UserInputManager from "./user-input-manager";
import Util from "./util";

import type {
    FocusPath,
    PerseusDependenciesV2,
    SharedRendererProps,
} from "./types";
import type {GetPromptJSONInterface} from "./widget-ai-utils/prompt-types";
import type {KeypadAPI} from "@khanacademy/math-input";
import type {
    PerseusItem,
    ShowSolutions,
    KeypadContextRendererInterface,
    UserInputMap,
} from "@khanacademy/perseus-core";

type Props = Partial<SharedRendererProps> & {
    hintsVisible?: number;
    item: PerseusItem;
    problemNum?: number;
    reviewMode?: boolean;
    keypadElement?: KeypadAPI | null | undefined;
    dependencies: PerseusDependenciesV2;
    showSolutions?: ShowSolutions;
};

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
type SerializedState = {
    question: any;
    hints: any;
};

/**
 * The imperative API callers reach through a ref to the ServerItemRenderer.
 */
export type ServerItemRendererHandle = KeypadContextRendererInterface &
    GetPromptJSONInterface & {
        /**
         * The question's Renderer. Prefer the methods on this handle; this is
         * here for callers that still need the Renderer itself.
         */
        readonly questionRenderer: Renderer;
        focus(): boolean | null | undefined;
        focusPath(path: FocusPath): void;
        blurPath(path: FocusPath): void;
        getDOMNodeForPath(path: FocusPath): Element | Text | null | undefined;
        getInputPaths(): ReadonlyArray<FocusPath>;
        getNumHints(): number;
        /**
         * Returns an object of the widget `.getUserInput()` results
         */
        getUserInput(): UserInputMap;
        /**
         * Returns an array of all widget IDs in the order they occur in
         * the question content.
         */
        getWidgetIds(): ReadonlyArray<string>;
        // TODO(LEMS-3185): remove serializedState
        /**
         * Get a representation of the current state of the item.
         *
         * @deprecated - do not use in new code.
         */
        getSerializedState(): SerializedState;
    };

const ServerItemRenderer = React.forwardRef<ServerItemRendererHandle, Props>(
    function ServerItemRenderer(props, ref) {
        const {
            apiOptions: apiOptionsProp = {},
            dependencies,
            hintsVisible,
            item,
            keypadElement,
            linterContext = PerseusLinter.linterContextDefault,
            problemNum,
            reviewMode,
            showSolutions,
        } = props;
        const {strings} = React.useContext(PerseusI18nContext);
        const {onRendered} = React.useContext(LoadingContext);

        // The focus handlers below are handed to the Renderers once and then
        // called later, so they read the latest props through these refs
        // rather than the props they closed over.
        const latestProps = React.useRef(props);
        latestProps.current = props;
        const latestOnRendered = React.useRef(onRendered);
        latestOnRendered.current = onRendered;

        const questionRendererRef = React.useRef<Renderer | null>(null);
        // Everything that reads the question Renderer runs after mount.
        const getQuestionRenderer = React.useCallback((): Renderer => {
            if (questionRendererRef.current == null) {
                throw new Error("ServerItemRenderer has not mounted yet");
            }
            return questionRendererRef.current;
        }, []);
        const hintsRendererRef = React.useRef<HintsRenderer | null>(null);
        const currentFocusRef = React.useRef<FocusPath>(null);
        const blurTimeoutIDRef = React.useRef<ReturnType<
            typeof setTimeout
        > | null>(null);
        const userInputRef = React.useRef<UserInputMap>({});
        const fullyRenderedRef = React.useRef(false);
        /**
         * Tracks whether each asset rendered below us (images, math, anything
         * else that takes extra passes to settle) has finished rendering.
         *
         * This is deliberately not React state: assets register themselves
         * while we're still rendering, and a state update from there isn't
         * visible to us until a later render pass — by which point we'd
         * already have called `onRendered()` under the assumption there were
         * no assets to wait for.
         */
        const assetStatusesRef = React.useRef<{[assetKey: string]: boolean}>(
            {},
        );

        /**
         * Reports that we've finished rendering, if every asset has settled.
         *
         * Called once we've mounted (to cover content with no assets at all)
         * and again on every status change, so it doesn't depend on a render
         * pass happening at the right moment. Only ever reports once.
         */
        const maybeCallOnRendered = React.useCallback(() => {
            if (fullyRenderedRef.current) {
                return;
            }
            const assetsLoaded = Object.values(assetStatusesRef.current).every(
                Boolean,
            );
            if (assetsLoaded) {
                fullyRenderedRef.current = true;
                latestOnRendered.current(true);
            }
        }, []);

        // This must be stable, otherwise SvgImage's shouldComponentUpdate
        // won't behave correctly and we'll get an infinite loop.
        const setAssetStatus = React.useCallback(
            (assetKey: string, status: boolean) => {
                assetStatusesRef.current[assetKey] = status;
                maybeCallOnRendered();
            },
            [maybeCallOnRendered],
        );

        const getInputPaths = React.useCallback(
            (): ReadonlyArray<FocusPath> =>
                getQuestionRenderer().getInputPaths(),
            [getQuestionRenderer],
        );

        // Sets the current focus path and element and
        // send an onChangeFocus event back to our parent.
        const setCurrentFocus = React.useCallback(
            (newFocus: FocusPath) => {
                const {apiOptions, keypadElement} = latestProps.current;
                const isMobile = apiOptions?.isMobile;
                const onFocusChange = apiOptions?.onFocusChange;

                // By the time this happens, newFocus cannot be a prefix of
                // prevFocused, since we must have either been called from
                // an onFocusChange within a renderer, which is only called
                // when this is not a prefix, or between the question and
                // answer areas, which can never prefix each other.
                const prevFocus = currentFocusRef.current;
                currentFocusRef.current = newFocus;

                // Determine whether the newly focused path represents an
                // input.
                const inputPaths = getInputPaths();
                const didFocusInput =
                    currentFocusRef.current &&
                    inputPaths.some((inputPath) => {
                        return Util.inputPathsEqual(
                            inputPath,
                            currentFocusRef.current,
                        );
                    });

                if (onFocusChange != null) {
                    // Wait for the keypad to mount before getting the height
                    setTimeout(() => {
                        // First, calculate the current keypad height
                        const keypadDomNode: HTMLElement =
                            // eslint-disable-next-line no-restricted-syntax
                            keypadElement?.getDOMNode() as HTMLElement;
                        const keypadHeight =
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                            keypadDomNode && didFocusInput
                                ? keypadDomNode.getBoundingClientRect().height
                                : 0;

                        // Then call the callback
                        onFocusChange(
                            currentFocusRef.current,
                            prevFocus,
                            keypadHeight,
                            // @ts-expect-error [FEI-5003] - TS2345 - Argument of type 'false | Element | Text | null | undefined' is not assignable to parameter of type 'HTMLElement | undefined'.
                            didFocusInput &&
                                getQuestionRenderer().getDOMNodeForPath(
                                    newFocus,
                                ),
                        );
                    }, 0);
                }

                if (keypadElement && isMobile) {
                    if (didFocusInput) {
                        keypadElement.activate();
                    } else {
                        keypadElement.dismiss();
                    }
                }
            },
            [getInputPaths, getQuestionRenderer],
        );

        const onRendererBlur = React.useCallback(
            (blurPath: FocusPath) => {
                const blurringFocusPath = currentFocusRef.current;

                // Failsafe: abort if ID is different, because focus probably
                // happened before blur
                if (!_.isEqual(blurPath, blurringFocusPath)) {
                    return;
                }

                // Wait until after any new focus events fire this tick before
                // declaring that nothing is focused.
                // If a different widget was focused, we'll see an onBlur event
                // now, but then an onFocus event on a different element before
                // this callback is executed
                // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
                blurTimeoutIDRef.current = setTimeout(() => {
                    if (_.isEqual(currentFocusRef.current, blurringFocusPath)) {
                        setCurrentFocus(null);
                    }
                }, 0);
            },
            [setCurrentFocus],
        );

        const handleFocusChange = React.useCallback(
            (newFocus: FocusPath, oldFocus: FocusPath) => {
                if (newFocus != null) {
                    setCurrentFocus(newFocus);
                } else {
                    onRendererBlur(oldFocus);
                }
            },
            [setCurrentFocus, onRendererBlur],
        );

        // In cases where we are rendering content that doesn't have any
        // assets (things that are async loaded/rendered, such as images or
        // TeX), we want to ensure that we fire the onRendered callback at
        // least once. Assets register themselves while rendering, so by the
        // time we mount they're all in assetStatusesRef (unloaded) and we can
        // tell whether there's anything to wait for.
        //
        // This is a layout effect so it runs in the same commit phase as the
        // children's mount effects, matching the order `componentDidMount`
        // used to run in.
        React.useLayoutEffect(() => {
            maybeCallOnRendered();
        }, [maybeCallOnRendered]);

        React.useLayoutEffect(() => {
            return () => {
                if (blurTimeoutIDRef.current != null) {
                    // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
                    clearTimeout(blurTimeoutIDRef.current);
                    blurTimeoutIDRef.current = null;
                }
            };
        }, []);

        React.useImperativeHandle(
            ref,
            () => ({
                get questionRenderer() {
                    return getQuestionRenderer();
                },
                focusPath: (path) => getQuestionRenderer().focusPath(path),
                blurPath: (path) => getQuestionRenderer().blurPath(path),
                getDOMNodeForPath: (path) =>
                    getQuestionRenderer().getDOMNodeForPath(path),
                getInputPaths,
                focus: () => getQuestionRenderer().focus(),
                blur: () => {
                    if (currentFocusRef.current) {
                        getQuestionRenderer().blurPath(currentFocusRef.current);
                    }
                },
                getNumHints: () => latestProps.current.item.hints.length,
                getPromptJSON: () => getQuestionRenderer().getPromptJSON(),
                getUserInput: () => userInputRef.current,
                getWidgetIds: () => getQuestionRenderer().getWidgetIds(),
                getSerializedState: () => ({
                    question: getQuestionRenderer().getSerializedState(),
                    hints: hintsRendererRef.current?.getSerializedState(),
                }),
            }),
            [getInputPaths, getQuestionRenderer],
        );

        const apiOptions = {
            ...ApiOptions.defaults,
            ...apiOptionsProp,
            onFocusChange: handleFocusChange,
        } as const;

        const assetContextValue = React.useMemo(
            () => ({
                assetStatuses: assetStatusesRef.current,
                setAssetStatus,
            }),
            [setAssetStatus],
        );

        const questionRenderer = (
            <AssetContext.Provider value={assetContextValue}>
                <UserInputManager
                    widgets={item.question.widgets}
                    problemNum={problemNum ?? 0}
                >
                    {({userInput, handleUserInput, initializeUserInput}) => {
                        userInputRef.current = userInput;
                        return (
                            <Renderer
                                keypadElement={keypadElement}
                                problemNum={problemNum}
                                apiOptions={apiOptions}
                                reviewMode={reviewMode}
                                showSolutions={showSolutions}
                                ref={(elem) => {
                                    if (elem != null) {
                                        questionRendererRef.current = elem;
                                    }
                                }}
                                content={item.question.content}
                                widgets={item.question.widgets}
                                images={item.question.images}
                                linterContext={PerseusLinter.pushContextStack(
                                    linterContext,
                                    "question",
                                )}
                                strings={strings}
                                {...dependencies}
                                userInput={userInput}
                                handleUserInput={(
                                    id,
                                    userInput,
                                    widgetsEmpty,
                                ) => {
                                    handleUserInput(
                                        id,
                                        userInput,
                                        widgetsEmpty,
                                    );
                                }}
                                initializeUserInput={initializeUserInput}
                                isScorable
                            />
                        );
                    }}
                </UserInputManager>
            </AssetContext.Provider>
        );

        const hintsRenderer = (
            <HintsRenderer
                dependencies={dependencies}
                hints={item.hints}
                hintsVisible={hintsVisible}
                apiOptions={apiOptions}
                ref={hintsRendererRef}
                linterContext={PerseusLinter.pushContextStack(
                    linterContext,
                    "hints",
                )}
                strings={strings}
            />
        );

        return (
            <DependenciesContext.Provider value={dependencies}>
                <div className="framework-perseus">{questionRenderer}</div>
                <div
                    className={classNames(
                        "framework-perseus",
                        // Avoid adding any horizontal padding when applying the
                        // mobile hint styles, which are flush to the left.
                        // NOTE(charlie): We may still want to apply this
                        // padding for desktop exercises.
                        !apiOptions.isMobile && css(styles.hintsContainer),
                    )}
                >
                    {hintsRenderer}
                </div>
            </DependenciesContext.Provider>
        );
    },
);

const styles = StyleSheet.create({
    hintsContainer: {
        // TODO: move this margin-inline-start to a stylesheet and make sure
        //  it isn't applied on mobile.
        marginInlineStart: 50,
    },
});

export default ServerItemRenderer;
