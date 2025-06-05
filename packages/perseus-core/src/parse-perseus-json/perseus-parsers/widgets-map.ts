import {any, isPlainObject, object, constant} from "../general-purpose-parsers";
import {isFailure} from "../result";

import {parseCategorizerWidget} from "./categorizer-widget";
import {parseCSProgramWidget} from "./cs-program-widget";
import {parseDefinitionWidget} from "./definition-widget";
import {parseDropdownWidget} from "./dropdown-widget";
import {parseExplanationWidget} from "./explanation-widget";
import {parseExpressionWidget} from "./expression-widget";
import {parseFreeResponseWidget} from "./free-response-widget";
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
import {parseSorterWidget} from "./sorter-widget";
import {parseTableWidget} from "./table-widget";
import {parseVideoWidget} from "./video-widget";
import {parseWidget} from "./widget";
import {parseWidgetIdComponents} from "./widget-id-components";

import type {
    DeprecatedStandinWidget,
    PerseusWidgetsMap,
} from "../../data-schema";
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
) => ParseResult<unknown> = ([id, widget], widgetMap, ctx) => {
    const idComponentsResult = parseWidgetIdComponents(
        id.split(" "),
        ctx.forSubtree("(widget ID)"),
    );
    if (isFailure(idComponentsResult)) {
        return idComponentsResult;
    }
    const [type, n] = idComponentsResult.value;

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
            return parseAndAssign(`categorizer ${n}`, parseCategorizerWidget);
        case "cs-program":
            return parseAndAssign(`cs-program ${n}`, parseCSProgramWidget);
        case "definition":
            return parseAndAssign(`definition ${n}`, parseDefinitionWidget);
        case "dropdown":
            return parseAndAssign(`dropdown ${n}`, parseDropdownWidget);
        case "explanation":
            return parseAndAssign(`explanation ${n}`, parseExplanationWidget);
        case "expression":
            return parseAndAssign(`expression ${n}`, parseExpressionWidget);
        case "free-response":
            return parseAndAssign(
                `free-response ${n}`,
                parseFreeResponseWidget,
            );
        case "grapher":
            return parseAndAssign(`grapher ${n}`, parseGrapherWidget);
        case "group":
            return parseAndAssign(`group ${n}`, parseGroupWidget);
        case "graded-group":
            return parseAndAssign(`graded-group ${n}`, parseGradedGroupWidget);
        case "graded-group-set":
            return parseAndAssign(
                `graded-group-set ${n}`,
                parseGradedGroupSetWidget,
            );
        case "iframe":
            return parseAndAssign(`iframe ${n}`, parseIframeWidget);
        case "image":
            return parseAndAssign(`image ${n}`, parseImageWidget);
        case "input-number":
            return parseAndAssign(`input-number ${n}`, parseInputNumberWidget);
        case "interaction":
            return parseAndAssign(`interaction ${n}`, parseInteractionWidget);
        case "interactive-graph":
            return parseAndAssign(
                `interactive-graph ${n}`,
                parseInteractiveGraphWidget,
            );
        case "label-image":
            return parseAndAssign(`label-image ${n}`, parseLabelImageWidget);
        case "matcher":
            return parseAndAssign(`matcher ${n}`, parseMatcherWidget);
        case "matrix":
            return parseAndAssign(`matrix ${n}`, parseMatrixWidget);
        case "measurer":
            return parseAndAssign(`measurer ${n}`, parseMeasurerWidget);
        case "molecule-renderer":
            return parseAndAssign(
                `molecule-renderer ${n}`,
                parseMoleculeRendererWidget,
            );
        case "number-line":
            return parseAndAssign(`number-line ${n}`, parseNumberLineWidget);
        case "numeric-input":
            return parseAndAssign(
                `numeric-input ${n}`,
                parseNumericInputWidget,
            );
        case "orderer":
            return parseAndAssign(`orderer ${n}`, parseOrdererWidget);
        case "passage":
            return parseAndAssign(`passage ${n}`, parsePassageWidget);
        case "passage-ref":
            return parseAndAssign(`passage-ref ${n}`, parsePassageRefWidget);
        case "passage-ref-target":
            // NOTE(benchristel): as of 2024-11-12, passage-ref-target is only
            // used in test content. See:
            // https://www.khanacademy.org/devadmin/content/search?query=widget:passage-ref-target
            return parseAndAssign(`passage-ref-target ${n}`, any);
        case "phet-simulation":
            return parseAndAssign(
                `phet-simulation ${n}`,
                parsePhetSimulationWidget,
            );
        case "plotter":
            return parseAndAssign(`plotter ${n}`, parsePlotterWidget);
        case "python-program":
            return parseAndAssign(
                `python-program ${n}`,
                parsePythonProgramWidget,
            );
        case "radio":
            return parseAndAssign(`radio ${n}`, parseRadioWidget);
        case "sorter":
            return parseAndAssign(`sorter ${n}`, parseSorterWidget);
        case "table":
            return parseAndAssign(`table ${n}`, parseTableWidget);
        case "video":
            return parseAndAssign(`video ${n}`, parseVideoWidget);
        case "sequence":
            // sequence is a deprecated widget type, and the corresponding
            // widget component no longer exists.
            return parseAndAssign(`sequence ${n}`, parseDeprecatedWidget);
        case "lights-puzzle":
            return parseAndAssign(`lights-puzzle ${n}`, parseDeprecatedWidget);
        case "simulator":
            return parseAndAssign(`simulator ${n}`, parseDeprecatedWidget);
        case "transformer":
            return parseAndAssign(`transformer ${n}`, parseDeprecatedWidget);

        default:
            return parseAndAssign(
                `${type} ${n}` as any,
                parseWidget(constant(type), any) as any,
            );
    }
};

const parseDeprecatedWidget: Parser<DeprecatedStandinWidget> = parseWidget(
    // Ignore the incoming widget type and hardcode "deprecated-standin"
    (_, ctx) => ctx.success("deprecated-standin" as const),
    // Allow any widget options
    object({}),
);
