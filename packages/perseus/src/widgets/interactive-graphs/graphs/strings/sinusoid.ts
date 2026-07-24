import {X, Y} from "../../math";
import {getCustomPointLabel} from "../components/build-point-aria-label";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {SinusoidGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srSinusoidPointLabel(
    state: {
        pointIndex: number;
        pointLabel: string | undefined;
        x: number;
        y: number;
        otherY: number;
    },
    strings: PerseusStrings,
    locale: string,
): string {
    const x = srFormatNumber(state.x, locale);
    const y = srFormatNumber(state.y, locale);
    // A custom author label is woven into the root/peak description so we
    // keep the sinusoid-specific semantics.
    const {pointLabel} = state;

    // Coord layout in sinusoid graphs: [root(0), peak(1)]. The peak's
    // label depends on its y relative to the root's y.
    if (state.pointIndex === 0) {
        return pointLabel
            ? strings.srSinusoidRootPointWithLabel({pointLabel, x, y})
            : strings.srSinusoidRootPoint({x, y});
    }
    if (state.y === state.otherY) {
        return pointLabel
            ? strings.srSinusoidFlatPointWithLabel({pointLabel, x, y})
            : strings.srSinusoidFlatPoint({x, y});
    }
    if (state.y > state.otherY) {
        return pointLabel
            ? strings.srSinusoidMaxPointWithLabel({pointLabel, x, y})
            : strings.srSinusoidMaxPoint({x, y});
    }
    return pointLabel
        ? strings.srSinusoidMinPointWithLabel({pointLabel, x, y})
        : strings.srSinusoidMinPoint({x, y});
}

type SinusoidGraphDescriptionStrings = {
    srSinusoidGraph: string;
    srSinusoidDescription: string;
    srSinusoidRootPoint: string;
    srSinusoidPeakPoint: string;
    srSinusoidInteractiveElements: string;
};

export function describeSinusoidGraph(
    state: SinusoidGraphState,
    i18n: I18nContextType,
): SinusoidGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords} = state;
    const [root, peak] = coords;

    const diffX = Math.abs(peak[X] - root[X]);
    const diffY = Math.abs(peak[Y] - root[Y]);

    const srSinusoidGraph = strings.srSinusoidGraph;
    const srSinusoidDescription = strings.srSinusoidDescription({
        minValue: srFormatNumber(root[Y] - diffY, locale),
        maxValue: srFormatNumber(root[Y] + diffY, locale),
        cycleStart: srFormatNumber(root[X] - 2 * diffX, locale),
        cycleEnd: srFormatNumber(root[X] + 2 * diffX, locale),
    });
    // srSinusoidPointLabel folds any custom author label into the point's role
    // ("Midline intersection A ...", "Maximum point B ...") and falls back to
    // the plain role label for unlabeled, empty-string, or malformed entries.
    const srSinusoidRootPoint = srSinusoidPointLabel(
        {
            pointIndex: 0,
            pointLabel: getCustomPointLabel(state.pointLabels, 0),
            x: root[X],
            y: root[Y],
            otherY: peak[Y],
        },
        strings,
        locale,
    );
    const srSinusoidPeakPoint = srSinusoidPointLabel(
        {
            pointIndex: 1,
            pointLabel: getCustomPointLabel(state.pointLabels, 1),
            x: peak[X],
            y: peak[Y],
            otherY: root[Y],
        },
        strings,
        locale,
    );
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
