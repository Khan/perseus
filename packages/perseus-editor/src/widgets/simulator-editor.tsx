/* eslint-disable react/sort-comp */
import {components, Changeable, EditorJsonify} from "@khanacademy/perseus";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InfoTip, NumberInput} = components;

const maxTrials = 5000;

type Props = any;

class SimulatorEditor extends React.Component<Props> {
    static propTypes = {
        ...Changeable.propTypes,
        xAxisLabel: PropTypes.string,
        yAxisLabel: PropTypes.string,
        numTrials: PropTypes.number,
        proportionLabel: PropTypes.string,
        proportionOrPercentage: PropTypes.string,
    };

    static widgetName = "simulator" as const;

    static defaultProps: Props = {
        xAxisLabel: "Proportion (%)",
        yAxisLabel: "Number of times seen",
        numTrials: 100,
        proportionLabel: "Underlying proportion",
        proportionOrPercentage: "proportion",
    };

    render(): React.ReactNode {
        return (
            <div className="perseus-widget-simulator">
                <div>
                    {i18n._("X-Axis Label")}:
                    <input
                        type="text"
                        className="graph-settings-axis-label"
                        value={this.props.xAxisLabel}
                        onChange={_.partial(
                            this.handleTargetValueChange,
                            "xAxisLabel",
                        )}
                    />
                </div>
                <div>
                    {i18n._("Y-Axis Label")}:
                    <input
                        type="text"
                        className="graph-settings-axis-label"
                        value={this.props.yAxisLabel}
                        onChange={_.partial(
                            this.handleTargetValueChange,
                            "yAxisLabel",
                        )}
                    />
                </div>
                <div>
                    {i18n._('"True Proportion" Label')}:
                    <input
                        type="text"
                        className="graph-settings-axis-label"
                        value={this.props.proportionLabel}
                        onChange={_.partial(
                            this.handleTargetValueChange,
                            "proportionLabel",
                        )}
                    />
                    <InfoTip>
                        <p>
                            This text will be displayed next to the box in which
                            the user enters the sample proportion for their
                            simulation. For example, if your question is about
                            surveying for approval ratings, you might want this
                            to say "Sample approval rating".
                        </p>
                    </InfoTip>
                </div>
                <div>
                    {i18n._("Proportion or Percentage")}:
                    <select
                        className="perseus-widget-dropdown"
                        value={this.props.proportionOrPercentage}
                        onChange={_.partial(
                            this.handleTargetValueChange,
                            "proportionOrPercentage",
                        )}
                    >
                        <option key="proportion" value="proportion">
                            Proportion
                        </option>
                        <option key="percentage" value="percentage">
                            Percentage
                        </option>
                    </select>
                    <InfoTip>
                        <p>
                            Do you want the user to describe their simulation in
                            terms of a proportion or a percentage?
                        </p>
                    </InfoTip>
                </div>
                <div>
                    {i18n._("Number of trials")}:
                    <NumberInput
                        value={this.props.numTrials}
                        checkValidity={(val) => {
                            return val >= 0 && val <= maxTrials;
                        }}
                        onChange={this.change("numTrials")}
                    />
                    <InfoTip>
                        <p>
                            This controls the number of trials used in the
                            simulation. For example, if you set this to 50, then
                            the survey will be conducted 50 times. Warning:
                            setting this too high (i.e., greater than 5000 or
                            so) will freeze the page.
                        </p>
                    </InfoTip>
                </div>
            </div>
        );
    }

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    handleTargetValueChange: (arg1: string, arg2: any) => void = (
        propName,
        e,
    ) => {
        this.change(propName, e.target.value);
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };
}

export default SimulatorEditor;
