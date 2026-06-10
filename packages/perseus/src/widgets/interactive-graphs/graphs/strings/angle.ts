import {angles} from "@khanacademy/kmath";

import {X, Y} from "../../math";
import {withCustomPointLabel} from "./custom-point-label";
import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {AngleGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

const {getClockwiseAngle} = angles;

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
    // A custom author label overrides the side/vertex semantics, matching
    // the static aria-label behavior in angle.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }

    // Coord layout in angle graphs: [endingSide, vertex, startingSide].
    switch (state.pointIndex) {
        case 0:
            return strings.srAngleEndingSide({x, y});
        case 1:
            return strings.srAngleVertexWithAngleMeasure({
                x,
                y,
                angleMeasure: srFormatNumber(state.angleMeasure, locale),
            });
        default:
            return strings.srAngleStartingSide({x, y});
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
        x: srFormatNumber(startingSide[X], locale),
        y: srFormatNumber(startingSide[Y], locale),
    });
    const srAngleEndingSide = strings.srAngleEndingSide({
        x: srFormatNumber(endingSide[X], locale),
        y: srFormatNumber(endingSide[Y], locale),
    });
    const srAngleVertex = strings.srAngleVertexWithAngleMeasure({
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
