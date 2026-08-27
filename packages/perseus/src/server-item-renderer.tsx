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
import * as React from "react";
import invariant from "tiny-invariant";
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
import type {
    GetPromptJSONInterface,
    RendererPromptJSON,
} from "./widget-ai-utils/prompt-types";
import type {KeypadAPI} from "@khanacademy/math-input";
import type {
    PerseusItem,
    ShowSolutions,
    KeypadContextRendererInterface,
    RendererInterface,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type OwnProps = {
    hintsVisible?: number;
    item: PerseusItem;
    problemNum?: number;
    reviewMode?: boolean;
    keypadElement?: KeypadAPI | null | undefined;
    dependencies: PerseusDependenciesV2;
    showSolutions?: ShowSolutions;
};

type HOCProps = {
    onRendered: (isRendered: boolean) => void;
};

type Props = SharedRendererProps & OwnProps & HOCProps;

type DefaultProps = Required<
    Pick<Props, "apiOptions" | "onRendered" | "linterContext">
>;

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
type SerializedState = {
    question: any;
    hints: any;
};

class ServerItemRenderer
    extends React.Component<Props>
    implements
        RendererInterface,
        KeypadContextRendererInterface,
        GetPromptJSONInterface
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // @ts-expect-error - TS2564 - Property 'questionRenderer' has no initializer and is not definitely assigned in the constructor.
    questionRenderer: Renderer;
    hintsRenderer: any;
    _currentFocus: FocusPath;
    _fullyRendered: boolean;
    /**
     * Tracks whether each asset rendered below us (images, math, anything else
     * that takes extra passes to settle) has finished rendering.
     *
     * This is deliberately not React state: assets register themselves in
     * their constructors, while we're still rendering, and a state update
     * from there isn't visible to us until a later render pass — by which point we'd
     * already have called `onRendered()` under the assumption
     * there were no assets to wait for.
     */
    _assetStatuses: {[assetKey: string]: boolean};
    blurTimeoutID: number | null | undefined;
    userInput: UserInputMap;

    static defaultProps: DefaultProps = {
        // eslint-disable-next-line no-restricted-syntax
        apiOptions: {} as any, // a deep default is done in `this.update()`
        linterContext: PerseusLinter.linterContextDefault,
        onRendered: (isRendered: boolean) => {},
    };

    constructor(props: Props) {
        super(props);

        this._assetStatuses = {};
        this._fullyRendered = false;
        this.userInput = {};
    }

    componentDidMount() {
        this._currentFocus = null;

        // In cases where we are rendering content that doesn't have any assets
        // (things that are async loaded/rendered, such as images or TeX), we
        // want to ensure that we fire the onRendered callback at least once.
        // Assets register themselves in their constructors, so by the time we
        // mount they're all in _assetStatuses (unloaded) and we can tell
        // whether there's anything to wait for.
        this.maybeCallOnRendered();
    }

    componentWillUnmount() {
        if (this.blurTimeoutID != null) {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            clearTimeout(this.blurTimeoutID);
            this.blurTimeoutID = null;
        }
    }

    /**
     * Reports that we've finished rendering, if every asset has settled.
     *
     * Called once we've mounted (to cover content with no assets at all) and
     * again on every status change, so it doesn't depend on a render pass
     * happening at the right moment. Only ever reports once.
     */
    maybeCallOnRendered() {
        if (!this._fullyRendered) {
            const assetsLoaded = Object.values(this._assetStatuses).every(
                Boolean,
            );

            if (assetsLoaded) {
                this._fullyRendered = true;
                this.props.onRendered(true);
            }
        }
    }

    _handleFocusChange: (newFocus: FocusPath, oldFocus: FocusPath) => void = (
        newFocus: FocusPath,
        oldFocus: FocusPath,
    ) => {
        if (newFocus != null) {
            this._setCurrentFocus(newFocus);
        } else {
            this._onRendererBlur(oldFocus);
        }
    };

    // Sets the current focus path and element and
    // send an onChangeFocus event back to our parent.
    _setCurrentFocus(newFocus: FocusPath) {
        const {
            apiOptions: {isMobile, onFocusChange},
            keypadElement,
        } = this.props;

        // By the time this happens, newFocus cannot be a prefix of
        // prevFocused, since we must have either been called from
        // an onFocusChange within a renderer, which is only called when
        // this is not a prefix, or between the question and answer areas,
        // which can never prefix each other.
        const prevFocus = this._currentFocus;
        this._currentFocus = newFocus;

        // Determine whether the newly focused path represents an input.
        const inputPaths = this.getInputPaths();
        const didFocusInput =
            this._currentFocus &&
            inputPaths.some((inputPath) => {
                return Util.inputPathsEqual(inputPath, this._currentFocus);
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
                    this._currentFocus,
                    prevFocus,
                    keypadHeight,
                    // @ts-expect-error [FEI-5003] - TS2345 - Argument of type 'false | Element | Text | null | undefined' is not assignable to parameter of type 'HTMLElement | undefined'.
                    didFocusInput &&
                        this.questionRenderer.getDOMNodeForPath(newFocus),
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
    }

    _onRendererBlur(blurPath: FocusPath) {
        const blurringFocusPath = this._currentFocus;

        // Failsafe: abort if ID is different, because focus probably happened
        // before blur
        if (!_.isEqual(blurPath, blurringFocusPath)) {
            return;
        }

        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
        // @ts-expect-error - TS2322 - Type 'Timeout' is not assignable to type 'number'.
        this.blurTimeoutID = setTimeout(() => {
            if (_.isEqual(this._currentFocus, blurringFocusPath)) {
                this._setCurrentFocus(null);
            }
        }, 0);
    }

    focusPath(path: FocusPath): void {
        return this.questionRenderer.focusPath(path);
    }

    blurPath(path: FocusPath): void {
        return this.questionRenderer.blurPath(path);
    }

    getDOMNodeForPath(path: FocusPath): Element | Text | null | undefined {
        return this.questionRenderer.getDOMNodeForPath(path);
    }

    getInputPaths(): ReadonlyArray<FocusPath> {
        const questionAreaInputPaths = this.questionRenderer.getInputPaths();
        return questionAreaInputPaths;
    }

    focus(): boolean | null | undefined {
        return this.questionRenderer.focus();
    }

    blur(): void {
        if (this._currentFocus) {
            this.blurPath(this._currentFocus);
        }
    }

    getPromptJSON(): RendererPromptJSON {
        return this.questionRenderer.getPromptJSON();
    }

    /**
     * Returns an object of the widget `.getUserInput()` results
     */
    getUserInput(): UserInputMap {
        return this.userInput;
    }

    /**
     * Returns an array of all widget IDs in the order they occur in
     * the question content.
     */
    getWidgetIds(): ReadonlyArray<string> {
        return this.questionRenderer.getWidgetIds();
    }

    /**
     * Get a representation of the current state of the item.
     */
    // TODO(LEMS-3185): remove serializedState
    /**
     * @deprecated - do not use in new code.
     */
    getSerializedState(): SerializedState {
        return {
            question: this.questionRenderer.getSerializedState(),
            hints: this.hintsRenderer.getSerializedState(),
        };
    }

    // This must be pre-bound otherwise SvgImage's shouldComponentUpdate
    // won't behave correctly and we'll get an infinite loop.
    setAssetStatus: (assetKey: string, status: boolean) => void = (
        assetKey,
        status,
    ) => {
        this._assetStatuses[assetKey] = status;
        this.maybeCallOnRendered();
    };

    render(): React.ReactNode {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            onFocusChange: this._handleFocusChange,
        } as const;

        const contextValue = {
            assetStatuses: this._assetStatuses,
            setAssetStatus: this.setAssetStatus,
        } as const;

        const questionRenderer = (
            <AssetContext.Provider value={contextValue}>
                <UserInputManager
                    widgets={this.props.item.question.widgets}
                    problemNum={this.props.problemNum ?? 0}
                >
                    {({userInput, handleUserInput, initializeUserInput}) => {
                        this.userInput = userInput;
                        return (
                            <Renderer
                                keypadElement={this.props.keypadElement}
                                problemNum={this.props.problemNum}
                                apiOptions={apiOptions}
                                reviewMode={this.props.reviewMode}
                                showSolutions={this.props.showSolutions}
                                ref={(elem) => {
                                    if (elem != null) {
                                        this.questionRenderer = elem;
                                    }
                                }}
                                content={this.props.item.question.content}
                                widgets={this.props.item.question.widgets}
                                images={this.props.item.question.images}
                                linterContext={PerseusLinter.pushContextStack(
                                    this.props.linterContext,
                                    "question",
                                )}
                                strings={this.context.strings}
                                {...this.props.dependencies}
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
                            />
                        );
                    }}
                </UserInputManager>
            </AssetContext.Provider>
        );

        const hintsRenderer = (
            <HintsRenderer
                dependencies={this.props.dependencies}
                hints={this.props.item.hints}
                hintsVisible={this.props.hintsVisible}
                apiOptions={apiOptions}
                ref={(elem) => (this.hintsRenderer = elem)}
                linterContext={PerseusLinter.pushContextStack(
                    this.props.linterContext,
                    "hints",
                )}
                strings={this.context.strings}
            />
        );

        return (
            <DependenciesContext.Provider value={this.props.dependencies}>
                <div>
                    <div>{questionRenderer}</div>
                    <div
                        className={
                            // Avoid adding any horizontal padding when applying the
                            // mobile hint styles, which are flush to the left.
                            // NOTE(charlie): We may still want to apply this
                            // padding for desktop exercises.
                            apiOptions.isMobile
                                ? undefined
                                : css(styles.hintsContainer)
                        }
                    >
                        {hintsRenderer}
                    </div>
                </div>
            </DependenciesContext.Provider>
        );
    }
}

const styles = StyleSheet.create({
    hintsContainer: {
        marginInlineStart: 50,
    },
});

// By wrapping ServerItemRenderer in a
// functional component with a handle, it allows
// us to scope our external API to only the functionality
// that we want consumers to be using
export interface ServerItemRendererHandle
    extends RendererInterface,
        KeypadContextRendererInterface,
        GetPromptJSONInterface {
    getUserInput(): UserInputMap;
    getWidgetIds(): ReadonlyArray<string>;

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState(): SerializedState;

    /**
     * @deprecated do not reach into inner
     * class component properties
     */
    readonly questionRenderer: Renderer;
}

export default React.forwardRef<
    ServerItemRendererHandle,
    Omit<PropsFor<typeof ServerItemRenderer>, "onRendered">
>(function ServerItemRendererWithRef(props, ref) {
    const innerRef = React.useRef<ServerItemRenderer>(null);

    // external imperative API for ServerItemRenderer.
    //
    // The handle is built exactly once and stored in a ref so that its identity
    // never changes for the lifetime of this component. That stability matters:
    // React appends `ref` to the dependency list it uses internally for
    // `useImperativeHandle`, so a caller passing an inline callback ref (whose
    // identity changes every render) makes the create function re-run on every
    // render. If that produced a new handle each time, callers that store the
    // handle in state would loop forever ("Maximum update depth exceeded").
    // Every method reads through `innerRef`, so nothing here needs to change
    // across renders.
    const handleRef = React.useRef<ServerItemRendererHandle | null>(null);
    if (handleRef.current === null) {
        const instance = (): ServerItemRenderer => {
            const current = innerRef.current;
            invariant(
                current,
                "ServerItemRenderer: ref was used before mount or after unmount",
            );
            return current;
        };

        handleRef.current = {
            focus: () => instance().focus(),
            blur: () => instance().blur(),
            getPromptJSON: () => instance().getPromptJSON(),
            getUserInput: () => instance().getUserInput(),
            getWidgetIds: () => instance().getWidgetIds(),
            getSerializedState: () => instance().getSerializedState(),
            get questionRenderer() {
                return instance().questionRenderer;
            },
        };
    }

    React.useImperativeHandle(ref, () => handleRef.current!, []);

    return (
        <LoadingContext.Consumer>
            {({onRendered}) => (
                <ServerItemRenderer
                    {...props}
                    onRendered={onRendered}
                    ref={innerRef}
                />
            )}
        </LoadingContext.Consumer>
    );
});
