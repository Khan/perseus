import basicWidgets from "./basic-widgets";
import extraWidgets from "./extra-widgets";
import * as Widgets from "./widgets";

/**
 * This should be called by all clients, specifying whether extra widgets are
 * needed via `loadExtraWidgets`. It is idempotent, so it's not a problem to
 * call it multiple times.
 */
const init = function (): Promise<undefined> {
    Widgets.registerWidgets(basicWidgets);
    Widgets.registerWidgets(extraWidgets);

    Widgets.replaceDeprecatedWidgets();

    // @ts-expect-error - TS2322 - Type 'Promise<void>' is not assignable to type 'Promise<undefined>'.
    return Promise.resolve();
};

export default init;
