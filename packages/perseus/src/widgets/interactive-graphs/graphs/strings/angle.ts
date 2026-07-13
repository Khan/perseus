import {angles} from "@khanacademy/kmath";

import {X, Y} from "../../math";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {AngleGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

const {getClockwiseAngle} = angles;

// Screen readers announce the vertex as "Point 1", the ending side as
// "Point 2", and the starting side as "Point 3", independent of the coord
// order ([endingSide(0), vertex(1), startingSide(2)]).
const ENDING_SIDE_LABEL = "2";
const VERTEX_LABEL = "1";
const STARTING_SIDE_LABEL = "3";

export function srAnglePointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        angleMeasure: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label (a string) identifies the point in place of its
    // sequence number, keeping the side/vertex semantics; a numeric pointLabel
    // falls back to the point's fixed sequence number.
    const customLabel =
        typeof state.pointLabel === "string" ? state.pointLabel : undefined;

    // Coord layout in angle graphs: [endingSide, vertex, startingSide].
    switch (state.pointIndex) {
        case 0:
            return strings.srAngleEndingSide({
                pointLabel: customLabel ?? ENDING_SIDE_LABEL,
                x,
                y,
            });
        case 1:
            return strings.srAngleVertexWithAngleMeasure({
                pointLabel: customLabel ?? VERTEX_LABEL,
                x,
                y,
                angleMeasure: srFormatNumber(state.angleMeasure, locale),
            });
        default:
            return strings.srAngleStartingSide({
                pointLabel: customLabel ?? STARTING_SIDE_LABEL,
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

    const angleMeasure = srFormatNumber(
        getClockwiseAngle(coords, allowReflexAngles),
        locale,
    );

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
    const srAngleStartingSide = strings.srAngleStartingSide({
        pointLabel: STARTING_SIDE_LABEL,
        x: srFormatNumber(startingSide[X], locale),
        y: srFormatNumber(startingSide[Y], locale),
    });
    const srAngleEndingSide = strings.srAngleEndingSide({
        pointLabel: ENDING_SIDE_LABEL,
        x: srFormatNumber(endingSide[X], locale),
        y: srFormatNumber(endingSide[Y], locale),
    });
    const srAngleVertex = strings.srAngleVertexWithAngleMeasure({
        pointLabel: VERTEX_LABEL,
        x: srFormatNumber(vertex[X], locale),
        y: srFormatNumber(vertex[Y], locale),
        angleMeasure,
    });

    return {
        srAngleGraphAriaLabel,
        srAngleGraphAriaDescription,
        srAngleStartingSide,
        srAngleEndingSide,
        srAngleVertex,
    };
}
