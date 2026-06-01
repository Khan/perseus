import basicWidgets from "./basic-widgets";
import extraWidgets from "./extra-widgets";

import type {WidgetExports} from "./types";

// eslint-disable-next-line no-restricted-syntax
export default [
    ...basicWidgets,
    ...extraWidgets,
] as ReadonlyArray<WidgetExports>;
