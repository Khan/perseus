import {getRadius} from "../../reducer/interactive-graph-state";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {CircleGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srCircleRadiusPointLabel(
    x: number,
    y: number,
    centerX: number,
    strings: PerseusStrings,
    locale: string,
    pointLabel?: string,
): string {
    const radiusPointX = srFormatNumber(x, locale);
    const radiusPointY = srFormatNumber(y, locale);
    const hasLabel = typeof pointLabel === "string" && pointLabel !== "";

    if (x >= centerX) {
        return hasLabel
            ? strings.srCircleRadiusPointRightWithLabel({
                  pointLabel,
                  radiusPointX,
                  radiusPointY,
              })
            : strings.srCircleRadiusPointRight({radiusPointX, radiusPointY});
    }
    return hasLabel
        ? strings.srCircleRadiusPointLeftWithLabel({
              pointLabel,
              radiusPointX,
              radiusPointY,
          })
        : strings.srCircleRadiusPointLeft({radiusPointX, radiusPointY});
}

export function srCircleCenterLabel(
    x: number,
    y: number,
    strings: PerseusStrings,
    locale: string,
): string {
    return strings.srCircleShape({
        centerX: srFormatNumber(x, locale),
        centerY: srFormatNumber(y, locale),
    });
}

type CircleGraphDescriptionStrings = {
    srCircleGraph: string;
    srCircleShape: string;
    srCircleRadiusPoint: string;
    srCircleRadius: string;
    srCircleOuterPoints: string;
    srCircleInteractiveElement: string;
};

// Exported for testing
export function describeCircleGraph(
    state: CircleGraphState,
    i18n: I18nContextType,
): CircleGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {center, radiusPoint, pointLabels} = state;
    const radius = getRadius(state);

    // Aria label strings
    const srCircleGraph = strings.srCircleGraph;
    const srCircleShape = srCircleCenterLabel(
        center[0],
        center[1],
        strings,
        locale,
    );
    const srCircleRadiusPoint = srCircleRadiusPointLabel(
        radiusPoint[0],
        radiusPoint[1],
        center[0],
        strings,
        locale,
        pointLabels?.[0],
    );
    const srCircleRadius = strings.srCircleRadius({
        radius,
    });
    const srCircleOuterPoints = strings.srCircleOuterPoints({
        point1X: srFormatNumber(center[0] + radius, locale),
        point1Y: srFormatNumber(center[1], locale),
        point2X: srFormatNumber(center[0], locale),
        point2Y: srFormatNumber(center[1] + radius, locale),
        point3X: srFormatNumber(center[0] - radius, locale),
        point3Y: srFormatNumber(center[1], locale),
        point4X: srFormatNumber(center[0], locale),
        point4Y: srFormatNumber(center[1] - radius, locale),
    });

    const srCircleInteractiveElement = strings.srInteractiveElements({
        elements: [srCircleShape, srCircleRadius].join(" "),
    });

    return {
        srCircleGraph,
        srCircleShape,
        srCircleRadiusPoint,
        srCircleRadius,
        srCircleOuterPoints,
        srCircleInteractiveElement,
    };
}
