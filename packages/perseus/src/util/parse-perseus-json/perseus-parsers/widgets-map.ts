import {isFailure} from "../result";

import {pair} from "../general-purpose-parsers/pair";
import {string} from "../general-purpose-parsers/string";

import type {
    CategorizerWidget,
    PerseusWidgetsMap,
} from "../../../perseus-types";
import type {ParseContext, Parser, ParseResult} from "../parser-types";

export const parseWidgetsMap: Parser<PerseusWidgetsMap> = (rawValue, ctx) => {
    if (!isPlainObject(rawValue)) {
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
    const [prefix, id] = keyComponentsResult.value;

    switch (prefix) {
        case "categorizer":
            const widgetResult = parseCategorizerWidget(
                widget,
                ctx.forSubtree(key),
            );
            if (isFailure(widgetResult)) {
                return ctx.failure(prefix, widget);
            }
            widgetMap[`categorizer ${id}`] = widgetResult.value;
            break;

        default:
            return ctx.failure("a valid widget type", prefix);
    }
    return ctx.success(undefined);
};

const parseCategorizerWidget: Parser<CategorizerWidget> = (rawValue, ctx) => {
    // TODO: fill in this stub implementation
    return ctx.success(rawValue as any);
};

const parseStringToPositiveInt: Parser<number> = (rawValue, ctx) => {
    if (typeof rawValue !== "string" || !/^[1-9][0-9]*$/.test(rawValue)) {
        return ctx.failure("numeric string", rawValue);
    }
    return ctx.success(+rawValue);
};

const parseWidgetMapKeyComponents = pair(string, parseStringToPositiveInt);

function isPlainObject(x: unknown): x is Record<keyof any, unknown> {
    return x != null && Object.getPrototypeOf(x) === Object.prototype;
}
