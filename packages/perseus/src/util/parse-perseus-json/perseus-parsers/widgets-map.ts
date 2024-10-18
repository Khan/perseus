import {isObject} from "../general-purpose-parsers/is-object";
import {pair} from "../general-purpose-parsers/pair";
import {string} from "../general-purpose-parsers/string";
import {isFailure} from "../result";

import {parseCategorizerWidget} from "./categorizer-widget";
import {parseCSProgramWidget} from "./cs-program-widget";
import {parseDefinitionWidget} from "./definition-widget";
import {parseDropdownWidget} from "./dropdown-widget";
import {parseExplanationWidget} from "./explanation-widget";
import {parseExpressionWidget} from "./expression-widget";

import type {PerseusWidgetsMap} from "../../../perseus-types";
import type {ParseContext, Parser, ParseResult} from "../parser-types";
import {parseInteractiveGraphWidget} from "./interactive-graph-widget";

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
) => ParseResult<undefined> = ([key, widget], widgetMap, ctx) => {
    // TODO: figure out what to do with ctx here to make the error message nicer
    const keyComponentsResult = parseWidgetMapKeyComponents(
        key.split(" "),
        ctx,
    );
    if (isFailure(keyComponentsResult)) {
        return keyComponentsResult;
    }
    const [type, id] = keyComponentsResult.value;

    switch (type) {
        case "categorizer": {
            const widgetResult = parseCategorizerWidget(widget, ctx);
            if (isFailure(widgetResult)) {
                return widgetResult;
            }
            widgetMap[`categorizer ${id}`] = widgetResult.value;
            break;
        }

        case "cs-program": {
            const widgetResult = parseCSProgramWidget(widget, ctx);
            if (isFailure(widgetResult)) {
                return widgetResult;
            }
            widgetMap[`cs-program ${id}`] = widgetResult.value;
            break;
        }

        case "definition": {
            const widgetResult = parseDefinitionWidget(widget, ctx);
            if (isFailure(widgetResult)) {
                return widgetResult;
            }
            widgetMap[`definition ${id}`] = widgetResult.value;
            break;
        }

        case "dropdown": {
            const widgetResult = parseDropdownWidget(widget, ctx);
            if (isFailure(widgetResult)) {
                return widgetResult;
            }
            widgetMap[`dropdown ${id}`] = widgetResult.value;
            break;
        }

        case "explanation": {
            const widgetResult = parseExplanationWidget(widget, ctx);
            if (isFailure(widgetResult)) {
                return widgetResult;
            }
            widgetMap[`explanation ${id}`] = widgetResult.value;
            break;
        }

        case "expression": {
            const widgetResult = parseExpressionWidget(widget, ctx);
            if (isFailure(widgetResult)) {
                return widgetResult;
            }
            widgetMap[`expression ${id}`] = widgetResult.value;
            break;
        }

        case "interactive-graph": {
            const widgetResult = parseInteractiveGraphWidget(widget, ctx);
            if (isFailure(widgetResult)) {
                return widgetResult;
            }
            widgetMap[`interactive-graph ${id}`] = widgetResult.value;
            break;
        }

        default:
            return ctx.failure("a valid widget type", type);
    }
    return ctx.success(undefined);
};

const parseStringToPositiveInt: Parser<number> = (rawValue, ctx) => {
    if (typeof rawValue !== "string" || !/^[1-9][0-9]*$/.test(rawValue)) {
        return ctx.failure("numeric string", rawValue);
    }
    return ctx.success(+rawValue);
};

const parseWidgetMapKeyComponents = pair(string, parseStringToPositiveInt);
