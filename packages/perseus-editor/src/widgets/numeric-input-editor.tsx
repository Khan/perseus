/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    components,
    Changeable,
    EditorJsonify,
    Util,
    PerseusI18nContext,
} from "@khanacademy/perseus";
import Button from "@khanacademy/wonder-blocks-button";
import {Checkbox} from "@khanacademy/wonder-blocks-form";
import Pill from "@khanacademy/wonder-blocks-pill";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";
import _ from "underscore";

import Heading from "../components/heading";
import PerseusEditorAccordion from "../components/perseus-editor-accordion";
import Editor from "../editor";

import type {APIOptionsWithDefaults} from "@khanacademy/perseus";

type ChangeFn = typeof Changeable.change;

const {ButtonGroup, InfoTip, MultiButtonGroup, NumberInput, TextInput} =
    components;
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
    showAnswerDetails: boolean[];
    showSettings: boolean;
    showAnswers: boolean;
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
            showAnswerDetails: _.map(this.props.answers, () => true),
            showSettings: true,
            showAnswers: true,
        };
    }

    change: ChangeFn = (...args) => {
        return Changeable.change.apply(this, args);
    };

    onToggleOptions = (choiceIndex) => {
        const showOptions = this.state.showOptions.slice();
        showOptions[choiceIndex] = !showOptions[choiceIndex];
        this.setState({showOptions: showOptions});
    };

    onToggleAnswers = (answerIndex) => {
        const showAnswerDetails = this.state.showAnswerDetails.slice();
        showAnswerDetails[answerIndex] = !showAnswerDetails[answerIndex];
        this.setState({showAnswerDetails: showAnswerDetails});
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
        const i = _.indexOf(statuses, answers[choiceIndex].status);
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
        // TODO(oliver): This might not be necessary anymore.
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

    render() {
        const answers = this.props.answers;

        const unsimplifiedAnswers = (i: any) => (
            <div className="perseus-widget-row unsimplified-options">
                <label>Unsimplified answers are</label>
                {answers[i]["status"] !== "correct" && (
                    <span> irrelevant for this status</span>
                )}
                {answers[i]["status"] === "correct" && (
                    <>
                        <InfoTip>
                            <p>
                                Normally select &quot;ungraded&quot;. This will
                                user a message saying the answer is correct but
                                simplified. The user will then have to simplify
                                re-enter, but will not be penalized. (5th grade
                                after)
                            </p>
                            <p>
                                Select &quot;accepted&quot; only if the user is
                                expected to know how to simplify fractions yet.
                                (Anything prior to 5th grade)
                            </p>
                            <p>
                                Select &quot;wrong&quot; <em>only</em> if we are
                                specifically assessing the ability to simplify.
                            </p>
                        </InfoTip>
                        <br />
                        <Pill
                            kind={
                                answers[i]["simplify"] === "required"
                                    ? "accent"
                                    : "transparent"
                            }
                            size="medium"
                            role="radio"
                            style={{
                                marginRight: "8px",
                                marginTop: "4px",
                            }}
                            onClick={() => {
                                this.updateAnswer(i, {simplify: "required"});
                            }}
                        >
                            Ungraded
                        </Pill>
                        <Pill
                            kind={
                                answers[i]["simplify"] === "optional"
                                    ? "accent"
                                    : "transparent"
                            }
                            size="medium"
                            role="radio"
                            style={{
                                marginRight: "8px",
                                marginTop: "4px",
                            }}
                            onClick={() => {
                                this.updateAnswer(i, {simplify: "optional"});
                            }}
                        >
                            Accepted
                        </Pill>
                        <Pill
                            kind={
                                answers[i]["simplify"] === "enforced"
                                    ? "accent"
                                    : "transparent"
                            }
                            size="medium"
                            role="radio"
                            style={{
                                marginRight: "8px",
                                marginTop: "4px",
                            }}
                            onClick={() => {
                                this.updateAnswer(i, {simplify: "enforced"});
                            }}
                        >
                            Wrong
                        </Pill>
                    </>
                )}
            </div>
        );

        const suggestedAnswerTypes = (i: any) => (
            <>
                <div className="perseus-widget-row">
                    <label>Possible answer formats</label>
                    <InfoTip>
                        <p>
                            Formats will be autoselected for you based on the
                            given answer; to show no suggested formats and
                            accept all types, simply have a decimal/integer be
                            the answer. Values with &pi; will have format
                            &quot;pi&quot;, and values that are fractions will
                            have some subset (mixed will be &quot;mixed&quot;
                            and &quot;proper&quot;; improper/proper will both be
                            &quot;improper&quot; and &quot;proper&quot;). If you
                            would like to specify that it is only a proper
                            fraction (or only a mixed/improper fraction),
                            deselect the other format. Except for specific
                            cases, you should not need to change the
                            autoselected formats.
                        </p>
                        <p>
                            To restrict the answer to <em>only</em> an improper
                            fraction (i.e. 7/4), select the improper fraction
                            and toggle &quot;strict&quot; to true. This{" "}
                            <b>will not</b> accept 1.75 as an answer.{" "}
                        </p>
                        <p>
                            Unless you are testing that specific skill, please
                            do not restrict the answer format.
                        </p>
                    </InfoTip>
                    <MultiButtonGroup
                        buttons={answerFormButtons}
                        values={answers[i]["answerForms"]}
                        onChange={
                            this.updateAnswer(i, "answerForms") || (() => {})
                        }
                    />
                </div>
                <div className="perseus-widget-row">
                    <Checkbox
                        label="Strictly match only these formats"
                        checked={answers[i]["strict"]}
                        onChange={(value) => {
                            this.updateAnswer.bind(this, i)({strict: value});
                        }}
                    />
                </div>
            </>
        );

        const inputSize = (
            <div className="perseus-widget-row">
                <label>Width: </label>
                <Pill
                    kind={
                        this.props.size === "normal" ? "accent" : "transparent"
                    }
                    size="medium"
                    role="radio"
                    style={{
                        marginRight: "8px",
                    }}
                    onClick={() => {
                        this.change("size")("normal");
                    }}
                >
                    Normal (80px)
                </Pill>
                <Pill
                    kind={
                        this.props.size === "small" ? "accent" : "transparent"
                    }
                    size="medium"
                    role="radio"
                    style={{
                        marginRight: "8px",
                    }}
                    onClick={() => {
                        this.change("size")("small");
                    }}
                >
                    Small (40px)
                </Pill>
                <InfoTip>
                    <p>
                        Use size &quot;Normal&quot; for all text boxes, unless
                        there are multiple text boxes in one line and the answer
                        area is too narrow to fit them.
                    </p>
                </InfoTip>
            </div>
        );

        const rightAlign = (
            <div className="perseus-widget-row">
                <label>Alignment: </label>
                <Pill
                    kind={this.props.rightAlign ? "transparent" : "accent"}
                    size="medium"
                    role="radio"
                    style={{
                        marginRight: "8px",
                    }}
                    onClick={() => {
                        this.props.onChange({rightAlign: false});
                    }}
                >
                    Left
                </Pill>
                <Pill
                    kind={this.props.rightAlign ? "accent" : "transparent"}
                    size="medium"
                    role="radio"
                    style={{
                        marginRight: "8px",
                    }}
                    onClick={() => {
                        this.props.onChange({rightAlign: true});
                    }}
                >
                    Right
                </Pill>
            </div>
        );

        const labelText = (
            <>
                <div className="perseus-widget-row">
                    <label>Aria label</label>
                    <InfoTip>
                        <p>
                            Text to describe this input. This will be shown to
                            users using screenreaders.
                        </p>
                    </InfoTip>
                </div>
                <TextInput
                    labelText="aria label"
                    value={this.props.labelText}
                    onChange={this.change("labelText")}
                />
            </>
        );

        const coefficientCheck = (
            <div className="perseus-widget-row">
                <label>Number style: </label>
                <Pill
                    kind={this.props.coefficient ? "transparent" : "accent"}
                    size="medium"
                    role="radio"
                    style={{
                        marginRight: "8px",
                    }}
                    onClick={() => {
                        this.props.onChange({coefficient: false});
                    }}
                >
                    Standard
                </Pill>
                <Pill
                    kind={this.props.coefficient ? "accent" : "transparent"}
                    size="medium"
                    role="radio"
                    style={{
                        marginRight: "8px",
                    }}
                    onClick={() => {
                        this.props.onChange({coefficient: true});
                    }}
                >
                    Coefficient
                </Pill>
                <InfoTip>
                    <p>
                        A coefficient style number allows the student to use -
                        for -1 and an empty string to mean 1.
                    </p>
                </InfoTip>
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
                const answerRangeText = answer.maxError
                    ? `± ${answer.maxError}`
                    : "";
                const answerHeading =
                    answer.value === null
                        ? "New Answer"
                        : `${statusProper} answer: ${answer.value} ${answerRangeText}`;

                return (
                    <div className="perseus-widget-row answer-option" key={i}>
                        <PerseusEditorAccordion
                            expanded={this.state.showAnswerDetails[i]}
                            onToggle={() => {
                                this.onToggleAnswers(i);
                            }}
                            header={<LabelLarge>{answerHeading}</LabelLarge>}
                        >
                            <div
                                className={
                                    "input-answer-editor-value-container" +
                                    (answer.maxError ? " with-max-error" : "")
                                }
                            >
                                <label>User input:</label>
                                <NumberInput
                                    value={answer.value}
                                    className="numeric-input-value"
                                    placeholder="answer"
                                    format={_.last(answer.answerForms || [])}
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
                            <div className="perseus-widget-row">
                                <label>Status: </label>
                                <Pill
                                    kind={
                                        answer.status === "correct"
                                            ? "accent"
                                            : "transparent"
                                    }
                                    size="medium"
                                    role="radio"
                                    style={{
                                        marginRight: "8px",
                                    }}
                                    onClick={() => {
                                        this.onEvaluationChange(i, "correct");
                                    }}
                                >
                                    Correct
                                </Pill>
                                <Pill
                                    kind={
                                        answer.status === "wrong"
                                            ? "accent"
                                            : "transparent"
                                    }
                                    size="medium"
                                    role="radio"
                                    style={{
                                        marginRight: "8px",
                                    }}
                                    onClick={() => {
                                        this.onEvaluationChange(i, "wrong");
                                    }}
                                >
                                    Wrong
                                </Pill>
                                <Pill
                                    kind={
                                        answer.status === "ungraded"
                                            ? "accent"
                                            : "transparent"
                                    }
                                    size="medium"
                                    role="radio"
                                    style={{
                                        marginRight: "8px",
                                    }}
                                    onClick={() => {
                                        this.onEvaluationChange(i, "ungraded");
                                    }}
                                >
                                    Ungraded
                                </Pill>
                            </div>
                            {unsimplifiedAnswers(i)}
                            <div className="perseus-widget-row">
                                Message shown to user in article:
                            </div>
                            {editor}
                            {suggestedAnswerTypes(i)}
                            <Button
                                startIcon={trashIcon}
                                aria-label={`Delete ${answerHeading}`}
                                className="delete-item-button"
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
                {this.state.showSettings && inputSize}
                {this.state.showSettings && rightAlign}
                {this.state.showSettings && coefficientCheck}
                {this.state.showSettings && labelText}
                <Heading
                    title="Answers"
                    isCollapsible={true}
                    isOpen={this.state.showAnswers}
                    onToggle={this.onToggleHeading("Answers")}
                />
                {this.state.showAnswers && (
                    <>
                        {generateInputAnswerEditors()}
                        <Button kind="tertiary" onClick={this.addAnswer}>
                            Add new answer
                        </Button>
                    </>
                )}
            </div>
        );
    }
}

export default NumericInputEditor;
