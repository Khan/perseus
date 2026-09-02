import Clickable from "@khanacademy/wonder-blocks-clickable";
import {useOnMountEffect, View} from "@khanacademy/wonder-blocks-core";
import {border, font, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import invariant from "tiny-invariant";

import {getDependencies, useDependencies} from "../../dependencies";
import {phoneMargin, negativePhoneMargin} from "../../styles/constants";
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

function Indicators(props: IndicatorsProps) {
    function handleKeyDown(e: React.KeyboardEvent, i: number) {
        if (e.key === "Enter" || e.key === " ") {
            props.onChangeCurrentGroup(i);
        }
    }

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
            {props.gradedGroups.map(({title}, i) => {
                const isCurrent = i === props.currentGroup;
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
                            onClick={() => props.onChangeCurrentGroup(i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                        >
                            {({hovered, focused, pressed}) => (
                                <View
                                    style={[
                                        styles.indicatorDot,
                                        isCurrent && styles.indicatorDotActive,
                                        (hovered || focused || pressed) &&
                                            styles.indicatorDotFocused,
                                    ]}
                                />
                            )}
                        </Clickable>
                    </li>
                );
            })}
        </ul>
    );
}

type Props = WidgetProps<PerseusGradedGroupSetWidgetOptions> & {
    trackInteraction: () => void;
};

const GradedGroupSet = forwardRef<Widget, Props>(
    function GradedGroupSet(props, ref) {
        const dependencies = useDependencies();
        const childGroup = useRef<GradedGroup>();

        const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

        useOnMountEffect(() => {
            dependencies.analytics.onAnalyticsEvent({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetType: "graded-group-set",
                    widgetSubType: "null",
                    widgetId: props.widgetId,
                },
            });
        });

        useImperativeHandle(ref, () => ({
            getInputPaths(): ReadonlyArray<FocusPath> {
                return childGroup.current?.getInputPaths() ?? [];
            },

            getPromptJSON(): GradedGroupSetPromptJSON {
                invariant(
                    childGroup.current,
                    "GradedGroupSet must have at least one group",
                );
                return getPromptJSON(props, childGroup.current.getPromptJSON());
            },

            focus(): boolean {
                return childGroup.current?.focus() ?? false;
            },

            focusInputPath(path: FocusPath) {
                childGroup.current?.focusInputPath(path);
            },

            blurInputPath(path: FocusPath) {
                childGroup.current?.blurInputPath(path);
            },
        }));

        function handleNextQuestion() {
            const numGroups = props.options.gradedGroups.length;

            if (currentGroupIndex < numGroups - 1) {
                setCurrentGroupIndex(currentGroupIndex + 1);
            }
        }

        // When used in the context of TranslationEditor, render the
        // GradedGroup widget one below another instead of using an indicator
        // to click and switch between different graded groups. Translators
        // prefer to see all strings/labels on all GradedGroups readily visible
        // together instead of clicking on indicators to switch between them.
        const {gradedGroups} = props.options;
        const {JIPT} = getDependencies();
        if (JIPT.useJIPT && gradedGroups.length > 1) {
            return (
                <div className={css(styles.container)}>
                    {gradedGroups.map((gradedGroup, i) => {
                        return (
                            <GradedGroup
                                key={i}
                                {...props}
                                problemNum={(props.problemNum ?? 0) + i}
                                options={gradedGroup}
                                inGradedGroupSet={false}
                                linterContext={props.linterContext}
                                dependencies={dependencies}
                            />
                        );
                    })}
                </div>
            );
        }

        const currentGroup = gradedGroups[currentGroupIndex];

        if (currentGroup == null) {
            return <span>No current group...</span>;
        }

        const numGroups = gradedGroups.length;

        return (
            <div className={css(styles.container)}>
                <div className={css(styles.top)}>
                    <div className={css(styles.title)}>
                        {currentGroup.title}
                    </div>
                    <div className={css(styles.spacer)} />
                    <Indicators
                        currentGroup={currentGroupIndex}
                        gradedGroups={gradedGroups}
                        onChangeCurrentGroup={(currentGroupIndex) =>
                            setCurrentGroupIndex(currentGroupIndex)
                        }
                    />
                </div>
                <GradedGroup
                    key={currentGroupIndex}
                    // @ts-expect-error - TS2322 - Type 'GradedGroup | null' is not assignable to type 'GradedGroup'.
                    //  Type 'null' is not assignable to type 'GradedGroup'.
                    ref={childGroup}
                    // We should pass in the set of props explicitly
                    {...props}
                    problemNum={(props.problemNum ?? 0) + currentGroupIndex}
                    options={{
                        ...currentGroup,
                        // The set renders the group's title itself, above the
                        // indicators, so the group must not render it again.
                        title: "",
                    }}
                    inGradedGroupSet={true}
                    onNextQuestion={
                        currentGroupIndex < numGroups - 1
                            ? handleNextQuestion
                            : undefined
                    }
                    linterContext={props.linterContext}
                    dependencies={dependencies}
                />
            </div>
        );
    },
);

export default {
    name: "graded-group-set",
    displayName: "Graded group set (articles only)",
    widget: GradedGroupSet,
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
        fontSize: font.heading.size.small,
        color: semanticColor.core.foreground.neutral.default,
        textTransform: "uppercase",
        marginBlockEnd: 11,
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
        // Wonder Blocks-style focus indicator: an offset outer outline
        // (semanticColor.focus.outer) with a white inner ring
        // (semanticColor.focus.inner) via box-shadow, so focus stays visible
        // on any background.
        outlineColor: semanticColor.focus.outer,
        outlineStyle: "solid",
        outlineWidth: border.width.medium,
        outlineOffset: border.width.medium,
        boxShadow: `0 0 0 ${border.width.medium} ${semanticColor.focus.inner}`,
    },

    indicatorDotActive: {
        // The active pip is a disc of one solid color. We make the border
        // transparent so the background color shows through.
        backgroundColor: semanticColor.core.foreground.instructive.default,
        borderColor: semanticColor.core.transparent,
    },

    container: {
        borderBlockStart: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        borderBlockEnd: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
        backgroundColor: semanticColor.core.background.base.subtle,
        marginInlineStart: negativePhoneMargin,
        marginInlineEnd: negativePhoneMargin,
        paddingBlockEnd: phoneMargin,
        paddingInlineStart: phoneMargin,
        paddingInlineEnd: phoneMargin,
        paddingBlockStart: 10,
        width: "auto",
    },
});
