// These functions are vendored copies from @math-blocks/tutor
// to reduce the bundle size.  `checkStep` takes up the of the
// bundle, but we aren't using.
// TODO(kevinb): Break @math-blocks/tutor into separate packages.
import {UnreachableCaseError, getId} from "@math-blocks/core";
import {NodeType} from "@math-blocks/semantic";
import * as Solver from "@math-blocks/solver";

import {parse} from "./parser";

import type {ShowYourWorkProblem} from "../../perseus-types";
import type {types} from "@math-blocks/semantic";

// NOTE: Some steps will have their own sub-steps which we may want
// to apply to help students better understand what the hint is doing.

export const getHint = (
    originalProblem: ShowYourWorkProblem,
    prevStepValue: string,
): Solver.Step => {
    const problem = _getSolverProblem(originalProblem, prevStepValue);
    return _getHint(problem);
};

export const showMeHow = (
    originalProblem: ShowYourWorkProblem,
    prevStepValue: string,
): types.Node => {
    const problem = _getSolverProblem(originalProblem, prevStepValue);
    const hint = _getHint(problem);

    switch (problem.type) {
        case "SimplifyExpression":
            return Solver.applyStep(problem.expression, hint);
        case "SolveEquation":
            return Solver.applyStep(problem.equation, hint);
        default:
            throw new UnreachableCaseError(problem);
    }
};

const _getSolverProblem = (
    originalProblem: ShowYourWorkProblem,
    prevStepValue: string,
): Solver.Problem => {
    const equation = parse(prevStepValue);
    if (equation.type !== NodeType.Equals) {
        throw new Error(`Can't handle non-equation problems yet`);
    }

    const problem: Solver.Problem = {
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

    return problem;
};

const _getHint = (problem: Solver.Problem): Solver.Step => {
    const solution = Solver.solveProblem(problem);

    if (solution && solution.steps[0].substeps.length > 0) {
        // Grab the first step of the solution and apply it to the previous
        // math statement that the user has entered.
        return solution.steps[0].substeps[0];
    }

    throw new Error("Couldn't get a hint");
};
