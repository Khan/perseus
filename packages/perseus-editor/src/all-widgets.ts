import {widgets} from "@khanacademy/perseus";

import testingWidgets from "./testing-widgets";

import type {WidgetExports} from "@khanacademy/perseus";

export default [...widgets, ...testingWidgets] as ReadonlyArray<WidgetExports>;
