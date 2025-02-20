import {MathFieldActionType} from "../../types";

import {CursorContext} from "./cursor-contexts";
import {mathQuillInstance} from "./mathquill-instance";

import type {MathFieldInterface} from "./mathquill-types";

const Numerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const GreekLetters = ["\\theta", "\\pi"];
const Letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

// We only consider numerals, variables, and Greek Letters to be proper
// leaf nodes.
const ValidLeaves = [
    ...Numerals,
    ...GreekLetters,
    ...Letters.map((letter) => letter.toLowerCase()),
    ...Letters.map((letter) => letter.toUpperCase()),
];

const mqNodeHasClass = (node: any, className: string): boolean =>
    node._el && (node._el as HTMLElement).classList.contains(className);

export function isFraction(node): boolean {
    return mqNodeHasClass(node, "mq-fraction");
}

function isNumerator(node): boolean {
    return mqNodeHasClass(node, "mq-numerator");
}

function isDenominator(node): boolean {
    return mqNodeHasClass(node, "mq-denominator");
}

function isSubScript(node): boolean {
    // NOTE(charlie): MyScript has a structure whereby its superscripts seem
    // to be represented as a parent node with 'mq-sup-only' containing a
    // single child with 'mq-sup'.
    return (
        mqNodeHasClass(node, "mq-sub-only") || mqNodeHasClass(node, "mq-sub")
    );
}

function isSuperScript(node): boolean {
    // NOTE(charlie): MyScript has a structure whereby its superscripts seem
    // to be represented as a parent node with 'mq-sup-only' containing a
    // single child with 'mq-sup'.
    return (
        mqNodeHasClass(node, "mq-sup-only") || mqNodeHasClass(node, "mq-sup")
    );
}

export function isParens(node): boolean {
    return node && node.ctrlSeq === "\\left(";
}

function isLeaf(node): boolean {
    return node && node.ctrlSeq && ValidLeaves.includes(node.ctrlSeq.trim());
}

export function isSquareRoot(node): boolean {
    return node.blocks && mqNodeHasClass(node.blocks[0], "mq-sqrt-stem");
}

export function isNthRoot(node): boolean {
    return node.blocks && mqNodeHasClass(node.blocks[0], "mq-nthroot");
}

export function isNthRootIndex(node): boolean {
    return mqNodeHasClass(node, "mq-nthroot");
}

export function isInsideLogIndex(cursor): boolean {
    const grandparent = cursor.parent.parent;

    if (grandparent && mqNodeHasClass(grandparent, "mq-supsub")) {
        const command = maybeFindCommandBeforeParens(grandparent);

        if (command && command.name === "\\log") {
            return true;
        }
    }

    return false;
}

export function isInsideEmptyNode(cursor): boolean {
    return (
        cursor[mathQuillInstance.L] === MathFieldActionType.MQ_END &&
        cursor[mathQuillInstance.R] === MathFieldActionType.MQ_END
    );
}

export function selectNode(node, cursor) {
    cursor.insLeftOf(node);
    cursor.startSelection();
    cursor.insRightOf(node);
    cursor.select();
    cursor.endSelection();
}

/**
 * Return the start node, end node, and full name of the command of which
 * the initial node is a part, or `null` if the node is not part of a
 * command.
 *
 * @param {node} initialNode - the node to included as part of the command
 * @returns {null|object} - `null` or an object containing the start node
 *                          (`startNode`), end node (`endNode`), and full
 *                          name (`name`) of the command
 */
export function maybeFindCommand(initialNode) {
    if (!initialNode) {
        return null;
    }

    // MathQuill stores commands as separate characters so that
    // users can delete commands one character at a time.  We iterate over
    // the nodes from right to left until we hit a sequence starting with a
    // '\\', which signifies the start of a command; then we iterate from
    // left to right until we hit a '\\left(', which signifies the end of a
    // command.  If we encounter any character that doesn't belong in a
    // command, we return null.  We match a single character at a time.
    // Ex) ['\\l', 'o', 'g ', '\\left(', ...]
    const commandCharRegex = /^[a-z]$/;
    const commandStartRegex = /^\\[a-z]$/;
    const commandEndSeq = "\\left(";

    // Note: We allowlist the set of valid commands, since relying solely on
    // a command being prefixed with a backslash leads to undesired
    // behavior. For example, Greek symbols, left parentheses, and square
    // roots all get treated as commands.
    const validCommands = ["\\log", "\\ln", "\\cos", "\\sin", "\\tan"];

    let name = "";
    let startNode;
    let endNode;

    // Collect the portion of the command from the current node, leftwards
    // until the start of the command.
    let node = initialNode;
    while (node !== 0) {
        const ctrlSeq = node.ctrlSeq.trim();
        if (commandCharRegex.test(ctrlSeq)) {
            name = ctrlSeq + name;
        } else if (commandStartRegex.test(ctrlSeq)) {
            name = ctrlSeq + name;
            startNode = node;
            break;
        } else {
            break;
        }

        node = node[mathQuillInstance.L];
    }

    // If we hit the start of a command, then grab the rest of it by
    // iterating rightwards to compute the full name of the command, along
    // with its terminal node.
    if (startNode) {
        // Next, iterate from the start to the right.
        node = initialNode[mathQuillInstance.R];
        while (node !== 0) {
            const ctrlSeq = node.ctrlSeq.trim();
            if (commandCharRegex.test(ctrlSeq)) {
                // If we have a single character, add it to the command
                // name.
                name = name + ctrlSeq;
            } else if (ctrlSeq === commandEndSeq) {
                // If we hit the command end delimiter (the left
                // parentheses surrounding its arguments), stop.
                endNode = node;
                break;
            }

            node = node[mathQuillInstance.R];
        }
        if (validCommands.includes(name)) {
            return {name, startNode, endNode};
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/**
 * Return the start node, end node, and full name of the command to the left
 * of `\\left(`, or `null` if there is no command.
 *
 * @param {node} leftParenNode - node where .ctrlSeq == `\\left(`
 * @returns {null|object} - `null` or an object containing the start node
 *                          (`startNode`), end node (`endNode`), and full
 *                          name (`name`) of the command
 */
export function maybeFindCommandBeforeParens(leftParenNode) {
    return maybeFindCommand(leftParenNode[mathQuillInstance.L]);
}

export function getCursorContext(
    mathField?: MathFieldInterface,
): (typeof CursorContext)[keyof typeof CursorContext] {
    if (!mathField) {
        return CursorContext.NONE;
    }

    // First, try to find any fraction to the right, unimpeded.
    const cursor = mathField.cursor();
    let visitor = cursor;
    while (visitor[mathQuillInstance.R] !== MathFieldActionType.MQ_END) {
        if (isFraction(visitor[mathQuillInstance.R])) {
            return CursorContext.BEFORE_FRACTION;
        } else if (!isLeaf(visitor[mathQuillInstance.R])) {
            break;
        }
        visitor = visitor[mathQuillInstance.R];
    }

    // If that didn't work, check if the parent or grandparent is a special
    // context, so that we can jump outwards.
    if (isParens(cursor.parent && cursor.parent.parent)) {
        return CursorContext.IN_PARENS;
    } else if (isNumerator(cursor.parent)) {
        return CursorContext.IN_NUMERATOR;
    } else if (isDenominator(cursor.parent)) {
        return CursorContext.IN_DENOMINATOR;
    } else if (isSubScript(cursor.parent)) {
        return CursorContext.IN_SUB_SCRIPT;
    } else if (isSuperScript(cursor.parent)) {
        return CursorContext.IN_SUPER_SCRIPT;
    } else {
        return CursorContext.NONE;
    }
}
