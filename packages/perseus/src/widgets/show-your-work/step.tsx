/* eslint-disable no-console */
import {KeypadType} from "@khanacademy/math-input";
import Button from "@khanacademy/wonder-blocks-button";
import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import {color} from "@khanacademy/wonder-blocks-tokens";
import correctIcon from "@phosphor-icons/core/regular/check-circle.svg";
import wrongIcon from "@phosphor-icons/core/regular/x-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import expression from "../expression";

import {HelpPopover} from "./help-popover";
import {KhanmigoIcon} from "./khanmigo-icon";

import type {Mode} from "./reducer";
import type {
    PerseusExpressionWidgetOptions,
    ShowYourWorkProblem,
} from "../../perseus-types";
import type {FilterCriterion} from "../../types";
import type {Expression} from "../expression";
import {diffEquations} from "./highlight-diff";

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
    currStep: Step;
    isLast: boolean;
    disableCheck: boolean;
    onChange: (step: Step) => void;
    onCheckStep: (tutor: boolean) => void;
    onDeleteStep: () => void;
    registerMathInput: (mi: HTMLSpanElement) => void;
    prevSpan: HTMLSpanElement | null;
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
    const {prevStep, currStep, problem, onCheckStep} = props;

    const expressionRef = React.useRef<Expression | null>(null);
    const [opened, setOpened] = React.useState(false);

    const handleHint = React.useCallback(() => {
        setOpened((opened) => !opened);
    }, []);

    React.useEffect(() => {
        const myWrapper =
            expressionRef.current?._mathInput.current?.inputRef.current
                ?.__mathFieldWrapperRef;
        const mySpan = myWrapper?.querySelector(".mq-root-block");
        const prevSpan = props.prevSpan?.querySelector(".mq-root-block");
        if (!mySpan || !prevSpan) {
            return;
        }
        mySpan.childNodes.forEach((node) => {
            const n = node as HTMLElement;
            n.classList.remove("perseus-diff-added");
        });
        diffEquations(
            [...prevSpan.childNodes] as HTMLElement[],
            [...mySpan.childNodes] as HTMLElement[],
        );
    }, [prevStep, currStep]);

    // TODO: memoize the callbacks
    const expression = (
        <View style={currStep.tutor && styles.tutorStep}>
            <ExpressionWidget
                ref={(exr) => {
                    if (exr) {
                        expressionRef.current = exr;
                        const span =
                            exr._mathInput.current?.inputRef.current
                                ?.__mathFieldWrapperRef;
                        if (span) {
                            props.registerMathInput(span);
                        }
                    }
                }}
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
                    props.onChange({...currStep, value: data.value});
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
                value={currStep.value}
                // extension
                noWrapper={true}
                dontSimplifyFractions={true}
            />
        </View>
    );

    let icon: React.ReactNode = null;
    if (currStep.status === "correct") {
        icon = (
            <PhosphorIcon
                icon={correctIcon}
                style={styles.statusIcon}
                color={color.green}
            />
        );
    } else if (currStep.status === "wrong") {
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

    if (props.isLast) {
        stepAndStatus = (
            <HelpPopover
                expressionRef={expressionRef}
                opened={opened}
                onClose={() => setOpened(false)}
                onCheckStep={onCheckStep}
                problem={problem}
                prevStep={prevStep}
                currStep={currStep}
            >
                {stepAndStatus}
            </HelpPopover>
        );
    }

    return (
        <View style={styles.stepContainer}>
            <style>
                {`.perseus-diff-added {
                    color: magenta;
                }`}
            </style>
            <View style={{flexDirection: "row"}}>
                {stepAndStatus}
                <Spring />
            </View>
            {props.isLast && currStep.status !== "correct" && (
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
                        <KhanmigoIcon size={24} style={styles.khanmigoIcon} />
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
        top: 6,
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
