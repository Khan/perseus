/* eslint-disable no-console */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Popover, PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import _ from "underscore";

import {diagnoseMistake, printMistake} from "./diagnose-mistake";
import {Hint} from "./hint";
import {KhanmigoIcon} from "./khanmigo-icon";
import {getHint} from "./tutor";

import type {Step} from "./step";
import type {ShowYourWorkProblem} from "../../perseus-types";

type Props = {
    children: React.ReactElement<any>;
    opened: boolean;
    onClose: () => void;
    onShowMeHow: () => void;
    problem: ShowYourWorkProblem;
    prevStep: Step;
    currStep: Step;
};

const HintWrapper = ({
    problem,
    prevStep,
}: {
    problem: ShowYourWorkProblem;
    prevStep: Step;
}) => {
    const hint = React.useMemo(() => {
        return getHint(problem, prevStep.value);
    }, [problem, prevStep.value]);

    return <Hint hint={hint} level={0} />;
};

export const HelpPopover = ({
    children,
    opened,
    onClose,
    onShowMeHow,
    problem,
    prevStep,
    currStep,
}: Props) => {
    let content: React.ReactNode = null;

    if (currStep.status === "wrong") {
        const mistakes = diagnoseMistake(prevStep, currStep);

        if (mistakes.length > 0) {
            // TODO: Handle multiple mistakes
            const messages = printMistake(mistakes[0]);
            content = (
                <>
                    <KhanmigoIcon style={{marginRight: 4}} />
                    {messages.map((message, i) => (
                        <View key={i} style={{flexDirection: "row"}}>
                            <LabelMedium>{message}</LabelMedium>
                        </View>
                    ))}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "end",
                        }}
                    >
                        <Button
                            kind="secondary"
                            size="small"
                            onClick={onShowMeHow}
                            style={{marginLeft: 8}}
                        >
                            Show me how
                        </Button>
                    </View>
                </>
            );
        }

        content = (
            <View>
                <LabelMedium>
                    Couldn't determine the mistake analytically.
                </LabelMedium>
                <LabelMedium>
                    TODO: Ask an LLM for help analyzing this mistake.
                </LabelMedium>
            </View>
        );

        console.log("mistakes =", mistakes);
    } else {
        content = (
            <>
                <View style={{flexDirection: "row"}}>
                    <KhanmigoIcon style={{marginRight: 4}} />
                    <LabelMedium>See if these hints help.</LabelMedium>
                </View>
                <View style={styles.hintContainer}>
                    <HintWrapper prevStep={prevStep} problem={problem} />
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
                        onClick={onShowMeHow}
                        style={{marginLeft: 8}}
                    >
                        Show me how
                    </Button>
                </View>
            </>
        );
    }

    return (
        <Popover
            opened={opened}
            placement="right"
            onClose={onClose}
            content={
                <PopoverContentCore
                    closeButtonVisible={true}
                    style={styles.popupContent}
                >
                    {content}
                </PopoverContentCore>
            }
        >
            {children}
        </Popover>
    );
};

const styles = StyleSheet.create({
    popupContent: {
        width: 320,
        maxWidth: 320,
    },
    hintContainer: {
        marginBottom: 24,
        // maxHeight: 400,
        // overflowY: "scroll",
    },
});
