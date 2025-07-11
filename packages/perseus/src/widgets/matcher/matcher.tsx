import {shuffleMatcher} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import Sortable from "../../components/sortable";
import {getDependencies} from "../../dependencies";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/matcher/matcher-ai-utils";

import type {SortableOption} from "../../components/sortable";
import type {WidgetExports, WidgetProps, Widget} from "../../types";
import type {MatcherPromptJSON} from "../../widget-ai-utils/matcher/matcher-ai-utils";
import type {
    PerseusMatcherWidgetOptions,
    PerseusMatcherUserInput,
    MatcherPublicWidgetOptions,
} from "@khanacademy/perseus-core";

const HACKY_CSS_CLASSNAME = "perseus-widget-matcher";

type RenderProps = Pick<
    PerseusMatcherWidgetOptions,
    "labels" | "orderMatters" | "padding" | "left" | "right"
>;

type Props = WidgetProps<RenderProps, PerseusMatcherUserInput>;

type DefaultProps = {
    labels: Props["labels"];
    orderMatters: Props["orderMatters"];
    padding: Props["padding"];
    problemNum: Props["problemNum"];
    onChange: Props["onChange"];
    linterContext: Props["linterContext"];
    userInput: Props["userInput"];
};

type State = {
    leftHeight: number;
    rightHeight: number;
    texRendererLoaded: boolean;
};

export class Matcher extends React.Component<Props, State> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        labels: ["", ""],
        orderMatters: false,
        padding: true,
        problemNum: 0,
        onChange: function () {},
        linterContext: linterContextDefault,
        userInput: {
            left: [],
            right: [],
        },
    };

    state: State = {
        leftHeight: 0,
        rightHeight: 0,
        texRendererLoaded: false,
    };

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
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'getOptions' does not exist on type 'ReactInstance'.
            left: this.refs.left.getOptions(),
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'getOptions' does not exist on type 'ReactInstance'.
            right: this.refs.right.getOptions(),
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
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'moveOptionToIndex' does not exist on type 'ReactInstance'.
        this.refs.left.moveOptionToIndex(option, index);
    };

    // Programatic API for moving options
    // This is used by testing
    moveRightOptionToIndex: (option: SortableOption, index: number) => void = (
        option,
        index,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'moveOptionToIndex' does not exist on type 'ReactInstance'.
        this.refs.right.moveOptionToIndex(option, index);
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
                                // eslint-disable-next-line react/no-string-refs
                                ref="left"
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
                                // eslint-disable-next-line react/no-string-refs
                                ref="right"
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
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusMatcherUserInput {
    return {
        left: serializedState.left,
        right: serializedState.right,
    };
}

export default {
    name: "matcher",
    displayName: "Matcher (two column)",
    widget: Matcher,
    isLintable: true,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Matcher>;

const padding = 5;
const border = "1px solid #444";

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
        // TODO(benkomalo): constraint to half width?
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
