/* eslint-disable jsx-a11y/anchor-is-valid, react/sort-comp */
import {
    components,
    icons,
    Changeable,
    EditorJsonify,
    Util,
    PerseusI18nContext,
} from "@khanacademy/perseus";
import * as React from "react";
import _ from "underscore";

import Editor from "../editor";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";

const {
    ButtonGroup,
    InfoTip,
    InlineIcon,
    MultiButtonGroup,
    NumberInput,
    PropCheckBox,
    TextInput,
} = components;
const {iconGear, iconTrash} = icons;
const {firstNumericalParse} = Util;

// NOTE(john): Copied from perseus-types.d.ts in the Perseus package.
// I'm unable to find a good way of importing these types into this project.
type MathFormat =
    | "integer"
    | "mixed"
    | "improper"
    | "proper"
    | "decimal"
    | "percent"
    | "pi";
type PerseusNumericInputAnswerForm = {
    simplify:
        | "required"
        | "correct"
        | "enforced"
        | "optional"
        | null
        | undefined;
    name: MathFormat;
};
type PerseusNumericInputAnswer = {
    message: string;
    value: number;
    status: string;
    answerForms?: ReadonlyArray<MathFormat>;
    strict: boolean;
    maxError: number | null | undefined;
    simplify: string | null | undefined;
};
type PerseusNumericInputWidgetOptions = {
    answers: ReadonlyArray<PerseusNumericInputAnswer>;
    labelText: string;
    size: string;
    coefficient: boolean;
    rightAlign?: boolean;
    static?: boolean;
    answerForms?: ReadonlyArray<PerseusNumericInputAnswerForm>;
};

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

type Props = PerseusNumericInputWidgetOptions & {
    onChange: (results: any) => any;
    apiOptions?: APIOptionsWithDefaults;
};

type State = {
    lastStatus: string;
    showOptions: boolean[];
};

