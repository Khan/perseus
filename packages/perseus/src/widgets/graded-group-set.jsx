// @flow
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {getDependencies} from "../dependencies.js";
import * as Changeable from "../mixins/changeable.jsx";
import {
    grayLight,
    gray76,
    tableBackgroundAccent,
    kaGreen,
    phoneMargin,
    negativePhoneMargin,
} from "../styles/constants.js";

import GradedGroupWidget from "./graded-group.jsx";

import type {
    PerseusGradedGroupSetWidgetOptions,
    PerseusGradedGroupWidgetOptions,
} from "../perseus-types";
import type {FocusPath, WidgetExports, WidgetProps} from "../types.js";

const GradedGroup = GradedGroupWidget.widget;

type IndicatorsProps = {|
    currentGroup: number,
    numGroups: number,
    groupTitles: $ReadOnlyArray<string>,
    onChangeCurrentGroup: (groupNumber: number) => void,
|};

// TODO(jeremy): This indicator panel is not accessible for keyboard
// navigation. Add in keyboard handling and tab indexes to make accessible.
class Indicators extends React.Component<IndicatorsProps> {
    render(): React.Node {
        const items = [];
        for (let i = 0; i < this.props.numGroups; i++) {
            items.push(
                <div
                    role="button"
                    aria-label={i18n._("Skip to %(title)s", {
                        title: this.props.groupTitles[i],
                    })}
                    key={i}
                    className={css(
                        styles.indicator,
                        i === this.props.currentGroup &&
                            styles.selectedIndicator,
                    )}
                    onClick={() => this.props.onChangeCurrentGroup(i)}
                />,
            );
        }
        return <div className={css(styles.indicatorContainer)}>{items}</div>;
    }
}

type RenderProps = PerseusGradedGroupSetWidgetOptions; // no transform
type Rubric = PerseusGradedGroupSetWidgetOptions;

type Props = {|
    ...Changeable.ChangeableProps,
    ...WidgetProps<RenderProps, Rubric>,
    trackInteraction: () => void,
|};

type DefaultProps = {|
    gradedGroups: Props["gradedGroups"],
    linterContext: Props["linterContext"],
|};

type State = {|
    currentGroup: number,
|};

// TODO(jared): find a better name for this :) and for GradedGroup; the names
// are currently a little confusing.
class GradedGroupSet extends React.Component<Props, State> {
    _childGroup: GradedGroup;

    static defaultProps: DefaultProps = {
        gradedGroups: [],
        linterContext: linterContextDefault,
    };

