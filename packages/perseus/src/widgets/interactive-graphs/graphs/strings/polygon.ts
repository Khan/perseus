import {
    buildPointAriaLabel,
    resolvePointLabel,
} from "../components/build-point-aria-label";

import {srFormatNumber} from "./format-number";

import type {I18nContextType} from "../../../../components/i18n-context";
import type {InteractiveGraphProps, PolygonGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";
import type {vec} from "mafs";

export function srPolygonLabel(
    coords: ReadonlyArray<readonly [number, number]>,
    pointLabels: ReadonlyArray<string> | undefined,
    strings: PerseusStrings,
    locale: string,
): string {
    const pointsString = coords
        .map(([x, y], i) =>
            strings.srPointAtCoordinates({
                // Use the author's custom label when set, otherwise the
                // 1-indexed default ("Point 1", "Point 2", …).
                pointLabel: resolvePointLabel(pointLabels, i),
                x: srFormatNumber(x, locale),
                y: srFormatNumber(y, locale),
            }),
        )
        .join(" ");
    const elementsLabel =
        coords.length === 1
            ? strings.srPolygonElementsOne
            : strings.srPolygonElementsNum({num: coords.length});
    return `${elementsLabel} ${pointsString}`;
}

type PolygonGraphDescriptionStrings = {
    srPolygonGraph: string;
    srPolygonGraphPointsNum: string;
    srPolygonGraphPoints?: string;
    srPolygonElementsNum: string;
    srPolygonInteractiveElements: string | null;
};

export function describePolygonGraph(
    state: PolygonGraphState,
    i18n: I18nContextType,
    markings: InteractiveGraphProps["markings"],
): PolygonGraphDescriptionStrings {
    const {strings, locale} = i18n;
    const {coords, pointLabels} = state;
    const buildLabel = (index: number, point: vec.Vector2) =>
        buildPointAriaLabel(pointLabels, index, point, strings, locale);
    const isCoordinatePlane = markings === "axes" || markings === "graph";
    const hasOnePoint = coords.length === 1;

    // Figure out graph aria label based on markings.
    const srPolygonGraph = isCoordinatePlane
        ? strings.srPolygonGraphCoordinatePlane
        : strings.srPolygonGraph;

    const srPolygonGraphPointsNum = hasOnePoint
        ? strings.srPolygonGraphPointsOne
        : strings.srPolygonGraphPointsNum({
              num: coords.length,
          });
    let srPolygonGraphPoints;
    // Figure out graph description based on markings.
    // If the graph is not on a coordinate plane, we should not include
    // the points' coordinates in the description.
    if (isCoordinatePlane) {
        const pointsString = coords.map(
            (coord, i) =>
                // Share the helper's defensive rules with the MovablePoint handle's aria-label.
                buildLabel(i, coord) ??
                strings.srPointAtCoordinates({
                    pointLabel: `${i + 1}`,
                    x: srFormatNumber(coord[0], locale),
                    y: srFormatNumber(coord[1], locale),
                }),
        );
        srPolygonGraphPoints = pointsString.join(" ");
    }

    const srPolygonElementsNum = hasOnePoint
        ? strings.srPolygonElementsOne
        : strings.srPolygonElementsNum({
              num: coords.length,
          });

    const srPolygonInteractiveElements =
        coords.length > 0
            ? strings.srInteractiveElements({
                  elements: [srPolygonElementsNum, srPolygonGraphPoints].join(
                      " ",
                  ),
              })
            : null;

    return {
        srPolygonGraph,
        srPolygonGraphPointsNum,
        srPolygonGraphPoints,
        srPolygonElementsNum,
        srPolygonInteractiveElements,
    };
}
