/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import {withDependencies} from "../../components/with-dependencies";
import {getDependencies} from "../../dependencies";
import {phoneMargin, negativePhoneMargin} from "../../styles/constants";
import {getPromptJSON} from "../../widget-ai-utils/graded-group-set/graded-group-set-ai-utils";
import {GradedGroup} from "../graded-group/graded-group";

import type {
    FocusPath,
    PerseusDependenciesV2,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
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
            // eslint-disable-next-line jsx-a11y/no-redundant-roles -- role="list" is intentional: Safari+VoiceOver strips list semantics from <ul> with list-style:none, so explicit role restores them
            <ul
                // reduntantly add class name for use in .css files--
                //   the styles object key gets hashed
                role="list"
                className={classNames(
                    css(styles.indicatorContainer),
                    "indicatorContainer",
                )}
            >
                {this.props.gradedGroups.map(({title}, i) => {
                    const isCurrent = i === this.props.currentGroup;
                    return (
                        // Note: Use index as key — titles are user-authored and
                        // not guaranteed unique. Groups are never reordered at
                        // runtime, so index keys are stable.
                        <li className={css(styles.indicator)} key={i}>
                            <Clickable
                                role="button"
                                aria-label={title}
                                aria-current={isCurrent}
                                style={styles.indicatorButton}
                                onClick={() =>
                                    this.props.onChangeCurrentGroup(i)
                                }
                                onKeyDown={(e) => this.handleKeyDown(e, i)}
                            >
                                {({hovered, focused, pressed}) => {
                                    const interactive =
                                        hovered || focused || pressed;
                                    return (
                                        <View
                                            style={[
                                                styles.indicatorDot,
                                                // The active pip fills its whole
                                                // circle in the fill color
                                                // (border included) so it reads
                                                // as one solid dot at the same
                                                // outer diameter as the
                                                // non-active ring pips.
                                                isCurrent &&
                                                    styles.indicatorDotActive,
                                                // The active pip can't use a
                                                // border for its hover/focus
                                                // ring (the fill bleeds under it
                                                // via border-box clip), so it
                                                // gets an offset outline instead;
                                                // non-active pips keep the
                                                // border-based treatment.
                                                interactive &&
                                                    (isCurrent
                                                        ? styles.indicatorDotActiveFocused
                                                        : styles.indicatorDotFocused),
                                            ]}
                                        />
                                    );
                                }}
                            </Clickable>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

type Props = WidgetProps<PerseusGradedGroupSetWidgetOptions> & {
    trackInteraction: () => void;
    dependencies: PerseusDependenciesV2;
};

type DefaultProps = {
    gradedGroups: Props["gradedGroups"];
    linterContext: Props["linterContext"];
};

type State = {
    currentGroup: number;
};

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

    componentDidMount(): void {
        this.props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetType: "graded-group-set",
                widgetSubType: "null",
                widgetId: this.props.widgetId,
            },
        });
    }

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

const WrappedGradedGroupSet = withDependencies(GradedGroupSet);

export default {
    name: "graded-group-set",
    displayName: "Graded group set (articles only)",
    widget: WrappedGradedGroupSet,
    hidden: false,
    tracking: "all",
    isLintable: true,
} satisfies WidgetExports<typeof WrappedGradedGroupSet>;

const styles = StyleSheet.create({
    top: {
        display: "flex",
        flexDirection: "row",
    },
    spacer: {
        flex: 1,
    },

    title: {
        fontSize: font.heading.size.small,
        color: semanticColor.core.foreground.neutral.subtle,
        textTransform: "uppercase",
        marginBottom: 11,
        letterSpacing: 0.8,
    },

    indicatorContainer: {
        display: "flex",
        flexDirection: "row",
        listStyleType: "none",
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
        borderRadius: border.radius.radius_full,
        borderWidth: border.width.medium,
        borderColor: semanticColor.core.border.instructive.default,
        borderStyle: "solid",
    },

    indicatorDotFocused: {
        borderWidth: border.width.thick,
        borderStyle: "double",
    },

    indicatorDotActive: {
        // Fill the whole pip in the fill color. The background paints under the
        // border (default background-clip: border-box) and the border matches
        // it, so the pip is one seamless solid circle — no hairline where a
        // separate inner fill would meet the border. Outer diameter is
        // unchanged, so it lines up with the non-active ring pips.
        backgroundColor: semanticColor.core.foreground.instructive.default,
        borderColor: semanticColor.core.foreground.instructive.default,
    },

    indicatorDotActiveFocused: {
        // Ring the solid pip on hover/focus with an OUTLINE offset outward, so a
        // gap of background shows between the pip and the ring (inner dot →
        // space → line). An outline is used rather than a border because the
        // fill bleeds under a border via the default border-box background clip,
        // which would hide the gap; an outline paints outside the box and is
        // never covered by the fill.
        outlineColor: semanticColor.core.border.instructive.default,
        outlineStyle: "solid",
        outlineWidth: border.width.medium,
        outlineOffset: 2,
    },

    container: {
        borderTop: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderBottom: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.base.subtle,
        marginLeft: negativePhoneMargin,
        marginRight: negativePhoneMargin,
        paddingBottom: phoneMargin,
        paddingLeft: phoneMargin,
        paddingRight: phoneMargin,
        paddingTop: 10,
        width: "auto",
    },
});
