// These functions are vendored copies from @math-blocks/tutor
// to reduce the bundle size.  `checkStep` takes up the of the
// bundle, but we aren't using.
// TODO(kevinb): Break @math-blocks/tutor into separate packages.
import {UnreachableCaseError} from "@math-blocks/core";
import * as Solver from "@math-blocks/solver";

import type * as Semantic from "@math-blocks/semantic";

// NOTE: Some steps will have their own sub-steps which we may want
// to apply to help students better understand what the hint is doing.

export const getHint = (problem: Solver.Problem): Solver.Step => {
    const solution = Solver.solveProblem(problem);

    if (solution && solution.steps[0].substeps.length > 0) {
        // Grab the first step of the solution and apply it to the previous
        // math statement that the user has entered.
        return solution.steps[0].substeps[0];
    }

    throw new Error("Couldn't get a hint");
};

export const showMeHow = (problem: Solver.Problem): Semantic.types.Node => {
    const hint = getHint(problem);

    // TODO: update applyStep to apply a Step to a Problem instead of just
    // some random Semantic.types.Node.

    switch (problem.type) {
        case "SimplifyExpression":
            return Solver.applyStep(problem.expression, hint);
        case "SolveEquation":
            return Solver.applyStep(problem.equation, hint);
        default:
            throw new UnreachableCaseError(problem);
    }
};
