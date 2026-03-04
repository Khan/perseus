import {array, constant, strictObject} from "../general-purpose-parsers";

import {parseGradedGroupWidgetOptions} from "./graded-group-widget";
import {parseWidget} from "./widget";

export const parseGradedGroupSetWidget = parseWidget(
    constant("graded-group-set"),
    strictObject({gradedGroups: array(parseGradedGroupWidgetOptions)}),
);
