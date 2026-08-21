import {shuffle} from "@khanacademy/perseus-core";
import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {css, StyleSheet} from "aphrodite";
import classNames from "classnames";
import React, {forwardRef, useImperativeHandle, useMemo} from "react";
import _ from "underscore";

import {usePerseusI18n} from "../../components/i18n-context";
import InlineIcon from "../../components/inline-icon";
import {useDependencies} from "../../dependencies";
import {iconCircle, iconCircleThin} from "../../icon-paths";
import Renderer from "../../renderer";
import mediaQueries from "../../styles/media-queries";
import sharedStyles from "../../styles/shared";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/categorizer/categorizer-ai-utils";

import type {Widget, WidgetExports, WidgetProps} from "../../types";
import type {CategorizerPromptJSON} from "../../widget-ai-utils/categorizer/categorizer-ai-utils";
import type {
    PerseusCategorizerUserInput,
    PerseusCategorizerWidgetOptions,
} from "@khanacademy/perseus-core";

type Props = WidgetProps<
    PerseusCategorizerWidgetOptions,
    PerseusCategorizerUserInput
>;

const Categorizer = forwardRef<Widget, Props>(function Categorizer(props, ref) {
    const {items, categories, randomizeItems} = props.options;
    const {
        userInput,
        problemNum,
        apiOptions,
        linterContext,
        handleUserInput,
        trackInteraction,
    } = props;
    const dependencies = useDependencies();
    const {strings} = usePerseusI18n();
    const idPrefix = useMemo(() => _.uniqueId("perseus_radio_"), []);

    useOnMountEffect(() => {
        dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "categorizer",
                widgetId: props.widgetId,
            },
        });
    });

    useImperativeHandle(ref, () => ({
        getPromptJSON: (): CategorizerPromptJSON => _getPromptJSON(props),

        /**
         * @deprecated and likely very broken API
         * [LEMS-3185] do not trust serializedState
         */
        getSerializedState(): any {
            const {userInput, options, ...rest} = props;
            return {
                ...options,
                ...rest,
                // `dependencies` probably shouldn't be included here, but this
                // is for legacy compatibility.
                dependencies,
                values: userInput.values,
            };
        },
    }));

    function _handleUserInput(itemNum: number, catNum: number) {
        const values = [...userInput.values];
        values[itemNum] = catNum;
        handleUserInput({values});
        trackInteraction();
    }

    let indexedItems: ReadonlyArray<Readonly<[string, number]>> = items.map(
        (item, n) => [item, n],
    );
    if (randomizeItems) {
        indexedItems = shuffle(
            indexedItems,
            // eslint-disable-next-line no-restricted-syntax
            problemNum as number,
        );
    }

    const table = (
        <table className={"categorizer-table " + css(styles.mobileTable)}>
            <thead>
                <tr>
                    <td className={css(styles.emptyHeaderCell)} />
                    {categories.map((category, i) => {
                        // Array index is the correct key here, as that's
                        // how category grading actually works -- no way
                        // to add or remove categories or items in the
                        // middle. (If we later add that, this should be
                        // fixed.)
                        return (
                            <th className={css(styles.header)} key={i}>
                                <Renderer
                                    content={category}
                                    linterContext={linterContext}
                                    strings={strings}
                                />
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {indexedItems.map((indexedItem) => {
                    const item = indexedItem[0];
                    const itemNum = indexedItem[1];
                    const uniqueId = idPrefix + "_" + itemNum;
                    return (
                        <tr key={itemNum}>
                            <td>
                                <Renderer
                                    content={item}
                                    linterContext={linterContext}
                                    strings={strings}
                                />
                            </td>
                            {categories.map((catName, catNum) => {
                                const selected =
                                    userInput.values[itemNum] === catNum;
                                return (
                                    <td
                                        className={
                                            "category " + css(styles.cell)
                                        }
                                        key={catNum}
                                    >
                                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- TODO(LEMS-2871): Address a11y error */}
                                        <div
                                            role="button"
                                            aria-label={catName}
                                            onClick={() =>
                                                _handleUserInput(
                                                    itemNum,
                                                    catNum,
                                                )
                                            }
                                        >
                                            {apiOptions.isMobile && (
                                                <input
                                                    type="radio"
                                                    name={uniqueId}
                                                    className={css(
                                                        sharedStyles.responsiveInput,
                                                        sharedStyles.responsiveRadioInput,
                                                        props.static &&
                                                            sharedStyles.responsiveRadioInputStatic,
                                                    )}
                                                    checked={selected}
                                                    onChange={() =>
                                                        _handleUserInput(
                                                            itemNum,
                                                            catNum,
                                                        )
                                                    }
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                />
                                            )}
                                            {!apiOptions.isMobile && (
                                                <span
                                                    className={css(
                                                        styles.radioSpan,
                                                        selected &&
                                                            styles.checkedRadioSpan,
                                                        props.static &&
                                                            selected &&
                                                            styles.staticCheckedRadioSpan,
                                                    )}
                                                >
                                                    {selected ? (
                                                        <InlineIcon
                                                            {...iconCircle}
                                                        />
                                                    ) : (
                                                        <InlineIcon
                                                            {...iconCircleThin}
                                                        />
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    const extraClassNames = classNames({
        "categorizer-container": true,
        "static-mode": props.static,
    });
    const inlineStyles = apiOptions.isMobile ? [styles.fullBleedContainer] : [];

    return (
        <div className={extraClassNames + " " + css(...inlineStyles)}>
            {table}
        </div>
    );
});

const pageMargin = 16;

// Stylesheets aren't directly testable
/* c8 ignore next */
const styles = StyleSheet.create({
    mobileTable: {
        [mediaQueries.smOrSmaller]: {
            minInlineSize: "auto",
        },
    },

    fullBleedContainer: {
        [mediaQueries.mdOrSmaller]: {
            marginInlineStart: -pageMargin,
            marginInlineEnd: -pageMargin,
            overflowX: "auto",
        },
    },

    header: {
        textAlign: "center",
        verticalAlign: "bottom",
    },

    cell: {
        textAlign: "center",
        padding: 0,
        color: semanticColor.core.border.neutral.subtle,
        verticalAlign: "middle",
    },

    emptyHeaderCell: {
        backgroundColor: "inherit",
        borderBlockEnd: `${border.width.medium} solid ${semanticColor.core.border.neutral.subtle}`,
    },

    radioSpan: {
        fontSize: sizing.size_280,
        paddingInlineEnd: 3,
        cursor: "pointer",

        ":hover": {
            color: semanticColor.core.foreground.instructive.subtle,
        },
    },

    checkedRadioSpan: {
        color: semanticColor.core.foreground.instructive.default,
    },

    // .static-mode is applied by the Categorizer when the rendered
    // widget is static; in this case we gray out the choices to show
    // the user that the widget can't be interacted with.
    staticCheckedRadioSpan: {
        color: semanticColor.core.foreground.disabled.strong,
    },
});

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusCategorizerUserInput {
    return {values: serializedState.values};
}

/**
 * you need this along with _getAllWidgetsStartProps
 * to generate userInput for static widgets
 */
function getCorrectUserInput(
    options: PerseusCategorizerWidgetOptions,
): PerseusCategorizerUserInput {
    return {values: options.values};
}

function getStartUserInput(): PerseusCategorizerUserInput {
    return {
        values: [],
    };
}

export default {
    name: "categorizer",
    displayName: "Categorizer",
    widget: Categorizer,
    getUserInputFromSerializedState,
    getCorrectUserInput,
    getStartUserInput,
    isLintable: true,
} satisfies WidgetExports<typeof Categorizer, PerseusCategorizerUserInput>;
