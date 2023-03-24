/* eslint-disable react/forbid-prop-types, react/sort-comp */
import {
    linterContextProps,
    linterContextDefault,
} from "@khanacademy/perseus-linter";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {StyleSheet, css} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Sortable from "../components/sortable";
import {getDependencies} from "../dependencies";
import {ApiOptions} from "../perseus-api";
import Renderer from "../renderer";
import Util from "../util";

import type {SortableOption} from "../components/sortable";
import type {WidgetExports} from "../types";

const {shuffle, seededRNG} = Util;
const HACKY_CSS_CLASSNAME = "perseus-widget-matcher";

class Matcher extends React.Component<any, any> {
    static propTypes = {
        apiOptions: ApiOptions.propTypes,
        labels: PropTypes.array,
        left: PropTypes.array,
        onChange: PropTypes.func,
        orderMatters: PropTypes.bool,
        padding: PropTypes.bool,
        problemNum: PropTypes.number,
        right: PropTypes.array,
        trackInteraction: PropTypes.func.isRequired,
        linterContext: linterContextProps,
    };

    static defaultProps: any = {
        left: [],
        right: [],
        labels: ["", ""],
        orderMatters: false,
        padding: true,
        problemNum: 0,
        onChange: function () {},
        linterContext: linterContextDefault,
    };

    state: any = {
        leftHeight: 0,
        rightHeight: 0,
        katex: null,
    };

    componentDidMount() {
        getDependencies()
            .getKaTeX()
            .then((katex) => this.setState({katex}));
    }

    render(): React.ReactElement {
        // We don't render the Matcher until KaTeX has fully loaded, in case
        // the sortables are rendering KaTeX content. This is un-optimal as
        // we end up loading KaTeX even when we may not need it, however it
        // helps to ensure that the dimensions of the sortables (and thus the
        // Matcher) will be correct when they render, if their contents are
        // KaTeX-derived.
        if (!this.state.katex) {
            return <CircularSpinner />;
        }

        // Use the same random() function to shuffle both columns sequentially
        const rng = seededRNG(this.props.problemNum);

        let left;
        if (!this.props.orderMatters) {
            // If the order doesn't matter, don't shuffle the left column
            left = this.props.left;
        } else {
            left = shuffle(this.props.left, rng, /* ensurePermuted */ true);
        }

        const right = shuffle(this.props.right, rng, /* ensurePermuted */ true);

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
                                />
                            </th>
                        </tr>
                    )}
                    <tr className={css(styles.row)}>
                        <td className={css(styles.column)}>
                            <Sortable
                                options={left}
                                layout="vertical"
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
                                // @ts-expect-error [FEI-5003] - TS2322 - Type 'readonly unknown[]' is not assignable to type 'readonly string[]'.
                                options={right}
                                layout="vertical"
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

    changeAndTrack: (arg1: any) => void = (e) => {
        this.props.onChange(e);
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

    getUserInput: () => any = () => {
        // If KaTeX hasn't loaded then we won't be able to get the contents
        // of the sortables on the left and right, so we just return empty
        // arrays until we render for the first time.
        if (!this.state.katex) {
            return {
                left: [],
                right: [],
            };
        }

        return {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'getOptions' does not exist on type 'ReactInstance'.
            left: this.refs.left.getOptions(),
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error [FEI-5003] - TS2339 - Property 'getOptions' does not exist on type 'ReactInstance'.
            right: this.refs.right.getOptions(),
        };
    };

    // Programatic API for moving options
    // This is used by testing
    moveLeftOptionToIndex: (option: SortableOption, index: number) => void = (
        option,
        index,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error [FEI-5003] - TS2339 - Property 'moveOptionToIndex' does not exist on type 'ReactInstance'.
        this.refs.left.moveOptionToIndex(option, index);
    };

    // Programatic API for moving options
    // This is used by testing
    moveRightOptionToIndex: (option: SortableOption, index: number) => void = (
        option,
        index,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error [FEI-5003] - TS2339 - Property 'moveOptionToIndex' does not exist on type 'ReactInstance'.
        this.refs.right.moveOptionToIndex(option, index);
    };

    simpleValidate: (arg1: any) => any = (rubric) => {
        // @ts-expect-error [FEI-5003] - TS2339 - Property 'validate' does not exist on type 'typeof Matcher'.
        return Matcher.validate(this.getUserInput(), rubric);
    };
}

_.extend(Matcher, {
    validate: function (state, rubric) {
        const correct =
            _.isEqual(state.left, rubric.left) &&
            _.isEqual(state.right, rubric.right);

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null,
        };
    },
});

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

export default {
    name: "matcher",
    displayName: "Two column matcher",
    widget: Matcher,
    isLintable: true,
} as WidgetExports<typeof Matcher>;
