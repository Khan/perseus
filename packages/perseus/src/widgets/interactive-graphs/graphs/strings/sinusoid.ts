import {X, Y} from "../../math";
import {withCustomPointLabel} from "./custom-point-label";
import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {SinusoidGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srSinusoidPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | number;
        x: number;
        y: number;
        otherY: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    // A custom author label overrides the root/peak semantics, matching
    // the static aria-label behavior in sinusoid.tsx.
    const {x, y, customLabel} = withCustomPointLabel(state, strings, locale);
    if (customLabel !== undefined) {
        return customLabel;
    }
    const formatted = {x, y};
    // Coord layout in sinusoid graphs: [root(0), peak(1)]. The peak's
    // label depends on its y relative to the root's y.
    if (state.pointIndex === 0) {
        return strings.srSinusoidRootPoint(formatted);
    }
    if (state.y === state.otherY) {
        return strings.srSinusoidFlatPoint(formatted);
    }
    return state.y > state.otherY
        ? strings.srSinusoidMaxPoint(formatted)
        : strings.srSinusoidMinPoint(formatted);
}

export function describeSinusoidGraph(
    state: SinusoidGraphState,
    i18n: I18nContextType,
): Record<string, string> {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [root, peak] = coords;

    const diffX = Math.abs(peak[X] - root[X]);
    const diffY = Math.abs(peak[Y] - root[Y]);

    const formattedRoot = {
        x: srFormatNumber(root[X], locale),
        y: srFormatNumber(root[Y], locale),
    };
    const formattedPeak = {
        x: srFormatNumber(peak[X], locale),
        y: srFormatNumber(peak[Y], locale),
    };

    const srSinusoidGraph = strings.srSinusoidGraph;
    const srSinusoidDescription = strings.srSinusoidDescription({
        minValue: srFormatNumber(root[Y] - diffY, locale),
        maxValue: srFormatNumber(root[Y] + diffY, locale),
        cycleStart: srFormatNumber(root[X] - 2 * diffX, locale),
        cycleEnd: srFormatNumber(root[X] + 2 * diffX, locale),
    });
    const srSinusoidRootPoint = strings.srSinusoidRootPoint(formattedRoot);
    const srSinusoidPeakPoint =
        peak[Y] === root[Y]
            ? strings.srSinusoidFlatPoint(formattedPeak)
            : peak[Y] > root[Y]
              ? strings.srSinusoidMaxPoint(formattedPeak)
              : strings.srSinusoidMinPoint(formattedPeak);
    const srSinusoidInteractiveElements = strings.srInteractiveElements({
        elements: strings.srSinusoidInteractiveElements({
            point1X: srFormatNumber(root[X], locale),
            point1Y: srFormatNumber(root[Y], locale),
            point2X: srFormatNumber(peak[X], locale),
            point2Y: srFormatNumber(peak[Y], locale),
        }),
    });

    return {
        srSinusoidGraph,
        srSinusoidDescription,
        srSinusoidRootPoint,
        srSinusoidPeakPoint,
        srSinusoidInteractiveElements,
    };
}
