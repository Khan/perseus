import {DeprecatedWidgetTypes} from "../data-schema";
import Registry from "../utils/registry";

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
): Registry<T> {
    return new Registry<T>(name, {
        aliases: {
            keys: [...DeprecatedWidgetTypes, "deprecated-standin"],
            value: deprecatedStandin,
        },
    });
}
