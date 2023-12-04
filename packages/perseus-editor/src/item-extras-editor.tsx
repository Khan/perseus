import {components} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";

const {InfoTip} = components;

type Props = any;

class ItemExtrasEditor extends React.Component<Props> {
    static propTypes = {
        calculator: PropTypes.bool,
        chi2Table: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
        periodicTable: PropTypes.bool,
        periodicTableWithKey: PropTypes.bool,
        tTable: PropTypes.bool,
        zTable: PropTypes.bool,
    };

    static defaultProps: Props = {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        periodicTableWithKey: false,
        tTable: false,
        zTable: false,
    };

    serialize: () => any = () => {
        return {
            calculator: this.props.calculator,
            chi2Table: this.props.chi2Table,
            periodicTable: this.props.periodicTable,
            periodicTableWithKey: this.props.periodicTableWithKey,
            tTable: this.props.tTable,
            zTable: this.props.zTable,
        };
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-answer-editor">
                <div className="perseus-answer-options">
                    <div>
                        <label>
                            Show calculator:{" "}
                            <input
                                type="checkbox"
                                checked={this.props.calculator}
                                onChange={(e) => {
                                    this.props.onChange({
                                        calculator: e.target.checked,
                                    });
                                    if (!e.target.checked) {
                                        // When we remove the periodic table,
                                        // we should also remove sub-options.
                                        this.props.onChange({
                                            periodicTableWithKey: false,
                                        });
                                    }
                                }}
                            />
                        </label>
                        <InfoTip>
                            Use the calculator when completing difficult
                            calculations is NOT the intent of the question.
                            DON’T use the calculator when testing the student’s
                            ability to complete different types of computations.
                        </InfoTip>
                    </div>

                    <div>
                        <label>
                            Show periodic table:{" "}
                            <input
                                type="checkbox"
                                checked={this.props.periodicTable}
                                onChange={(e) => {
                                    this.props.onChange({
                                        periodicTable: e.target.checked,
                                    });
                                    if (!e.target.checked) {
                                        // When we remove the periodic table,
                                        // we should also remove sub-options.
                                        this.props.onChange({
                                            periodicTableWithKey: false,
                                        });
                                    }
                                }}
                            />
                        </label>
                        <InfoTip>
                            This provides the student with the ability to view a
                            periodic table of the elements, e.g., for answering
                            chemistry questions.
                        </InfoTip>
                    </div>

                    {this.props.periodicTable && (
                        <div>
                            <label>
                                Include key/legend with periodic table:{" "}
                                <input
                                    type="checkbox"
                                    checked={this.props.periodicTableWithKey}
                                    onChange={(e) => {
                                        this.props.onChange({
                                            periodicTableWithKey:
                                                e.target.checked,
                                        });
                                    }}
                                />
                            </label>
                            <InfoTip>
                                Include a key for HS courses, omit for AP
                                chemistry.
                            </InfoTip>
                        </div>
                    )}

                    <div>
                        <label>
                            Show z table (statistics):{" "}
                            <input
                                type="checkbox"
                                checked={this.props.zTable}
                                onChange={(e) => {
                                    this.props.onChange({
                                        zTable: e.target.checked,
                                    });
                                }}
                            />
                        </label>
                        <InfoTip>
                            This provides the student with the ability to view a
                            table of critical values for the z distribution,
                            e.g. for answering statistics questions.
                        </InfoTip>
                    </div>

                    <div>
                        <label>
                            Show t table (statistics):{" "}
                            <input
                                type="checkbox"
                                checked={this.props.tTable}
                                onChange={(e) => {
                                    this.props.onChange({
                                        tTable: e.target.checked,
                                    });
                                }}
                            />
                        </label>
                        <InfoTip>
                            This provides the student with the ability to view a
                            table of critical values for the Student's t
                            distribution, e.g. for answering statistics
                            questions.
                        </InfoTip>
                    </div>

                    <div>
                        <label>
                            Show chi-squared table (statistics):{" "}
                            <input
                                type="checkbox"
                                checked={this.props.chi2Table}
                                onChange={(e) => {
                                    this.props.onChange({
                                        chi2Table: e.target.checked,
                                    });
                                }}
                            />
                        </label>
                        <InfoTip>
                            This provides the student with the ability to view a
                            table of critical values for the chi-squared
                            distribution, e.g. for answering statistics
                            questions.
                        </InfoTip>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemExtrasEditor;
