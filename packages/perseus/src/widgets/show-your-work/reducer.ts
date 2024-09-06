/* eslint-disable no-console */
import {checkStep} from "@math-blocks/tutor";

import {assertUnreachable} from "./assert-unreachable";
import {parse} from "./parser";

import type {Step} from "./step";

export type Mode = "Practice" | "Assessment";

export type State = {
    mode: Mode;
    steps: Array<Step>;
};

export type Action =
    | {
          kind: "Reset";
      }
    | {
          // TODO: Rename this since this reducer defers checking of
          // all steps.
          kind: "Check";
      }
    | {
          kind: "Update";
          value: string;
      }
    | {
          kind: "Delete";
      };

const practiceReducer = (state: State, action: Action): State => {
    switch (action.kind) {
        case "Reset": {
            const initialStep = state.steps[0];
            return {
                ...state,
                steps: [initialStep, {...initialStep, status: "ungraded"}],
            };
        }
        case "Check": {
            // Replace the current step
            const newSteps = [...state.steps];
            newSteps[newSteps.length - 1].status = "ungraded";

            const prev = parse(newSteps[newSteps.length - 2].value);
            const next = parse(newSteps[newSteps.length - 1].value);

            const {result, mistakes: _} = checkStep(prev, next);

            if (result) {
                newSteps[newSteps.length - 1].status = "correct";
                newSteps.push({
                    value: newSteps[newSteps.length - 1].value,
                    status: "ungraded",
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
                newSteps[newSteps.length - 1].status = "wrong";
            }

            return {...state, steps: newSteps};
        }
        case "Update": {
            const newSteps = [...state.steps];
            newSteps[newSteps.length - 1] = {
                value: action.value,
                status: "ungraded",
            };
            return {...state, steps: newSteps};
        }
        case "Delete": {
            // TODO: implement "Delete"
            return state;
        }
        default: {
            assertUnreachable(action);
        }
    }
};

const assessmentReducer = (state: State, action: Action): State => {
    switch (action.kind) {
        case "Reset": {
            const initialStep = state.steps[0];
            return {
                ...state,
                steps: [initialStep, {...initialStep, status: "ungraded"}],
            };
        }
        case "Check": {
            const newSteps = [...state.steps];
            newSteps.push({
                value: newSteps[newSteps.length - 1].value,
                status: "ungraded",
            });
            return {...state, steps: newSteps};
        }
        case "Update": {
            const newSteps = [...state.steps];
            newSteps[newSteps.length - 1] = {
                value: action.value,
                status: "ungraded",
            };
            return {...state, steps: newSteps};
        }
        case "Delete": {
            // TODO: implement "Delete"
            return state;
        }
        default: {
            assertUnreachable(action);
        }
    }
};

type CombinedAction = Action | {kind: "SwitchMode"; mode: Mode};

export const combinedReducer = (
    state: State,
    action: CombinedAction,
): State => {
    switch (action.kind) {
        case "SwitchMode": {
            switch (action.mode) {
                case "Practice": {
                    const newState = practiceReducer(state, {kind: "Reset"});
                    return {...newState, mode: action.mode};
                }
                case "Assessment": {
                    const newState = assessmentReducer(state, {kind: "Reset"});
                    return {...newState, mode: action.mode};
                }
                default: {
                    // @ts-expect-error: I'm not sure why TS is complaining about
                    // this since we handled all of the possible modes.
                    return assertUnreachable(state);
                }
            }
        }
        default: {
            switch (state.mode) {
                case "Practice": {
                    return practiceReducer(state, action);
                }
                case "Assessment": {
                    return assessmentReducer(state, action);
                }
                default: {
                    // @ts-expect-error: I'm not sure why TS is complaining about
                    // this since we handled all of the possible modes.
                    return assertUnreachable(state);
                }
            }
        }
    }
};
