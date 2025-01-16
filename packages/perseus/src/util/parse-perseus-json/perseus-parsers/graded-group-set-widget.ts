import {array, constant, object} from "../general-purpose-parsers";

import {parseGradedGroupWidgetOptions} from "./graded-group-widget";
import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {GradedGroupSetWidget} from "@khanacademy/perseus-core";

export const parseGradedGroupSetWidget: Parser<GradedGroupSetWidget> =
    parseWidget(
        constant("graded-group-set"),
        object({gradedGroups: array(parseGradedGroupWidgetOptions)}),
    );
