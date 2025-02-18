import * as KAS from "@khanacademy/kas";
import {components, Expression} from "@khanacademy/perseus";
import {
    PerseusExpressionAnswerFormConsidered,
    expressionLogic,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Checkbox, LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    HeadingSmall,
    HeadingXSmall,
} from "@khanacademy/wonder-blocks-typography";
import {isTruthy} from "@khanacademy/wonder-stuff-core";
import {css, StyleSheet} from "aphrodite";
// eslint-disable-next-line import/no-extraneous-dependencies
import lens from "hubble";
import * as React from "react";
import _ from "underscore";

import type {
    PerseusExpressionWidgetOptions,
    LegacyButtonSets,
    ExpressionDefaultWidgetOptions,
    PerseusExpressionAnswerForm,
} from "@khanacademy/perseus-core";

const {InfoTip} = components;

type Props = {
    widgetId?: any;
    value?: string;
} & Omit<PerseusExpressionWidgetOptions, "buttonsVisible">;

// types for iterables
type AnswerForm = PerseusExpressionWidgetOptions["answerForms"][number];
type LegacyButtonSet = PerseusExpressionWidgetOptions["buttonSets"][number];

const buttonSetsList: LegacyButtonSets = [
    "basic",
    "trig",
    "prealgebra",
    "logarithms",
    "scientific",
    "basic relations",
    "advanced relations",
];

type State = {
    // this is to help the "functions" input feel natural
    // while still allowing us to to store the functions as an array
    functionsInternal: string;

    // answerForm
    answerForms: PerseusExpressionAnswerForm[];
    buttonSets: LegacyButtonSets;
    functions: string[];
    times: boolean;
    visibleLabel?: string;
    ariaLabel?: string;
    //buttonsVisible?: "always" | "never" | "focused";
};

class ExpressionEditor extends React.Component<Props, State> {
    static widgetName = "expression" as const;

    static defaultProps: ExpressionDefaultWidgetOptions =
        expressionLogic.defaultWidgetOptions;

