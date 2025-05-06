// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-restricted-imports
import type {WidgetExports} from "@khanacademy/perseus";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
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
