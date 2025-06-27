/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import {getDependencies} from "../../dependencies";
import {
    gray76,
    tableBackgroundAccent,
    phoneMargin,
    negativePhoneMargin,
} from "../../styles/constants";
import a11y from "../../util/a11y";
import {getPromptJSON} from "../../widget-ai-utils/graded-group-set/graded-group-set-ai-utils";
import {GradedGroup} from "../graded-group/graded-group";

import type {FocusPath, Widget, WidgetExports, WidgetProps} from "../../types";
import type {GradedGroupSetPromptJSON} from "../../widget-ai-utils/graded-group-set/graded-group-set-ai-utils";
import type {
    PerseusGradedGroupSetWidgetOptions,
    PerseusGradedGroupWidgetOptions,
} from "@khanacademy/perseus-core";

type IndicatorsProps = {
    currentGroup: number;
    gradedGroups: ReadonlyArray<PerseusGradedGroupWidgetOptions>;
    onChangeCurrentGroup: (groupNumber: number) => void;
};

class Indicators extends React.Component<IndicatorsProps> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    handleKeyDown = (e: React.KeyboardEvent, i: number) => {
        if (e.key === "Enter" || e.key === " ") {
            this.props.onChangeCurrentGroup(i);
        }
    };

    render(): React.ReactNode {
        return (
            <ul
                // reduntantly add class name for use in .css files--
                //   the styles object key gets hashed
                className={classNames(
                    css(styles.indicatorContainer),
                    "indicatorContainer",
                )}
            >
                {this.props.gradedGroups.map(({title}, i) => (
                    <li className={css(styles.indicator)} key={title}>
                        <Clickable
                            role="button"
                            aria-label={this.context.strings.skipToTitle({
                                title,
                            })}
                            style={styles.indicatorButton}
                            onClick={() => this.props.onChangeCurrentGroup(i)}
                            onKeyDown={(e) => this.handleKeyDown(e, i)}
                        >
                            {({hovered, focused, pressed}) => (
                                <View
                                    style={[
                                        styles.indicatorDot,
                                        (hovered || focused || pressed) &&
                                            styles.indicatorDotFocused,
                                    ]}
                                >
                                    {i === this.props.currentGroup && (
                                        <View style={styles.indicatorDotActive}>
                                            <span className={css(a11y.srOnly)}>
                                                {this.context.strings.current}
                                            </span>
                                        </View>
                                    )}
                                </View>
                            )}
                        </Clickable>
                    </li>
                ))}
            </ul>
        );
    }
}

type Props = WidgetProps<PerseusGradedGroupSetWidgetOptions> & {
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
class GradedGroupSet extends React.Component<Props, State> implements Widget {
    // @ts-expect-error - TS2564 - Property '_childGroup' has no initializer and is not definitely assigned in the constructor.
    _childGroup: GradedGroup;

    static defaultProps: DefaultProps = {
        gradedGroups: [],
        linterContext: linterContextDefault,
    };

    state: State = {
        currentGroup: 0,
    };

    shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
        return nextProps !== this.props || nextState !== this.state;
    }

    // Mobile API
    getInputPaths: () => ReadonlyArray<FocusPath> = () => {
        return this._childGroup.getInputPaths();
    };

    getPromptJSON(): GradedGroupSetPromptJSON {
        const activeGroupPromptJSON = this._childGroup.getPromptJSON();

        return getPromptJSON(this.props, activeGroupPromptJSON);
    }

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
                            // @ts-expect-error - TS2769 - No overload matches this call.
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

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!currentGroup) {
            return <span>No current group...</span>;
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
                {/* @ts-expect-error - TS2769 - No overload matches this call. */}
                <GradedGroup
                    key={this.state.currentGroup}
                    // @ts-expect-error - TS2322 - Type 'GradedGroup | null' is not assignable to type 'GradedGroup'.
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

export default {
    name: "graded-group-set",
    displayName: "Graded group set (articles only)",
    widget: GradedGroupSet,
    // TODO(michaelpolyak): This widget should be available for articles only
    hidden: false,
    tracking: "all",
    isLintable: true,
} satisfies WidgetExports<typeof GradedGroupSet>;

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
        color: color.offBlack64,
        textTransform: "uppercase",
        marginBottom: 11,
        letterSpacing: 0.8,
    },

    indicatorContainer: {
        display: "flex",
        flexDirection: "row",
        listStyle: "none",
        margin: "unset",
        paddingInlineStart: "unset",
        flexWrap: "wrap",
    },

    indicator: {
        width: 24,
        height: 24,
    },

    indicatorButton: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        placeContent: "center",
        cursor: "pointer",

        ":focus": {
            outline: "none",
        },
    },

    indicatorDot: {
        boxSizing: "content-box",
        width: 10,
        height: 10,
        borderRadius: "100%",
        borderWidth: 2,
        borderColor: color.blue,
        borderStyle: "solid",
    },

    indicatorDotFocused: {
        borderWidth: 5,
        borderStyle: "double",
    },

    indicatorDotActive: {
        backgroundColor: color.blue,
        width: "100%",
        height: "100%",
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
