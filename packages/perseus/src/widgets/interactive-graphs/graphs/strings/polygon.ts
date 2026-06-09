import {resolvePointLabel} from "../components/build-point-aria-label";
import {srFormatNumber} from "./format-number";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

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
                num: resolvePointLabel(pointLabels, i),
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