    state: State = {
        currentGroup: 0,
    };

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        (nextProps.gradedGroups: $ReadOnlyArray<PerseusGradedGroupWidgetOptions>);
        return nextProps !== this.props || nextState !== this.state;
    }

    change: (...args: $ReadOnlyArray<mixed>) => $FlowFixMe = (...args) => {
        // $FlowFixMe[incompatible-call]
        return Changeable.change.apply(this, args);
    };

    // Mobile API
    getInputPaths: () => $ReadOnlyArray<$ReadOnlyArray<string>> = () => {
        return this._childGroup.getInputPaths();
    };

    setInputValue: (FocusPath, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (
        path,
        newValue,
        cb,
    ) => {
        return this._childGroup.setInputValue(path, newValue, cb);
    };

    focus: () => boolean = () => {
        return this._childGroup.focus();
    };

    focusInputPath: (FocusPath) => void = (path) => {
        this._childGroup.focusInputPath(path);
    };

    blurInputPath: (FocusPath) => void = (path) => {
        this._childGroup.blurInputPath(path);
    };

    handleNextQuestion: () => void = () => {
        const {currentGroup} = this.state;
        const numGroups = this.props.gradedGroups.length;

        if (currentGroup < numGroups - 1) {
            this.setState({currentGroup: currentGroup + 1});
        }
    };

    render(): React.Node {
        // When used in the context of TranslationEditor, render the
        // GradedGroup widget one below another instead of using an indicator
        // to click and switch between different graded groups. Translators
        // prefer to see all strings/labels on all GradedGroups readily visible
        // together instead of clicking on indicators to switch between them.
        const {JIPT} = getDependencies();
        if (JIPT.useJIPT && this.props.gradedGroups.length > 1) {
            return (
                <div className={css(styles.container)}>
                    {this.props.gradedGroups.map((gradedGroup, i) => {
                        return (
                            // TODO(jeremy): Don't spread this.props, instead
                            // pass in all props GradedGroup needs explicilty
                            // $FlowFixMe[prop-missing]
                            <GradedGroup
                                key={i}
                                {...this.props}
                                {...gradedGroup}
                                inGradedGroupSet={false}
                                linterContext={this.props.linterContext}
                            />
                        );
                    })}
                </div>
            );
        }

        const currentGroup = this.props.gradedGroups[this.state.currentGroup];

        if (!currentGroup) {
            return <span>{i18n.doNotTranslate("No current group...")}</span>;
        }

        const numGroups = this.props.gradedGroups.length;
        const handleNextQuestion =
            this.state.currentGroup < numGroups - 1
                ? this.handleNextQuestion
                : null;

        return (
            <div className={css(styles.container)}>
                <div className={css(styles.top)}>
                    <div className={css(styles.title)}>
                        {currentGroup.title}
                    </div>
                    <div className={css(styles.spacer)} />
                    <Indicators
                        numGroups={numGroups}
                        currentGroup={this.state.currentGroup}
                        groupTitles={this.props.gradedGroups.map(
                            (g) => g.title,
                        )}
                        onChangeCurrentGroup={(currentGroup) =>
                            this.setState({currentGroup})
                        }
                    />
                </div>
                {/* TODO(jeremy): Don't spread this.props, instead
                    pass in all props GradedGroup needs explicitly */}
                {/* $FlowFixMe[prop-missing] */}
                <GradedGroup
                    key={this.state.currentGroup}
                    // $FlowFixMe[incompatible-type]
                    ref={(comp) => (this._childGroup = comp)}
                    // We should pass in the set of props explicitly
                    {...this.props}
                    {...currentGroup}
                    inGradedGroupSet={true}
                    // $FlowFixMe[incompatible-type]
                    title={null}
                    // $FlowFixMe[incompatible-type]
                    onNextQuestion={handleNextQuestion}
                    linterContext={this.props.linterContext}
                />
            </div>
        );
    }
}

const traverseChildWidgets: ($FlowFixMe, $FlowFixMe) => $FlowFixMe = function (
    props,
    traverseRenderer,
) {
    // NOTE(jared): I have no idea how this works
    return {
        groups: props.gradedGroups.map(traverseRenderer),
    };
};

export default ({
    name: "graded-group-set",
    displayName: "Graded group set (articles only)",
    widget: GradedGroupSet,
    traverseChildWidgets: traverseChildWidgets,
    // TODO(michaelpolyak): This widget should be available for articles only
    hidden: false,
    tracking: "all",
    isLintable: true,
}: WidgetExports<typeof GradedGroupSet>);

const styles = StyleSheet.create({
    top: {
        display: "flex",
        flexDirection: "row",
    },
    spacer: {
        flex: 1,
    },

    title: {
        fontSize: 12,
        color: gray76,
        textTransform: "uppercase",
        marginBottom: 11,
        letterSpacing: 0.8,
    },

    indicatorContainer: {
        display: "flex",
        flexDirection: "row",
    },

    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: grayLight,
        marginLeft: 5,
        cursor: "pointer",
    },

    selectedIndicator: {
        backgroundColor: kaGreen,
    },

    container: {
        borderTop: `1px solid ${gray76}`,
        borderBottom: `1px solid ${gray76}`,
        backgroundColor: tableBackgroundAccent,
        marginLeft: negativePhoneMargin,
        marginRight: negativePhoneMargin,
        paddingBottom: phoneMargin,
        paddingLeft: phoneMargin,
        paddingRight: phoneMargin,
        paddingTop: 10,
        width: "auto",
    },
});
