import type {PerseusInteractiveGraphWidgetOptions} from "../../data-schema";

export type InteractiveGraphPublicWidgetOptions = Omit<
    PerseusInteractiveGraphWidgetOptions,
    "correct"
>;

export function getInteractiveGraphPublicWidgetOptions(
    options: PerseusInteractiveGraphWidgetOptions,
): InteractiveGraphPublicWidgetOptions {
    const {correct, ...publicOptions} = options;
    return publicOptions;
}
