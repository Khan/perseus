/* eslint-disable no-console */
import {getId} from "@math-blocks/core";
import {NodeType, util} from "@math-blocks/semantic";
import {solveProblem} from "@math-blocks/solver";
import {checkStep} from "@math-blocks/tutor";

import {assertUnreachable} from "./assert-unreachable";
import {parse} from "./parser";

import type {Step} from "./step";
import type {ShowYourWorkProblem} from "../../perseus-types";
import type {Problem} from "@math-blocks/solver";

export type Mode = "Practice" | "Assessment";

export type State = {
    mode: Mode;
    problem: ShowYourWorkProblem;
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
          tutor: boolean;
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

type CheckResult =
    | {
          status: "correct";
          needsMoreWork: boolean;
          lastStep: boolean;
      }
    | {
          status: "wrong";
      };

// TODO(kevinb): Merge this into `checkStep` from @math-blocks/solver.
const simpleCheckStep = (
    originalProblem: ShowYourWorkProblem,
    prevStepValue: string,
    currStepValue: string,
): CheckResult => {
    console.log(`simpleCheckStep: ${prevStepValue} -> ${currStepValue}`);

    const equation = parse(originalProblem.equation);
    if (equation.type !== NodeType.Equals) {
        throw new Error(`Can't handle non-equation problems yet`);
    }

    const problem: Problem = {
        type: originalProblem.problemType,
        equation: equation,
        variable: {
            type: NodeType.Identifier,
            id: getId(),
            name: originalProblem.variable,
            // TODO: Update deepEquals to treat missing fields the same as undefined
            subscript: undefined,
        },
    };

    const prevStep = parse(prevStepValue);
    const currStep = parse(currStepValue);

    let isCorrect = false;
    let needsMoreWork = false;

    // NOTE(kevinb): `checkStep` can take too long to run in certain
    // situations.  We try to apply all checks in both a forward and
    // backward direction.  This can result in very long searches.
    // Really, we can be a bit more judicial in which checks we run
    // backwards and even restricting which checks we run when there's
    // multiple sub-steps vs. a single sub-step.

    // const output = checkStep(prevStep, currStep);
    // const {result} = output;
    // // We were able to find a path from prevStep to currStep
    // // so we mark the step as correct.
    // if (result) {
    //     isCorrect = true;
    // }

    const solverResult = solveProblem(problem);

    if (!solverResult) {
        throw new Error(`Solver couldn't solve ${originalProblem.equation}`);
    }

    // It's possible that the student has provided as step
    // that is valid, but skips ahead too far so we aren't
    // able to detect that it's a valid step using the normal
    // methods.
    //
    // If the current step is an equation (which it should be),
    // we use the solver to determine its solution and compare
    // it against the solution of the previous equation.  If
    // they match, then it's valid step, but the student should
    // probably be showing more work in this situation.
    if (
        !isCorrect &&
        prevStep.type === NodeType.Equals &&
        currStep.type === NodeType.Equals
    ) {
        const prevProblem = {
            ...problem,
            equation: prevStep,
        };
        const currProblem = {
            ...problem,
            equation: currStep,
        };

        const prevSolverResult = solveProblem(prevProblem);
        const currSolverResult = solveProblem(currProblem);

        if (prevSolverResult && currSolverResult) {
            const prevAnswer = prevSolverResult.answer;
            const currAnswer = currSolverResult.answer;

            if (util.deepEquals(prevAnswer, currAnswer)) {
                isCorrect = true;
                needsMoreWork = true;
            } else if (currAnswer.type === NodeType.Equals) {
                // Check if sides were swapped.
                const {args} = currAnswer;
                const currAnswerReversed = {
                    ...currAnswer,
                    args: [args[1], args[0]],
                };
                if (util.deepEquals(prevAnswer, currAnswerReversed)) {
                    isCorrect = true;
                    needsMoreWork = true;
                }
            }
        }
    }

    if (isCorrect) {
        // Check if this is the final step.
        // TODO: Find a different way of checking if we're on the
        // final step that doesn't require `checkStep`.
        // TODO: Allow different versions of the answer, e.g.
        // 2x + 5 = 10, could be solved as x = 5/2, x = 2.5, etc.
        const final = checkStep(currStep, solverResult.answer);
        if (final.mistakes.length === 0 && final.result?.steps.length === 0) {
            // Mark the current step as "correct" without adding
            // a new step.
            return {
                status: "correct",
                needsMoreWork,
                lastStep: true,
            };
        }

        // Mark the current step as "correct" and add a new step.
        return {
            status: "correct",
            needsMoreWork,
            lastStep: false,
        };
    }

    // If all of the other checks fail, then the current
    // step is incorrect.
    return {status: "wrong"};
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
            const newSteps = [...state.steps];

            // Reset the status of the current step
            newSteps[newSteps.length - 1].status = "ungraded";

            if (action.tutor) {
                newSteps[newSteps.length - 1].tutor = true;
                newSteps.push({
                    value: newSteps[newSteps.length - 1].value,
                    status: "ungraded",
                    tutor: false,
                });
                return {...state, steps: newSteps};
            }

            const result = simpleCheckStep(
                state.problem,
                newSteps[newSteps.length - 2].value,
                newSteps[newSteps.length - 1].value,
            );

            switch (result.status) {
                case "correct": {
                    if (result.needsMoreWork) {
                        console.log("needs more work");
                    }
                    newSteps[newSteps.length - 1].status = "correct";
                    if (!result.lastStep) {
                        // Create a new step
                        newSteps.push({
                            value: newSteps[newSteps.length - 1].value,
                            status: "ungraded",
                            tutor: false,
                        });
                    }
                    break;
                }
                case "wrong": {
                    newSteps[newSteps.length - 1].status = "wrong";
                    break;
                }
                default: {
                    assertUnreachable(result);
                }
            }

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
                tutor: false,
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
                tutor: false,
            });
            return {...state, steps: newSteps};
        }
        case "Checkall": {
            const {steps} = state;
            const newSteps = [steps[0]];

            for (let i = 0; i < steps.length - 1; i++) {
                const result = simpleCheckStep(
                    state.problem,
                    steps[i].value,
                    steps[i + 1].value,
                );

                switch (result.status) {
                    case "correct": {
                        newSteps.push({
                            ...steps[i + 1],
                            status: "correct",
                        });
                        break;
                    }
                    case "wrong": {
                        newSteps.push({
                            ...steps[i + 1],
                            status: "wrong",
                        });
                        break;
                    }
                    default: {
                        assertUnreachable(result);
                    }
                }
            }

            const equation = parse(state.problem.equation);
            if (equation.type !== NodeType.Equals) {
                throw new Error(`Can't handle non-equation problems yet`);
            }

            const origProblem: Problem = {
                type: state.problem.problemType,
                equation: equation,
                variable: {
                    type: NodeType.Identifier,
                    id: getId(),
                    name: state.problem.variable,
                    // TODO: Update deepEquals to treat missing fields the same as undefined
                    subscript: undefined,
                },
            };

            let answerStatus: "correct" | "wrong" = "wrong";
            const lastStep = parse(steps[steps.length - 1].value);
            if (lastStep.type === NodeType.Equals) {
                const lastProblem = {
                    ...origProblem,
                    equation: lastStep,
                };

                const origSolverResult = solveProblem(origProblem);
                const lastSolverResult = solveProblem(lastProblem);

                if (origSolverResult && lastSolverResult) {
                    if (
                        util.deepEquals(
                            origSolverResult.answer,
                            lastSolverResult.answer,
                        )
                    ) {
                        answerStatus = "correct";
                    }
                }
            }

            // Copy the last step but set its status to answerStatus.
            newSteps.push({
                ...steps[steps.length - 1],
                status: answerStatus,
            });

            return {...state, steps: newSteps};
        }
        case "Update": {
            const newSteps = [...state.steps];
            newSteps[newSteps.length - 1] = {
                value: action.value,
                status: "ungraded",
                tutor: false,
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
