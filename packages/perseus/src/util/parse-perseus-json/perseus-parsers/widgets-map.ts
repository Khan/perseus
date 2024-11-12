import {getWidget} from "../../../widgets";
import {any, pair, isObject, string} from "../general-purpose-parsers";
import {isFailure} from "../result";

import {parseCategorizerWidget} from "./categorizer-widget";
import {parseCSProgramWidget} from "./cs-program-widget";
import {parseDefinitionWidget} from "./definition-widget";
import {parseDropdownWidget} from "./dropdown-widget";
import {parseExplanationWidget} from "./explanation-widget";
import {parseExpressionWidget} from "./expression-widget";
import {parseGradedGroupSetWidget} from "./graded-group-set-widget";
import {parseGradedGroupWidget} from "./graded-group-widget";
import {parseGrapherWidget} from "./grapher-widget";
import {parseGroupWidget} from "./group-widget";
import {parseIframeWidget} from "./iframe-widget";
import {parseImageWidget} from "./image-widget";
import {parseInputNumberWidget} from "./input-number-widget";
import {parseInteractionWidget} from "./interaction-widget";
import {parseInteractiveGraphWidget} from "./interactive-graph-widget";
import {parseLabelImageWidget} from "./label-image-widget";
import {parseMatcherWidget} from "./matcher-widget";
import {parseMatrixWidget} from "./matrix-widget";
import {parseMeasurerWidget} from "./measurer-widget";
import {parseMoleculeRendererWidget} from "./molecule-renderer-widget";
import {parseNumberLineWidget} from "./number-line-widget";
import {parseNumericInputWidget} from "./numeric-input-widget";
import {parseOrdererWidget} from "./orderer-widget";
import {parsePassageRefWidget} from "./passage-ref-widget";
import {parsePassageWidget} from "./passage-widget";
import {parsePhetSimulationWidget} from "./phet-simulation-widget";
import {parsePlotterWidget} from "./plotter-widget";
import {parsePythonProgramWidget} from "./python-program-widget";
import {parseRadioWidget} from "./radio-widget";

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
            return parseAndAssign(`grapher ${id}`, parseGrapherWidget);
        case "group":
            return parseAndAssign(`group ${id}`, parseGroupWidget);
        case "graded-group":
            return parseAndAssign(`graded-group ${id}`, parseGradedGroupWidget);
        case "graded-group-set":
            return parseAndAssign(
                `graded-group-set ${id}`,
                parseGradedGroupSetWidget,
            );
        case "iframe":
            return parseAndAssign(`iframe ${id}`, parseIframeWidget);
        case "image":
            return parseAndAssign(`image ${id}`, parseImageWidget);
        case "input-number":
            return parseAndAssign(`input-number ${id}`, parseInputNumberWidget);
        case "interaction":
            return parseAndAssign(`interaction ${id}`, parseInteractionWidget);
        case "interactive-graph":
            return parseAndAssign(
                `interactive-graph ${id}`,
                parseInteractiveGraphWidget,
            );
        case "label-image":
            return parseAndAssign(`label-image ${id}`, parseLabelImageWidget);
        case "matcher":
            return parseAndAssign(`matcher ${id}`, parseMatcherWidget);
        case "matrix":
            return parseAndAssign(`matrix ${id}`, parseMatrixWidget);
        case "measurer":
            return parseAndAssign(`measurer ${id}`, parseMeasurerWidget);
        case "molecule-renderer":
            return parseAndAssign(
                `molecule-renderer ${id}`,
                parseMoleculeRendererWidget,
            );
        case "number-line":
            return parseAndAssign(`number-line ${id}`, parseNumberLineWidget);
        case "numeric-input":
            return parseAndAssign(
                `numeric-input ${id}`,
                parseNumericInputWidget,
            );
        case "orderer":
            return parseAndAssign(`orderer ${id}`, parseOrdererWidget);
        case "passage":
            return parseAndAssign(`passage ${id}`, parsePassageWidget);
        case "passage-ref":
            return parseAndAssign(`passage-ref ${id}`, parsePassageRefWidget);
        case "passage-ref-target":
            // NOTE(benchristel): as of 2024-11-12, passage-ref-target is only
            // used in test content. See:
            // https://www.khanacademy.org/devadmin/content/search?query=widget:passage-ref-target
            return parseAndAssign(`passage-ref-target ${id}`, any);
        case "phet-simulation":
            return parseAndAssign(
                `phet-simulation ${id}`,
                parsePhetSimulationWidget,
            );
        case "plotter":
            return parseAndAssign(`plotter ${id}`, parsePlotterWidget);
        case "python-program":
            return parseAndAssign(
                `python-program ${id}`,
                parsePythonProgramWidget,
            );
        case "radio":
            return parseAndAssign(`radio ${id}`, parseRadioWidget);
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
            if (getWidget(type)) {
                // @ts-expect-error - 'type' is not a valid widget type
                return parseAndAssign(`${type} ${id}`, any);
            }
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
