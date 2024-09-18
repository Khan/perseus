/* eslint-disable no-console */
import {KeypadType} from "@khanacademy/math-input";
import Button from "@khanacademy/wonder-blocks-button";
import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import {Popover} from "@khanacademy/wonder-blocks-popover";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {getId} from "@math-blocks/core";
import {NodeType} from "@math-blocks/semantic";
import correctIcon from "@phosphor-icons/core/regular/check-circle.svg";
import wrongIcon from "@phosphor-icons/core/regular/x-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import expression from "../expression";

import {HintPopover} from "./hint-popover";
import {KhanmigoIcon} from "./khanmigo-icon";
import {parse} from "./parser";
import {print} from "./printer";
import {getHint, showMeHow} from "./tutor";

import type {Mode} from "./reducer";
import type {
    PerseusExpressionWidgetOptions,
    ShowYourWorkProblem,
} from "../../perseus-types";
import type {FilterCriterion} from "../../types";
import type {Expression} from "../expression";
import type {Step as SolverStep, Problem} from "@math-blocks/solver";

const Span = addStyle("span");

type StepStatus = "correct" | "wrong" | "ungraded";

export type Step = {
    value: string;
    status: StepStatus;
    tutor: boolean;
};

const primaryButtonStrings: Record<Mode, string> = {
    Practice: "Check step",
    Assessment: "Add step",
};

type Props = {
    mode: Mode;
    problem: ShowYourWorkProblem;
    prevStep: Step;
    step: Step;
    isLast: boolean;
    disableCheck: boolean;
    onChange: (step: Step) => void;
    onCheckStep: (tutor: boolean) => void;
    onDeleteStep: () => void;
};

const ExpressionWidget = expression.widget;

const widgetOptions: PerseusExpressionWidgetOptions = {
    answerForms: [],
    times: false,
    buttonSets: ["basic"],
    functions: [],
    buttonsVisible: "always",
};

export const Step = (props: Props) => {
    const {prevStep, onCheckStep, step, problem: originalProblem} = props;

    const expressionRef = React.useRef<Expression | null>(null);
    const [opened, setOpened] = React.useState(false);
    const [hint, setHint] = React.useState<SolverStep | null>(null);

    const handleHint = React.useCallback(() => {
        const equation = parse(prevStep.value);
        if (equation.type !== NodeType.Equals) {
            throw new Error(`Can't handle non-equation problems yet`);
        }

        const problem: Problem = {
            type: originalProblem.problemType,
            equation: equation,
            variable: {
                type: NodeType.Identifier,
                id: getId(),
                name: originalProblem.variable,
                // TODO: Update deepEquals to treat missing fields the same as undefined
                subscript: undefined,
            },
        };

        const hint = getHint(problem);
        console.log("hint =", hint);
        setHint(hint);
        setOpened((opened) => !opened);
    }, [prevStep.value, originalProblem]);

    const handleShowMeHow = React.useCallback(() => {
        console.log("prevStep.value =", prevStep.value);
        const equation = parse(prevStep.value);
        if (equation.type !== NodeType.Equals) {
            throw new Error(`Can't handle non-equation problems yet`);
        }

        const problem: Problem = {
            type: originalProblem.problemType,
            equation: equation,
            variable: {
                type: NodeType.Identifier,
                id: getId(),
                name: originalProblem.variable,
                // TODO: Update deepEquals to treat missing fields the same as undefined
                subscript: undefined,
            },
        };

        const nextStep = showMeHow(problem);

        if (expressionRef.current) {
            expressionRef.current.setInputValue("", print(nextStep), () => {
                onCheckStep(true);
            });
        }
    }, [prevStep.value, onCheckStep, originalProblem]);

    // TODO: memoize the callbacks
    const expression = (
        <View style={step.tutor && styles.tutorStep}>
            <ExpressionWidget
                ref={expressionRef}
                // common widget props
                widgetId="expression 1"
                alignment={undefined}
                static={true}
                apiOptions={undefined}
                onFocus={() => {}}
                onBlur={() => {}}
                findWidgets={(arg1: FilterCriterion) => []}
                reviewModeRubric={widgetOptions}
                onChange={(data, cb, arg3) => {
                    props.onChange({...step, value: data.value});
                    if (cb) {
                        cb();
                    }
                }}
                trackInteraction={(extraData) => {}}
                linterContext={undefined} // TODO
                containerSizeClass="large"
                isLastUsedWidget={false}
                problemNum={1}
                // render props
                times={false}
                buttonSets={["basic"]}
                functions={[]}
                disabled={!props.isLast}
                visibleLabel=""
                ariaLabel=""
                keypadConfiguration={{keypadType: KeypadType.EXPRESSION}}
                value={step.value}
                // extension
                noWrapper={true}
                dontSimplifyFractions={true}
            />
        </View>
    );

    let icon: React.ReactNode = null;
    if (step.status === "correct") {
        icon = (
            <PhosphorIcon
                icon={correctIcon}
                style={styles.statusIcon}
                color={color.green}
            />
        );
    } else if (step.status === "wrong") {
        icon = (
            <PhosphorIcon
                icon={wrongIcon}
                style={styles.statusIcon}
                color={color.red}
            />
        );
    }

    let stepAndStatus = (
        <Span style={styles.stepAndStatus}>
            {expression}
            {icon}
        </Span>
    );

    if (props.isLast && hint) {
        stepAndStatus = (
            <Popover
                opened={opened}
                placement="left"
                onClose={() => {
                    setOpened(false);
                }}
                content={
                    <HintPopover hint={hint} onShowMeHow={handleShowMeHow} />
                }
            >
                {stepAndStatus}
            </Popover>
        );
    }

    return (
        <View style={styles.stepContainer}>
            <View style={{flexDirection: "row"}}>
                {stepAndStatus}
                <Spring />
            </View>
            {props.isLast && step.status !== "correct" && (
                <View style={styles.buttonContainer}>
                    <Button
                        size="small"
                        onClick={() => onCheckStep(false)}
                        disabled={props.disableCheck}
                    >
                        {primaryButtonStrings[props.mode]}
                    </Button>
                    <Strut size={8} />
                    <View style={styles.hintButtonContainer}>
                        <Button
                            size="small"
                            kind="secondary"
                            onClick={handleHint}
                            style={styles.helpButton}
                        >
                            Help
                        </Button>
                        <KhanmigoIcon style={styles.khanmigoIcon} />
                    </View>
                    <Strut size={16} />
                    <Button
                        size="small"
                        kind="secondary"
                        color="destructive"
                        onClick={props.onDeleteStep}
                    >
                        Delete
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    stepContainer: {
        flexDirection: "column",
        paddingTop: 4,
        paddingBottom: 4,
    },
    stepAndStatus: {
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 8,
    },
    statusIcon: {
        marginLeft: 8,
        padding: 4,
    },
    hintButtonContainer: {
        position: "relative",
    },
    khanmigoIcon: {
        position: "absolute",
        left: 8,
        top: 4,
        pointerEvents: "none",
    },
    helpButton: {
        paddingLeft: 40,
    },
    tutorStep: {
        backgroundColor: "#DEAE9333",
        borderRadius: 4,
    },
});
