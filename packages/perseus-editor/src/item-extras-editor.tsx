import {components, ItemExtras} from "@khanacademy/perseus";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import type {PerseusAnswerArea} from "@khanacademy/perseus";

const {InfoTip} = components;

type Props = PerseusAnswerArea & {
    onChange: (props: Partial<PerseusAnswerArea>) => void;
};

class ItemExtrasEditor extends React.Component<Props> {
    static defaultProps: PerseusAnswerArea = {
        calculator: false,
        chi2Table: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
        tTable: false,
        zTable: false,
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
        return (
            <div className="perseus-answer-editor">
                <div className="perseus-answer-options">
                    <ItemExtraCheckbox
                        label="Show calculator"
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

                    <ItemExtraCheckbox
                        label="Show z table (statistics)"
                        infoTip="This provides the student with the ability to view a table of critical values for the z distribution, e.g. for answering statistics questions."
                        checked={this.props.zTable}
                        onChange={(newCheckedState) => {
                            this.props.onChange({
                                zTable: newCheckedState,
                            });
                        }}
                    />

                    <ItemExtraCheckbox
                        label="Show t table (statistics)"
                        infoTip="This provides the student with the ability to view a table of critical values for the Student's t distribution, e.g. for answering statistics questions."
                        checked={this.props.tTable}
                        onChange={(newCheckedState) => {
                            this.props.onChange({
                                tTable: newCheckedState,
                            });
                        }}
                    />

                    <ItemExtraCheckbox
                        label="Show chi-squared table (statistics)"
                        infoTip="This provides the student with the ability to view a table of critical values for the chi-squared distribution, e.g. for answering statistics questions."
                        checked={this.props.chi2Table}
                        onChange={(newCheckedState) => {
                            this.props.onChange({
                                chi2Table: newCheckedState,
                            });
                        }}
                    />
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
}) => (
    <View style={[styles.checkbox, props.indent ? styles.indented : undefined]}>
        <Checkbox
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
