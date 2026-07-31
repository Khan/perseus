import {shuffleMatcher} from "@khanacademy/perseus-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import Sortable from "../../components/sortable";
import {withDependencies} from "../../components/with-dependencies";
import {getDependencies} from "../../dependencies";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/matcher/matcher-ai-utils";

import type {SortableOption} from "../../components/sortable";
import type {
    WidgetExports,
    WidgetProps,
    Widget,
    PerseusDependenciesV2,
} from "../../types";
import type {MatcherPromptJSON} from "../../widget-ai-utils/matcher/matcher-ai-utils";
import type {
    PerseusMatcherWidgetOptions,
    PerseusMatcherUserInput,
    MatcherPublicWidgetOptions,
} from "@khanacademy/perseus-core";

const HACKY_CSS_CLASSNAME = "perseus-widget-matcher";

type Props = WidgetProps<
    PerseusMatcherWidgetOptions,
    PerseusMatcherUserInput
> & {
    dependencies: PerseusDependenciesV2;
};

type State = {
    leftHeight: number;
    rightHeight: number;
    texRendererLoaded: boolean;
};

/**
 * The imperative API the Matcher widget exposes to its parent renderer. On top
 * of the usual `Widget` methods, it can move a named option to a given index
 * within its column, as if the user had dragged it there.
 */
export interface MatcherHandle extends Widget {
    moveLeftOptionToIndex: (option: SortableOption, index: number) => void;
    moveRightOptionToIndex: (option: SortableOption, index: number) => void;
}

export class Matcher
    extends React.Component<Props, State>
    implements MatcherHandle
{
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    leftSortable = React.createRef<Sortable>();
    rightSortable = React.createRef<Sortable>();

    state: State = {
        leftHeight: 0,
        rightHeight: 0,
        texRendererLoaded: false,
    };

    componentDidMount(): void {
        this.props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "matcher",
                widgetId: this.props.widgetId,
            },
        });
    }

    changeAndTrack: () => void = () => {
        const nextUserInput = this._getUserInputFromSortable();
        this.props.handleUserInput(nextUserInput);
        this.props.trackInteraction();
    };

    onMeasureLeft: (arg1: any) => void = (dimensions) => {
        const height = _.max(dimensions.heights);
        this.setState({leftHeight: height});
    };

    onMeasureRight: (arg1: any) => void = (dimensions) => {
        const height = _.max(dimensions.heights);
        this.setState({rightHeight: height});
    };

    _getUserInputFromSortable: () => PerseusMatcherUserInput = () => {
        // If the math renderer hasn't loaded then we won't be able to get the
        // contents of the sortables on the left and right, so we just return
        // empty arrays until we render for the first time.
        if (!this.state.texRendererLoaded) {
            return {
                left: [],
                right: [],
            };
        }

        return {
            left: this.leftSortable.current?.getOptions() ?? [],
            right: this.rightSortable.current?.getOptions() ?? [],
        };
    };

    getPromptJSON(): MatcherPromptJSON {
        return _getPromptJSON(this.props);
    }

    // Programatic API for moving options
    // This is used by testing
    moveLeftOptionToIndex: (option: SortableOption, index: number) => void = (
        option,
        index,
    ) => {
        this.leftSortable.current?.moveOptionToIndex(option, index);
    };

    // Programatic API for moving options
    // This is used by testing
    moveRightOptionToIndex: (option: SortableOption, index: number) => void = (
        option,
        index,
    ) => {
        this.rightSortable.current?.moveOptionToIndex(option, index);
    };

    render(): React.ReactElement {
        // To minimize layout shift, we display a spinner until our math
        // renderer is ready to render the math inside the matcher. To
        // do this, we:
        // - render a dummy TeX component to force the math renderer to load
        // - display a spinner until the TeX component calls its onRender
        //   callback, signifying that the math is rendered (from which we can
        //   infer that the math renderer has loaded)
        //
        // If we didn't do this, the user might see a matcher with empty
        // columns on first render, and then the math would pop in a few
        // moments later once the rendering library loaded.
        if (!this.state.texRendererLoaded) {
            const {TeX} = getDependencies();
            return (
                <>
                    <CircularSpinner />
                    <div style={{display: "none"}}>
                        <TeX
                            onRender={() => {
                                this.setState({texRendererLoaded: true});
                            }}
                        >
                            1
                        </TeX>
                    </div>
                </>
            );
        }

        const showLabels = _.any(this.props.labels);
        const constraints = {
            height: _.max([this.state.leftHeight, this.state.rightHeight]),
        } as const;

        const cellMarginPx = this.props.apiOptions.isMobile ? 8 : 5;

        return (
            <table className={css(styles.widget) + " " + HACKY_CSS_CLASSNAME}>
                <tbody>
                    {showLabels && (
                        <tr className={css(styles.row)}>
                            <th
                                className={css(
                                    styles.column,
                                    styles.columnLabel,
                                )}
                            >
                                <Renderer
                                    content={this.props.labels[0] || "..."}
                                    linterContext={this.props.linterContext}
                                    strings={this.context.strings}
                                />
                            </th>
                            <th
                                className={css(
                                    styles.column,
                                    styles.columnRight,
                                    styles.columnLabel,
                                )}
                            >
                                <Renderer
                                    content={this.props.labels[1] || "..."}
                                    linterContext={this.props.linterContext}
                                    strings={this.context.strings}
                                />
                            </th>
                        </tr>
                    )}
                    <tr className={css(styles.row)}>
                        <td className={css(styles.column)}>
                            <Sortable
                                options={this.props.userInput.left}
                                layout={"vertical"}
                                padding={this.props.padding}
                                disabled={!this.props.orderMatters}
                                constraints={constraints}
                                onMeasure={this.onMeasureLeft}
                                onChange={this.changeAndTrack}
                                margin={cellMarginPx}
                                linterContext={this.props.linterContext}
                                ref={this.leftSortable}
                            />
                        </td>
                        <td className={css(styles.column, styles.columnRight)}>
                            <Sortable
                                options={this.props.userInput.right}
                                layout={"vertical"}
                                padding={this.props.padding}
                                constraints={constraints}
                                onMeasure={this.onMeasureRight}
                                onChange={this.changeAndTrack}
                                margin={cellMarginPx}
                                linterContext={this.props.linterContext}
                                ref={this.rightSortable}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

function getStartUserInput(
    options: MatcherPublicWidgetOptions,
    problemNum: number,
): PerseusMatcherUserInput {
    const shuffled = shuffleMatcher(options, problemNum);

    return shuffled;
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusMatcherUserInput {
    return {
        left: serializedState.left,
        right: serializedState.right,
    };
}

const WrappedMatcher = withDependencies(Matcher);

export default {
    name: "matcher",
    displayName: "Matcher (two column)",
    hidden: true,
    widget: WrappedMatcher,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof WrappedMatcher>;

const padding = 5;
const border = `var(--wb-border-width-thin) solid var(--wb-semanticColor-core-border-neutral-strong)`;
const styles = StyleSheet.create({
    widget: {
        paddingTop: padding,
        maxWidth: "100%",

        // Need to override minWidth in CSS :(
        minWidth: "auto",
    },

    row: {
        // Need to override global rules in CSS :(
        border: 0,
    },

    column: {
        padding: 0,
        border: 0,
    },

    columnRight: {
        borderLeft: border,
    },

    columnLabel: {
        fontWeight: "inherit",
        borderBottom: border,
        padding: `0 ${padding}px ${padding}px ${padding}px`,
        textAlign: "center",
    },
});
