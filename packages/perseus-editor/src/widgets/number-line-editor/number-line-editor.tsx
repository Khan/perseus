import {number as knumber} from "@khanacademy/kmath";
import {components} from "@khanacademy/perseus";
import {numberLineLogic} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import _ from "underscore";

import InfoTip from "../../components/info-tip";
import {TypedSingleSelect} from "../../components/typed-single-select";
import EditorJsonify from "../../mixins/editor-jsonify";

import type {PerseusNumberLineWidgetOptions} from "@khanacademy/perseus-core";

const {ButtonGroup, NumberInput, RangeInput} = components;

const EN_DASH = "\u2013";

interface Props extends PerseusNumberLineWidgetOptions {
    static?: boolean;
    onChange: (options: PerseusNumberLineWidgetOptions) => void;
}

/**
 * An editor for adding a number line widget that allows users to mark
 * positions, intervals, and points on a number line.
 */
class NumberLineEditor extends React.Component<Props> {
    static defaultProps: PerseusNumberLineWidgetOptions =
        numberLineLogic.defaultWidgetOptions;

    handleChange(changes: Partial<PerseusNumberLineWidgetOptions>) {
        this.props.onChange({
            range: this.props.range,
            labelRange: this.props.labelRange,
            labelStyle: this.props.labelStyle,
            labelTicks: this.props.labelTicks,
            isTickCtrl: this.props.isTickCtrl,
            isInequality: this.props.isInequality,
            divisionRange: this.props.divisionRange,
            numDivisions: this.props.numDivisions,
            snapDivisions: this.props.snapDivisions,
            tickStep: this.props.tickStep,
            correctRel: this.props.correctRel,
            correctX: this.props.correctX,
            initialX: this.props.initialX,
            showTooltips: this.props.showTooltips,
            ...changes,
        });
    }

    handleLabelRangeChange(i: number, num: number) {
        let labelRange = this.props.labelRange.slice();
        const otherNum = labelRange[1 - i];

        if (num == null || otherNum == null) {
            labelRange[i] = num;
        } else {
            // If both labels have values, this updates the "appropriate" one.
            // It enforces that the position of the left label <= right label.
            // If left otherwise, it makes certain aspects of validation hard.
            labelRange = [Math.min(num, otherNum), Math.max(num, otherNum)];
        }

        this.handleChange({labelRange});
    }

    onNumDivisionsChange = (numDivisions: number) => {
        const divRange = this.props.divisionRange.slice();

        // Don't allow a fraction for the number of divisions
        numDivisions = _.isFinite(numDivisions) ? Math.round(numDivisions) : 0;

        // Don't allow negative numbers for the number of divisions
        numDivisions = numDivisions < 0 ? numDivisions * -1 : numDivisions;

        // If the number of divisions isn't blank, update the number line
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (numDivisions) {
            // Constrain numDivisions to be within the allowed range
            numDivisions = Math.min(
                divRange[1],
                Math.max(divRange[0], numDivisions),
            );

            this.handleChange({
                tickStep: null,
                divisionRange: divRange,
                numDivisions: numDivisions,
            });
        }
    };

    onTickStepChange = (tickStep: number) => {
        this.handleChange({
            numDivisions: null,
            tickStep: tickStep,
        });
    };

    onChangeRelation = (value: "eq" | "lt" | "gt" | "le" | "ge"): void => {
        this.handleChange({
            correctRel: value,
            isInequality: value !== "eq",
        });
    };

