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
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`grapher ${id}`, any);
        case "group":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`group ${id}`, any);
        case "graded-group":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`graded-group ${id}`, any);
        case "graded-group-set":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`graded-group-set ${id}`, any);
        case "iframe":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`iframe ${id}`, any);
        case "image":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`image ${id}`, any);
        case "input-number":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`input-number ${id}`, any);
        case "interaction":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`interaction ${id}`, any);
        case "interactive-graph":
            return parseAndAssign(
                `interactive-graph ${id}`,
                parseInteractiveGraphWidget,
            );
        case "label-image":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`label-image ${id}`, any);
        case "matcher":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`matcher ${id}`, any);
        case "matrix":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`matrix ${id}`, any);
        case "measurer":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`measurer ${id}`, any);
        case "molecule-renderer":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`molecule-renderer ${id}`, any);
        case "number-line":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`number-line ${id}`, any);
        case "numeric-input":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`numeric-input ${id}`, any);
        case "orderer":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`orderer ${id}`, any);
        case "passage":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`passage ${id}`, any);
        case "passage-ref":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`passage-ref ${id}`, any);
        case "passage-ref-target":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`passage-ref-target ${id}`, any);
        case "phet-simulation":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`phet-simulation ${id}`, any);
        case "plotter":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`plotter ${id}`, any);
        case "python-program":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`python-program ${id}`, any);
        case "radio":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`radio ${id}`, any);
        case "sorter":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`sorter ${id}`, any);
        case "table":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`table ${id}`, any);
        case "video":
            // TODO(LEMS-2585): implement a real parser for this widget
            return parseAndAssign(`video ${id}`, any);
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
