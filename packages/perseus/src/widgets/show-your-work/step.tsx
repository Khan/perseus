/* eslint-disable no-console */
import {KeypadType} from "@khanacademy/math-input";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {getId} from "@math-blocks/core";
import {NodeType} from "@math-blocks/semantic";
import {getHint, showMeHow} from "@math-blocks/tutor";
import correctIcon from "@phosphor-icons/core/regular/check-circle.svg";
import wrongIcon from "@phosphor-icons/core/regular/x-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import expression from "../expression";

import {Hint} from "./hint";
import {KhanmigoIcon} from "./khanmigo-icon";
import {parse} from "./parser";
import {print} from "./printer";

import type {Mode} from "./reducer";
import type {PerseusExpressionWidgetOptions} from "../../perseus-types";
import type {FilterCriterion} from "../../types";
import type {Expression} from "../expression";
import type {Step as SolverStep, Problem} from "@math-blocks/solver";

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
    const {prevStep, onCheckStep, step} = props;

    const expressionRef = React.useRef<Expression | null>(null);
    const [opened, setOpened] = React.useState(false);
    const [hint, setHint] = React.useState<SolverStep | null>(null);

    const handleHint = React.useCallback(() => {
        const equation = parse(prevStep.value);
        if (equation.type !== NodeType.Equals) {
            throw new Error(`Can't handle non-equation problems yet`);
        }

        const problem: Problem = {
            type: "SolveEquation",
            equation: equation,
            variable: {
                type: NodeType.Identifier,
                id: getId(),
                name: "x", // TODO
                // TODO: Update deepEquals to treat missing fields the same as undefined
                subscript: undefined,
            },
        };

        const hint = getHint(problem);
        console.log("hint =", hint);
        setHint(hint);
        setOpened((opened) => !opened);
    }, [prevStep.value]);

    const handleShowMeHow = React.useCallback(() => {
        console.log("prevStep.value =", prevStep.value);
        const equation = parse(prevStep.value);
        if (equation.type !== NodeType.Equals) {
            throw new Error(`Can't handle non-equation problems yet`);
        }

        const problem: Problem = {
            type: "SolveEquation",
            equation: equation,
            variable: {
                type: NodeType.Identifier,
                id: getId(),
                name: "x", // TODO
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
    }, [prevStep.value, onCheckStep]);

    // TODO: memoize the callbacks
    let expression = (
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

    if (props.isLast) {
        expression = (
            <Popover
                opened={opened}
                placement="left"
                onClose={() => {
                    setOpened(false);
                }}
                content={
                    <PopoverContentCore
                        closeButtonVisible={true}
                        style={styles.popupContent}
                    >
                        <View style={{flexDirection: "row"}}>
                            <KhanmigoIcon style={{marginRight: 4}} />
                            <LabelMedium>See if these hints help.</LabelMedium>
                        </View>
                        <View style={styles.hintContainer}>
                            {hint && <Hint hint={hint} level={0} />}
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "end",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    position: "relative",
                                    top: 4,
                                }}
                            >
                                <KhanmigoIcon style={{marginRight: 4}} />
                                <LabelMedium>If not</LabelMedium>
                            </View>
                            <Button
                                kind="secondary"
                                size="small"
                                onClick={handleShowMeHow}
                                style={{marginLeft: 8}}
                            >
                                Show me how
                            </Button>
                        </View>
                    </PopoverContentCore>
                }
            >
                {expression}
            </Popover>
        );
    }

    return (
        <View style={styles.stepContainer}>
            <View style={styles.stepAndStatus}>
                {expression}
                {icon}
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
    popupContent: {
        width: 320,
        maxWidth: 320,
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
    hintContainer: {
        marginBottom: 24,
        // maxHeight: 400,
        // overflowY: "scroll",
    },
    tutorStep: {
        backgroundColor: "#DEAE9333",
        borderRadius: 4,
    },
});
