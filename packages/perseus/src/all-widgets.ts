import basicWidgets from "./basic-widgets";
import extraWidgets from "./extra-widgets";

import type {WidgetExports} from "./types";

export default [
    ...basicWidgets,
    ...extraWidgets,
] as ReadonlyArray<WidgetExports>;
