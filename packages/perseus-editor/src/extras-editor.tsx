import {
    ItemExtras as ContentExtras,
    getDefaultAnswerArea,
    isFeatureOn,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox, Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
import {sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import InfoTip from "./components/info-tip";

import type {APIOptions} from "@khanacademy/perseus";
import type {
    CalculatorVariant,
    PerseusAnswerArea,
} from "@khanacademy/perseus-core";

const calculatorVariants: Array<{
    label: string;
    variant: CalculatorVariant;
}> = [
    {
        label: "Scientific calculator",
        variant: "scientific",
    },
    {
        label: "Graphing calculator",
        variant: "graphing",
    },
    {
        label: "Four-function calculator",
        variant: "four_function",
    },
];

type Props = PerseusAnswerArea & {
    apiOptions?: APIOptions;
    onChange: (props: Partial<PerseusAnswerArea>) => void;
    // Whether the editor is disabled. Can be set via API options
    // to make the editor read-only when needed.
    editingDisabled: boolean;
};

class ExtrasEditor extends React.Component<Props> {
    static defaultProps: PerseusAnswerArea = getDefaultAnswerArea();

    shouldShowCalculatorVariants() {
        return this.props.calculatorVariant !== undefined;
    }

    shouldShowFinancialCalculatorOptions() {
        return (
            this.props.financialCalculatorMonthlyPayment ||
            this.props.financialCalculatorTotalAmount ||
            this.props.financialCalculatorTimeToPayOff
        );
    }

    handleVariantChange = (newVariant: string) => {
        // Since RadioGroup gives us a string, we need to convert the string to
        // avoid a type error
        const selected = calculatorVariants.find(
            ({variant}) => variant === newVariant,
        );
        if (selected) {
            this.props.onChange({calculatorVariant: selected.variant});
        }
    };

    serialize(): PerseusAnswerArea {
        const data = {...ExtrasEditor.defaultProps};
        for (const key of ContentExtras) {
            data[key] = !!this.props[key];
        }
        data.calculatorVariant = this.props.calculatorVariant;
        return data;
    }

    render(): React.ReactNode {
        const {editingDisabled, calculatorVariant} = this.props;
        return (
            <div className="perseus-answer-editor">
                <div className="perseus-answer-options">
                    <ExtraCheckbox
                        label="Show calculator"
                        disabled={editingDisabled}
                        infoTip="Use the calculator when completing difficult calculations is NOT the intent of the question. DON’T use the calculator when testing the student’s ability to complete different types of computations."
                        checked={this.shouldShowCalculatorVariants()}
                        onChange={(newCheckedState) => {
                            this.props.onChange({
                                calculator: newCheckedState,
                                calculatorVariant: newCheckedState
                                    ? "scientific"
                                    : undefined,
                            });
                        }}
                    />

                    {isFeatureOn(this.props, "desmos-calculator") &&
                        calculatorVariant !== undefined && (
                            <RadioGroup
                                groupName="calculator-variant"
                                selectedValue={calculatorVariant}
                                onChange={this.handleVariantChange}
                                style={styles.indented}
                            >
                                {calculatorVariants.map((calcVariant, _) => (
                                    <Choice
                                        key={calcVariant.variant}
                                        value={calcVariant.variant}
                                        label={calcVariant.label}
                                        disabled={editingDisabled}
                                        style={styles.calculatorChoice}
                                    />
                                ))}
                            </RadioGroup>
                        )}

                    <ExtraCheckbox
                        label="Show financial calculator"
                        disabled={editingDisabled}
                        infoTip="This provides the student with the ability to view a financial calculator, e.g., for answering financial questions. Once checked, requires at least one of the three options below to be checked."
                        checked={this.shouldShowFinancialCalculatorOptions()}
                        onChange={(newCheckedState) => {
                            // If the financial calculator is unchecked,
                            // these need to be reset. All checked by
                            // default.
                            this.props.onChange({
                                financialCalculatorMonthlyPayment:
                                    newCheckedState,
                                financialCalculatorTotalAmount: newCheckedState,
                                financialCalculatorTimeToPayOff:
                                    newCheckedState,
                            });
                        }}
                    />

                    {this.shouldShowFinancialCalculatorOptions() && (
                        <>
                            <ExtraCheckbox
                                label="Include monthly payment"
                                disabled={editingDisabled}
                                infoTip="This provides the student with the ability to view a monthly payment calculator; e.g., given a loan amount, interest rate, and term, what is the monthly payment?"
                                checked={
                                    this.props.financialCalculatorMonthlyPayment
                                }
                                onChange={(newCheckedState) => {
                                    this.props.onChange({
                                        financialCalculatorMonthlyPayment:
                                            newCheckedState,
                                    });
                                }}
                                indent
                            />
                            <ExtraCheckbox
                                label="Include total amount"
                                disabled={editingDisabled}
                                infoTip="This provides the student with the ability to view a total amount calculator; e.g., given a monthly payment, interest rate, and term, what is the total amount to be paid?"
                                checked={
                                    this.props.financialCalculatorTotalAmount
                                }
                                onChange={(newCheckedState) => {
                                    this.props.onChange({
                                        financialCalculatorTotalAmount:
                                            newCheckedState,
                                    });
                                }}
                                indent
                            />
                            <ExtraCheckbox
                                label="Include time-to-pay-off"
                                disabled={editingDisabled}
                                infoTip="This provides the student with the ability to view a time to pay off calculator; e.g., given a loan amount, interest rate, and monthly payment, how long will it take to pay off the loan?"
                                checked={
                                    this.props.financialCalculatorTimeToPayOff
                                }
                                onChange={(newCheckedState) => {
                                    this.props.onChange({
                                        financialCalculatorTimeToPayOff:
                                            newCheckedState,
                                    });
                                }}
                                indent
                            />
                        </>
                    )}

                    <ExtraCheckbox
                        label="Show periodic table"
                        disabled={editingDisabled}
                        infoTip="This provides the student with the ability to view a periodic table of the elements, e.g., for answering chemistry questions."
                        checked={this.props.periodicTable}
                        onChange={(newCheckedState) => {
                            this.props.onChange({
                                periodicTable: newCheckedState,
                                // If the periodic table is unchecked,
                                // this needs to be reset. If table is
                                // checked, it should already be false.
                                periodicTableWithKey: false,
                            });
                        }}
                    />

                    {this.props.periodicTable && (
                        <ExtraCheckbox
                            label="Include key/legend with periodic table"
                            disabled={editingDisabled}
                            infoTip="Include a key for HS courses; omit for AP chemistry."
                            checked={this.props.periodicTableWithKey}
                            onChange={(newCheckedState) => {
                                this.props.onChange({
                                    periodicTableWithKey: newCheckedState,
                                });
                            }}
                            indent
                        />
                    )}
                </div>
            </div>
        );
    }
}

const ExtraCheckbox = (props: {
    label: string;
    infoTip: string;
    checked: boolean;
    onChange: (newCheckedState: boolean) => void;
    indent?: boolean;
    disabled?: boolean;
}) => (
    <View style={[styles.checkbox, props.indent ? styles.indented : undefined]}>
        <Checkbox
            disabled={props.disabled}
            label={
                <View style={{flexDirection: "row"}}>
                    {props.label} <InfoTip>{props.infoTip}</InfoTip>
                </View>
            }
            checked={props.checked}
            onChange={(newCheckedState) => props.onChange(newCheckedState)}
        />
    </View>
);

const styles = StyleSheet.create({
    indented: {
        marginInlineStart: spacing.large_24,
    },
    calculatorChoice: {
        marginBlock: sizing.size_010,
    },
});

export default ExtrasEditor;
