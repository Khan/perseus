/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import Color from "@khanacademy/wonder-blocks-color";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";

import {getDependencies} from "../dependencies";
import * as Changeable from "../mixins/changeable";
import {
    gray76,
    tableBackgroundAccent,
    phoneMargin,
    negativePhoneMargin,
} from "../styles/constants";
import a11y from "../util/a11y";

import {GradedGroup} from "./graded-group";

import type {
    PerseusGradedGroupSetWidgetOptions,
    PerseusGradedGroupWidgetOptions,
} from "../perseus-types";
import type {FocusPath, WidgetExports, WidgetProps} from "../types";

type IndicatorsProps = {
    currentGroup: number;
    gradedGroups: ReadonlyArray<PerseusGradedGroupWidgetOptions>;
    onChangeCurrentGroup: (groupNumber: number) => void;
};

class Indicators extends React.Component<IndicatorsProps> {
    handleKeyDown = (e: React.KeyboardEvent, i: number) => {
        if (e.key === "Enter" || e.key === " ") {
            this.props.onChangeCurrentGroup(i);
        }
    };

    render(): React.ReactNode {
        return (
            <ul className={css(styles.indicatorContainer)}>
                {this.props.gradedGroups.map(({title}, i) => (
                    <li
                        role="button"
                        aria-label={i18n._("Skip to %(title)s", {
                            title,
                        })}
                        key={title}
                        className={css(
                            styles.indicator,
                            i === this.props.currentGroup &&
                                styles.selectedIndicator,
                        )}
                        tabIndex={0}
                        onClick={() => this.props.onChangeCurrentGroup(i)}
                        onKeyDown={(e) => this.handleKeyDown(e, i)}
                    >
                        {i === this.props.currentGroup && (
                            <span className={css(a11y.srOnly)}>
                                {i18n._("Current")}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        );
    }
}

type RenderProps = PerseusGradedGroupSetWidgetOptions; // no transform
type Rubric = PerseusGradedGroupSetWidgetOptions;

type Props = Changeable.ChangeableProps &
    WidgetProps<RenderProps, Rubric> & {
        trackInteraction: () => void;
    };

type DefaultProps = {
    gradedGroups: Props["gradedGroups"];
    linterContext: Props["linterContext"];
};

type State = {
    currentGroup: number;
};

// TODO(jared): find a better name for this :) and for GradedGroup; the names
// are currently a little confusing.
class GradedGroupSet extends React.Component<Props, State> {
    // @ts-expect-error [FEI-5003] - TS2564 - Property '_childGroup' has no initializer and is not definitely assigned in the constructor.
    _childGroup: GradedGroup;

    static defaultProps: DefaultProps = {
        gradedGroups: [],
        linterContext: linterContextDefault,
    };

    state: State = {
        currentGroup: 0,
    };

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        nextProps.gradedGroups as ReadonlyArray<PerseusGradedGroupWidgetOptions>;
        return nextProps !== this.props || nextState !== this.state;
    }

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error [FEI-5003] - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    // Mobile API
    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>> = () => {
        return this._childGroup.getInputPaths();
    };

    setInputValue: (arg1: FocusPath, arg2: any, arg3: any) => any = (
        path,
        newValue,
        cb,
    ) => {
        return this._childGroup.setInputValue(path, newValue, cb);
    };

    focus: () => boolean = () => {
        return this._childGroup.focus();
    };

    focusInputPath: (arg1: FocusPath) => void = (path) => {
        this._childGroup.focusInputPath(path);
    };

    blurInputPath: (arg1: FocusPath) => void = (path) => {
        this._childGroup.blurInputPath(path);
    };

    handleNextQuestion: () => void = () => {
        const {currentGroup} = this.state;
        const numGroups = this.props.gradedGroups.length;

        if (currentGroup < numGroups - 1) {
            this.setState({currentGroup: currentGroup + 1});
        }
    };

    render(): React.ReactNode {
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
                            // @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call.
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
                        currentGroup={this.state.currentGroup}
                        gradedGroups={this.props.gradedGroups}
                        onChangeCurrentGroup={(currentGroup) =>
                            this.setState({currentGroup})
                        }
                    />
                </div>
                {/* TODO(jeremy): Don't spread this.props, instead
                    pass in all props GradedGroup needs explicitly */}
                {/* @ts-expect-error [FEI-5003] - TS2769 - No overload matches this call. */}
                <GradedGroup
                    key={this.state.currentGroup}
                    // @ts-expect-error [FEI-5003] - TS2322 - Type 'GradedGroup | null' is not assignable to type 'GradedGroup'.
                    //  Type 'null' is not assignable to type 'GradedGroup'.
                    ref={(comp) => (this._childGroup = comp)}
                    // We should pass in the set of props explicitly
                    {...this.props}
                    {...currentGroup}
                    inGradedGroupSet={true}
                    title={null}
                    onNextQuestion={handleNextQuestion}
                    linterContext={this.props.linterContext}
                />
            </div>
        );
    }
}

const traverseChildWidgets: (arg1: any, arg2: any) => any = function (
    props,
    traverseRenderer,
) {
    // NOTE(jared): I have no idea how this works
    return {
        groups: props.gradedGroups.map(traverseRenderer),
    };
};

export default {
    name: "graded-group-set",
    displayName: "Graded group set (articles only)",
    widget: GradedGroupSet,
    traverseChildWidgets: traverseChildWidgets,
    // TODO(michaelpolyak): This widget should be available for articles only
    hidden: false,
    tracking: "all",
    isLintable: true,
} as WidgetExports<typeof GradedGroupSet>;

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
        color: Color.offBlack64,
        textTransform: "uppercase",
        marginBottom: 11,
        letterSpacing: 0.8,
    },

    indicatorContainer: {
        display: "flex",
        flexDirection: "row",
        listStyle: "none",
        margin: "unset",
    },

    indicator: {
        width: 10,
        height: 10,
        borderRadius: "100%",
        border: "3px solid",
        borderColor: Color.blue,
        marginLeft: 5,
        cursor: "pointer",
    },

    selectedIndicator: {
        backgroundColor: Color.blue,
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
