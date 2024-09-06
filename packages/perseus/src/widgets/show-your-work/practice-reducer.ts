/* eslint-disable no-console */
import {checkStep} from "@math-blocks/tutor";

import {parse} from "./parser";

import type {Step} from "./step";

export type Action =
    | {
          kind: "Check";
      }
    | {
          kind: "Update";
          value: string;
      }
    | {
          kind: "Delete";
      };

export const reducer = (state: Array<Step>, action: Action) => {
    switch (action.kind) {
        case "Check": {
            // Replace the current step
            const newSteps = [...state];
            newSteps[newSteps.length - 1].status = "waiting";

            const prev = parse(newSteps[newSteps.length - 2].value);
            const next = parse(newSteps[newSteps.length - 1].value);

            const {result, mistakes: _} = checkStep(prev, next);

            if (result) {
                newSteps[newSteps.length - 1].status = "correct";
                newSteps.push({
                    value: newSteps[newSteps.length - 1].value,
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
                newSteps[newSteps.length - 1].status = "incorrect";
            }

            return newSteps;
        }
        case "Update": {
            const newSteps = [...state];
            newSteps[newSteps.length - 1] = {
                value: action.value,
                status: "waiting",
            };
            return newSteps;
        }
        case "Delete": {
            // TODO: implement "Delete"
            return state;
        }
    }
};
