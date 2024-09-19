/* eslint-disable no-console */
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
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
    onShowMeHow: () => void;
    problem: ShowYourWorkProblem;
    prevStep: Step;
    currStep: Step;
};

// NOTE(kevinb): We need to use React.forwardRef() here because `Popover`
// tries to set a `ref` on the element passed to its `content` prop.
export const HintPopoverContent = React.forwardRef<PopoverContentCore, Props>(
    ({onShowMeHow, problem, prevStep, currStep}, ref) => {
        // TODO(kevinb): Split this component into multiple components
        const hint = React.useMemo(() => {
            return getHint(problem, prevStep.value);
        }, [problem, prevStep.value]);

        if (currStep.status === "wrong") {
            const mistakes = diagnoseMistake(prevStep, currStep);

            if (mistakes.length > 0) {
                // TODO: Handle multiple mistakes
                const messages = printMistake(mistakes[0]);
                return (
                    <PopoverContentCore
                        ref={ref}
                        closeButtonVisible={true}
                        style={styles.popupContent}
                    >
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
                    </PopoverContentCore>
                );
            }

            console.log("mistakes =", mistakes);
        }

        return (
            <PopoverContentCore
                ref={ref}
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
                        onClick={onShowMeHow}
                        style={{marginLeft: 8}}
                    >
                        Show me how
                    </Button>
                </View>
            </PopoverContentCore>
        );
    },
);

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
