// @flow
import {widgets} from "@khanacademy/perseus";

import testingWidgets from "./testing-widgets.js";

import type {WidgetExports} from "@khanacademy/perseus";

export default ([...widgets, ...testingWidgets]: $ReadOnlyArray<
    WidgetExports<>,
>);
