/* eslint-disable no-console */
import {KeypadType} from "@khanacademy/math-input";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color} from "@khanacademy/wonder-blocks-tokens";
import correctIcon from "@phosphor-icons/core/regular/check-circle.svg";
import incorrectIcon from "@phosphor-icons/core/regular/x-circle.svg";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import expression from "../expression";

import type {PerseusExpressionWidgetOptions} from "../../perseus-types";
import type {FilterCriterion} from "../../types";

type StepStatus = "correct" | "incorrect" | "waiting";

export type Step = {
    value: string;
    status: StepStatus;
};

type StepProps = {
    step: Step;
    isLast: boolean;
    disableCheck: boolean;
    onChange: (step: Step) => void;
    onCheckStep: () => void;
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

export const Step = (props: StepProps) => {
    const {step} = props;

    // TODO: memoize the callbacks
    const expression = (
        <ExpressionWidget
            // common widget props
            widgetId="expression 1"
            alignment={undefined}
            static={true}
            apiOptions={undefined}
            onFocus={() => {}}
            onBlur={() => {}}
            findWidgets={(arg1: FilterCriterion) => []}
            reviewModeRubric={widgetOptions}
            onChange={(arg1, arg2, arg3) =>
                props.onChange({...step, value: arg1.value})
            }
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
    );

    let icon: React.ReactNode = null;
    if (step.status === "correct") {
        icon = (
            <PhosphorIcon
                icon={correctIcon}
                style={styles.icon}
                color={color.green}
            />
        );
    } else if (step.status === "incorrect") {
        icon = (
            <PhosphorIcon
                icon={incorrectIcon}
                style={styles.icon}
                color={color.red}
            />
        );
    }

    return (
        <View style={styles.stepContainer}>
            {expression}
            {icon}
            {props.isLast && (
                <>
                    <Strut size={16} />
                    <Button
                        size="small"
                        onClick={props.onCheckStep}
                        disabled={props.disableCheck}
                    >
                        Check Step
                    </Button>
                    <Strut size={8} />
                    <Button
                        size="small"
                        kind="secondary"
                        onClick={props.onDeleteStep}
                    >
                        Delete
                    </Button>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
    },
    icon: {
        marginLeft: 8,
        padding: 4,
    },
});
