/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {shuffle} from "@khanacademy/perseus-core";
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import InlineIcon from "../../components/inline-icon";
import {withDependencies} from "../../components/with-dependencies";
import {iconCircle, iconCircleThin} from "../../icon-paths";
import Renderer from "../../renderer";
import mediaQueries from "../../styles/media-queries";
import sharedStyles from "../../styles/shared";
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

        // In this context, isMobile is used to differentiate mobile from
        // desktop.
        const isMobile = this.props.apiOptions.isMobile;
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
                <thead>
                    <tr>
                        <td className={css(styles.emptyHeaderCell)} />
                        {this.props.categories.map((category, i) => {
                            // Array index is the correct key here, as that's
                            // how category grading actually works -- no way
                            // to add or remove categories or items in the
                            // middle. (If we later add that, this should be
                            // fixed.)
                            return (
                                <th className={css(styles.header)} key={i}>
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
                        const uniqueId = self.state.uniqueId + "_" + itemNum;
                        return (
                            <tr key={itemNum}>
                                <td>
                                    <Renderer
                                        content={item}
                                        linterContext={this.props.linterContext}
                                        strings={this.context.strings}
                                    />
                                </td>
                                {self.props.categories.map(
                                    (catName, catNum) => {
                                        const selected =
                                            self.props.userInput.values[
                                                itemNum
                                            ] === catNum;
                                        return (
                                            <td
                                                className={
                                                    "category " +
                                                    css(styles.cell)
                                                }
                                                key={catNum}
                                            >
                                                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- TODO(LEMS-2871): Address a11y error */}
                                                <div
                                                    role="button"
                                                    aria-label={catName}
                                                    onClick={() =>
                                                        this._handleUserInput(
                                                            itemNum,
                                                            catNum,
                                                        )
                                                    }
                                                >
                                                    {isMobile && (
                                                        <input
                                                            type="radio"
                                                            name={uniqueId}
                                                            className={css(
                                                                sharedStyles.responsiveInput,
                                                                sharedStyles.responsiveRadioInput,
                                                            )}
                                                            checked={selected}
                                                            onChange={() =>
                                                                this._handleUserInput(
                                                                    itemNum,
                                                                    catNum,
                                                                )
                                                            }
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    )}
                                                    {!isMobile && (
                                                        <span
                                                            className={css(
                                                                styles.radioSpan,
                                                                selected &&
                                                                    styles.checkedRadioSpan,
                                                                this.props
                                                                    .static &&
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
                                    },
                                )}
                            </tr>
                        );
                        /* eslint-enable max-len */
                    })}
                </tbody>
            </table>
        );

        // TODO(benkomalo): kill CSS-based styling and move everything to
        // aphrodite.
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

// TODO(benkomalo): inject page-margin into Perseus instead of hardcoding.
const pageMargin = 16;

// Stylesheets aren't directly testable
/* c8 ignore next */
const styles = StyleSheet.create({
    mobileTable: {
        [mediaQueries.smOrSmaller]: {
            minWidth: "auto",
        },
    },

    fullBleedContainer: {
        [mediaQueries.mdOrSmaller]: {
            marginLeft: -pageMargin,
            marginRight: -pageMargin,
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
        color: "#ccc",
        verticalAlign: "middle",
    },

    emptyHeaderCell: {
        backgroundColor: "inherit",
        borderBottom: "2px solid #ccc",
    },

    radioSpan: {
        fontSize: 30,
        paddingRight: 3,

        ":hover": {
            color: "#999",
        },
    },

    checkedRadioSpan: {
        color: "#333",
    },

    // .static-mode is applied by the Categorizer when the rendered
    // widget is static; in this case we gray out the choices to show
    // the user that the widget can't be interacted with.
    staticCheckedRadioSpan: {
        color: "#888",
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
