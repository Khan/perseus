import {shuffleMatcher} from "@khanacademy/perseus-core";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {isTruthy} from "@khanacademy/wonder-stuff-core";
import {StyleSheet, css} from "aphrodite";
import * as React from "react";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";

import {usePerseusI18n} from "../../components/i18n-context";
import Sortable from "../../components/sortable";
import {withDependencies} from "../../components/with-dependencies";
import {getDependencies} from "../../dependencies";
import Renderer from "../../renderer";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/matcher/matcher-ai-utils";

import type {SortableOption} from "../../components/sortable";
import type {
    WidgetExports,
    WidgetPropsV2,
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

type Props = WidgetPropsV2<
    PerseusMatcherWidgetOptions,
    PerseusMatcherUserInput
> & {
    dependencies: PerseusDependenciesV2;
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

const Matcher = forwardRef<MatcherHandle, Props>(function Matcher(props, ref) {
    const {strings} = usePerseusI18n();

    const leftSortable = useRef<Sortable>(null);
    const rightSortable = useRef<Sortable>(null);

    const [leftHeight, setLeftHeight] = useState(0);
    const [rightHeight, setRightHeight] = useState(0);
    const [texRendererLoaded, setTexRendererLoaded] = useState(false);

    useOnMountEffect(() => {
        props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "matcher",
                widgetId: props.widgetId,
            },
        });
    });

    useImperativeHandle(ref, () => ({
        getPromptJSON: (): MatcherPromptJSON => _getPromptJSON(props),

        // Programatic API for moving options. This is used by testing.
        moveLeftOptionToIndex: (option, index) => {
            leftSortable.current?.moveOptionToIndex(option, index);
        },
        moveRightOptionToIndex: (option, index) => {
            rightSortable.current?.moveOptionToIndex(option, index);
        },
    }));

    function getUserInputFromSortable(): PerseusMatcherUserInput {
        // If the math renderer hasn't loaded then we won't be able to get the
        // contents of the sortables on the left and right, so we just return
        // empty arrays until we render for the first time.
        if (!texRendererLoaded) {
            return {
                left: [],
                right: [],
            };
        }

        return {
            left: leftSortable.current?.getOptions() ?? [],
            right: rightSortable.current?.getOptions() ?? [],
        };
    }

    function changeAndTrack() {
        props.handleUserInput(getUserInputFromSortable());
        props.trackInteraction();
    }

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
    if (!texRendererLoaded) {
        const {TeX} = getDependencies();
        return (
            <>
                <CircularSpinner />
                <div style={{display: "none"}}>
                    <TeX onRender={() => setTexRendererLoaded(true)}>1</TeX>
                </div>
            </>
        );
    }

    const {labels, padding, orderMatters} = props.options;

    const showLabels = labels.some(isTruthy);
    const constraints = {
        height: Math.max(leftHeight, rightHeight),
    };

    const cellMarginPx = props.apiOptions.isMobile ? 8 : 5;

    return (
        <table className={css(styles.widget) + " " + HACKY_CSS_CLASSNAME}>
            <tbody>
                {showLabels && (
                    <tr className={css(styles.row)}>
                        <th className={css(styles.column, styles.columnLabel)}>
                            <Renderer
                                content={labels[0] || "..."}
                                linterContext={props.linterContext}
                                strings={strings}
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
                                content={labels[1] || "..."}
                                linterContext={props.linterContext}
                                strings={strings}
                            />
                        </th>
                    </tr>
                )}
                <tr className={css(styles.row)}>
                    <td className={css(styles.column)}>
                        <Sortable
                            options={props.userInput.left}
                            layout={"vertical"}
                            padding={padding}
                            disabled={!orderMatters}
                            constraints={constraints}
                            onMeasure={(dimensions) =>
                                setLeftHeight(Math.max(...dimensions.heights))
                            }
                            onChange={changeAndTrack}
                            margin={cellMarginPx}
                            linterContext={props.linterContext}
                            ref={leftSortable}
                        />
                    </td>
                    <td className={css(styles.column, styles.columnRight)}>
                        <Sortable
                            options={props.userInput.right}
                            layout={"vertical"}
                            padding={padding}
                            constraints={constraints}
                            onMeasure={(dimensions) =>
                                setRightHeight(Math.max(...dimensions.heights))
                            }
                            onChange={changeAndTrack}
                            margin={cellMarginPx}
                            linterContext={props.linterContext}
                            ref={rightSortable}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    );
});

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
