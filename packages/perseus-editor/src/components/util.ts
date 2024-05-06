import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {
    LockedFigure,
    LockedFigureType,
    LockedPointType,
    LockedLineType,
} from "@khanacademy/perseus";

export function focusWithChromeStickyFocusBugWorkaround(element: Element) {
    // NOTE(marksandstrom) Chrome sticky focus bug.
    //
    // There is a bug in Chrome related to sticky positioning and
    // focus: When a child of an element with sticky positioning is
    // focused with the focus() method, the scrollable area
    // containing that element will scroll to the top (even though
    // the element is already visble on the page). For a dropdown
    // this means that the area will be scrolled to the top when
    // the user interacts with the dropdown (since we actively
    // manage dropdown header and option focus for keyboard users).
    //
    // To work around this bug the `preventScroll` focus option is
    // used.
    //
    // Using `focusOptions` is an experimental browser feature
    // "that should not be used in production code". However, since
    // Chrome is the only browser we support that exhibits this
    // buggy behavior and using `focusOptions` works around the
    // bug, it is perfectly reasonable to use the feature in this
    // case. We are not relying on the effect of the
    // `preventScroll` option otherwise.
    //
    // focusOptions documentation:
    //
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
    //
    // Note that there could be cases where we want default focus() behavior.
    // One that comes to mind is a dropdown with a long list of options that
    // might be rendered off screen when opened. With this workaround the
    // selected option would not be scrolled into view if the option is near
    // the end of the list. We're not aware of any uses of the dropdown where
    // this is an issue, however, so there isn't currently a way to out of the
    // `preventScroll` behavior.

    // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'Element'.
    element.focus({preventScroll: true});
}

export function getValidNumberFromString(value: string) {
    const parsed = parseFloat(value);
    // If the value is not a number, return 0.
    return isNaN(parsed) ? 0 : parsed;
}

const DEFAULT_COLOR = "green";

export function getDefaultFigureForType(type: "point"): LockedPointType;
export function getDefaultFigureForType(type: "line"): LockedLineType;
export function getDefaultFigureForType(type: LockedFigureType): LockedFigure;
export function getDefaultFigureForType(type: LockedFigureType): LockedFigure {
    switch (type) {
        case "point":
            return {
                type: "point",
                coord: [0, 0],
                color: DEFAULT_COLOR,
                filled: true,
            };
        case "line":
            return {
                type: "line",
                kind: "line",
                points: [
                    getDefaultFigureForType("point"),
                    {
                        ...getDefaultFigureForType("point"),
                        coord: [2, 2],
                    },
                ],
                color: DEFAULT_COLOR,
                lineStyle: "solid",
                showStartPoint: false,
                showEndPoint: false,
            };
        default:
            throw new UnreachableCaseError(type);
    }
}