    constructor(props: Props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            functionsInternal: this.props.functions.join(" "),
            answerForms: this.props
                .answerForms as PerseusExpressionAnswerForm[],
            buttonSets: this.props.buttonSets,
            functions: this.props.functions as string[],
            times: this.props.times,
            visibleLabel: this.props.visibleLabel,
            ariaLabel: this.props.ariaLabel,
        };
    }

    serialize: () => any = () => {
        const formSerializables = [
            "value",
            "form",
            "simplify",
            "considered",
            // it's a little weird to serialize the react key, but saves some
            // effort reconstructing them when this item is loaded later.
            "key",
        ];
        const serializables = [
            "answerForms",
            "buttonSets",
            "functions",
            "times",
            "visibleLabel",
            "ariaLabel",
        ];

        const answerForms = this.state.answerForms.map((form) => {
            return _(form).pick(formSerializables);
        });

        return lens(this.props)
            .set(["answerForms"], answerForms)
            .mod([], (props) => _(props).pick(serializables))
            .freeze();
    };

    getSaveWarnings: () => any = () => {
        const issues: Array<any | string> = [];

        if (this.props.answerForms.length === 0) {
            issues.push("No answers specified");
        } else {
            const hasCorrect = this.props.answerForms.some((form) => {
                return form.considered === "correct";
            });
            if (!hasCorrect) {
                issues.push("No correct answer specified");
            }

            _(this.props.answerForms).each((form, ix) => {
                if (this.props.value === "") {
                    issues.push(`Answer ${ix + 1} is empty`);
                } else {
                    // note we're not using icu for content creators
                    const expression = KAS.parse(form.value, {
                        functions: this.props.functions,
                    });
                    if (!expression.parsed) {
                        issues.push(`Couldn't parse ${form.value}`);
                    } else if (
                        form.simplify &&
                        !expression.expr.isSimplified()
                    ) {
                        issues.push(
                            `${form.value} isn't simplified, but is required" +
                            " to be`,
                        );
                    }
                }
            });

            // TODO(joel) - warn about:
            //   - unreachable answers (how??)
            //   - specific answers following unspecific answers
            //   - incorrect answers as the final form
        }

        return issues;
    };

    _newEmptyAnswerForm: () => any = () => {
        return {
            considered: "correct",
            form: false,
            simplify: false,
            value: "",
        };
    };

    newAnswer: () => void = () => {
        const answerForms = this.state.answerForms.slice();
        answerForms.push(this._newEmptyAnswerForm());

        this.setState({
            answerForms: answerForms,
        });
        //this.change({answerForms});
    };

    handleRemoveForm: (answerKey: number) => void = (i) => {
        console.log(`index deleted: ${i}`);
        const answerForms = this.state.answerForms.slice();
        answerForms.splice(i, 1);
        const updatedAnswerForms = answerForms.map((form, index) => ({
            ...form,
        }));
        console.log(updatedAnswerForms);

        this.setState({
            answerForms: updatedAnswerForms,
        });
    };

    // This function is designed to update the answerForm property
    // with new data. This function should not be used to update any
    // other properties within ExpressionEditor.
    updateAnswerForm(i: number, props: AnswerForm) {
        const answerForms = lens(this.state.answerForms)
            .merge([i], props)
            .freeze();

        this.setState({
            answerForms: answerForms,
        });
    }

    // called when the selected buttonset changes
    handleButtonSet: (changingName: string) => void = (changingName) => {
        const buttonSetNames = buttonSetsList;

        // Filter to preserve order - using .union and .difference would always
        // move the last added button set to the end.
        const buttonSets = buttonSetNames.filter((set) => {
            return (
                this.state.buttonSets.includes(set) !== (set === changingName)
            );
        });

        this.setState({
            buttonSets: buttonSets,
        });
    };

    handleToggleDiv: () => void = () => {
        // We always want buttonSets to contain exactly one of "basic" and
        // "basic+div". Toggle between the two of them.
        // If someone can think of a more elegant formulation of this (there
        // must be one!) feel free to change it.
        let keep: LegacyButtonSet | undefined;
        let remove: LegacyButtonSet | undefined;
        if (this.state.buttonSets.includes("basic+div")) {
            keep = "basic";
            remove = "basic+div";
        } else {
            keep = "basic+div";
            remove = "basic";
        }

        const buttonSets = this.state.buttonSets
            .filter((set) => set !== remove)
            .concat(keep);

        this.setState({
            buttonSets: buttonSets,
        });
    };

    // called when the correct answer changes
    handleTexInsert: (arg1: string) => void = (str) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'insert' does not exist on type 'ReactInstance'.
        this.refs.expression.insert(str);
    };

    // called when the function variables change
    handleFunctions: (value: string) => void = (value) => {
        // this.setState({functionsInternal: value});
        // const newProps: Record<string, any> = {};
        // newProps.functions = value.split(/[ ,]+/).filter(isTruthy);

        this.setState({
            functions: value.split(/[ ,]+/).filter(isTruthy),
        });
    };

    // called when the visible labels change
    handleVisibleLabel: (value: string) => void = (value) => {
        this.setState({
            visibleLabel: value,
        });
    };

    // called when the aria label change
    handleAriaLabel: (value: string) => void = (value) => {
        this.setState({
            ariaLabel: value,
        });
    };

    changeSimplify(index: number, simplify: boolean) {
        const answerForm: AnswerForm = {
            ...this.state.answerForms[index],
            simplify,
        };

        console.log(`index ${index} simplified: ${simplify}`);

        this.updateAnswerForm(index, answerForm);
    }

    changeForm(index: number, form: boolean) {
        const answerForm: AnswerForm = {
            ...this.state.answerForms[index],
            form,
        };

        this.updateAnswerForm(index, answerForm);
    }

    changeConsidered(
        index: number,
        considered: (typeof PerseusExpressionAnswerFormConsidered)[number],
    ) {
        const answerForm: AnswerForm = {
            ...this.state.answerForms[index],
            considered,
        };

        this.updateAnswerForm(index, answerForm);
    }

    changeTimes(times: boolean) {
        this.setState({times: times});
    }

    changeExpressionWidget: (
        index: number,
        props: React.ComponentProps<typeof Expression>,
    ) => void = (index, props) => {
        const answerForm: AnswerForm = {
            ...this.state.answerForms[index],
            value: props.value,
        };
        this.updateAnswerForm(index, answerForm);
    };

    render(): React.ReactNode {
        const answerOptions: React.JSX.Element[] = this.state.answerForms.map(
            (ans: AnswerForm, index: number) => {
                const expressionProps: Partial<
                    React.ComponentProps<typeof Expression>
                > = {
                    // note we're using
                    // *this.props*.{times,functions,buttonSets} since each
                    // answer area has the same settings for those
                    times: this.state.times,
                    functions: this.state.functions,
                    buttonSets: this.state.buttonSets,
                    buttonsVisible: "focused",
                    value: ans.value,
                    // @ts-expect-error: Type '(props: React.ComponentProps<typeof Expression>) => void' is not assignable to type 'ChangeHandler'. Types of parameters 'props' and 'arg1' are incompatible.
                    onChange: (
                        props: React.ComponentProps<typeof Expression>,
                    ) => this.changeExpressionWidget(index, props),
                    trackInteraction: () => {},
                    widgetId: this.props.widgetId + "-" + index,
                    visibleLabel: this.state.visibleLabel,
                    ariaLabel: this.state.ariaLabel,
                } as const;

                return (
                    <AnswerOption
                        key={index}
                        considered={ans.considered}
                        expressionProps={expressionProps}
                        form={ans.form}
                        simplify={ans.simplify}
                        onDelete={() => this.handleRemoveForm(index)}
                        onChangeSimplify={(simplify) =>
                            this.changeSimplify(index, simplify)
                        }
                        onChangeForm={(form) => this.changeForm(index, form)}
                        onChangeConsidered={(considered) =>
                            this.changeConsidered(index, considered)
                        }
                    />
                );
            },
        );

        // checkboxes to choose which sets of input buttons are shown
        const buttonSetChoices = buttonSetsList.map((name) => {
            // The first one gets special cased to always be checked, disabled,
            // and float left.
            const isBasic = name === "basic";
            const checked = this.state.buttonSets.includes(name) || isBasic;
            return (
                <Checkbox
                    key={name}
                    label={name}
                    checked={checked}
                    disabled={isBasic}
                    onChange={() => this.handleButtonSet(name)}
                />
            );
        });

        buttonSetChoices.unshift(
            <Checkbox
                key="show ÷ button"
                label="show ÷ button"
                checked={this.state.buttonSets.includes("basic+div")}
                onChange={this.handleToggleDiv}
            />,
        );

        return (
            <div>
                <HeadingSmall>Global Options</HeadingSmall>

                <div className={css(styles.paddedY)}>
                    <LabeledTextField
                        label="Visible label"
                        value={this.state.visibleLabel || ""}
                        onChange={this.handleVisibleLabel}
                    />
                    <InfoTip>
                        <p>
                            Optional visible text; strongly encouraged to help
                            learners using dictation software, but can be
                            omitted if the surrounding content provides enough
                            context.
                        </p>
                    </InfoTip>
                </div>

                <div className={css(styles.paddedY)}>
                    <LabeledTextField
                        label="Aria label"
                        value={this.state.ariaLabel || ""}
                        onChange={this.handleAriaLabel}
                    />
                    <InfoTip>
                        <p>
                            Label text that&apos;s read by screen readers.
                            Highly recommend adding a label here to ensure your
                            exercise is accessible. For more information on
                            writting accessible labels, please see{" "}
                            <a
                                href="https://www.w3.org/WAI/tips/designing/#ensure-that-form-elements-include-clearly-associated-labels"
                                target="_blank"
                                rel="noreferrer"
                            >
                                this article.
                            </a>
                        </p>
                    </InfoTip>
                </div>

                <div className={css(styles.paddedY)}>
                    <LabeledTextField
                        label="Function variables"
                        value={this.state.functionsInternal}
                        onChange={this.handleFunctions}
                    />
                    <InfoTip>
                        <p>
                            Single-letter variables listed here will be
                            interpreted as functions. This let us know that f(x)
                            means &quot;f of x&quot; and not &quot;f times
                            x&quot;.
                        </p>
                    </InfoTip>
                </div>

                <div className={css(styles.paddedY)}>
                    <Checkbox
                        label="Use × instead of ⋅ for multiplication"
                        checked={this.state.times}
                        onChange={(newCheckedState) => {
                            this.changeTimes(newCheckedState);
                        }}
                    />
                    <InfoTip>
                        <p>
                            For pre-algebra problems this option displays
                            multiplication as \times instead of \cdot in both
                            the rendered output and the acceptable formats
                            examples.
                        </p>
                    </InfoTip>
                </div>

                <div className={css(styles.paddedY)}>
                    <HeadingXSmall>Button Sets</HeadingXSmall>
                    {buttonSetChoices}
                </div>

                <HeadingSmall>Answers</HeadingSmall>

                <p style={{margin: "4px 0"}}>
                    student responses area matched against these from top to
                    bottom
                </p>

                {answerOptions}

                <div>
                    <Button size="small" onClick={this.newAnswer}>
                        Add new answer
                    </Button>
                </div>
            </div>
        );
    }
}

