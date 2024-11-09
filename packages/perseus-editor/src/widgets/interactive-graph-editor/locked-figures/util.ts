import {SpeechRuleEngine} from "@khanacademy/mathjax-renderer";
import * as SimpleMarkdown from "@khanacademy/pure-markdown";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {
    LockedEllipseType,
    LockedFigure,
    LockedFigureColor,
    LockedFigureFillType,
    LockedFigureType,
    LockedFunctionType,
    LockedLabelType,
    LockedLineType,
    LockedPointType,
    LockedPolygonType,
    LockedVectorType,
    LockedLineStyle,
} from "@khanacademy/perseus";

const DEFAULT_COLOR = "grayH";

export function getDefaultFigureForType(type: "point"): LockedPointType;
export function getDefaultFigureForType(type: "line"): LockedLineType;
export function getDefaultFigureForType(type: "vector"): LockedVectorType;
export function getDefaultFigureForType(type: "ellipse"): LockedEllipseType;
export function getDefaultFigureForType(type: "polygon"): LockedPolygonType;
export function getDefaultFigureForType(type: "function"): LockedFunctionType;
export function getDefaultFigureForType(type: "label"): LockedLabelType;
export function getDefaultFigureForType(type: LockedFigureType): LockedFigure;
export function getDefaultFigureForType(type: LockedFigureType): LockedFigure {
    switch (type) {
        case "point":
            return {
                type: "point",
                coord: [0, 0],
                color: DEFAULT_COLOR,
                filled: true,
            };
        case "line":
            return {
                type: "line",
                kind: "line",
                points: [
                    getDefaultFigureForType("point"),
                    {
                        ...getDefaultFigureForType("point"),
                        coord: [2, 2],
                    },
                ],
                color: DEFAULT_COLOR,
                lineStyle: "solid",
                showPoint1: false,
                showPoint2: false,
            };
        case "vector":
            return {
                type: "vector",
                points: [
                    [0, 0],
                    [2, 2],
                ],
                color: DEFAULT_COLOR,
            };
        case "ellipse":
            return {
                type: "ellipse",
                center: [0, 0],
                radius: [1, 1],
                angle: 0,
                color: DEFAULT_COLOR,
                fillStyle: "none",
                strokeStyle: "solid",
            };
        case "polygon":
            return {
                type: "polygon",
                points: [
                    [0, 2],
                    [-1, 0],
                    [1, 0],
                ],
                color: DEFAULT_COLOR,
                showVertices: false,
                fillStyle: "none",
                strokeStyle: "solid",
            };
        case "function":
            return {
                type: "function",
                color: DEFAULT_COLOR,
                strokeStyle: "solid",
                equation: "x^2",
                directionalAxis: "x",
            };
        case "label":
            return {
                type: "label",
                coord: [0, 0],
                text: "",
                color: DEFAULT_COLOR,
                size: "medium",
            };
        default:
            throw new UnreachableCaseError(type);
    }
}

export function generateLockedFigureAppearanceDescription(
    color: LockedFigureColor,
    strokeStyle: LockedLineStyle = "solid",
    fill?: LockedFigureFillType,
) {
    const convertedColor = color === "grayH" ? "gray" : color;

    switch (fill) {
        case "none":
            return `. Appearance ${strokeStyle} ${convertedColor} border, with no fill.`;
        case "white":
            return `. Appearance ${strokeStyle} ${convertedColor} border, with a white fill.`;
        case "solid":
        case "translucent":
            return `. Appearance ${strokeStyle} ${convertedColor} border, with a ${fill} ${convertedColor} fill.`;
        case undefined:
            return `. Appearance ${strokeStyle} ${convertedColor}.`;
        default:
            throw new UnreachableCaseError(fill);
    }
}

// Avoid running SpeechRuleEngine.setup() in Jest. It makes an HTTP request to
// fetch non-english speech rules, and cannot be easily mocked in consuming
// packages now that we do not bundle source code. When it eventually times
// out, it will cause arbitrary test failures.
export async function generateSpokenMathDetails(mathString: string) {
    const engine = await SpeechRuleEngine.setup("en");
    let convertedSpeech = "";

    // All the information we need is in the first section,
    // whether it's typed as "blockmath" or "paragraph"
    const firstSection = SimpleMarkdown.parse(mathString)[0];

    // If it's blockMath, the outer level has the full math content.
    if (firstSection.type === "blockMath") {
        convertedSpeech += engine.texToSpeech(firstSection.content);
    }

    // If it's a paragraph, we need to iterate through the sections
    // to look for individual math blocks.
    if (firstSection.type === "paragraph") {
        for (const piece of firstSection.content) {
            piece.type === "math"
                ? (convertedSpeech += engine.texToSpeech(piece.content))
                : (convertedSpeech += piece.content);
        }
    }

    return convertedSpeech;
}
