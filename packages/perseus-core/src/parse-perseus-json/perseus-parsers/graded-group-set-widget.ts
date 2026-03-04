import {array, constant, object} from "../general-purpose-parsers";

import {parseGradedGroupWidgetOptions} from "./graded-group-widget";
import {parseWidget} from "./widget";

export const parseGradedGroupSetWidget = parseWidget(
    constant("graded-group-set"),
    object({gradedGroups: array(parseGradedGroupWidgetOptions)}),
);
