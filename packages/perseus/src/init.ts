import basicWidgets from "./basic-widgets";
import extraWidgets from "./extra-widgets";
import * as Widgets from "./widgets";

/**
 * This should be called by all clients, specifying whether extra widgets are
 * needed via `loadExtraWidgets`. It is idempotent, so it's not a problem to
 * call it multiple times.
 */
const init = function () {
    Widgets.registerWidgets(basicWidgets);
    Widgets.registerWidgets(extraWidgets);
    Widgets.replaceDeprecatedWidgets();
};

export default init;
