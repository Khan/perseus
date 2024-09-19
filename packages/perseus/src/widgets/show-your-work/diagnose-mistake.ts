/* eslint-disable no-console */
import * as KAS from "@khanacademy/kas";
import {NodeType, type types, util} from "@math-blocks/semantic";

import {assertUnreachable} from "./assert-unreachable";
import {mathBlocksToKAS} from "./converters";
import {parse} from "./parser";

import type {Step} from "./step";

function getTerms(node: types.Node): types.Node[] {
    return node.type === NodeType.Add ? node.args : [node];
}

function getFactors(node: types.Node): types.Node[] {
    return node.type === NodeType.Mul ? node.args : [node];
}

function getDivisor(prev: types.Node, curr: types.Node): types.Node | null {
    if (curr.type === NodeType.Div && util.deepEquals(prev, curr.args[0])) {
        return curr.args[1];
    }
    return null;
}

export enum Side {
    LHS = "LHS",
    RHS = "RHS",
}

export enum Operation {
    Addition = "Addition",
    Subtraction = "Subtraction",
    Multiplication = "Multiplication",
    Division = "Division",
}

export type Mistake = {
    kind: "operation applied to one-side only";
    side: Side;
    operation: Operation;
    operand: types.Node;
};

const checkForOneSidedAddSub = (
    prevNode: types.Eq,
    currNode: types.Eq,
): Mistake[] => {
    const prevLeftTerms = getTerms(prevNode.args[0]);
    const prevRightTerms = getTerms(prevNode.args[1]);
    const currLeftTerms = getTerms(currNode.args[0]);
    const currRightTerms = getTerms(currNode.args[1]);

    if (
        prevLeftTerms.length < currLeftTerms.length &&
        util.deepEquals(prevNode[1], currNode[1])
    ) {
        // TODO: check for terms that are identical and handle those appropriately
        const allPrevTermsRemain = prevLeftTerms.every((prev) =>
            currLeftTerms.some((curr) => util.deepEquals(prev, curr)),
        );

        if (allPrevTermsRemain) {
            const newTerms = currLeftTerms.filter((curr) => {
                return !prevLeftTerms.some((prev) =>
                    util.deepEquals(prev, curr),
                );
            });

            // TODO: Filter out terms that are equivalent to zero
            const mistakes: Mistake[] = newTerms.map((term): Mistake => {
                const operand =
                    term.type === NodeType.Neg && term.subtraction
                        ? term.arg
                        : term;

                const operation =
                    term.type === NodeType.Neg && term.subtraction
                        ? Operation.Subtraction
                        : Operation.Addition;

                return {
                    kind: "operation applied to one-side only",
                    side: Side.LHS,
                    operand,
                    operation,
                };
            });

            return mistakes;
        }

        console.log("unable to diagnose the mistake");
    }

    if (
        util.deepEquals(prevNode[0], currNode[0]) &&
        prevRightTerms.length < currRightTerms.length
    ) {
        // TODO: check for terms that are identical and handle those appropriately
        const allPrevTermsRemain = prevRightTerms.every((prev) =>
            currRightTerms.some((curr) => util.deepEquals(prev, curr)),
        );

        if (allPrevTermsRemain) {
            const newTerms = currRightTerms.filter((curr) => {
                return !prevRightTerms.some((prev) =>
                    util.deepEquals(prev, curr),
                );
            });

            // TODO: Filter out terms that are equivalent to zero
            const mistakes: Mistake[] = newTerms.map((term): Mistake => {
                const operand =
                    term.type === NodeType.Neg && term.subtraction
                        ? term.arg
                        : term;

                const operation =
                    term.type === NodeType.Neg && term.subtraction
                        ? Operation.Subtraction
                        : Operation.Addition;

                return {
                    kind: "operation applied to one-side only",
                    side: Side.RHS,
                    operand,
                    operation,
                };
            });

            return mistakes;
        }

        console.log("unable to diagnose the mistake");
    }

    return []; // We couldn't diagnose any mistakes
};

const checkForOneSidedMul = (
    prevNode: types.Eq,
    currNode: types.Eq,
): Mistake[] => {
    const prevLeftFactors = getFactors(prevNode.args[0]);
    const prevRightFactors = getFactors(prevNode.args[1]);
    const currLeftFactors = getFactors(currNode.args[0]);
    const currRightFactors = getFactors(currNode.args[1]);

    if (
        prevLeftFactors.length < currLeftFactors.length &&
        util.deepEquals(prevNode[1], currNode[1])
    ) {
        // TODO: check for factors that are identical and handle those appropriately
        const allPrevFactorsRemain = prevLeftFactors.every((prev) =>
            currLeftFactors.some((curr) => util.deepEquals(prev, curr)),
        );

        if (allPrevFactorsRemain) {
            const newFactors = currLeftFactors
                .filter((curr) => {
                    return !prevLeftFactors.some((prev) =>
                        util.deepEquals(prev, curr),
                    );
                })
                .filter((factor) => {
                    const kasFactor = mathBlocksToKAS(factor);
                    return !kasFactor.compare(KAS.Zero);
                });

            // TODO: Filter out factors that are equivalent to one
            const mistakes: Mistake[] = newFactors.map((term): Mistake => {
                const operand =
                    term.type === NodeType.Neg && term.subtraction
                        ? term.arg
                        : term;

                return {
                    kind: "operation applied to one-side only",
                    side: Side.LHS,
                    operand,
                    operation: Operation.Multiplication,
                };
            });

            return mistakes;
        }

        console.log("unable to diagnose the mistake");
    }

    if (
        util.deepEquals(prevNode[0], currNode[0]) &&
        prevRightFactors.length < currRightFactors.length
    ) {
        // TODO: check for factors that are identical and handle those appropriately
        const allPrevFactorsRemain = prevRightFactors.every((prev) =>
            currRightFactors.some((curr) => util.deepEquals(prev, curr)),
        );

        if (allPrevFactorsRemain) {
            const newFactors = currRightFactors
                .filter((curr) => {
                    return !prevRightFactors.some((prev) =>
                        util.deepEquals(prev, curr),
                    );
                })
                .filter((factor) => {
                    const kasFactor = mathBlocksToKAS(factor);
                    return !kasFactor.compare(KAS.Zero);
                });

            const mistakes: Mistake[] = newFactors.map((term): Mistake => {
                const operand =
                    term.type === NodeType.Neg && term.subtraction
                        ? term.arg
                        : term;

                return {
                    kind: "operation applied to one-side only",
                    side: Side.RHS,
                    operand,
                    operation: Operation.Multiplication,
                };
            });

            return mistakes;
        }

        console.log("unable to diagnose the mistake");
    }

    return []; // We couldn't diagnose any mistakes
};

