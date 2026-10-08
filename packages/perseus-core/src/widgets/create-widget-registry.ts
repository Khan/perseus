import {DeprecatedWidgetTypes} from "../data-schema";
import Registry from "../utils/registry";

/**
 * A registry of per-widget-type implementations (renderers, editors, scoring
 * logic, etc.), keyed by widget type.
 */
export type WidgetRegistry<T> = Registry<T>;

/**
 * Creates a registry keyed by widget type.
 *
 * Every type in {@link DeprecatedWidgetTypes}, and `deprecated-standin`
 * itself, resolves to `deprecatedStandin`, so old content that uses a removed
 * widget still finds an implementation. Those types can't be registered.
 */
export function createWidgetRegistry<T>(
    name: string,
    deprecatedStandin: T,
): WidgetRegistry<T> {
    return new Registry<T>(name, {
        aliases: {
            keys: [...DeprecatedWidgetTypes, "deprecated-standin"],
            value: deprecatedStandin,
        },
    });
}
