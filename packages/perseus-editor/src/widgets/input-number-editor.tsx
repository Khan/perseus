import {components, Util} from "@khanacademy/perseus";
import {inputNumberLogic} from "@khanacademy/perseus-core";
import {inputNumberAnswerTypes} from "@khanacademy/perseus-score";
import * as React from "react";
import _ from "underscore";

import BlurInput from "../components/blur-input";

import type {ParsedValue} from "@khanacademy/perseus";
import type {PerseusInputNumberWidgetOptionsV0} from "@khanacademy/perseus-core";

const {InfoTip} = components;

type Props = {
    value: number;
    // FIXME: use the V1 widget options
    simplify: PerseusInputNumberWidgetOptionsV0["simplify"];
    size: PerseusInputNumberWidgetOptionsV0["size"];
    inexact: PerseusInputNumberWidgetOptionsV0["inexact"];
    maxError: PerseusInputNumberWidgetOptionsV0["maxError"];
    answerType: PerseusInputNumberWidgetOptionsV0["answerType"];
    rightAlign: PerseusInputNumberWidgetOptionsV0["rightAlign"];
    onChange: (arg1: {
        value?: ParsedValue | 0;
        simplify?: Props["simplify"];
        size?: Props["size"];
        inexact?: Props["inexact"];
        maxError?: Props["maxError"];
        answerType?: Props["answerType"];
        rightAlign?: Props["rightAlign"];
    }) => void;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding an input number widget that allows users to enter numerical values.
 */
class InputNumberEditor extends React.Component<Props> {
    static widgetName = "input-number" as const;

    // FIXME: this was originally
    // static defaultProps: InputNumberDefaultWidgetOptions =
    // -        inputNumberLogic.defaultWidgetOptions;
    // Go back to using defaultWidgetOptions.
    static defaultProps = {
        value: 0,
        simplify: "required" as const,
        size: "normal" as const,
        inexact: false,
        maxError: 0.1,
        answerType: "number" as const,
        rightAlign: false,
    };

    // Keep a reference to the logic so it's accessible from tests/editor
    // FIXME: I don't think this line is necessary. Delete it.
    static logic = inputNumberLogic;

    input = React.createRef<BlurInput>();

    handleAnswerChange: (arg1: string) => void = (str) => {
        const value = Util.firstNumericalParse(str) || 0;
        this.props.onChange({value: value});
    };

    focus: () => boolean = () => {
        this.input.current?.focus();
        return true;
    };

    serialize: () => {
        value: Props["value"];
        simplify: Props["simplify"];
        size: Props["size"];
        inexact: Props["inexact"];
        maxError: Props["maxError"];
        answerType: Props["answerType"];
        rightAlign: Props["rightAlign"];
    } = () => ({
        value: this.props.value,
        simplify: this.props.simplify,
        size: this.props.size,
        inexact: this.props.inexact,
        maxError: this.props.maxError,
        answerType: this.props.answerType,
        rightAlign: this.props.rightAlign,
    });

    render(): React.ReactNode {
        const answerTypeOptions = _.map(
            inputNumberAnswerTypes,
            function (v, k) {
                return (
                    <option value={k} key={k}>
                        {v.name}
                    </option>
                );
            },
            this,
        );

        return (
            <div>
                <div>
                    <label>
                        Correct answer:{" "}
                        <BlurInput
                            value={"" + this.props.value}
                            onChange={this.handleAnswerChange}
                            ref={this.input}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Unsimplified answers{" "}
                        <select
                            value={this.props.simplify}
                            onChange={(e) => {
                                this.props.onChange({
                                    // eslint-disable-next-line no-restricted-syntax
                                    simplify: e.target
                                        .value as Props["simplify"],
                                });
                            }}
                        >
                            <option value="required">will not be graded</option>
                            <option value="optional">will be accepted</option>
                            <option value="enforced">
                                will be marked wrong
                            </option>
                        </select>
                    </label>
                    <InfoTip>
                        <p>
                            Normally select &quot;will not be graded&quot;. This
                            will give the user a message saying the answer is
                            correct but not simplified. The user will then have
                            to simplify it and re-enter, but will not be
                            penalized. (5th grade and anything after)
                        </p>
                        <p>
                            Select &quot;will be accepted&quot; only if the user
                            is not expected to know how to simplify fractions
                            yet. (Anything prior to 5th grade)
                        </p>
                        <p>
                            Select &quot;will be marked wrong&quot; only if we
                            are specifically assessing the ability to simplify.
                        </p>
                    </InfoTip>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.props.inexact}
                            onChange={(e) => {
                                this.props.onChange({
                                    inexact: e.target.checked,
                                });
                            }}
                        />{" "}
                        Allow inexact answers
                    </label>

                    <label>
                        <input /* HACK(emily): hidden checkbox for alignment */
                            type="checkbox"
                            style={{visibility: "hidden"}}
                        />
                        Max error:{" "}
                        <input
                            type="text"
                            disabled={!this.props.inexact}
                            defaultValue={this.props.maxError}
                            aria-label="Max error"
                            onBlur={(e) => {
                                const ans =
                                    "" +
                                    (Util.firstNumericalParse(e.target.value) ||
                                        0);
                                e.target.value = ans;
                                this.props.onChange({maxError: ans});
                            }}
                        />
                    </label>
                </div>

                <div>
                    Answer type:{" "}
                    <select
                        value={this.props.answerType}
                        onChange={(e) => {
                            this.props.onChange({
                                // eslint-disable-next-line no-restricted-syntax
                                answerType: e.target
                                    .value as Props["answerType"],
                            });
                        }}
                        aria-label="Answer type"
                    >
                        {answerTypeOptions}
                    </select>
                    <InfoTip>
                        <p>
                            Use the default &quot;Numbers&quot; unless the
                            answer must be in a specific form (e.g., question is
                            about converting decimals to fractions).
                        </p>
                    </InfoTip>
                </div>

                <div>
                    <label>
                        Width{" "}
                        <select
                            value={this.props.size}
                            onChange={(e) => {
                                this.props.onChange({
                                    // eslint-disable-next-line no-restricted-syntax
                                    size: e.target.value as Props["size"],
                                });
                            }}
                        >
                            <option value="normal">Normal (80px)</option>
                            <option value="small">Small (40px)</option>
                        </select>
                    </label>
                    <InfoTip>
                        <p>
                            Use size &quot;Normal&quot; for all text boxes,
                            unless there are multiple text boxes in one line and
                            the answer area is too narrow to fit them.
                        </p>
                    </InfoTip>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.props.rightAlign}
                            onChange={(e) => {
                                this.props.onChange({
                                    rightAlign: e.target.checked,
                                });
                            }}
                        />{" "}
                        Right alignment
                    </label>
                </div>
            </div>
        );
    }
}

export default InputNumberEditor;
