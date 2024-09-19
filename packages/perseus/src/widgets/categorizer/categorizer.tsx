/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {linterContextDefault} from "@khanacademy/perseus-linter";
import {StyleSheet, css} from "aphrodite";
import classNames from "classnames";
import * as React from "react";
import _ from "underscore";

import {PerseusI18nContext} from "../../components/i18n-context";
import InlineIcon from "../../components/inline-icon";
import {iconCircle, iconCircleThin} from "../../icon-paths";
import * as Changeable from "../../mixins/changeable";
import {ClassNames as ApiClassNames} from "../../perseus-api";
import Renderer from "../../renderer";
import mediaQueries from "../../styles/media-queries";
import sharedStyles from "../../styles/shared";
import Util from "../../util";

import categorizerValidator from "./categorizer-validator";

import type {Rubric} from "./categorizer.types";
import type {PerseusCategorizerWidgetOptions} from "../../perseus-types";
import type {PerseusStrings} from "../../strings";
import type {PerseusScore, WidgetExports, WidgetProps} from "../../types";
import type {PerseusCategorizerUserInput} from "../../validation.types";

type Props = WidgetProps<RenderProps, Rubric> & {
    values: ReadonlyArray<string>;
};

type DefaultProps = {
    items: Props["items"];
    categories: Props["categories"];
    values: Props["values"];
    linterContext: Props["linterContext"];
};

type State = {
    uniqueId: string;
};

export class Categorizer extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        items: [],
        categories: [],
        values: [],
        linterContext: linterContextDefault,
    };

    state: State = {
        uniqueId: _.uniqueId("perseus_radio_"),
    };

    static validate(
        userInput: PerseusCategorizerUserInput,
        rubric: Rubric,
        strings: PerseusStrings,
    ): PerseusScore {
        return categorizerValidator(userInput, rubric, strings);
    }

    static getUserInputFromProps(props: Props): PerseusCategorizerUserInput {
        return {values: props.values};
    }

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    getUserInput: () => PerseusCategorizerUserInput = () => {
        return Categorizer.getUserInputFromProps(this.props);
    };

    onChange(itemNum, catNum) {
        const values = [...this.props.values];
        // @ts-expect-error - TS2322 - Type 'number' is not assignable to type 'never'.
        values[itemNum] = catNum;
        this.change("values", values);
        this.props.trackInteraction();
    }

    simpleValidate: (arg1: Rubric) => PerseusScore = (rubric) => {
        return categorizerValidator(
            this.getUserInput(),
            rubric,
            this.context.strings,
        );
    };

    render(): React.ReactNode {
        const self = this;

        // In this context, isMobile is used to differentiate mobile from
        // desktop.
        const isMobile = this.props.apiOptions.isMobile;
        let indexedItems = this.props.items.map((item, n) => [item, n]);
        if (this.props.randomizeItems) {
            // @ts-expect-error - TS4104 - The type 'readonly (string | number)[][]' is 'readonly' and cannot be assigned to the mutable type '(string | number)[][]'. | TS2345 - Argument of type 'number | null | undefined' is not assignable to parameter of type 'number | RNG'.
            indexedItems = Util.shuffle(indexedItems, this.props.problemNum);
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
                                        // @ts-expect-error - TS2322 - Type 'string | number' is not assignable to type 'string | undefined'.
                                        content={item}
                                        linterContext={this.props.linterContext}
                                        strings={this.context.strings}
                                    />
                                </td>
                                {self.props.categories.map(
                                    (catName, catNum) => {
                                        const selected =
                                            self.props.values[itemNum] ===
                                            catNum;
                                        return (
                                            <td
                                                className={
                                                    "category " +
                                                    css(styles.cell)
                                                }
                                                key={catNum}
                                            >
                                                {/* a pseudo-label: toggle the
                                value of the checkbox when this div or the
                                checkbox is clicked */}
                                                <div
                                                    className={
                                                        ApiClassNames.INTERACTIVE
                                                    }
                                                    role="button"
                                                    aria-label={catName}
                                                    onClick={() =>
                                                        this.onChange(
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
                                                                this.onChange(
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

type RenderProps = {
    items: PerseusCategorizerWidgetOptions["items"];
    categories: PerseusCategorizerWidgetOptions["categories"];
    randomizeItems: PerseusCategorizerWidgetOptions["randomizeItems"];
    // Depends on whether the widget is in static mode
    values?: PerseusCategorizerWidgetOptions["values"];
};

export default {
    name: "categorizer",
    displayName: "Categorizer",
    hidden: true,
    widget: Categorizer,
    transform: (
        widgetOptions: PerseusCategorizerWidgetOptions,
    ): RenderProps => {
        return _.pick(widgetOptions, "items", "categories", "randomizeItems");
    },
    staticTransform: (
        editorProps: PerseusCategorizerWidgetOptions,
    ): RenderProps => {
        return _.pick(
            editorProps,
            "items",
            "categories",
            "values",
            "randomizeItems",
        );
    },
    isLintable: true,
} as WidgetExports<typeof Categorizer>;
