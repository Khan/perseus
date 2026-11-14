import {SpeechRuleEngine} from "@khanacademy/mathjax-renderer";
import {mathOnlyParser} from "@khanacademy/perseus";
import {
    getDefaultFigureForType,
    type Coord,
    type LockedFigureColor,
    type LockedFigureFillType,
    type LockedFigureStrokeStyle,
    type LockedLabelType,
    type StrokeWeight,
} from "@khanacademy/perseus-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

export function generateLockedFigureAppearanceDescription(
    color: LockedFigureColor,
    strokeStyle: LockedFigureStrokeStyle = "solid",
    fill?: LockedFigureFillType,
    weight: StrokeWeight = "medium",
) {
    const convertedColor = color === "grayH" ? "gray" : color;
    const weightString = weight === "medium" ? "" : ` ${weight}`;
    // A fill-only figure ("none" stroke) has no border color to name.
    const strokeDescription =
        strokeStyle === "none" ? "no" : `${strokeStyle} ${convertedColor}`;
    const baseAppearance = `. Appearance${weightString} ${strokeDescription}`;

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

/** The same labels in a new colour, for when their figure changes colour. */
export function recolorLabels(
    labels: ReadonlyArray<LockedLabelType>,
    color: LockedFigureColor,
): LockedLabelType[] {
    return labels.map((label) => ({...label, color}));
}

/**
 * A new label beside a figure's anchor point, stepping down for each label
 * the figure already has so they do not overlap.
 */
export function newLabelNear(
    anchor: Coord,
    existing: ReadonlyArray<LockedLabelType>,
    color: LockedFigureColor,
): LockedLabelType {
    return {
        ...getDefaultFigureForType("label"),
        coord: [anchor[0] + 0.5, anchor[1] - existing.length],
        color,
    };
}
