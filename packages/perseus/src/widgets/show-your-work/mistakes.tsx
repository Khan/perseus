/* eslint-disable no-console */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {getDependencies} from "../../dependencies";

import {mathBlocksToKAS} from "./converters";
import {
    diagnoseMistake,
    printMistake,
    type Mistake,
    Operation,
} from "./diagnose-mistake";
import {KhanmigoIcon} from "./khanmigo-icon";
import {print} from "./printer";
import {showMeHow} from "./tutor";

import type {Step} from "./step";
import type {ShowYourWorkProblem} from "../../perseus-types";
import type {Expression} from "../expression";

type Props = {
    expressionRef: React.MutableRefObject<Expression | null>;
    prevStep: Step;
    currStep: Step;
    problem: ShowYourWorkProblem;
    onCheckStep: (tutor: boolean) => void;
};

const getParts = (message: string, operation: Operation): string[] => {
    switch (operation) {
        case Operation.Addition:
        case Operation.Subtraction:
            return message.split("<term>");
        case Operation.Multiplication:
        case Operation.Division:
            return message.split("<factor>");
    }
};

const Message = ({message, mistake}: {message: string; mistake: Mistake}) => {
    const operand = mathBlocksToKAS(mistake.operand);
    console.log("operand (MathBlocks) =", mistake.operand);
    console.log("operand (KAS) =", operand);
    const parts = getParts(message, mistake.operation);
    const {TeX} = getDependencies();

    const children: React.ReactNode[] = [parts[0]];
    for (let i = 1; i < parts.length; i++) {
        children.push(<TeX>{operand.tex()}</TeX>);
        children.push(parts[i]);
    }

    return (
        <View style={styles.message}>
            {React.createElement(LabelMedium, null, ...children)}
        </View>
    );
    // return React.createElement(View, {style: styles.message}, ...children);
};

export const Mistakes = ({
    prevStep,
    currStep,
    expressionRef,
    problem,
    onCheckStep,
}: Props) => {
    const mistakes = diagnoseMistake(prevStep, currStep);
    const [visibleCount, setVisibleCount] = React.useState(1);

    const handleShowMeHow = React.useCallback(() => {
        // TODO: figure out the real next step
        const nextStep = showMeHow(problem, prevStep.value);
        if (expressionRef.current) {
            expressionRef.current.setInputValue("", print(nextStep), () => {
                onCheckStep(true);
            });
        }
    }, [expressionRef, onCheckStep, prevStep.value, problem]);

    if (mistakes.length > 0) {
        // TODO: Handle multiple mistakes
        const mistake = mistakes[0];
        const messages = printMistake(mistake);
        const visibleMessages = messages.filter((_, i) => i < visibleCount);

        const button =
            visibleCount < messages.length ? (
                <Button
                    kind="secondary"
                    size="small"
                    onClick={() => setVisibleCount((count) => count + 1)}
                    style={{marginLeft: 8}}
                >
                    More
                </Button>
            ) : (
                <Button
                    kind="secondary"
                    size="small"
                    onClick={handleShowMeHow}
                    style={{marginLeft: 8}}
                >
                    Show me how
                </Button>
            );

        return (
            <View>
                <KhanmigoIcon size={32} style={{marginRight: 4}} />
                {visibleMessages.map((message, i) => (
                    <Message key={i} message={message} mistake={mistake} />
                ))}
                <View style={styles.buttonContainer}>{button}</View>
            </View>
        );
    }

    // TODO: fallback to LLM
    return (
        <View>
            <LabelMedium>
                Couldn't determine the mistake analytically.
            </LabelMedium>
            <LabelMedium>
                TODO: Ask an LLM for help analyzing this mistake.
            </LabelMedium>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "end",
    },
    message: {
        backgroundColor: "#F7F3FF",
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
});
