import {SpeechRuleEngine} from "@khanacademy/mathjax-renderer";
import {mathOnlyParser} from "@khanacademy/perseus";
import {
    type LockedEllipseType,
    type LockedFigure,
    type LockedFigureColor,
    type LockedFigureFillType,
    type LockedFigureType,
    type LockedFunctionType,
    type LockedLabelType,
    type LockedLineType,
    type LockedPointType,
    type LockedPolygonType,
    type LockedVectorType,
    type LockedLineStyle,
    type StrokeWeight,
} from "@khanacademy/perseus-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

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
                labels: [],
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
                weight: "medium",
                labels: [],
            };
        case "vector":
            return {
                type: "vector",
                points: [
                    [0, 0],
                    [2, 2],
                ],
                color: DEFAULT_COLOR,
                weight: "medium",
                labels: [],
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
                labels: [],
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
                weight: "medium",
                labels: [],
            };
        case "function":
            return {
                type: "function",
                color: DEFAULT_COLOR,
                strokeStyle: "solid",
                equation: "x^2",
                domain: [-Infinity, Infinity],
                directionalAxis: "x",
                labels: [],
            };
        case "label":
            return {
                type: "label",
                coord: [0, 0],
                text: "label",
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
    weight: StrokeWeight = "medium",
) {
    const convertedColor = color === "grayH" ? "gray" : color;
    const weightString = weight === "medium" ? "" : ` ${weight}`;
    const baseAppearance = `. Appearance${weightString} ${strokeStyle} ${convertedColor}`;

    switch (fill) {
        case "none":
            return `${baseAppearance} border, with no fill.`;
        case "white":
            return `${baseAppearance} border, with a white fill.`;
        case "solid":
        case "translucent":
            return `${baseAppearance} border, with a ${fill} ${convertedColor} fill.`;
        case undefined:
            return `${baseAppearance}.`;
        default:
            throw new UnreachableCaseError(fill);
    }
}

/**
 * Given a string that may contain math within TeX represented by $...$,
 * returns the spoken math equivalent using the SpeechRuleEngine.
 * Exported for testing.
 *
 * Example: "Circle with radius $\frac{1}{2}$" ==> "Circle with radius one half"
 */
export async function generateSpokenMathDetails(mathString: string) {
    const engine = await SpeechRuleEngine.setup("en");
    let convertedSpeech = "";

    // All the information we need is in the first section,
    // whether it's typed as "blockmath" or "paragraph"
    const parsedContent = mathOnlyParser(mathString);

    // If it's a paragraph, we need to iterate through the sections
    // to look for individual math blocks.
    for (const piece of parsedContent) {
        switch (piece.type) {
            case "math":
                convertedSpeech += engine.texToSpeech(piece.content);
                break;
            case "specialCharacter":
                // We don't want the backslash from special character
                // to show up in the generated aria label.
                convertedSpeech +=
                    piece.content.length > 1
                        ? piece.content.slice(1)
                        : piece.content;
                break;
            default:
                convertedSpeech += piece.content;
                break;
        }
    }

    return convertedSpeech;
}

/**
 * Take an array of LockedLabelType object and joins the text of each label
 * with a comma and space in between. The text of each label is converted to
 * spoken math using the SpeechRuleEngine.
 */
export async function joinLabelsAsSpokenMath(
    labels: LockedLabelType[],
): Promise<string> {
    if (labels.length === 0) {
        return "";
    }

    const spokenLabelPromises = labels.map((label) => {
        return generateSpokenMathDetails(label.text);
    });

    const spokenLabels = await Promise.all(spokenLabelPromises);

    return ` ${spokenLabels.join(", ")}`;
}

// TODO(LEMS-2616): Stop using this mock in tests once we update the
// speech rule engine to read locale data from local files.
/**
 * Non-async mocked version of joinLabelsAsSpokenMath for tests.
 */
export function mockedJoinLabelsAsSpokenMathForTests(
    labels: LockedLabelType[],
) {
    // Mock this so that each label's text says "spoken" before it.
    const jointMock = labels.map((input) => ` spoken ${input.text}`).join(",");
    return Promise.resolve(jointMock);
}

export function mockedGenerateSpokenMathDetailsForTests(mathString: string) {
    return Promise.resolve(`spoken ${mathString}`);
}