const checkForOneSidedDiv = (
    prevNode: types.Eq,
    currNode: types.Eq,
): Mistake[] => {
    const lDiv = getDivisor(prevNode.args[0], currNode.args[0]);
    const rDiv = getDivisor(prevNode.args[1], currNode.args[1]);

    if (lDiv && !rDiv) {
        const lDivExpr = mathBlocksToKAS(lDiv);
        if (!lDivExpr.compare(KAS.One)) {
            return [
                {
                    kind: "operation applied to one-side only",
                    side: Side.LHS,
                    operand: lDiv,
                    operation: Operation.Division,
                },
            ];
        }
    }

    if (!lDiv && rDiv) {
        const rDivExpr = mathBlocksToKAS(rDiv);
        if (!rDivExpr.compare(KAS.One)) {
            return [
                {
                    kind: "operation applied to one-side only",
                    side: Side.RHS,
                    operand: rDiv,
                    operation: Operation.Division,
                },
            ];
        }
    }

    return []; // We couldn't diagnose any mistakes
};

export const diagnoseMistake = (prevStep: Step, currStep: Step): Mistake[] => {
    console.log("Diagnosing mistake");

    const prevNode = parse(prevStep.value);
    const currNode = parse(currStep.value);

    if (
        prevNode.type !== NodeType.Equals ||
        currNode.type !== NodeType.Equals
    ) {
        throw new Error("steps must be equations");
    }

    let mistakes: Mistake[] = [];

    mistakes = mistakes.concat(checkForOneSidedAddSub(prevNode, currNode));
    mistakes = mistakes.concat(checkForOneSidedMul(prevNode, currNode));
    mistakes = mistakes.concat(checkForOneSidedDiv(prevNode, currNode));

    return mistakes;
};

export const printMistake = (mistake: Mistake): string[] => {
    const messages: string[] = [];

    switch (mistake.kind) {
        case "operation applied to one-side only": {
            messages.push(
                "When working with equations you need to do the same operation to both sides to keep the equation balanced.",
            );
            switch (mistake.operation) {
                case Operation.Addition: {
                    switch (mistake.side) {
                        case Side.LHS: {
                            messages.push(
                                "You added <term> to the left side.  In order to keep the equation balanced, you also need to add <term> to the right side.",
                            );
                            break;
                        }
                        case Side.RHS: {
                            messages.push(
                                "You added <term> to the right side.  In order to keep the equation balanced, you also need to add <term> to the left side.",
                            );
                            break;
                        }
                        default: {
                            assertUnreachable(mistake.side);
                        }
                    }
                    break;
                }
                case Operation.Subtraction: {
                    switch (mistake.side) {
                        case Side.LHS: {
                            messages.push(
                                "You subtracted <term> from the left side.  In order to keep the equation balanced, you also need to subtract <term> from the right side.",
                            );
                            break;
                        }
                        case Side.RHS: {
                            messages.push(
                                "You subtracted <term> from the right side.  In order to keep the equation balanced, you also need to subtract <term> from the left side.",
                            );
                            break;
                        }
                        default: {
                            assertUnreachable(mistake.side);
                        }
                    }
                    break;
                }
                case Operation.Multiplication: {
                    switch (mistake.side) {
                        case Side.LHS: {
                            messages.push(
                                "You multiplied the left side by <factor>.  In order to keep the equation balanced, you also need to multiply the right side by <factor>.",
                            );
                            break;
                        }
                        case Side.RHS: {
                            messages.push(
                                "You multiplied the right side by <factor>.  In order to keep the equation balanced, you also need to multiply the left side by <factor>.",
                            );
                            break;
                        }
                        default: {
                            assertUnreachable(mistake.side);
                        }
                    }
                    break;
                }
                case Operation.Division: {
                    switch (mistake.side) {
                        case Side.LHS: {
                            messages.push(
                                "You divided the left side by <factor>.  In order to keep the equation balanced, you also need to divide the right side by <factor>.",
                            );
                            break;
                        }
                        case Side.RHS: {
                            messages.push(
                                "You divided the right side by <factor>.  In order to keep the equation balanced, you also need to divide the left side by <factor>.",
                            );
                            break;
                        }
                        default: {
                            assertUnreachable(mistake.side);
                        }
                    }
                    break;
                }
                default: {
                    assertUnreachable(mistake.operation);
                }
            }
        }
    }

    return messages;
};
