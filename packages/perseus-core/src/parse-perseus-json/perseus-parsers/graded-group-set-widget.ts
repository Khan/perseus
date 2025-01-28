import {array, constant, object} from "../general-purpose-parsers";

import {parseGradedGroupWidgetOptions} from "./graded-group-widget";
import {parseWidget} from "./widget";

import type {GradedGroupSetWidget} from "../../data-schema";
import type {Parser} from "../parser-types";

export const parseGradedGroupSetWidget: Parser<GradedGroupSetWidget> =
    parseWidget(
        constant("graded-group-set"),
        object({gradedGroups: array(parseGradedGroupWidgetOptions)}),
    );
