import {KhanMath} from "@khanacademy/kmath";
import {
    components,
    Changeable,
    EditorJsonify,
    Util,
} from "@khanacademy/perseus";
import {
    numericInputLogic,
    type PerseusNumericInputWidgetOptions,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";
import _ from "underscore";

import Heading from "../components/heading";
import PerseusEditorAccordion from "../components/perseus-editor-accordion";
import {
    SegmentedControl,
    ToggleButtonGroup,
} from "../components/segmented-control";
import Editor from "../editor";

import styles from "./numeric-input-editor.module.css";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";

type ChangeFn = typeof Changeable.change;

const {InfoTip, NumberInput, TextInput} = components;
const {firstNumericalParse} = Util;

const answerFormButtons = [
    {title: "Integers", value: "integer", content: "6"},
    {title: "Decimals", value: "decimal", content: "0.75"},
    {title: "Proper fractions", value: "proper", content: "\u2157"},
    {
        title: "Improper fractions",
        value: "improper",
        content: "\u2077\u2044\u2084",
    },
    {title: "Mixed numbers", value: "mixed", content: "1\u00BE"},
    {title: "Numbers with \u03C0", value: "pi", content: "\u03C0"},
];

const initAnswer = (status: string) => {
    return {
        value: null,
        status: status,
        message: "",
        simplify: "required",
        answerForms: [],
        strict: false,
        maxError: null,
    };
};

// The "static" property is not used in this widget (per the type definition comments)
type Props = Omit<PerseusNumericInputWidgetOptions, "static"> & {
    onChange: (results: any) => any;
    apiOptions: APIOptionsWithDefaults;
};

interface State {
    lastStatus: string;
    showAnswerDetails: boolean[];
    showSettings: boolean;
    showAnswers: boolean;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a numeric input widget that allows users to enter
 * numerical values with specific validation rules.
 */
class NumericInputEditor extends React.Component<Props, State> {
    static widgetName = "numeric-input";
    static displayName = "NumericInputEditor";

    static defaultProps = {
        ...numericInputLogic.defaultWidgetOptions,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            lastStatus: "wrong",
            showAnswerDetails: Array(this.props.answers.length).fill(true),
            showSettings: true,
            showAnswers: true,
        };
    }

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    onToggleAnswers = (answerIndex: number) => {
        const showAnswerDetails = this.state.showAnswerDetails.slice();
        showAnswerDetails[answerIndex] = !showAnswerDetails[answerIndex];
        this.setState({showAnswerDetails: showAnswerDetails});
    };

    onToggleAnswerForm = (answerIndex: number, answerForm) => {
        let answerForms: string[] = [
            ...(this.props.answers[answerIndex]["answerForms"] ?? []),
        ];
        const formSelected = answerForms.includes(answerForm);
        if (!formSelected) {
            answerForms.push(answerForm);
        } else {
            answerForms = answerForms.filter((form) => form !== answerForm);
        }
        const updateFn = this.updateAnswer(answerIndex, "answerForms");
        if (updateFn) {
            updateFn(answerForms);
        }
    };

    onToggleHeading = (accordionName: string) => {
        return () => {
            const toggleName = `show${accordionName}`;
            const newState = {...this.state};
            newState[toggleName] = !newState[toggleName];
            this.setState(newState);
        };
    };

    onTrashAnswer = (choiceIndex) => {
        if (choiceIndex >= 0 && choiceIndex < this.props.answers.length) {
            const answers = this.props.answers.slice(0);
            answers.splice(choiceIndex, 1);
            this.props.onChange({answers: answers});
        }
    };

    onSpace = (e, callback, ...args) => {
        if (e.key === " ") {
            e.preventDefault(); // prevent page shifting
            callback.apply(this, args);
        }
    };

    onStatusChange = (choiceIndex) => {
        const statuses = ["wrong", "ungraded", "correct"];
        const answers = this.props.answers;
        const i = statuses.indexOf(answers[choiceIndex].status);
        const newStatus = statuses[(i + 1) % statuses.length];

        this.updateAnswer(choiceIndex, {
            status: newStatus,
            simplify: newStatus === "correct" ? "required" : "accepted",
        });
    };

    onEvaluationChange = (choiceIndex, newStatus) => {
        this.updateAnswer(choiceIndex, {
            status: newStatus,
            simplify: newStatus === "correct" ? "required" : "accepted",
        });
    };

    updateAnswer = (choiceIndex, update) => {
        if (!_.isObject(update)) {
            return _.partial(
                (choiceIndex, key, value) => {
                    const update: Record<string, any> = {};
                    update[key] = value;
                    this.updateAnswer(choiceIndex, update);
                },
                choiceIndex,
                update,
            );
        }

        let answers = [
            // Have to do this to remove the `readonly` state from the prop
            ...this.props.answers,
        ];

        // Don't bother to make a new answer box unless we are editing the last
        // one.
        if (choiceIndex === answers.length) {
            const lastAnswer: any = initAnswer(this.state.lastStatus);
            answers = answers.concat(lastAnswer);
        }

        answers[choiceIndex] = _.extend({}, answers[choiceIndex], update);
        this.props.onChange({answers: answers});
    };

    addAnswer = () => {
        const lastAnswer: any = initAnswer(this.state.lastStatus);
        const answers = this.props.answers.concat(lastAnswer);
        const showAnswerDetails = this.state.showAnswerDetails.concat(true);
        this.setState({showAnswerDetails: showAnswerDetails});
        this.props.onChange({answers: answers});
    };

    // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend uses
    // the new linter rules for save warnings.
    getSaveWarnings = () => {
        // Filter out all the empty answers
        const warnings = [];
        if (_.contains(_.pluck(this.props.answers, "value"), "")) {
            // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'never'.
            warnings.push("One or more answers is empty");
        }
        this.props.answers.forEach((answer, i) => {
            const formatError =
                answer.strict &&
                (!answer.answerForms || answer.answerForms.length === 0);
            if (formatError) {
                warnings.push(
                    // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'never'.
                    `Answer ${i + 1} is set to string format ` +
                        "matching, but no format was selected",
                );
            }
        });
        return warnings;
    };

    serialize = () => {
        return EditorJsonify.serialize.call(this);
    };

    render() {
        const answers = this.props.answers;
        const editingDisabled = this.props.apiOptions.editingDisabled;

        const unsimplifiedAnswers = (i: any) => (
            <View className={styles.field}>
                {answers[i]["status"] !== "correct" && (
                    <BodyText weight="semi">
                        Unsimplified answers are irrelevant for this status
                    </BodyText>
                )}
                {answers[i]["status"] === "correct" && (
                    <>
                        <View className={styles.labelRow}>
                            <BodyText weight="semi">
                                Unsimplified answers are
                            </BodyText>
                            <InfoTip>
                                <p>
                                    Normally select "ungraded". This will give
                                    the user a message saying the answer is
                                    correct but not simplified. The user will
                                    then have to simplify it and re-enter, but
                                    will not be penalized. (5th grade and after)
                                </p>
                                <p>
                                    Select "accepted" only if the user is not
                                    expected to know how to simplify fractions
                                    yet. (Anything prior to 5th grade)
                                </p>
                                <p>
                                    Select "wrong" <em>only</em> if we are
                                    specifically assessing the ability to
                                    simplify.
                                </p>
                            </InfoTip>
                        </View>
                        <SegmentedControl
                            aria-label="Unsimplified answers are"
                            disabled={editingDisabled}
                            selectedValue={answers[i]["simplify"]}
                            onChange={(value) =>
                                this.updateAnswer(i, {simplify: value})
                            }
                            options={[
                                {value: "required", label: "Ungraded"},
                                {value: "optional", label: "Accepted"},
                                {value: "enforced", label: "Wrong"},
                            ]}
                        />
                    </>
                )}
            </View>
        );

        const suggestedAnswerTypes = (i: any) => (
            <>
                <View className={styles.field}>
                    <View className={styles.labelRow}>
                        <BodyText weight="semi">
                            Possible answer formats
                        </BodyText>
                        <InfoTip>
                            <p>
                                Formats will be autoselected for you based on
                                the given answer; to show no suggested formats
                                and accept all types, simply have a
                                decimal/integer be the answer. Values with &pi;
                                will have format "pi", and values that are
                                fractions will have some subset (mixed will be
                                "mixed" and "proper"; improper/proper will both
                                be "improper" and "proper"). If you would like
                                to specify that it is only a proper fraction (or
                                only a mixed/improper fraction), deselect the
                                other format. Except for specific cases, you
                                should not need to change the autoselected
                                formats.
                            </p>
                            <p>
                                To restrict the answer to <em>only</em> an
                                improper fraction (i.e. 7/4), select the
                                improper fraction and toggle "strict" to true.
                                This <b>will not</b> accept 1.75 as an answer.{" "}
                            </p>
                            <p>
                                Unless you are testing that specific skill,
                                please do not restrict the answer format.
                            </p>
                        </InfoTip>
                    </View>
                    <ToggleButtonGroup
                        aria-label="Possible answer formats"
                        disabled={editingDisabled}
                        selectedValues={answers[i]["answerForms"] ?? []}
                        onToggle={(value) => this.onToggleAnswerForm(i, value)}
                        options={answerFormButtons.map((format) => ({
                            value: format.value,
                            label: format.content,
                            ariaLabel: format.title,
                        }))}
                    />
                </View>
                <View className={styles.field}>
                    <BodyText weight="semi">Answer formats are</BodyText>
                    <SegmentedControl
                        aria-label="Answer formats are"
                        disabled={editingDisabled}
                        selectedValue={
                            answers[i]["strict"] ? "required" : "suggested"
                        }
                        onChange={(value) =>
                            this.updateAnswer(i, {strict: value === "required"})
                        }
                        options={[
                            {value: "suggested", label: "Suggested"},
                            {value: "required", label: "Required"},
                        ]}
                    />
                </View>
            </>
        );

        const inputSize = (
            <View className={styles.field}>
                <View className={styles.labelRow}>
                    <BodyText weight="semi">Width</BodyText>
                    <InfoTip>
                        <p>
                            Use size "Normal" for all text boxes, unless there
                            are multiple text boxes in one line and the answer
                            area is too narrow to fit them.
                        </p>
                    </InfoTip>
                </View>
                <SegmentedControl
                    aria-label="Width"
                    disabled={editingDisabled}
                    selectedValue={this.props.size}
                    onChange={(value) => this.change("size")(value)}
                    options={[
                        {value: "normal", label: "Normal (80px)"},
                        {value: "small", label: "Small (40px)"},
                    ]}
                />
            </View>
        );

        const labelText = (
            <View className={styles.field}>
                <View className={styles.labelRow}>
                    <BodyText weight="semi">Answer Field Aria label</BodyText>
                    <InfoTip>
                        <p>
                            Text to describe the Answer Field for screenreader
                            users.
                        </p>
                    </InfoTip>
                </View>
                <TextInput
                    labelText="aria label"
                    value={this.props.labelText}
                    onChange={this.change("labelText")}
                />
            </View>
        );

        const coefficientCheck = (
            <View className={styles.field}>
                <View className={styles.labelRow}>
                    <BodyText weight="semi">Number style</BodyText>
                    <InfoTip>
                        <p>
                            A coefficient style number allows the student to use
                            - for -1 and an empty string to mean 1.
                        </p>
                    </InfoTip>
                </View>
                <SegmentedControl
                    aria-label="Number style"
                    disabled={editingDisabled}
                    selectedValue={
                        this.props.coefficient ? "coefficient" : "standard"
                    }
                    onChange={(value) =>
                        this.props.onChange({
                            coefficient: value === "coefficient",
                        })
                    }
                    options={[
                        {value: "standard", label: "Standard"},
                        {value: "coefficient", label: "Coefficient"},
                    ]}
                />
            </View>
        );

        const instructions = {
            wrong: "(address the mistake/misconception)",
            ungraded: "(explain in detail to avoid confusion)",
            correct: "(reinforce the user's understanding)",
        } as const;

        const generateInputAnswerEditors = () =>
            answers.map((answer, i) => {
                const editor = (
                    <Editor
                        apiOptions={this.props.apiOptions}
                        content={answer.message || ""}
                        placeholder={
                            "Why is this answer " +
                            answer.status +
                            "?\t" +
                            instructions[answer.status]
                        }
                        widgetEnabled={false}
                        onChange={(newProps) => {
                            if ("content" in newProps) {
                                this.updateAnswer(i, {
                                    message: newProps.content,
                                });
                            }
                        }}
                    />
                );
                const statusProper =
                    answer.status.charAt(0).toUpperCase() +
                    answer.status.slice(1);
                const answerFormat = (answer.answerForms || []).at(-1);
                const answerString = KhanMath.toNumericString(
                    answer.value ?? 0,
                    answerFormat,
                );
                const answerRangeText = answer.maxError
                    ? `± ${KhanMath.toNumericString(answer.maxError, answerFormat)}`
                    : "";
                const answerHeading =
                    answer.value === null
                        ? "New Answer"
                        : `${statusProper} answer: ${answerString} ${answerRangeText}`;

                return (
                    <div className="perseus-widget-row answer-option" key={i}>
                        <PerseusEditorAccordion
                            animated={true}
                            expanded={this.state.showAnswerDetails[i]}
                            onToggle={() => {
                                this.onToggleAnswers(i);
                            }}
                            header={
                                <BodyText weight="bold" tag="span">
                                    {answerHeading}
                                </BodyText>
                            }
                        >
                            <div
                                className={
                                    "input-answer-editor-value-container" +
                                    (answer.maxError ? " with-max-error" : "")
                                }
                            >
                                <View
                                    tag="label"
                                    className={styles.inlineField}
                                >
                                    <BodyText weight="semi">
                                        User input
                                    </BodyText>
                                    <NumberInput
                                        value={answer.value}
                                        className="numeric-input-value"
                                        placeholder="answer"
                                        format={_.last(
                                            answer.answerForms || [],
                                        )}
                                        onFormatChange={(newValue, format) => {
                                            // NOTE(charlie): The mobile web expression
                                            // editor relies on this automatic answer
                                            // form resolution for determining when to
                                            // show the Pi symbol. If we get rid of it,
                                            // we should also disable Pi for
                                            // NumericInput and require problems that
                                            // use Pi to build on Expression.
                                            // Alternatively, we could store answers
                                            // as plaintext and parse them to determine
                                            // whether or not to reveal Pi on the
                                            // keypad (right now, answers are stored as
                                            // resolved values, like '0.125' rather
                                            // than '1/8').
                                            let forms;
                                            if (format === "pi") {
                                                forms = ["pi"];
                                            } else if (format === "mixed") {
                                                forms = ["proper", "mixed"];
                                            } else if (
                                                format === "proper" ||
                                                format === "improper"
                                            ) {
                                                forms = ["proper", "improper"];
                                            }
                                            this.updateAnswer(i, {
                                                value: firstNumericalParse(
                                                    newValue,
                                                ),
                                                answerForms: forms,
                                            });
                                        }}
                                        onChange={(newValue) => {
                                            this.updateAnswer(i, {
                                                value: firstNumericalParse(
                                                    newValue,
                                                ),
                                            });
                                        }}
                                    />
                                </View>
                                <span className="max-error-plusmn">
                                    &plusmn;
                                </span>
                                <NumberInput
                                    className="max-error-input-value"
                                    placeholder={0}
                                    value={answers[i]["maxError"]}
                                    format={_.last(answer.answerForms || [])}
                                    onChange={this.updateAnswer(i, "maxError")}
                                />
                            </div>
                            <View className={styles.field}>
                                <BodyText weight="semi">Status</BodyText>
                                <SegmentedControl
                                    aria-label="Status"
                                    disabled={editingDisabled}
                                    selectedValue={answers[i]["status"]}
                                    onChange={(value) =>
                                        this.onEvaluationChange(i, value)
                                    }
                                    options={[
                                        {value: "correct", label: "Correct"},
                                        {value: "wrong", label: "Wrong"},
                                        {value: "ungraded", label: "Ungraded"},
                                    ]}
                                />
                            </View>
                            {unsimplifiedAnswers(i)}
                            <View className={styles.field}>
                                <BodyText weight="semi">
                                    (Articles only) Message shown to user
                                </BodyText>
                                {editor}
                            </View>
                            {suggestedAnswerTypes(i)}
                            <Button
                                startIcon={trashIcon}
                                aria-label={`Delete ${answerHeading}`}
                                className="delete-item-button"
                                disabled={editingDisabled}
                                onClick={() => {
                                    this.onTrashAnswer(i);
                                }}
                                kind="tertiary"
                            >
                                Delete
                            </Button>
                        </PerseusEditorAccordion>
                    </div>
                );
            });

        return (
            <div className="perseus-input-number-editor">
                <Heading
                    title="General Settings"
                    isCollapsible={true}
                    isOpen={this.state.showSettings}
                    onToggle={this.onToggleHeading("Settings")}
                />
                <div
                    className={`perseus-editor-accordion-container ${this.state.showSettings ? "expanded" : "collapsed"}`}
                >
                    <div className="perseus-editor-accordion-content">
                        {inputSize}

                        <label>
                            Text alignment
                            <SingleSelect
                                selectedValue={this.props.textAlign}
                                onChange={(value) => {
                                    this.props.onChange({textAlign: value});
                                }}
                                placeholder="Select text alignment"
                            >
                                <OptionItem value="left" label="Left" />
                                <OptionItem value="center" label="Center" />
                                <OptionItem value="right" label="Right" />
                            </SingleSelect>
                        </label>

                        {coefficientCheck}
                        {labelText}
                    </div>
                </div>
                <Heading
                    title="Answers"
                    isCollapsible={true}
                    isOpen={this.state.showAnswers}
                    onToggle={this.onToggleHeading("Answers")}
                />
                <div
                    className={`perseus-editor-accordion-container ${this.state.showAnswers ? "expanded" : "collapsed"}`}
                >
                    <div className="perseus-editor-accordion-content">
                        {generateInputAnswerEditors()}
                        <Button
                            kind="tertiary"
                            disabled={editingDisabled}
                            onClick={this.addAnswer}
                        >
                            Add new answer
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NumericInputEditor;
