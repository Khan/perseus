/* eslint-disable @khanacademy/ts-no-error-suppressions */
import {number as knumber} from "@khanacademy/kmath";
import {components, EditorJsonify} from "@khanacademy/perseus";
import {
    numberLineLogic,
    type NumberLineDefaultWidgetOptions,
} from "@khanacademy/perseus-core";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import * as React from "react";
import _ from "underscore";

import type {Changeable} from "@khanacademy/perseus";

const {ButtonGroup, InfoTip, NumberInput, RangeInput} = components;

type Range = [number, number];

const bound = (x: number, gt: number, lt: number): number =>
    Math.min(Math.max(x, gt), lt);

const EN_DASH = "\u2013";

type Props = {
    range: number[];

    labelRange: ReadonlyArray<number>;
    labelStyle: string;
    labelTicks: boolean;

    divisionRange: ReadonlyArray<number>;
    numDivisions: number;
    snapDivisions: number;

    tickStep: number;
    correctRel: "lt" | "gt" | "le" | "ge" | "eq";
    correctX: number;
    initialX: number;
    isTickCtrl?: boolean;

    static?: boolean;
    showTooltips: boolean;
} & Changeable.ChangeableProps;

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a number line widget that allows users to mark
 * positions, intervals, and points on a number line.
 */
class NumberLineEditor extends React.Component<Props> {
    static widgetName = "number-line" as const;

    static defaultProps: NumberLineDefaultWidgetOptions =
        numberLineLogic.defaultWidgetOptions;

    onRangeChange: (arg1: Range) => void = (range) => {
        // Changing the range constrains the initial position, as well as the
        // position of the answer and labels. Atm, it just marks them as
        // invalid and prevents the number line from showing; it was annoying
        // to change it for them, because if they're typing in fractions,
        // it registers one-at-a-time and messes things up.
        this.props.onChange({range: range});
    };

    onLabelRangeChange: (arg1: number, arg2: number) => void = (i, num) => {
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

        this.props.onChange({labelRange: labelRange});
    };

    onDivisionRangeChange: (arg1: Range) => void = (divisionRange) => {
        let numDivisions = this.props.numDivisions;
        numDivisions = bound(numDivisions, divisionRange[0], divisionRange[1]);
        this.props.onChange({
            divisionRange: divisionRange,
            numDivisions: numDivisions,
        });
    };

    onNumChange: (
        arg1: "correctX" | "initialX" | "snapDivisions",
        arg2: number,
    ) => void = (key, value) => {
        const opts: Record<string, any> = {};
        opts[key] = value;
        this.props.onChange(opts);
    };

    onNumDivisionsChange: (arg1: number) => void = (numDivisions) => {
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

            this.props.onChange({
                tickStep: null,
                divisionRange: divRange,
                numDivisions: numDivisions,
            });
        }
    };

    onTickStepChange: (arg1: number) => void = (tickStep) => {
        this.props.onChange({
            numDivisions: null,
            tickStep: tickStep,
        });
    };

    onChangeRelation: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
        e,
    ) => {
        const value = e.target.value;
        this.props.onChange({
            correctRel: value,
            isInequality: value !== "eq",
        });
    };

    onLabelStyleChange: (arg1: any) => void = (labelStyle) => {
        this.props.onChange({
            labelStyle: labelStyle,
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

        let step;
        if (!isTickCtrl) {
            // this will help constrain the answer to what is reachable
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            step = tickStep
                ? tickStep / snapDivisions
                : width / numDivisions / snapDivisions;
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
                    <select
                        value={this.props.correctRel}
                        // @ts-expect-error - TS2322 - Type '(arg1: ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLSelectElement>'.
                        onChange={this.onChangeRelation}
                        aria-label="Select relationship"
                    >
                        <option value="eq" aria-label="Equal">
                            =
                        </option>
                        <option value="lt" aria-label="Less than">
                            &lt;
                        </option>
                        <option value="gt" aria-label="Greater than">
                            &gt;
                        </option>
                        <option value="le" aria-label="Less than or equal">
                            &le;
                        </option>
                        <option value="ge" aria-label="Greater than or equal">
                            &ge;
                        </option>
                    </select>{" "}
                    <NumberInput
                        value={this.props.correctX}
                        format={this.props.labelStyle}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.onNumChange.bind(this, "correctX")}
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
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={this.onNumChange.bind(
                                    this,
                                    "initialX",
                                )}
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
                        onChange={this.onRangeChange}
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
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={this.onLabelRangeChange.bind(this, 0)}
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
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={this.onLabelRangeChange.bind(this, 1)}
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
                        allowEmpty={false}
                        value={this.props.labelStyle}
                        buttons={labelStyleEditorButtons}
                        onChange={this.onLabelStyleChange}
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
                                checked={this.props.isTickCtrl}
                                onChange={(value) => {
                                    this.props.onChange({isTickCtrl: value});
                                }}
                            />
                        </div>
                    )}
                    <div className="perseus-widget-right-col">
                        <Checkbox
                            label="Show label ticks"
                            checked={this.props.labelTicks}
                            onChange={(value) => {
                                this.props.onChange({labelTicks: value});
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
                                this.props.onChange({showTooltips: value});
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
                                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                                    value={this.props.numDivisions || null}
                                    format="decimal"
                                    onChange={this.onNumDivisionsChange}
                                    checkValidity={(val) => {
                                        return (
                                            val >= divisionRange[0] &&
                                            val <= divisionRange[1]
                                        );
                                    }}
                                    placeholder={width / this.props.tickStep}
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
                                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                                    value={this.props.numDivisions || null}
                                    format="decimal"
                                    onChange={this.onNumDivisionsChange}
                                    checkValidity={(val) => {
                                        return (
                                            val >= divisionRange[0] &&
                                            val <= divisionRange[1]
                                        );
                                    }}
                                    placeholder={width / this.props.tickStep}
                                    useArrowKeys={true}
                                />
                            </label>{" "}
                            <label>
                                or tick step:{" "}
                                <NumberInput
                                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                                    value={this.props.tickStep || null}
                                    format={this.props.labelStyle}
                                    onChange={this.onTickStepChange}
                                    checkValidity={(val) => {
                                        return val > 0 && val <= width;
                                    }}
                                    placeholder={
                                        width / this.props.numDivisions
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
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={this.onNumChange.bind(
                                this,
                                "snapDivisions",
                            )}
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
