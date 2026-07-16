import {angles} from "@khanacademy/kmath";

import {X, Y} from "../../math";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {AngleGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

const {getClockwiseAngle} = angles;

export function srAnglePointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number | undefined;
        x: number;
        y: number;
        angleMeasure: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A non-empty custom author label identifies the point in place of its
    // sequence number, keeping the side/vertex semantics. An empty string,
    // numeric, or malformed pointLabel falls back to the point's coord-index
    // sequence number. (Empty string must be excluded here: the `?? ` fallback
    // below is nullish-only, so `"" ?? seq` would otherwise keep the "".)
    const customLabel =
        typeof state.pointLabel === "string" && state.pointLabel !== ""
            ? state.pointLabel
            : undefined;

    // Coord layout in angle graphs: [endingSide, vertex, startingSide].
    switch (state.pointIndex) {
        case 0:
            return strings.srAngleEndingSide({
                pointLabel: customLabel ?? `${state.pointIndex + 1}`,
                x,
                y,
            });
        case 1:
            return strings.srAngleVertexWithAngleMeasure({
                pointLabel: customLabel ?? `${state.pointIndex + 1}`,
                x,
                y,
                angleMeasure: srFormatNumber(state.angleMeasure, locale),
            });
        default:
            return strings.srAngleStartingSide({
                pointLabel: customLabel ?? `${state.pointIndex + 1}`,
                x,
                y,
            });
    }
}

type AngleGraphDescriptionStrings = {
    srAngleGraphAriaLabel: string;
    srAngleGraphAriaDescription: string;
    srAngleStartingSide: string;
    srAngleEndingSide: string;
    srAngleVertex: string;
};

export function describeAngleGraph(
    state: AngleGraphState,
    i18n: I18nContextType,
): AngleGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords, allowReflexAngles} = state;
    const [endingSide, vertex, startingSide] = coords;

    const angleMeasureValue = getClockwiseAngle(coords, allowReflexAngles);
    const angleMeasure = srFormatNumber(angleMeasureValue, locale);

    const srAngleGraphAriaLabel = strings.srAngleGraphAriaLabel;
    const srAngleGraphAriaDescription = strings.srAngleGraphAriaDescription({
        angleMeasure,
        vertexX: srFormatNumber(vertex[X], locale),
        vertexY: srFormatNumber(vertex[Y], locale),
        startingSideX: srFormatNumber(startingSide[X], locale),
        startingSideY: srFormatNumber(startingSide[Y], locale),
        endingSideX: srFormatNumber(endingSide[X], locale),
        endingSideY: srFormatNumber(endingSide[Y], locale),
    });
    // srAnglePointLabel folds any custom author label into the point's role
    // ("Point A, ending side ..."), keeping the vertex's angle measure, and
    // falls back to the point's coord-index sequence number for unlabeled,
    // empty-string, or malformed entries.
    const srAngleEndingSide = srAnglePointLabel(
        {
            pointIndex: 0,
            pointLabel: state.pointLabels?.[0],
            x: endingSide[X],
            y: endingSide[Y],
            angleMeasure: angleMeasureValue,
        },
        strings,
        locale,
    );
    const srAngleVertex = srAnglePointLabel(
        {
            pointIndex: 1,
            pointLabel: state.pointLabels?.[1],
            x: vertex[X],
            y: vertex[Y],
            angleMeasure: angleMeasureValue,
        },
        strings,
        locale,
    );
    const srAngleStartingSide = srAnglePointLabel(
        {
            pointIndex: 2,
            pointLabel: state.pointLabels?.[2],
            x: startingSide[X],
            y: startingSide[Y],
            angleMeasure: angleMeasureValue,
        },
        strings,
        locale,
    );

    return {
        srAngleGraphAriaLabel,
        srAngleGraphAriaDescription,
        srAngleStartingSide,
        srAngleEndingSide,
        srAngleVertex,
    };
}
