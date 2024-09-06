/* eslint-disable no-console */
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import React from "react";

import {reducer} from "./practice-reducer";
import {Step} from "./step";

type Props = {
    question: string;
};

export const ShowYourWork = (props: Props) => {
    const [steps, dispatch] = React.useReducer(reducer, [
        {value: props.question, status: "correct"},
        {value: props.question, status: "waiting"},
    ]);

    return (
        <View style={styles.contentWrapper}>
            {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                const disableCheck =
                    isLast &&
                    (steps[steps.length - 2].value ===
                        steps[steps.length - 1].value ||
                        steps[steps.length - 1].status === "incorrect");

                return (
                    <Step
                        key={i}
                        step={step}
                        onChange={(step) => {
                            if (isLast) {
                                dispatch({kind: "Update", value: step.value});
                            }
                        }}
                        disableCheck={disableCheck}
                        onCheckStep={() => {
                            if (isLast) {
                                dispatch({kind: "Check"});
                            }
                        }}
                        onDeleteStep={() => {
                            dispatch({kind: "Delete"});
                        }}
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
