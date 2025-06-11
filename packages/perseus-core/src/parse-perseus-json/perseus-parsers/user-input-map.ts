import {any, isPlainObject} from "../general-purpose-parsers";
import {isFailure} from "../result";

import {parseCategorizerUserInput} from "./categorizer-user-input";
import {parseCSProgramUserInput} from "./cs-program-user-input";
import {parseDropdownUserInput} from "./dropdown-user-input";
import {parseExpressionUserInput} from "./expression-user-input";
import {parseFreeResponseUserInput} from "./free-response-user-input";
import {parseGrapherUserInput} from "./grapher-user-input";
import {parseGroupUserInput} from "./group-user-input";
import {parseIFrameUserInput} from "./iframe-user-input";
import {parseInputNumberUserInput} from "./input-number-user-input";
import {parseInteractiveGraphUserInput} from "./interactive-graph-user-input";
import {parseLabelImageUserInput} from "./label-image-user-input";
import {parseMatcherUserInput} from "./matcher-user-input";
import {parseMatrixUserInput} from "./matrix-user-input";
import {parseNumberLineUserInput} from "./number-line-user-input";
import {parseNumericInputUserInput} from "./numeric-input-user-input";
import {parseOrdererUserInput} from "./orderer-user-input";
import {parsePlotterUserInput} from "./plotter-user-input";
import {parseRadioUserInput} from "./radio-user-input";
import {parseSorterUserInput} from "./sorter-user-input";
import {parseTableUserInput} from "./table-user-input";
import {parseWidgetIdComponents} from "./widget-id-components";

import type {UserInputMap} from "../../validation.types";
import type {ParseContext, Parser, ParseResult} from "../parser-types";

/**
 * Parses a UserInputMap, which is a map of widget IDs to their corresponding user input data.
 *
 * A UserInputMap maps widget IDs (like "radio 1", "dropdown 2") to the user input data
 * for each widget. This is used by Group widgets and other contexts where multiple
 * widgets need to be tracked together.
 *
 * The parser handles recursive structures since Group widgets can contain other Group
 * widgets, each with their own UserInputMap.
 *
 * @param rawValue - The raw value to parse, expected to be a plain object
 * @param ctx - The parse context for error reporting and tracking
 * @returns A ParseResult containing either the parsed UserInputMap or an error
 */
export const parseUserInputMap: Parser<UserInputMap> = (rawValue, ctx) => {
    if (!isPlainObject(rawValue)) {
        return ctx.failure("UserInputMap", rawValue);
    }

    const userInputMap: UserInputMap = {};
    for (const key of Object.keys(rawValue)) {
        // parseUserInputMapEntry modifies the userInputMap. This is to make
        // TypeScript check the key against the widget type.
        const entryResult = parseUserInputMapEntry(
            [key, rawValue[key]],
            userInputMap,
            ctx.forSubtree(key),
        );
        if (isFailure(entryResult)) {
            return entryResult;
        }
    }

    return ctx.success(userInputMap);
};

/**
 * Parses a single entry in a UserInputMap and adds it to the provided map.
 *
 * This function takes a [widgetId, userInput] pair, parses the widget ID to determine
 * the widget type, then uses the appropriate parser for that widget type's user input.
 * The parsed result is added to the provided userInputMap.
 *
 * This approach is used to maintain strong typing - TypeScript can verify that each
 * widget ID maps to the correct user input type based on the widget type extracted
 * from the ID.
 *
 * @param entry - A tuple of [widgetId, rawUserInput] to parse
 * @param userInputMap - The UserInputMap to modify with the parsed entry
 * @param ctx - The parse context for error reporting
 * @returns A ParseResult indicating success or failure
 */
const parseUserInputMapEntry: (
    entry: [string, unknown],
    userInputMap: UserInputMap,
    ctx: ParseContext,
) => ParseResult<unknown> = ([id, userInput], userInputMap, ctx) => {
    const idComponentsResult = parseWidgetIdComponents(
        id.split(" "),
        ctx.forSubtree("(widget ID)"),
    );
    if (isFailure(idComponentsResult)) {
        return idComponentsResult;
    }
    const [type, n] = idComponentsResult.value;

    function parseAndAssign<K extends keyof UserInputMap>(
        key: K,
        parse: Parser<UserInputMap[K]>,
    ): ParseResult<unknown> {
        const userInputResult = parse(userInput, ctx);
        if (isFailure(userInputResult)) {
            return userInputResult;
        }
        userInputMap[key] = userInputResult.value;
        return ctx.success(undefined);
    }

    switch (type) {
        case "categorizer":
            return parseAndAssign(
                `categorizer ${n}`,
                parseCategorizerUserInput,
            );
        case "cs-program":
            return parseAndAssign(`cs-program ${n}`, parseCSProgramUserInput);
        case "dropdown":
            return parseAndAssign(`dropdown ${n}`, parseDropdownUserInput);
        case "expression":
            return parseAndAssign(`expression ${n}`, parseExpressionUserInput);
        case "free-response":
            return parseAndAssign(
                `free-response ${n}`,
                parseFreeResponseUserInput,
            );
        case "grapher":
            return parseAndAssign(`grapher ${n}`, parseGrapherUserInput);
        case "group":
            // Recursive case: group user input is itself a UserInputMap
            return parseAndAssign(`group ${n}`, parseGroupUserInput);
        case "iframe":
            return parseAndAssign(`iframe ${n}`, parseIFrameUserInput);
        case "input-number":
            return parseAndAssign(
                `input-number ${n}`,
                parseInputNumberUserInput,
            );
        case "interactive-graph":
            return parseAndAssign(
                `interactive-graph ${n}`,
                parseInteractiveGraphUserInput,
            );
        case "label-image":
            return parseAndAssign(`label-image ${n}`, parseLabelImageUserInput);
        case "matcher":
            return parseAndAssign(`matcher ${n}`, parseMatcherUserInput);
        case "matrix":
            return parseAndAssign(`matrix ${n}`, parseMatrixUserInput);
        case "number-line":
            return parseAndAssign(`number-line ${n}`, parseNumberLineUserInput);
        case "numeric-input":
            return parseAndAssign(
                `numeric-input ${n}`,
                parseNumericInputUserInput,
            );
        case "orderer":
            return parseAndAssign(`orderer ${n}`, parseOrdererUserInput);
        case "plotter":
            return parseAndAssign(`plotter ${n}`, parsePlotterUserInput);
        case "radio":
            return parseAndAssign(`radio ${n}`, parseRadioUserInput);
        case "sorter":
            return parseAndAssign(`sorter ${n}`, parseSorterUserInput);
        case "table":
            return parseAndAssign(`table ${n}`, parseTableUserInput);

        default:
            // For unknown widget types, accept any input
            return parseAndAssign(`${type} ${n}` as any, any);
    }
};
