/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {shuffle} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import {withDependencies} from "../../components/with-dependencies";
import Renderer from "../../renderer";
import mediaQueries from "../../styles/media-queries";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/categorizer/categorizer-ai-utils";

import type {
    PerseusDependenciesV2,
    Widget,
    WidgetExports,
    WidgetProps,
} from "../../types";
import type {CategorizerPromptJSON} from "../../widget-ai-utils/categorizer/categorizer-ai-utils";
import type {
    PerseusCategorizerWidgetOptions,
    PerseusCategorizerUserInput,
} from "@khanacademy/perseus-core";

type ExternalProps = WidgetProps<
    PerseusCategorizerWidgetOptions,
    PerseusCategorizerUserInput
>;

type Props = ExternalProps & {
    linterContext: NonNullable<ExternalProps["linterContext"]>;
    dependencies: PerseusDependenciesV2;
};

type DefaultProps = Pick<
    Props,
    "items" | "categories" | "linterContext" | "userInput"
>;

type State = {
    uniqueId: string;
};

const StyledInput = addStyle("input");
const StyledCaption = addStyle("caption");

class Categorizer extends React.Component<Props, State> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        items: [],
        categories: [],
        linterContext: linterContextDefault,
        userInput: {values: []},
    };

    state: State = {
        uniqueId: _.uniqueId("perseus_radio_"),
    };

    componentDidMount() {
        this.props.dependencies.analytics.onAnalyticsEvent({
            type: "perseus:widget:rendered:ti",
            payload: {
                widgetSubType: "null",
                widgetType: "categorizer",
                widgetId: this.props.widgetId,
            },
        });
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState
     */
    getSerializedState(): any {
        const {userInput, ...rest} = this.props;
        return {
            ...rest,
            values: userInput.values,
        };
    }

    getPromptJSON(): CategorizerPromptJSON {
        return _getPromptJSON(this.props);
    }

    _handleUserInput(itemNum: number, catNum: number) {
        const values = [...this.props.userInput.values];
        values[itemNum] = catNum;
        this.props.handleUserInput({values});
        this.props.trackInteraction();
    }

    render(): React.ReactNode {
        const self = this;

        let indexedItems: ReadonlyArray<Readonly<[string, number]>> =
            this.props.items.map((item, n) => [item, n]);
        if (this.props.randomizeItems) {
            indexedItems = shuffle(
                indexedItems,
                this.props.problemNum as number,
            );
        }

        const table = (
            <table className={"categorizer-table " + css(styles.mobileTable)}>
                <StyledCaption style={styles.srOnly}>
                    {this.context.strings.categorizerTableCaption}
                </StyledCaption>
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className={css(styles.emptyHeaderCell)}
                        />
                        {this.props.categories.map((category, i) => {
                            // Array index is the correct key here, as that's
                            // how category grading actually works -- no way
                            // to add or remove categories or items in the
                            // middle. (If we later add that, this should be
                            // fixed.)
                            return (
                                <th
                                    scope="col"
                                    className={css(styles.header)}
                                    key={i}
                                >
                                    <Renderer
                                        content={category}
                                        linterContext={this.props.linterContext}
                                        strings={this.context.strings}
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
                        // uniqueId is scoped per-item so IDs are unique across
                        // the whole table
                        const uniqueId = self.state.uniqueId + "_" + itemNum;
                        return (
                            <tr key={itemNum}>
                                <th scope="row">
                                    <Renderer
                                        content={item}
                                        linterContext={this.props.linterContext}
                                        strings={this.context.strings}
                                    />
                                </th>
                                {self.props.categories.map(
                                    (catName, catNum) => {
                                        const selected =
                                            self.props.userInput.values[
                                                itemNum
                                            ] === catNum;
                                        const inputId = `${uniqueId}-cat-${catNum}`;
                                        return (
                                            <td
                                                className={
                                                    "category " +
                                                    css(styles.cell)
                                                }
                                                key={catNum}
                                            >
                                                <StyledInput
                                                    type="radio"
                                                    id={inputId}
                                                    name={uniqueId}
                                                    checked={selected}
                                                    disabled={this.props.static}
                                                    onChange={() =>
                                                        this._handleUserInput(
                                                            itemNum,
                                                            catNum,
                                                        )
                                                    }
                                                    style={[
                                                        styles.radioInput,
                                                        selected &&
                                                            styles.radioInputChecked,
                                                        this.props.static &&
                                                            styles.radioInputDisabled,
                                                    ]}
                                                />
                                                <label
                                                    htmlFor={inputId}
                                                    className={css(
                                                        styles.srOnly,
                                                    )}
                                                >
                                                    {`${item} — ${catName}`}
                                                </label>
                                            </td>
                                        );
                                    },
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );

        const extraClassNames = classNames({
            "categorizer-container": true,
            "static-mode": this.props.static,
        });
        const inlineStyles = this.props.apiOptions.isMobile
            ? [styles.fullBleedContainer]
            : [];

        return (
            <div className={extraClassNames + " " + css(...inlineStyles)}>
                {table}
            </div>
        );
    }
}

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
        verticalAlign: "middle",
    },

    emptyHeaderCell: {
        backgroundColor: "inherit",
        borderBlockEnd: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
    },

    radioInput: {
        // 24px meets the WCAG 2.5.8 minimum target size
        blockSize: 24,
        inlineSize: 24,
        appearance: "none",
        WebkitAppearance: "none",
        borderRadius: "50%",
        boxShadow: `0 0 0 ${border.width.thin} ${semanticColor.core.border.neutral.default}`,
        cursor: "pointer",
        backgroundColor: "transparent",
        ":focus-visible": {
            outline: `${border.width.medium} solid ${semanticColor.focus.outer}`,
            outlineOffset: "4px",
        },
    },

    radioInputChecked: {
        boxShadow: `0 0 0 ${border.width.medium} ${semanticColor.core.border.instructive.default}`,
        backgroundColor: semanticColor.core.background.instructive.default,
    },

    radioInputDisabled: {
        cursor: "not-allowed",
        boxShadow: `0 0 0 ${border.width.thin} ${semanticColor.core.border.disabled.default}`,
    },

    srOnly: {
        position: "absolute",
        inlineSize: 1,
        blockSize: 1,
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
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

const WrappedCategorizer = withDependencies(Categorizer);

export default {
    name: "categorizer",
    displayName: "Categorizer",
    hidden: true,
    widget: WrappedCategorizer,
    getUserInputFromSerializedState,
    getCorrectUserInput,
    getStartUserInput,
    isLintable: true,
} satisfies WidgetExports<
    typeof WrappedCategorizer,
    PerseusCategorizerUserInput
>;
