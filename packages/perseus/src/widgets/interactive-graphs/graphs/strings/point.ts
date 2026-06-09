import {buildPointAriaLabel} from "../components/build-point-aria-label";
import {srFormatNumber} from "./format-number";

import type {PointGraphState} from "../../types";
import type {PerseusStrings} from "@khanacademy/perseus/strings";

// Exported for testing
export function describePointGraph(
    state: PointGraphState,
    i18n: {strings: PerseusStrings; locale: string},
): string {
    const {strings, locale} = i18n;

    if (state.coords.length === 0) {
        return strings.srNoInteractiveElements;
    }

    const pointDescriptions = state.coords.map(
        (point, index) =>
            buildPointAriaLabel(
                state.pointLabels,
                index,
                point,
                strings,
                locale,
            ) ??
            strings.srPointAtCoordinates({
                num: index + 1,
                x: srFormatNumber(point[0], locale),
                y: srFormatNumber(point[1], locale),
            }),
    );

    return strings.srInteractiveElements({
        elements: pointDescriptions.join(" "),
    });
}
