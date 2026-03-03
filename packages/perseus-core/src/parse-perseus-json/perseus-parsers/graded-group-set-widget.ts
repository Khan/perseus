import {array, constant, looseObject} from "../general-purpose-parsers";

import {parseGradedGroupWidgetOptions} from "./graded-group-widget";
import {parseWidget} from "./widget";

export const parseGradedGroupSetWidget = parseWidget(
    constant("graded-group-set"),
    looseObject({gradedGroups: array(parseGradedGroupWidgetOptions)}),
);
