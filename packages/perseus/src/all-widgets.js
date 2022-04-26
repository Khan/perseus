// @flow
import basicWidgets from "./basic-widgets.js";
import extraWidgets from "./extra-widgets.js";

import type {WidgetExports} from "./types.js";

export default ([...basicWidgets, ...extraWidgets]: $ReadOnlyArray<
    WidgetExports<>,
>);
