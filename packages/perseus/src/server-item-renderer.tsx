/* eslint-disable @khanacademy/ts-no-error-suppressions */
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
    UserInput,
    UserInputMap,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type OwnProps = {
    hintsVisible?: number;
    item: PerseusItem;
    problemNum?: number;
    reviewMode?: boolean;
    highlightEmptyWidgets?: boolean;
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

type State = {
    /**
     * Keeps track of whether each asset (SvgImage or TeX) rendered by
     * the questionRenderer has finished loading or rendering.
     */
    assetStatuses: {
        [assetKey: string]: boolean;
    };
};

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
type SerializedState = {
    question: any;
    hints: any;
};

export class ServerItemRenderer
    extends React.Component<Props, State>
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
    blurTimeoutID: number | null | undefined;
    userInput: UserInputMap;

    static defaultProps: DefaultProps = {
        apiOptions: {} as any, // a deep default is done in `this.update()`
        linterContext: PerseusLinter.linterContextDefault,
        onRendered: (isRendered: boolean) => {},
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            assetStatuses: {},
        };
        this._fullyRendered = false;
        this.userInput = {};
    }

    componentDidMount() {
        this._currentFocus = null;
        this._fullyRendered = false;

        // In cases where we are rendering content that doesn't have any assets
        // (things that are async loaded/rendered, such as images or TeX), we
        // want to ensure that we fire the onRendered callback at least once.
        // By the time the component mounts, assets will already be registered,
        // but may not be loaded. So we will know if all assets are loaded at
        // this point in the component lifecycle.
        this.maybeCallOnRendered();
    }

    componentDidUpdate() {
        this.maybeCallOnRendered();
    }

    componentWillUnmount() {
        if (this.blurTimeoutID != null) {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            clearTimeout(this.blurTimeoutID);
            this.blurTimeoutID = null;
        }
    }

    maybeCallOnRendered() {
        if (!this._fullyRendered) {
            const assetsLoaded = Object.values(this.state.assetStatuses).every(
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
        // eslint-disable-next-line no-restricted-syntax
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

    getNumHints(): number {
        return this.props.item.hints.length;
    }

    getPromptJSON(): RendererPromptJSON {
        return this.questionRenderer.getPromptJSON();
    }

    /**
     * Returns an array of the widget `.getUserInput()` results
     *
     * TODO: can we remove this? Seems to be just for backwards
     * compatibility with old Perseus Chrome logging
     * @deprecated use getUserInput
     */
    getUserInputLegacy(): UserInput[] {
        const userInputMap = this.questionRenderer.getUserInputMap();
        const widgetIds = this.questionRenderer.getWidgetIds();
        return widgetIds.map((id) => userInputMap[id]);
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
        // setState doesn't properly merge objects so we have to do it ourselves
        const assetStatuses = {
            ...this.state.assetStatuses,
            [assetKey]: status,
        } as const;
        this.setState({assetStatuses});
    };

    render(): React.ReactNode {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
            onFocusChange: this._handleFocusChange,
        } as const;

        const contextValue = {
            assetStatuses: this.state.assetStatuses,
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
        marginLeft: 50,
    },
});

export default React.forwardRef<
    ServerItemRenderer,
    Omit<PropsFor<typeof ServerItemRenderer>, "onRendered">
>(function ServerItemRendererWithRef(props, ref) {
    return (
        <LoadingContext.Consumer>
            {({onRendered}) => (
                <ServerItemRenderer
                    {...props}
                    onRendered={onRendered}
                    ref={ref}
                />
            )}
        </LoadingContext.Consumer>
    );
});