    serialize: () => any = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.ReactNode {
        const range = this.props.range;
        const labelRange = this.props.labelRange;
        const divisionRange = this.props.divisionRange;

        range[0] = +range[0];
        range[1] = +range[1];

        const width = range[1] - range[0];
        const numDivisions = this.props.numDivisions;
        const snapDivisions = this.props.snapDivisions;
        const tickStep = this.props.tickStep;
        const isTickCtrl = this.props.isTickCtrl;
        const numDivisionsInputPlaceholder = tickStep ? width / tickStep : null;

        let step: number | null;
        if (!isTickCtrl) {
            // this will help constrain the answer to what is reachable
            if (tickStep) {
                step = tickStep / snapDivisions;
            } else if (numDivisions) {
                step = width / numDivisions / snapDivisions;
            } else {
                step = null;
            }
        } else {
            // but if tickCtrl is on, the range of what is reachable is
            // rather large, and it becomes obnoxious to check for this
            step = null;
        }

        const labelStyleEditorButtons = [
            {
                value: "decimal",
                content: "0.75",
                title: "Decimals",
            },
            {
                value: "improper",
                content: "\u2077\u2044\u2084",
                title: "Improper fractions",
            },
            {
                value: "mixed",
                content: "1\u00BE",
                title: "Mixed numbers",
            },
            {
                value: "non-reduced",
                content: "\u2078\u2044\u2084",
                title: "Non-reduced",
            },
        ];

        return (
            <div className="perseus-widget-number-line-editor">
                <div className="perseus-widget-row">
                    Correct x{" "}
                    <TypedSingleSelect
                        aria-label="Select relationship"
                        required={true}
                        selectedValue={this.props.correctRel}
                        onChange={this.onChangeRelation}
                        style={{display: "inline"}}
                        options={{
                            eq: {label: "=", ariaLabel: "Equal"},
                            lt: {label: "<", ariaLabel: "Less than"},
                            gt: {label: ">", ariaLabel: "Greater than"},
                            le: {label: "<=", ariaLabel: "Less than or equal"},
                            ge: {label: ">=", ariaLabel: "Greater than or equal"}, // prettier-ignore
                        }}
                    />{" "}
                    <NumberInput
                        value={this.props.correctX}
                        format={this.props.labelStyle}
                        onChange={(correctX) => this.handleChange({correctX})}
                        checkValidity={(val) =>
                            val >= range[0] &&
                            val <= range[1] &&
                            (!step ||
                                knumber.isInteger((val - range[0]) / step))
                        }
                        placeholder="answer"
                        size="normal"
                        useArrowKeys={true}
                    />
                    <InfoTip>
                        <p>
                            This is the correct answer. The answer is validated
                            (as right or wrong) by using only the end position
                            of the point and the relation (=, &lt;, &gt;, &le;,
                            &ge;).
                        </p>
                    </InfoTip>
                </div>

                <div className="perseus-widget-row">
                    {this.props.static ? (
                        <label>
                            {/* Don't display initial position input in
                            static mode since it isn't used. */}
                            Range:
                        </label>
                    ) : (
                        <label>
                            Position:{" "}
                            <NumberInput
                                value={this.props.initialX}
                                format={this.props.labelStyle}
                                onChange={(initialX) =>
                                    this.handleChange({initialX})
                                }
                                placeholder={range[0]}
                                checkValidity={(val) => {
                                    return val >= range[0] && val <= range[1];
                                }}
                                useArrowKeys={true}
                            />
                            {" \u2208 "}
                        </label>
                    )}

                    <RangeInput
                        value={range}
                        onChange={(range) => this.handleChange({range})}
                        format={this.props.labelStyle}
                        useArrowKeys={true}
                    />
                    <InfoTip>
                        <p>
                            This controls the initial position of the point
                            along the number line and the
                            <strong>range</strong>, the position of the
                            endpoints of the number line. Setting the range
                            constrains the position of the answer and the
                            labels.
                        </p>
                        <p>
                            In static mode, the initial position of the point is
                            determined by Correct x instead of position.
                        </p>
                    </InfoTip>
                </div>
                <div className="perseus-widget-row">
                    <div className="perseus-widget-left-col">
                        Labels:{" "}
                        <NumberInput
                            value={labelRange[0]}
                            placeholder={range[0]}
                            format={this.props.labelStyle}
                            checkValidity={(val) =>
                                val >= range[0] && val <= range[1]
                            }
                            onChange={(min) =>
                                this.handleLabelRangeChange(0, min)
                            }
                            useArrowKeys={true}
                        />
                        <span> &amp; </span>
                        <NumberInput
                            value={labelRange[1]}
                            placeholder={range[1]}
                            format={this.props.labelStyle}
                            checkValidity={(val) =>
                                val >= range[0] && val <= range[1]
                            }
                            onChange={(max) =>
                                this.handleLabelRangeChange(1, max)
                            }
                            useArrowKeys={true}
                        />
                        <InfoTip>
                            <p>
                                This controls the position of the left / right
                                labels. By default, the labels are set by the
                                range <br />
                                <strong>Note:</strong> Ensure that the labels
                                line up with the tick marks, or it may be
                                confusing for users.
                            </p>
                        </InfoTip>
                    </div>
                </div>
                <div className="perseus-widget-row">
                    Style:{" "}
                    <ButtonGroup
                        value={this.props.labelStyle}
                        buttons={labelStyleEditorButtons}
                        onChange={(labelStyle) =>
                            this.handleChange({labelStyle})
                        }
                    />
                    <InfoTip>
                        <p>
                            This controls the styling of the labels for the two
                            main labels as well as all the tick mark labels, if
                            applicable. Your choices are decimal, improper
                            fractions, mixed fractions, and non-reduced
                            fractions.
                        </p>
                    </InfoTip>
                </div>
                <div className="perseus-widget-row">
                    {!this.props.static && (
                        <div className="perseus-widget-left-col">
                            <Checkbox
                                label="Show tick controller"
                                checked={!!this.props.isTickCtrl}
                                onChange={(value) => {
                                    this.handleChange({isTickCtrl: value});
                                }}
                            />
                        </div>
                    )}
                    <div className="perseus-widget-right-col">
                        <Checkbox
                            label="Show label ticks"
                            checked={this.props.labelTicks}
                            onChange={(value) => {
                                this.handleChange({labelTicks: value});
                            }}
                        />
                    </div>
                </div>

                <div className="perseus-widget-row">
                    {!this.props.static && (
                        <Checkbox
                            label="Show tooltips"
                            checked={this.props.showTooltips}
                            onChange={(value) => {
                                this.handleChange({showTooltips: value});
                            }}
                        />
                    )}
                </div>
                <div className="perseus-widget-row">
                    {isTickCtrl && (
                        <span>
                            <label>
                                Start num divisions at{" "}
                                <NumberInput
                                    value={this.props.numDivisions || null}
                                    format="decimal"
                                    onChange={this.onNumDivisionsChange}
                                    checkValidity={(val) => {
                                        return (
                                            val >= divisionRange[0] &&
                                            val <= divisionRange[1]
                                        );
                                    }}
                                    placeholder={numDivisionsInputPlaceholder}
                                    useArrowKeys={true}
                                />
                            </label>
                            <InfoTip>
                                <p>
                                    This controls the number (and position) of
                                    the tick marks. The number of divisions is
                                    constrained to
                                    {" " +
                                        divisionRange[0] +
                                        EN_DASH +
                                        divisionRange[1]}
                                    .
                                    <br />
                                    <strong>Note:</strong> The user will be able
                                    to specify the number of divisions in a
                                    number input.
                                </p>
                            </InfoTip>
                        </span>
                    )}
                    {!isTickCtrl && (
                        <span>
                            <label>
                                Num divisions:{" "}
                                <NumberInput
                                    value={this.props.numDivisions || null}
                                    format="decimal"
                                    onChange={this.onNumDivisionsChange}
                                    checkValidity={(val) => {
                                        return (
                                            val >= divisionRange[0] &&
                                            val <= divisionRange[1]
                                        );
                                    }}
                                    placeholder={numDivisionsInputPlaceholder}
                                    useArrowKeys={true}
                                />
                            </label>{" "}
                            <label>
                                or tick step:{" "}
                                <NumberInput
                                    value={this.props.tickStep || null}
                                    format={this.props.labelStyle}
                                    onChange={this.onTickStepChange}
                                    checkValidity={(val) => {
                                        return val > 0 && val <= width;
                                    }}
                                    placeholder={
                                        numDivisions
                                            ? width / numDivisions
                                            : null
                                    }
                                    useArrowKeys={true}
                                />
                            </label>
                            <InfoTip>
                                <p>
                                    This controls the number (and position) of
                                    the tick marks; you can either set the
                                    number of divisions (2 divisions would split
                                    the entire range in two halves), or the tick
                                    step (the distance between ticks) and the
                                    other value will be updated accordingly.{" "}
                                    <br />
                                    <strong>Note:</strong> There is no check to
                                    see if labels coordinate with the tick
                                    marks, which may be confusing for users if
                                    the blue labels and black ticks are
                                    off-step.
                                </p>
                            </InfoTip>
                        </span>
                    )}
                </div>
                <div className="perseus-widget-row">
                    <label>
                        Snap increments per tick:{" "}
                        <NumberInput
                            value={snapDivisions}
                            checkValidity={(val) => val > 0}
                            format={this.props.labelStyle}
                            onChange={(snapDivisions) =>
                                this.handleChange({snapDivisions})
                            }
                            useArrowKeys={true}
                        />
                    </label>
                    <InfoTip>
                        <p>
                            This determines the number of different places the
                            point will snap between two adjacent tick marks.{" "}
                            <br />
                            <strong>Note:</strong>Ensure the required number of
                            snap increments is provided to answer the question.
                        </p>
                    </InfoTip>
                </div>
            </div>
        );
    }
}

export default NumberLineEditor;
