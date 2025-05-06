import type {WidgetExports} from "@khanacademy/perseus";
import type {PerseusWidget} from "@khanacademy/perseus-core";

export function isAccessible(
    widgetInfo: PerseusWidget,
    widgetLogic: WidgetExports | undefined,
): boolean {
    if (!widgetLogic) {
        return false;
    }
    const {accessible} = widgetLogic;

    return typeof accessible === "function"
        ? accessible(widgetInfo.options)
        : !!accessible;
}
