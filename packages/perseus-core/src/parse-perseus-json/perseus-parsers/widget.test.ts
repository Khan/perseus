import {constant, object, number} from "../general-purpose-parsers";
import {parse} from "../parse";
import {assertSuccess} from "../result";

import {parseDefinitionWidget} from "./definition-widget";
import {parseExplanationWidget} from "./explanation-widget";
import {parseImageWidget} from "./image-widget";
import {parseInteractionWidget} from "./interaction-widget";
import {parseMeasurerWidget} from "./measurer-widget";
import {parsePhetSimulationWidget} from "./phet-simulation-widget";
import {parsePythonProgramWidget} from "./python-program-widget";
import {parseVideoWidget} from "./video-widget";
import {parseWidget, parseWidgetWithVersion} from "./widget";

import type {Parser} from "../parser-types";

const parseVersion = object({major: number, minor: number});

describe("parseWidget", () => {
    it("keeps `static` by default", () => {
        const parser = parseWidget(constant("mock"), object({}));

        const result = parse({type: "mock", static: true, options: {}}, parser);

        assertSuccess(result);
        expect(result.value.static).toBe(true);
    });

    it.each([true, false])(
        "drops `static: %s` when supportsStatic is false",
        (isStatic) => {
            const parser = parseWidget(constant("mock"), object({}), {
                supportsStatic: false,
            });

            const result = parse(
                {type: "mock", static: isStatic, options: {}},
                parser,
            );

            assertSuccess(result);
            expect(result.value.static).toBe(undefined);
        },
    );
});

describe("parseWidgetWithVersion", () => {
    it("keeps `static` by default", () => {
        const parser = parseWidgetWithVersion(
            parseVersion,
            constant("mock"),
            object({}),
        );

        const result = parse(
            {
                type: "mock",
                static: true,
                options: {},
                version: {major: 1, minor: 0},
            },
            parser,
        );

        assertSuccess(result);
        expect(result.value.static).toBe(true);
    });

    it("drops `static` when supportsStatic is false", () => {
        const parser = parseWidgetWithVersion(
            parseVersion,
            constant("mock"),
            object({}),
            {supportsStatic: false},
        );

        const result = parse(
            {
                type: "mock",
                static: true,
                options: {},
                version: {major: 1, minor: 0},
            },
            parser,
        );

        assertSuccess(result);
        expect(result.value.static).toBe(undefined);
    });
});

/**
 * These widgets collect no user input and are never scored, so `static` — "show
 * the correct answer and freeze the widget" — has no meaning for them. Their
 * parsers drop it. Adding a widget here is a data-format change: check that it
 * really takes no user input before doing so.
 */
describe.each([
    ["definition", parseDefinitionWidget, {togglePrompt: "", definition: ""}],
    [
        "explanation",
        parseExplanationWidget,
        {showPrompt: "", hidePrompt: "", explanation: "", widgets: {}},
    ],
    ["image", parseImageWidget, {backgroundImage: {}}],
    [
        "interaction",
        parseInteractionWidget,
        {
            graph: {
                box: [1, 1],
                range: [
                    [-10, 10],
                    [-10, 10],
                ],
                gridStep: [1, 1],
                markings: "graph",
                tickStep: [1, 1],
                labels: [],
            },
            elements: [],
        },
    ],
    [
        "measurer",
        parseMeasurerWidget,
        {
            image: {},
            showProtractor: false,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 1,
            rulerPixels: 1,
            rulerLength: 1,
            box: [1, 1],
        },
    ],
    ["phet-simulation", parsePhetSimulationWidget, {url: "", description: ""}],
    ["python-program", parsePythonProgramWidget, {programID: "", height: 1}],
    ["video", parseVideoWidget, {location: ""}],
])("the %s widget parser", (type, parser: Parser<any>, options) => {
    it("drops `static`, which the widget takes no user input to honor", () => {
        // Arrange, Act
        const result = parse(
            {type, static: true, options, version: {major: 1, minor: 0}},
            parser,
        );

        assertSuccess(result);
        expect(result.value.static).toBe(undefined);
    });

    it("parses successfully when `static` is missing", () => {
        // Arrange, Act
        const result = parse(
            {type, options, version: {major: 1, minor: 0}},
            parser,
        );

        assertSuccess(result);
        expect(result.value.static).toBe(undefined);
    });
});
