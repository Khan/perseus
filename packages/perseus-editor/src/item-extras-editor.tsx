import {components, ItemExtras} from "@khanacademy/perseus";
import * as React from "react";

import type {PerseusAnswerArea} from "@khanacademy/perseus";

const {InfoTip} = components;

type Props = PerseusAnswerArea & {
    onChange: (props: Partial<PerseusAnswerArea>) => void;
};

type State = {
    financialCalculatorOptionsExpanded: boolean;
};

class ItemExtrasEditor extends React.Component<Props, State> {
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

    state = {
        financialCalculatorOptionsExpanded: false,
    };

    componentDidUpdate(prevProps: Readonly<Props>): void {
        // If no financial calculator options are checked, uncheck the
        // financial calculator option.
        if (
            this.state.financialCalculatorOptionsExpanded &&
            !this.props.financialCalculatorMonthlyPayment &&
            !this.props.financialCalculatorTotalAmount &&
            !this.props.financialCalculatorTimeToPayOff
        ) {
            this.setState({financialCalculatorOptionsExpanded: false});
        }
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
                        label="Show calculator:"
                        infoTip="Use the calculator when completing difficult calculations is NOT the intent of the question. DON’T use the calculator when testing the student’s ability to complete different types of computations."
                        checked={this.props.calculator}
                        onChange={(e) => {
                            this.props.onChange({
                                calculator: e.target.checked,
                            });
                        }}
                    />

                    <ItemExtraCheckbox
                        label="Show financial calculator:"
                        infoTip="This provides the student with the ability to view a financial calculator, e.g., for answering financial questions. Once checked, requires at least one of the three options below to be checked."
                        checked={this.state.financialCalculatorOptionsExpanded}
                        onChange={(e) => {
                            this.setState({
                                financialCalculatorOptionsExpanded:
                                    e.target.checked,
                            });
                            // If the financial calculator is unchecked,
                            // this needs to be reset. All checked by
                            // default.
                            this.props.onChange({
                                financialCalculatorMonthlyPayment:
                                    e.target.checked,
                                financialCalculatorTotalAmount:
                                    e.target.checked,
                                financialCalculatorTimeToPayOff:
                                    e.target.checked,
                            });
                        }}
                    />

                    {this.state.financialCalculatorOptionsExpanded && (
                        <>
                            <ItemExtraCheckbox
                                label="Include monthly payment:"
                                infoTip="This provides the student with the ability to view a monthly payment calculator; e.g., given a loan amount, interest rate, and term, what is the monthly payment?"
                                checked={
                                    this.props.financialCalculatorMonthlyPayment
                                }
                                onChange={(e) => {
                                    this.props.onChange({
                                        financialCalculatorMonthlyPayment:
                                            e.target.checked,
                                    });
                                }}
                                indent
                            />
                            <ItemExtraCheckbox
                                label="Include total amount:"
                                infoTip="This provides the student with the ability to view a total amount calculator; e.g., given a monthly payment, interest rate, and term, what is the total amount to be paid?"
                                checked={
                                    this.props.financialCalculatorTotalAmount
                                }
                                onChange={(e) => {
                                    this.props.onChange({
                                        financialCalculatorTotalAmount:
                                            e.target.checked,
                                    });
                                }}
                                indent
                            />
                            <ItemExtraCheckbox
                                label="Include time-to-pay-off:"
                                infoTip="This provides the student with the ability to view a time to pay off calculator; e.g., given a loan amount, interest rate, and monthly payment, how long will it take to pay off the loan?"
                                checked={
                                    this.props.financialCalculatorTimeToPayOff
                                }
                                onChange={(e) => {
                                    this.props.onChange({
                                        financialCalculatorTimeToPayOff:
                                            e.target.checked,
                                    });
                                }}
                                indent
                            />
                        </>
                    )}

                    <ItemExtraCheckbox
                        label="Show periodic table:"
                        infoTip="This provides the student with the ability to view a periodic table of the elements, e.g., for answering chemistry questions."
                        checked={this.props.periodicTable}
                        onChange={(e) => {
                            this.props.onChange({
                                periodicTable: e.target.checked,
                                // If the periodic table is unchecked,
                                // this needs to be reset. If table is
                                // checked, it should already be false.
                                periodicTableWithKey: false,
                            });
                        }}
                    />

                    {this.props.periodicTable && (
                        <ItemExtraCheckbox
                            label="Include key/legend with periodic table:"
                            infoTip="Include a key for HS courses; omit for AP chemistry."
                            checked={this.props.periodicTableWithKey}
                            onChange={(e) => {
                                this.props.onChange({
                                    periodicTableWithKey: e.target.checked,
                                });
                            }}
                            indent
                        />
                    )}

                    <ItemExtraCheckbox
                        label="Show z table (statistics):"
                        infoTip="This provides the student with the ability to view a table of critical values for the z distribution, e.g. for answering statistics questions."
                        checked={this.props.zTable}
                        onChange={(e) => {
                            this.props.onChange({
                                zTable: e.target.checked,
                            });
                        }}
                    />

                    <ItemExtraCheckbox
                        label="Show t table (statistics):"
                        infoTip="This provides the student with the ability to view a table of critical values for the Student's t distribution, e.g. for answering statistics questions."
                        checked={this.props.tTable}
                        onChange={(e) => {
                            this.props.onChange({
                                tTable: e.target.checked,
                            });
                        }}
                    />

                    <ItemExtraCheckbox
                        label="Show chi-squared table (statistics):"
                        infoTip="This provides the student with the ability to view a table of critical values for the chi-squared distribution, e.g. for answering statistics questions."
                        checked={this.props.chi2Table}
                        onChange={(e) => {
                            this.props.onChange({
                                chi2Table: e.target.checked,
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    indent?: boolean;
}) => (
    <div
        style={{
            marginLeft: props.indent ? "10px" : "0px",
        }}
    >
        <label>
            {props.label}
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
            />
        </label>
        <InfoTip>{props.infoTip}</InfoTip>
    </div>
);

export default ItemExtrasEditor;
