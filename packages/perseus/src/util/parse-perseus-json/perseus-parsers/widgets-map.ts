import {any, pair, isObject, string} from "../general-purpose-parsers";
import {isFailure} from "../result";

import {parseCategorizerWidget} from "./categorizer-widget";
import {parseCSProgramWidget} from "./cs-program-widget";
import {parseDefinitionWidget} from "./definition-widget";
import {parseDropdownWidget} from "./dropdown-widget";
import {parseExplanationWidget} from "./explanation-widget";
import {parseExpressionWidget} from "./expression-widget";
import {parseInteractiveGraphWidget} from "./interactive-graph-widget";

import type {PerseusWidgetsMap} from "../../../perseus-types";
import type {ParseContext, Parser, ParseResult} from "../parser-types";

export const parseWidgetsMap: Parser<PerseusWidgetsMap> = (rawValue, ctx) => {
    if (!isObject(rawValue)) {
        return ctx.failure("PerseusWidgetsMap", rawValue);
    }

    const widgetsMap: PerseusWidgetsMap = {};
    for (const key of Object.keys(rawValue)) {
        // parseWidgetsMapEntry modifies the widgetsMap. This is kind of gross,
        // but it's the only way I could find to make TypeScript check the key
        // against the widget type.
        const entryResult = parseWidgetsMapEntry(
            [key, rawValue[key]],
            widgetsMap,
            ctx.forSubtree(key),
        );
        if (isFailure(entryResult)) {
            return entryResult;
        }
    }

    return ctx.success(widgetsMap);
};

const parseWidgetsMapEntry: (
    entry: [string, unknown],
    widgetMap: PerseusWidgetsMap,
    ctx: ParseContext,
) => ParseResult<unknown> = ([key, widget], widgetMap, ctx) => {
    // TODO: figure out what to do with ctx here to make the error message nicer
    const keyComponentsResult = parseWidgetMapKeyComponents(
        key.split(" "),
        ctx,
    );
    if (isFailure(keyComponentsResult)) {
        return keyComponentsResult;
    }
    const [type, id] = keyComponentsResult.value;

    function parseAndAssign<K extends keyof PerseusWidgetsMap>(
        key: K,
        parse: Parser<PerseusWidgetsMap[K]>,
    ): ParseResult<unknown> {
        const widgetResult = parse(widget, ctx);
        if (isFailure(widgetResult)) {
            return widgetResult;
        }
        widgetMap[key] = widgetResult.value;
        return ctx.success(undefined);
    }

    switch (type) {
        case "categorizer":
            return parseAndAssign(`categorizer ${id}`, parseCategorizerWidget);
        case "cs-program":
            return parseAndAssign(`cs-program ${id}`, parseCSProgramWidget);
        case "definition":
            return parseAndAssign(`definition ${id}`, parseDefinitionWidget);
        case "dropdown":
            return parseAndAssign(`dropdown ${id}`, parseDropdownWidget);
        case "explanation":
            return parseAndAssign(`explanation ${id}`, parseExplanationWidget);
        case "expression":
            return parseAndAssign(`expression ${id}`, parseExpressionWidget);
        case "grapher":
            return parseAndAssign(`grapher ${id}`, any); // TODO
        case "group":
            return parseAndAssign(`group ${id}`, any); // TODO
        case "graded-group":
            return parseAndAssign(`graded-group ${id}`, any); // TODO
        case "graded-group-set":
            return parseAndAssign(`graded-group-set ${id}`, any); // TODO
        case "iframe":
            return parseAndAssign(`iframe ${id}`, any); // TODO
        case "image":
            return parseAndAssign(`image ${id}`, any); // TODO
        case "input-number":
            return parseAndAssign(`input-number ${id}`, any); // TODO
        case "interaction":
            return parseAndAssign(`interaction ${id}`, any); // TODO
        case "interactive-graph":
            return parseAndAssign(
                `interactive-graph ${id}`,
                parseInteractiveGraphWidget,
            );
        case "label-image":
            return parseAndAssign(`label-image ${id}`, any); // TODO
        case "matcher":
            return parseAndAssign(`matcher ${id}`, any); // TODO
        case "matrix":
            return parseAndAssign(`matrix ${id}`, any); // TODO
        case "measurer":
            return parseAndAssign(`measurer ${id}`, any); // TODO
        case "molecule-renderer":
            return parseAndAssign(`molecule-renderer ${id}`, any); // TODO
        case "number-line":
            return parseAndAssign(`number-line ${id}`, any); // TODO
        case "numeric-input":
            return parseAndAssign(`numeric-input ${id}`, any); // TODO
        case "orderer":
            return parseAndAssign(`orderer ${id}`, any); // TODO
        case "passage":
            return parseAndAssign(`passage ${id}`, any); // TODO
        case "passage-ref":
            return parseAndAssign(`passage-ref ${id}`, any); // TODO
        case "passage-ref-target":
            return parseAndAssign(`passage-ref-target ${id}`, any); // TODO
        case "phet-simulation":
            return parseAndAssign(`phet-simulation ${id}`, any); // TODO
        case "plotter":
            return parseAndAssign(`plotter ${id}`, any); // TODO
        case "python-program":
            return parseAndAssign(`python-program ${id}`, any); // TODO
        case "radio":
            return parseAndAssign(`radio ${id}`, any); // TODO
        case "sorter":
            return parseAndAssign(`sorter ${id}`, any); // TODO
        case "table":
            return parseAndAssign(`table ${id}`, any); // TODO
        case "video":
            return parseAndAssign(`video ${id}`, any); // TODO
        default:
            return ctx.failure("a valid widget type", type);
    }
};

const parseStringToPositiveInt: Parser<number> = (rawValue, ctx) => {
    if (typeof rawValue !== "string" || !/^[1-9][0-9]*$/.test(rawValue)) {
        return ctx.failure("numeric string", rawValue);
    }
    return ctx.success(+rawValue);
};

const parseWidgetMapKeyComponents = pair(string, parseStringToPositiveInt);
