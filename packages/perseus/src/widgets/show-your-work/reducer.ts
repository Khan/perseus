/* eslint-disable no-console */
import {getId} from "@math-blocks/core";
import {NodeType, util} from "@math-blocks/semantic";
import {solveProblem} from "@math-blocks/solver";
import {checkStep} from "@math-blocks/tutor";

import {assertUnreachable} from "./assert-unreachable";
import {parse} from "./parser";

import type {Step} from "./step";
import type {Problem} from "@math-blocks/solver";

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
          kind: "Checkall";
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
            const equation = parse(state.steps[0].value);
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

            const newSteps = [...state.steps];
            newSteps[newSteps.length - 1].status = "ungraded";

            const prevStep = parse(newSteps[newSteps.length - 2].value);
            const currStep = parse(newSteps[newSteps.length - 1].value);

            let isCorrect = false;
            let needsMoreWork = false;

            const output = checkStep(prevStep, currStep);
            const {result} = output;

            // We were able to find a path from prevStep to currStep
            // so we mark the step as correct.
            if (result) {
                isCorrect = true;
            }

            const solverResult = solveProblem(problem);

            if (!solverResult) {
                throw new Error(
                    `Solver couldn't solve ${state.steps[0].value}`,
                );
            }

            // It's possible that the student has provided as step
            // that is valid, but skips ahead too far so we aren't
            // able to detect that it's a valid step using the normal
            // methods.
            //
            // If the current step is an equation (which it should be),
            // we use the solver to determine its solution and compare
            // it against the solution of the original equation.  If
            // they match, then it's valid step, but the student should
            // probably be showing more work in this situation.
            if (!isCorrect && currStep.type === NodeType.Equals) {
                const currProblem = {
                    ...problem,
                    equation: currStep,
                };

                const currSolverResult = solveProblem(currProblem);

                if (currSolverResult) {
                    if (
                        util.deepEquals(
                            solverResult.answer,
                            currSolverResult.answer,
                        )
                    ) {
                        isCorrect = true;
                        needsMoreWork = true;
                    }
                }
            }

            if (isCorrect) {
                if (needsMoreWork) {
                    console.log("needs more work");
                }

                // Check if this is the final step.
                // TODO: Allow different versions of the answer, e.g.
                // 2x + 5 = 10, could be solved as x = 5/2, x = 2.5, etc.
                const final = checkStep(currStep, solverResult.answer);
                if (
                    final.mistakes.length === 0 &&
                    final.result?.steps.length === 0
                ) {
                    // Mark the current step as "correct" without adding
                    // a new step.
                    newSteps[newSteps.length - 1].status = "correct";
                    return {...state, steps: newSteps};
                }

                // Mark the current step as "correct" and add a new step.
                newSteps[newSteps.length - 1].status = "correct";
                newSteps.push({
                    value: newSteps[newSteps.length - 1].value,
                    status: "ungraded",
                });

                return {...state, steps: newSteps};
            }

            // If all of the other checks fail, then the current
            // step is incorrect.
            newSteps[newSteps.length - 1].status = "wrong";
            return {...state, steps: newSteps};
        }
        case "Checkall": {
            return state; // no-op
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
        case "Checkall": {
            const {steps} = state;
            const newSteps = [steps[0]];

            for (let i = 0; i < steps.length - 1; i++) {
                const prev = parse(steps[i].value);
                const next = parse(steps[i + 1].value);
                const {result, mistakes: _} = checkStep(prev, next);
                if (result) {
                    newSteps.push({
                        ...steps[i + 1],
                        status: "correct",
                    });
                } else {
                    // TODO: perform fallback check to handle cases where
                    // the user submitted a correct step that we just aren't
                    // able to recognize yet.
                    newSteps.push({
                        ...steps[i + 1],
                        status: "wrong",
                    });
                }
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
                    return assertUnreachable(action.mode);
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
                    return assertUnreachable(state.mode);
                }
            }
        }
    }
};
