import type {PerseusPolarGraphWidgetOptions} from "../../data-schema";

export type PolarGraphPublicWidgetOptions = Omit<
    PerseusPolarGraphWidgetOptions,
    "correct"
>;

/**
 * Strips the answer so the options can be sent to the client.
 */
export function getPolarGraphPublicWidgetOptions(
    options: PerseusPolarGraphWidgetOptions,
): PolarGraphPublicWidgetOptions {
    const {correct: _, ...publicOptions} = options;
    return publicOptions;
}