class NumericInputEditor extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static widgetName = "numeric-input";
    static displayName = "NumericInputEditor";

    static defaultProps = {
        answers: [initAnswer("correct")],
        size: "normal",
        coefficient: false,
        labelText: "",
        rightAlign: false,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            lastStatus: "wrong",
            showOptions: _.map(this.props.answers, () => false),
        };
    }

    render() {
        const answers = this.props.answers;

        const unsimplifiedAnswers = (i: any) => (
            <div className="perseus-widget-row">
                <label>Unsimplified answers are</label>
                <ButtonGroup
                    value={answers[i]["simplify"]}
                    allowEmpty={false}
                    buttons={[
                        {value: "required", content: "ungraded"},
                        {value: "optional", content: "accepted"},
                        {value: "enforced", content: "wrong"},
                    ]}
                    onChange={this.updateAnswer(i, "simplify") || (() => {})}
                />
                <InfoTip>
                    <p>
                        Normally select "ungraded". This will give the user a
                        message saying the answer is correct but not simplified.
                        The user will then have to simplify it and re-enter, but
                        will not be penalized. (5th grade and after)
                    </p>
                    <p>
                        Select "accepted" only if the user is not expected to
                        know how to simplify fractions yet. (Anything prior to
                        5th grade)
                    </p>
                    <p>
                        Select "wrong" <em>only</em> if we are specifically
                        assessing the ability to simplify.
                    </p>
                </InfoTip>
            </div>
        );

        const suggestedAnswerTypes = (i: any) => (
            <div>
                <div className="perseus-widget-row">
                    <label>Choose the suggested answer formats</label>
                    <MultiButtonGroup
                        buttons={answerFormButtons}
                        values={answers[i]["answerForms"]}
                        onChange={
                            this.updateAnswer(i, "answerForms") || (() => {})
                        }
                    />
                    <InfoTip>
                        <p>
                            Formats will be autoselected for you based on the
                            given answer; to show no suggested formats and
                            accept all types, simply have a decimal/integer be
                            the answer. Values with &pi; will have format "pi",
                            and values that are fractions will have some subset
                            (mixed will be "mixed" and "proper"; improper/proper
                            will both be "improper" and "proper"). If you would
                            like to specify that it is only a proper fraction
                            (or only a mixed/improper fraction), deselect the
                            other format. Except for specific cases, you should
                            not need to change the autoselected formats.
                        </p>
                        <p>
                            To restrict the answer to <em>only</em> an improper
                            fraction (i.e. 7/4), select the improper fraction
                            and toggle "strict" to true. This <b>will not</b>{" "}
                            accept 1.75 as an answer.{" "}
                        </p>
                        <p>
                            Unless you are testing that specific skill, please
                            do not restrict the answer format.
                        </p>
                    </InfoTip>
                </div>
                <div className="perseus-widget-row">
                    <PropCheckBox
                        label="Strictly match only these formats"
                        strict={answers[i]["strict"]}
                        // eslint-disable-next-line react/jsx-no-bind
                        onChange={this.updateAnswer.bind(this, i)}
                    />
                </div>
            </div>
        );

        const maxError = (i: any) => (
            <div className="perseus-widget-row">
                <label>
                    Max error{" "}
                    <NumberInput
                        className="max-error"
                        value={answers[i]["maxError"]}
                        onChange={this.updateAnswer(i, "maxError")}
                        placeholder="0"
                    />
                </label>
            </div>
        );

        const inputSize = (
            <div className="perseus-widget-row">
                <label>Width: </label>
                <ButtonGroup
                    value={this.props.size}
                    allowEmpty={false}
                    buttons={[
                        {value: "normal", content: "Normal (80px)"},
                        {value: "small", content: "Small (40px)"},
                    ]}
                    onChange={this.change("size")}
                />
                <InfoTip>
                    <p>
                        Use size "Normal" for all text boxes, unless there are
                        multiple text boxes in one line and the answer area is
                        too narrow to fit them.
                    </p>
                </InfoTip>
            </div>
        );

        const rightAlign = (
            <div className="perseus-widget-row">
                <PropCheckBox
                    label="Right alignment"
                    rightAlign={this.props.rightAlign}
                    onChange={this.props.onChange}
                />
            </div>
        );

        const labelText = (
            <div className="perseus-widget-row">
                <label>
                    Label text:{" "}
                    <TextInput
                        value={this.props.labelText}
                        onChange={this.change("labelText")}
                    />
                </label>
                <InfoTip>
                    <p>
                        Text to describe this input. This will be shown to users
                        using screenreaders.
                    </p>
                </InfoTip>
            </div>
        );

        const coefficientCheck = (
            <div>
                <div className="perseus-widget-row">
                    <PropCheckBox
                        label="Coefficient"
                        coefficient={this.props.coefficient}
                        onChange={this.props.onChange}
                    />
                    <InfoTip>
                        <p>
                            A coefficient style number allows the student to use
                            - for -1 and an empty string to mean 1.
                        </p>
                    </InfoTip>
                </div>
            </div>
        );

        const addAnswerButton = (
            <div>
                <a
                    href="javascript:void(0)"
                    className="simple-button orange"
                    onClick={() => this.addAnswer()}
                    onKeyDown={(e) => this.onSpace(e, this.addAnswer)}
                >
                    <span>Add new answer</span>
                </a>
            </div>
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
                        apiOptions={()=>{}}//this.props.apiOptions}
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
                return (
                    <div className="perseus-widget-row" key={i}>
                        <div
                            className={
                                "input-answer-editor-value-container" +
                                (answer.maxError ? " with-max-error" : "")
                            }
                        >
                            <NumberInput
                                value={answer.value}
                                className="numeric-input-value"
                                placeholder="answer"
                                format={_.last(answer.answerForms || [])}
                                data-testid={`numeric-input-answer`}
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
                                            this.context.strings,
                                        ),
                                        answerForms: forms,
                                    });
                                }}
                                onChange={(newValue) => {
                                    this.updateAnswer(i, {
                                        value: firstNumericalParse(
                                            newValue,
                                            this.context.strings,
                                        ),
                                    });
                                }}
                            />
                            {answer.strict && (
                                <div
                                    className="is-strict-indicator"
                                    title="strictly equivalent to"
                                >
                                    &equiv;
                                </div>
                            )}
                            {answer.simplify !== "required" &&
                                answer.status === "correct" && (
                                    <div
                                        className={
                                            "simplify-indicator " +
                                            answer.simplify
                                        }
                                        title="accepts unsimplified answers"
                                    >
                                        &permil;
                                    </div>
                                )}
                            {answer.maxError ? (
                                <div className="max-error-container">
                                    <div className="max-error-plusmn">
                                        &plusmn;
                                    </div>
                                    <NumberInput
                                        placeholder={0}
                                        value={answers[i]["maxError"]}
                                        format={_.last(
                                            answer.answerForms || [],
                                        )}
                                        onChange={this.updateAnswer(
                                            i,
                                            "maxError",
                                        )}
                                    />
                                </div>
                            ) : null}
                            <div className="value-divider" />
                            <a
                                href="javascript:void(0)"
                                className={"answer-status " + answer.status}
                                onClick={() => this.onStatusChange(i)}
                                onKeyDown={(e) =>
                                    this.onSpace(e, this.onStatusChange)
                                }
                            >
                                {answer.status}
                            </a>
                            <a
                                href="javascript:void(0)"
                                className="answer-trash"
                                aria-label="Delete answer"
                                onClick={() => this.onTrashAnswer(i)}
                                onKeyDown={(e) =>
                                    this.onSpace(e, this.onTrashAnswer)
                                }
                            >
                                <InlineIcon {...iconTrash} />
                            </a>
                            <a
                                href="javascript:void(0)"
                                className="options-toggle"
                                aria-label="Toggle options"
                                onClick={() => this.onToggleOptions(i)}
                                onKeyDown={(e) =>
                                    this.onSpace(e, this.onToggleOptions)
                                }
                            >
                                <InlineIcon {...iconGear} />
                            </a>
                        </div>
                        <div className="input-answer-editor-message">
                            {editor}
                        </div>
                        {this.state.showOptions[i] && (
                            <div className="options-container">
                                {maxError(i)}
                                {answer.status === "correct" &&
                                    unsimplifiedAnswers(i)}
                                {suggestedAnswerTypes(i)}
                            </div>
                        )}
                    </div>
                );
            });

        return (
            <div className="perseus-input-number-editor">
                <div className="ui-title">User input</div>
                <div className="msg-title">
                    Message shown to user on attempt
                </div>
                {generateInputAnswerEditors()}
                {addAnswerButton}
                {inputSize}
                {rightAlign}
                {coefficientCheck}
                {labelText}
            </div>
        );
    }

    change = (...args) => {
        return Changeable.change.apply(this, args);
    };

    onToggleOptions = (choiceIndex) => {
        const showOptions = this.state.showOptions.slice();
        showOptions[choiceIndex] = !showOptions[choiceIndex];
        this.setState({showOptions: showOptions});
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
        const i = _.indexOf(statuses, answers[choiceIndex].status);
        const newStatus = statuses[(i + 1) % statuses.length];

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
        // TODO(oliver): This might not be necessary anymore.
        if (choiceIndex === answers.length) {
            const lastAnswer: any = initAnswer(this.state.lastStatus);
            answers = answers.concat(lastAnswer);
        }

        answers[choiceIndex] = _.extend({}, answers[choiceIndex], update);
        // this.props.onChange({answers: answers});
    };

    addAnswer = () => {
        const lastAnswer: any = initAnswer(this.state.lastStatus);
        const answers = this.props.answers.concat(lastAnswer);
        this.props.onChange({answers: answers});
    };

    getSaveWarnings = () => {
        // Filter out all the empty answers
        const warnings = [];
        // TODO(emily): This doesn't actually work, because the value is either
        // null or undefined when undefined, probably.
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
}

export default NumericInputEditor;
