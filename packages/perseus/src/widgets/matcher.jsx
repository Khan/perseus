/* eslint-disable react/forbid-prop-types, react/sort-comp */
// @flow
import {
    linterContextProps,
    linterContextDefault,
} from "@khanacademy/perseus-linter";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {StyleSheet, css} from "aphrodite";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Sortable from "../components/sortable.jsx";
import {getDependencies} from "../dependencies.js";
import {ApiOptions} from "../perseus-api.jsx";
import Renderer from "../renderer.jsx";
import Util from "../util.js";

import type {SortableOption} from "../components/sortable.jsx";
import type {WidgetExports} from "../types.js";

const {shuffle, seededRNG} = Util;
const HACKY_CSS_CLASSNAME = "perseus-widget-matcher";

class Matcher extends React.Component<$FlowFixMe, $FlowFixMe> {
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

    static defaultProps: $FlowFixMe = {
        left: [],
        right: [],
        labels: ["", ""],
        orderMatters: false,
        padding: true,
        problemNum: 0,
        onChange: function () {},
        linterContext: linterContextDefault,
    };

    state: $FlowFixMe = {
        leftHeight: 0,
        rightHeight: 0,
        katex: null,
    };

    componentDidMount() {
        getDependencies()
            .getKaTeX()
            .then((katex) => this.setState({katex}));
    }

    render(): React.Node {
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
        };

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

    changeAndTrack: ($FlowFixMe) => void = (e) => {
        this.props.onChange(e);
        this.props.trackInteraction();
    };

    onMeasureLeft: ($FlowFixMe) => void = (dimensions) => {
        const height = _.max(dimensions.heights);
        this.setState({leftHeight: height});
    };

    onMeasureRight: ($FlowFixMe) => void = (dimensions) => {
        const height = _.max(dimensions.heights);
        this.setState({rightHeight: height});
    };

    getUserInput: () => $FlowFixMe = () => {
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
            left: this.refs.left.getOptions(),
            // eslint-disable-next-line react/no-string-refs
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
        this.refs.left.moveOptionToIndex(option, index);
    };

    // Programatic API for moving options
    // This is used by testing
    moveRightOptionToIndex: (option: SortableOption, index: number) => void = (
        option,
        index,
    ) => {
        // eslint-disable-next-line react/no-string-refs
        this.refs.right.moveOptionToIndex(option, index);
    };

    simpleValidate: ($FlowFixMe) => $FlowFixMe = (rubric) => {
        // $FlowFixMe[prop-missing]
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

export default ({
    name: "matcher",
    displayName: "Two column matcher",
    widget: Matcher,
    isLintable: true,
}: WidgetExports<typeof Matcher>);
