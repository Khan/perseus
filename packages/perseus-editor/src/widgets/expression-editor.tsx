import * as KAS from "@khanacademy/kas";
import {components, Expression} from "@khanacademy/perseus";
import {
    PerseusExpressionAnswerFormConsidered,
    deriveExtraKeys,
    expressionLogic,
} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Checkbox, LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    HeadingSmall,
    HeadingXSmall,
    Caption,
} from "@khanacademy/wonder-blocks-typography";
import {isTruthy} from "@khanacademy/wonder-stuff-core";
import {css, StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import type {
    PerseusExpressionWidgetOptions,
    LegacyButtonSets,
    ExpressionDefaultWidgetOptions,
    PerseusExpressionAnswerForm,
} from "@khanacademy/perseus-core";
import type {CSSProperties} from "aphrodite";

const {ButtonGroup, InfoTip} = components;

type Props = {
    widgetId?: string;
    value?: string;
    onChange: (newValues: Partial<PerseusExpressionWidgetOptions>) => void;
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
};

class ExpressionEditor extends React.Component<Props, State> {
    static widgetName = "expression" as const;

    static defaultProps: ExpressionDefaultWidgetOptions =
        expressionLogic.defaultWidgetOptions;

    constructor(props: Props) {
        super(props);
        this.state = {
            functionsInternal: this.props.functions.join(" "),
        };
    }

    serialize(): PerseusExpressionWidgetOptions {
        const {
            answerForms,
            buttonSets,
            functions,
            times,
            visibleLabel,
            ariaLabel,
        } = this.props;

        return {
            answerForms,
            buttonSets,
            functions,
            times,
            visibleLabel,
            ariaLabel,
            extraKeys: deriveExtraKeys(this.props),
        };
    }

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

    newAnswer: () => void = () => {
        const answerForms = this.props.answerForms.slice();
        const newKey = crypto.randomUUID();

        const newAnswerForm: PerseusExpressionAnswerForm = {
            considered: "correct",
            form: false,
            key: `${newKey}`,
            simplify: false,
            value: "",
        };

        answerForms.push(newAnswerForm);
        this.props.onChange({answerForms});
    };

    handleRemoveForm: (answerKey: number) => void = (i) => {
        const updatedAnswerForms = this.props.answerForms.slice();
        updatedAnswerForms.splice(i, 1);
        this.props.onChange({answerForms: updatedAnswerForms});
    };

    // This function is designed to update the answerForm property
    // with new data. This function should not be used to update any
    // other properties within ExpressionEditor except extraKeys
    // which is derived from answerForms
    updateAnswerForm(index: number, answerFormProps: AnswerForm) {
        // Create a copy of props.answerForms to mutate and change.
        const answerForms = this.props.answerForms.slice();
        answerForms[index] = answerFormProps;

        // deriveExtraKeys defaults to using the `extraKeys` it was given
        // which in most case is what we want, but is not what we want
        // in the editing experience because we should recalculate them
        // when answers change
        const {extraKeys: _, ...restProps} = this.props;

        const extraKeys = deriveExtraKeys({
            ...restProps,
            answerForms,
        });
        this.props.onChange({answerForms, extraKeys});
    }

    // called when the selected buttonset changes
    handleButtonSet: (changingName: string) => void = (changingName) => {
        const buttonSetNames = buttonSetsList;

        // Filter to preserve order - using .union and .difference would always
        // move the last added button set to the end.
        const buttonSets = buttonSetNames.filter((set) => {
            return (
                this.props.buttonSets.includes(set) !== (set === changingName)
            );
        });

        this.props.onChange({buttonSets});
    };

    handleToggleDiv: () => void = () => {
        // We always want buttonSets to contain exactly one of "basic" and
        // "basic+div". Toggle between the two of them.
        // If someone can think of a more elegant formulation of this (there
        // must be one!) feel free to change it.
        let keep: LegacyButtonSet | undefined;
        let remove: LegacyButtonSet | undefined;
        if (this.props.buttonSets.includes("basic+div")) {
            keep = "basic";
            remove = "basic+div";
        } else {
            keep = "basic+div";
            remove = "basic";
        }

        const buttonSets = this.props.buttonSets
            .filter((set) => set !== remove)
            .concat(keep);

        this.props.onChange({buttonSets});
    };

    // called when the correct answer changes
    handleTexInsert: (arg1: string) => void = (str) => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'insert' does not exist on type 'ReactInstance'.
        this.refs.expression.insert(str);
    };

    // called when the function variables change
    handleFunctions: (value: string) => void = (value) => {
        this.setState({functionsInternal: value});
        const newProps: Record<string, any> = {};
        newProps.functions = value.split(/[ ,]+/).filter(isTruthy);
        this.props.onChange(newProps);
    };

    // called when the visible labels change
    handleVisibleLabel: (visibleLabel: string) => void = (visibleLabel) => {
        this.props.onChange({visibleLabel});
    };

    // called when the aria label change
    handleAriaLabel: (ariaLabel: string) => void = (ariaLabel) => {
        this.props.onChange({ariaLabel});
    };

    changeSimplify(index: number, simplify: boolean) {
        const answerForm: AnswerForm = {
            ...this.props.answerForms[index],
            simplify,
        };

        this.updateAnswerForm(index, answerForm);
    }

    changeForm(index: number, form: boolean) {
        const answerForm: AnswerForm = {
            ...this.props.answerForms[index],
            form,
        };

        this.updateAnswerForm(index, answerForm);
    }

    changeConsidered(
        index: number,
        considered: (typeof PerseusExpressionAnswerFormConsidered)[number],
    ) {
        const answerForm: AnswerForm = {
            ...this.props.answerForms[index],
            considered,
        };

        this.updateAnswerForm(index, answerForm);
    }

    changeTimes(times: boolean) {
        this.props.onChange({times: times});
    }

    changeExpressionWidget: (
        index: number,
        props: React.ComponentProps<typeof Expression>,
    ) => void = (index, props) => {
        const answerForm: AnswerForm = {
            ...this.props.answerForms[index],
            value: (props as any).value,
        };
        this.updateAnswerForm(index, answerForm);
    };

    render(): React.ReactNode {
        const answerOptions: React.JSX.Element[] = this.props.answerForms.map(
            (ans: AnswerForm, index: number) => {
                const expressionProps: React.ComponentProps<typeof Expression> =
                    {
                        // note we're using
                        // *this.props*.{times,functions,buttonSets} since each
                        // answer area has the same settings for those
                        times: this.props.times,
                        functions: this.props.functions,
                        buttonSets: this.props.buttonSets,
                        buttonsVisible: "focused",
                        userInput: ans.value,
                        // @ts-expect-error: Type '(props: React.ComponentProps<typeof Expression>) => void' is not assignable to type 'ChangeHandler'. Types of parameters 'props' and 'arg1' are incompatible.
                        onChange: (
                            props: React.ComponentProps<typeof Expression>,
                        ) => this.changeExpressionWidget(index, props),
                        // @ts-expect-error: Type '(props: React.ComponentProps<typeof Expression>) => void' is not assignable to type 'ChangeHandler'. Types of parameters 'props' and 'arg1' are incompatible.
                        handleUserInput: (value: string) =>
                            this.changeExpressionWidget(index, {value} as any),
                        trackInteraction: () => {},
                        widgetId: this.props.widgetId + "-" + ans.key,
                        visibleLabel: this.props.visibleLabel,
                        ariaLabel: this.props.ariaLabel,
                    } as const;

                return (
                    <AnswerOption
                        key={ans.key}
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
            const checked = this.props.buttonSets.includes(name) || isBasic;
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
                checked={this.props.buttonSets.includes("basic+div")}
                onChange={this.handleToggleDiv}
            />,
        );

        return (
            <View>
                <HeadingSmall>Global Options</HeadingSmall>

                <div className={css(styles.paddedY)}>
                    <LabeledTextField
                        label={
                            <>
                                Visible label
                                <InfoTip>
                                    Optional visible text; strongly encouraged
                                    to help learners using dictation software,
                                    but can be omitted if the surrounding
                                    content provides enough context.
                                </InfoTip>
                            </>
                        }
                        value={this.props.visibleLabel || ""}
                        onChange={this.handleVisibleLabel}
                    />
                </div>

                <div className={css(styles.paddedY)}>
                    <LabeledTextField
                        label={
                            <>
                                Aria label
                                <InfoTip>
                                    Label text that&apos;s read by screen
                                    readers. Highly recommend adding a label
                                    here to ensure your exercise is accessible.
                                    For more information on writting accessible
                                    labels, please see{" "}
                                    <a
                                        href="https://www.w3.org/WAI/tips/designing/#ensure-that-form-elements-include-clearly-associated-labels"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        this article.
                                    </a>
                                </InfoTip>
                            </>
                        }
                        value={this.props.ariaLabel || ""}
                        onChange={this.handleAriaLabel}
                    />
                </div>

                <div className={css(styles.paddedY)}>
                    <LabeledTextField
                        label={
                            <>
                                Function variables
                                <InfoTip>
                                    Single-letter variables listed here will be
                                    interpreted as functions. This let us know
                                    that f(x) means &quot;f of x&quot; and not
                                    &quot;f times x&quot;.
                                </InfoTip>
                            </>
                        }
                        value={this.state.functionsInternal}
                        onChange={this.handleFunctions}
                    />
                </div>

                <div className={css(styles.paddedY)}>
                    <Checkbox
                        label={
                            <>
                                Use × instead of ⋅ for multiplication
                                <InfoTip>
                                    For pre-algebra problems this option
                                    displays multiplication as \times instead of
                                    \cdot in both the rendered output and the
                                    acceptable formats examples.
                                </InfoTip>
                            </>
                        }
                        checked={this.props.times}
                        onChange={(newCheckedState) => {
                            this.changeTimes(newCheckedState);
                        }}
                    />
                </div>

                <div className={css(styles.paddedY)}>
                    <HeadingXSmall>Button Sets</HeadingXSmall>
                    {buttonSetChoices}
                </div>

                <HeadingSmall>Answers</HeadingSmall>

                <Caption style={styles.answersSubtitle}>
                    student responses area matched against these from top to
                    bottom
                </Caption>

                <View style={{gap: spacing.xSmall_8}}>{answerOptions}</View>

                <Strut size={spacing.small_12} />
                <Button size="small" onClick={this.newAnswer}>
                    Add new answer
                </Button>
            </View>
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
    expressionProps: React.ComponentProps<typeof Expression>;

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
                    actionType="destructive"
                >
                    I&apos;m sure!
                </Button>
                <Strut size={spacing.small_12} />
                <Button
                    size="small"
                    onClick={this.handleCancelDelete}
                    kind="secondary"
                >
                    Cancel
                </Button>
            </>
        ) : (
            <Button
                size="small"
                onClick={this.handleDelete}
                actionType="destructive"
                kind="tertiary"
                style={styles.deleteButton}
            >
                Delete
            </Button>
        );

        return (
            <div className={css(styles.answerOption)}>
                <ButtonGroup
                    onChange={this.toggleConsidered}
                    allowEmpty={false}
                    value={this.props.considered}
                    selectedButtonStyle={
                        consideredButtonStyles[this.props.considered]
                    }
                    buttons={PerseusExpressionAnswerFormConsidered.map((c) => ({
                        value: c,
                        content: c,
                        title: `This answer will be considered ${c}`,
                    }))}
                />

                <Expression {...this.props.expressionProps} />

                <div className={css(styles.paddedY, styles.paddedX)}>
                    <Checkbox
                        label={
                            <>
                                Answer expression must have the same form.
                                <InfoTip>
                                    The student&apos;s answer must be in the
                                    same form. Commutativity and excess negative
                                    signs are ignored.
                                </InfoTip>
                            </>
                        }
                        checked={this.props.form}
                        onChange={this.props.onChangeForm}
                    />
                </div>

                <div className={css(styles.paddedY, styles.paddedX)}>
                    <Checkbox
                        label={
                            <>
                                Answer expression must be fully expanded and
                                simplified.
                                <InfoTip>
                                    The student&apos;s answer must be fully
                                    expanded and simplified. Answering this
                                    equation (x^2+2x+1) with this factored
                                    equation (x+1)^2 will render this response
                                    &quot;Your answer is not fully expanded and
                                    simplified.&quot;
                                </InfoTip>
                            </>
                        }
                        checked={this.props.simplify}
                        onChange={this.props.onChangeSimplify}
                    />
                </div>

                <div className={css(styles.buttonRow, styles.paddedY)}>
                    {removeButton}
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
    answersSubtitle: {fontStyle: "italic"},
    answerOption: {
        border: "1px solid #ddd",
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
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
    buttonRow: {
        display: "flex",
    },
    deleteButton: {
        paddingInline: sizing.size_160,
    },
});

const consideredButtonStyles: Record<
    (typeof PerseusExpressionAnswerFormConsidered)[number],
    CSSProperties
> = {
    wrong: styles.answerStatusWrong,
    correct: styles.answerStatusCorrect,
    ungraded: styles.answerStatusUngraded,
};
