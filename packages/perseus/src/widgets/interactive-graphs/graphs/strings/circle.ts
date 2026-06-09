import {srFormatNumber} from "./format-number";

import type {PerseusStrings} from "@khanacademy/perseus/strings";

export function srCircleRadiusPointLabel(
    x: number,
    y: number,
    centerX: number,
    strings: PerseusStrings,
    locale: string,
): string {
    return x >= centerX
        ? strings.srCircleRadiusPointRight({
              radiusPointX: srFormatNumber(x, locale),
              radiusPointY: srFormatNumber(y, locale),
          })
        : strings.srCircleRadiusPointLeft({
              radiusPointX: srFormatNumber(x, locale),
              radiusPointY: srFormatNumber(y, locale),
          });
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
