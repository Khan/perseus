import {components} from "@khanacademy/perseus";
import {ItemExtras} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {PerseusAnswerArea} from "@khanacademy/perseus-core";

const {InfoTip} = components;

type Props = PerseusAnswerArea & {
    onChange: (props: Partial<PerseusAnswerArea>) => void;
    // Whether the editor is disabled. Can be set via API options
    // to make the editor read-only when needed.
    editingDisabled: boolean;
};

class ItemExtrasEditor extends React.Component<Props> {
    static defaultProps: PerseusAnswerArea = {
        calculator: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    };

    shouldShowFinancialCalculatorOptions() {
        return (
            this.props.financialCalculatorMonthlyPayment ||
            this.props.financialCalculatorTotalAmount ||
            this.props.financialCalculatorTimeToPayOff
        );
    }

    serialize: () => PerseusAnswerArea = () => {
        const data = {...ItemExtrasEditor.defaultProps};
        for (const key of ItemExtras) {
            data[key] = !!this.props[key];
        }
        return data;
    };

    render(): React.ReactNode {
        const {editingDisabled} = this.props;
        return (
            <div className="perseus-answer-editor">
                <div className="perseus-answer-options">
                    <ItemExtraCheckbox
                        label="Show calculator"
                        disabled={editingDisabled}
                        infoTip="Use the calculator when completing difficult calculations is NOT the intent of the question. DON’T use the calculator when testing the student’s ability to complete different types of computations."
                        checked={this.props.calculator}
                        onChange={(newCheckedState) => {
                            this.props.onChange({
                                calculator: newCheckedState,
                            });
                        }}
                    />

                    <ItemExtraCheckbox
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
                            <ItemExtraCheckbox
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
                            <ItemExtraCheckbox
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
                            <ItemExtraCheckbox
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

                    <ItemExtraCheckbox
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
                        <ItemExtraCheckbox
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

const ItemExtraCheckbox = (props: {
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
});

export default ItemExtrasEditor;
