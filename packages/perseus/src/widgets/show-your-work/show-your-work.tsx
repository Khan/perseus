/* eslint-disable no-console */
import {View} from "@khanacademy/wonder-blocks-core";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {StyleSheet} from "aphrodite";
import React from "react";

import {combinedReducer} from "./reducer";
import {Step} from "./step";

import type {Mode, State, Action} from "./reducer";

type Props = {
    question: string;
};

type RefType = [State, React.Dispatch<Action>];

export const ShowYourWork = React.forwardRef<RefType, Props>((props, ref) => {
    const [state, dispatch] = React.useReducer(combinedReducer, {
        mode: "Practice",
        steps: [
            {value: props.question, status: "ungraded", tutor: false},
            {value: props.question, status: "ungraded", tutor: false},
        ],
    });

    const {mode, steps} = state;

    if (typeof ref === "function") {
        ref([state, dispatch]);
    } else if (ref != null) {
        ref.current = [state, dispatch];
    }

    return (
        <View style={styles.contentWrapper}>
            <SingleSelect
                style={styles.modeSelect}
                placeholder="mode"
                selectedValue={state.mode}
                onChange={(selected) => {
                    dispatch({kind: "SwitchMode", mode: selected as Mode});
                }}
            >
                <OptionItem label="Practice" value="Practice" />
                <OptionItem label="Assessment" value="Assessment" />
            </SingleSelect>
            {steps.map((step, i) => {
                const prevStep = steps[Math.max(0, i)];
                const isLast = i === steps.length - 1;
                const disableCheck =
                    isLast &&
                    (steps[steps.length - 2].value ===
                        steps[steps.length - 1].value ||
                        steps[steps.length - 1].status === "wrong");

                return (
                    <Step
                        key={`${mode}-${i}}`}
                        mode={mode}
                        prevStep={prevStep}
                        step={step}
                        onChange={(step) => {
                            if (isLast) {
                                dispatch({kind: "Update", value: step.value});
                            }
                        }}
                        disableCheck={disableCheck}
                        onCheckStep={(tutor) => {
                            if (isLast) {
                                dispatch({kind: "Check", tutor});
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
});

const styles = StyleSheet.create({
    contentWrapper: {},
    modeSelect: {paddingBottom: 16},
});
