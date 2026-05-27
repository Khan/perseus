import {isLabeledSVG} from "../../utils/util.graphie";

import type {PerseusInteractiveGraphWidgetOptions} from "../../data-schema";

// Function determining if a interactive graph is accessible.
export default function accessible(
    widgetOptions: PerseusInteractiveGraphWidgetOptions,
): boolean {
    // inaccessible if the interactive graph contains
    // a protractor.
    if (widgetOptions.showProtractor) {
        return false;
    }

    // inaccessible if the interactive graph contains
    // a graphie background image.
    if (
        widgetOptions.backgroundImage?.url &&
        isLabeledSVG(widgetOptions.backgroundImage?.url)
    ) {
        return false;
    }

    // inaccessible if the interactive graph contains
    // locked figures without a description.
    if (
        widgetOptions.lockedFigures.length > 0 &&
        !widgetOptions.fullGraphAriaDescription
    ) {
        return false;
    }

    return true;
}
