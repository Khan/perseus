import type {PerseusInteractiveGraphWidgetOptions} from "@khanacademy/perseus-core";

type InteractiveGraphPublicWidgetOptions = Pick<
    PerseusInteractiveGraphWidgetOptions,
    | "step"
    | "gridStep"
    | "snapStep"
    | "backgroundImage"
    | "markings"
    | "labels"
    | "showProtractor"
    | "showRuler"
    | "showTooltips"
    | "rulerLabel"
    | "rulerTicks"
    | "range"
    | "graph"
    | "lockedFigures"
    | "fullGraphAriaLabel"
    | "fullGraphAriaDescription"
>;

export default function getInteractiveGraphPublicWidgetOptions(
    options: PerseusInteractiveGraphWidgetOptions,
): InteractiveGraphPublicWidgetOptions {
    const {correct: _, ...publicOptions} = options;
    return publicOptions;
}
