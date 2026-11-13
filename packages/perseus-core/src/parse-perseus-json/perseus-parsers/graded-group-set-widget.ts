import {array, constant, object} from "../general-purpose-parsers";

import {parseGradedGroupWidgetOptions} from "./graded-group-widget";
import {parseWidget} from "./widget";

export const parseGradedGroupSetWidget = parseWidget(
    constant("graded-group-set"),
    object({gradedGroups: array(parseGradedGroupWidgetOptions)}),
    // Graded Group Set is a container for other widgets - it can't be
    // set as static or readonly itself. It sets its nested widgets as
    // readonly after being correctly answered.
    {supportsStatic: false},
);