// Find the next element in arr after val, wrapping around to the first.
const findNextIn = function <T>(arr: ReadonlyArray<T>, val: T) {
    let ix = arr.indexOf(val);
    ix = (ix + 1) % arr.length;
    return arr[ix];
};

type AnswerOptionProps = {
    considered: (typeof PerseusExpressionAnswerFormConsidered)[number];
    expressionProps: any;

    // Must the answer have the same form as this answer.
    form: boolean;

    // Must the answer be simplified.
    simplify: boolean;

    onDelete: () => void;
    onChangeSimplify: (simplify: boolean) => void;
    onChangeForm: (form: boolean) => void;
    onChangeConsidered: (
        considered: (typeof PerseusExpressionAnswerFormConsidered)[number],
    ) => void;
};

type AnswerOptionState = {
    deleteFocused: boolean;
};

class AnswerOption extends React.Component<
    AnswerOptionProps,
    AnswerOptionState
> {
    state = {deleteFocused: false};

    handleImSure = () => {
        this.props.onDelete();
        this.handleCancelDelete();
    };

    handleCancelDelete = () => {
        this.setState({deleteFocused: false});
    };

    handleDelete = () => {
        this.setState({deleteFocused: true});
    };

    toggleConsidered = () => {
        const newVal = findNextIn<
            (typeof PerseusExpressionAnswerFormConsidered)[number]
        >(PerseusExpressionAnswerFormConsidered, this.props.considered);
        this.props.onChangeConsidered(newVal);
    };

    render(): React.ReactNode {
        const removeButton = this.state.deleteFocused ? (
            <>
                <Button
                    size="small"
                    onClick={this.handleImSure}
                    color="destructive"
                >
                    I&apos;m sure!
                </Button>
                <Strut size={spacing.small_12} />
                <Button size="small" onClick={this.handleCancelDelete} light>
                    Cancel
                </Button>
            </>
        ) : (
            <Button
                size="small"
                onClick={this.handleDelete}
                color="destructive"
                light
            >
                Delete
            </Button>
        );

        const answerStatusCss = css(
            styles.answerStatus,
            this.props.considered === "wrong" && styles.answerStatusWrong,
            this.props.considered === "correct" && styles.answerStatusCorrect,
            this.props.considered === "ungraded" && styles.answerStatusUngraded,
        );

        return (
            <div className={css(styles.answerOption)}>
                <div className={css(styles.answerBody)}>
                    <div>
                        <button
                            onClick={this.toggleConsidered}
                            className={answerStatusCss}
                        >
                            {this.props.considered}
                        </button>

                        <div>
                            <Expression {...this.props.expressionProps} />
                        </div>
                    </div>

                    <div className={css(styles.paddedY, styles.paddedX)}>
                        <Checkbox
                            label="Answer expression must have the same form."
                            checked={this.props.form}
                            onChange={this.props.onChangeForm}
                        />
                        <InfoTip>
                            <p>
                                The student&apos;s answer must be in the same
                                form. Commutativity and excess negative signs
                                are ignored.
                            </p>
                        </InfoTip>
                    </div>

                    <div className={css(styles.paddedY, styles.paddedX)}>
                        <Checkbox
                            label="Answer expression must be fully expanded and simplified."
                            checked={this.props.simplify}
                            onChange={this.props.onChangeSimplify}
                        />
                        <InfoTip>
                            <p>
                                The student&apos;s answer must be fully expanded
                                and simplified. Answering this equation
                                (x^2+2x+1) with this factored equation (x+1)^2
                                will render this response &quot;Your answer is
                                not fully expanded and simplified.&quot;
                            </p>
                        </InfoTip>
                    </div>

                    <div className={css(styles.buttonRow, styles.paddedY)}>
                        {removeButton}
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpressionEditor;

const styles = StyleSheet.create({
    paddedX: {
        paddingLeft: spacing.xSmall_8,
        paddingRight: spacing.xSmall_8,
    },
    paddedY: {
        paddingTop: spacing.xxSmall_6,
        paddingBottom: spacing.xxSmall_6,
    },
    answerOption: {
        border: "1px solid #ddd",
        borderRadius: "3px",
        display: "flex",
    },
    answerStatus: {
        border: "none",
        userSelect: "none",
        width: "100px",
        paddingTop: spacing.small_12,
        paddingBottom: spacing.small_12,
    },
    answerStatusWrong: {
        backgroundColor: color.fadedRed16,
    },
    answerStatusCorrect: {
        backgroundColor: color.fadedGreen16,
    },
    answerStatusUngraded: {
        backgroundColor: color.fadedBlue16,
    },
    answerBody: {},
    buttonRow: {
        display: "flex",
    },
});
