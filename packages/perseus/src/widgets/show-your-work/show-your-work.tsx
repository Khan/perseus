/* eslint-disable no-console */
import {View} from "@khanacademy/wonder-blocks-core";
import {checkStep} from "@math-blocks/tutor";
import {StyleSheet} from "aphrodite";
import React from "react";

import {parse} from "./parser";
import {Step} from "./step";

type Props = {
    question: string;
};

export const ShowYourWork = (props: Props) => {
    const [steps, setSteps] = React.useState<Array<Step>>(() => {
        return [
            {value: props.question, status: "correct"},
            {value: props.question, status: "waiting"},
        ];
    });

    return (
        <View style={styles.contentWrapper}>
            {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                const disableCheck =
                    isLast &&
                    (steps[steps.length - 2].value ===
                        steps[steps.length - 1].value ||
                        steps[steps.length - 1].status === "incorrect");

                // TODO: if the current step is exactly the same as the previous step
                // we need to disable the "Check" button
                return (
                    <Step
                        key={i}
                        step={step}
                        onChange={(step) => {
                            if (isLast) {
                                const newSteps = [...steps];
                                newSteps[newSteps.length - 1] = {
                                    value: step.value,
                                    status: "waiting",
                                };
                                setSteps(newSteps);
                            }
                        }}
                        disableCheck={disableCheck}
                        onCheckStep={() => {
                            if (isLast) {
                                // Replace the current step
                                const newSteps = [...steps];
                                newSteps[newSteps.length - 1].status =
                                    "waiting";

                                const prev = parse(
                                    newSteps[newSteps.length - 2].value,
                                );
                                const next = parse(
                                    newSteps[newSteps.length - 1].value,
                                );

                                const {result, mistakes: _} = checkStep(
                                    prev,
                                    next,
                                );

                                if (result) {
                                    newSteps[newSteps.length - 1].status =
                                        "correct";
                                    newSteps.push({
                                        value: newSteps[newSteps.length - 1]
                                            .value,
                                        status: "waiting",
                                    });
                                } else {
                                    // It's possible for a student to make a correct step
                                    // where we aren't able to find to from their previous
                                    // step.
                                    //
                                    // In that case, we need to ask the solver for help to
                                    // see if solving their next step results in the same
                                    // solution as solving their previous step.
                                    //
                                    // If those results don't match, then the student has
                                    // made a mistake.
                                    //
                                    // For now we're going to assume that this case is
                                    // incorrect even though we need to do some more work
                                    // verify that that is indeed the case.
                                    newSteps[newSteps.length - 1].status =
                                        "incorrect";
                                }

                                setSteps(newSteps);
                            }
                        }}
                        onDeleteStep={() => console.log(`onDeleteStep`)}
                        isLast={isLast}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    contentWrapper: {},
});
